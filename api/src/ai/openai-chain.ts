import { ChatOpenAI } from '@langchain/openai'
import { OpenAIEmbeddings } from '@langchain/openai'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import { BaseMessage } from '@langchain/core/messages'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever'
import { Retrieval } from './retrieval'

const chatModel = new ChatOpenAI({})
const embeddings = new OpenAIEmbeddings()

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

export async function createOpenAIChain() {
  const retriever = await Retrieval.getInstance('openai', embeddings).retriever
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

export type Thread = BaseMessage[]
export { HumanMessage, AIMessage } from '@langchain/core/messages'
