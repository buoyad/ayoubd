import { Chatter, Message } from './types'
import { ChatOpenAI } from '@langchain/openai'
import { OpenAIEmbeddings } from '@langchain/openai'
import { Retrieval } from './retrieval'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { HumanMessage, AIMessage, BaseMessage } from '@langchain/core/messages'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever'
import { MessagesPlaceholder } from '@langchain/core/prompts'
import { v4 as uuidv4 } from 'uuid'

const chatModel = new ChatOpenAI({})
const embeddings = new OpenAIEmbeddings()

const prompt =
  ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context. Do not mention the context. Do not say the word context. Do not answer with a question. If a response cannot be formed strictly using the context, politely say you don’t have knowledge about that topic. If the question is not a question, politely describe the kind of knowledge you have in the form of a statement. If the question is a greeting, politely summarize the information that is contained in context.

<context>
{context}
</context>

Question: {input}`)

const historyAwarePrompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder('chat_history'),
  ['user', '{input}'],
  [
    'user',
    'Given the above conversation, generate a search query to look up in order to get information relevant to the conversation',
  ],
])
const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    "Answer the user's questions based on the below context:\n\n{context}",
  ],
  new MessagesPlaceholder('chat_history'),
  ['user', '{input}'],
])

export class OpenAIChatter implements Chatter {
  thread: BaseMessage[] = []
  receivedMessageCb: (message: Message) => void
  status: 'waiting' | 'ready' | 'error' = 'ready'
  retrieval: Retrieval
  retrievalChain: ReturnType<typeof createRetrievalChain>

  constructor(receivedMessageCb: (message: Message) => void) {
    this.receivedMessageCb = receivedMessageCb
    this.retrieval = Retrieval.getInstance('openai', embeddings)
    this.retrievalChain = this.createRetrievalChain()
  }

  createRetrievalChain = async () => {
    const retriever = await this.retrieval.retriever

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: chatModel,
      retriever,
      rephrasePrompt: historyAwarePrompt,
    })

    const historyAwareCombineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt: historyAwareRetrievalPrompt,
    })

    return await createRetrievalChain({
      retriever: historyAwareRetrieverChain,
      combineDocsChain: historyAwareCombineDocsChain,
    })
  }

  sendMessage = (message: string) => {
    console.log('openai received message', message)
    this.thread.push(new HumanMessage(message))
    this.waitForCompletion(message).then(async (stream) => {
      const id = uuidv4()
      let fullMessage = ''
      for await (const chunk of stream) {
        if (!chunk.answer) continue
        fullMessage += chunk.answer
        this.receivedMessageCb({
          id,
          type: 'user',
          sender: 'server',
          message: (chunk.answer as string) || 'No response',
        })
      }
      console.log('openai sent message', fullMessage)
      this.thread.push(new AIMessage(fullMessage))
    })
  }

  waitForCompletion = async (prompt: string) => {
    const chain = await this.retrievalChain
    return chain.stream({ input: prompt })
  }
}
