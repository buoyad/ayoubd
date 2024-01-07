import path from 'path'
import { EmbeddingsInterface } from '@langchain/core/embeddings'
import { VectorStoreRetriever } from '@langchain/core/vectorstores'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

const dataDir = path.join(process.cwd(), 'chat-context')

const loader = new DirectoryLoader(dataDir, {
  '.txt': (path) => new TextLoader(path),
  '.pdf': (path) => new PDFLoader(path),
})
const splitter = new RecursiveCharacterTextSplitter()

export class Retrieval {
  static instance: { [key: string]: Retrieval } = {}

  static getInstance(embeddingKey: string, embeddings: EmbeddingsInterface) {
    if (!Retrieval.instance[embeddingKey]) {
      Retrieval.instance[embeddingKey] = new Retrieval(embeddings)
    }
    return Retrieval.instance[embeddingKey]
  }

  embeddings: EmbeddingsInterface
  retriever: Promise<VectorStoreRetriever>

  constructor(embeddings: EmbeddingsInterface) {
    this.embeddings = embeddings
    this.retriever = this.loadDocuments()
  }

  loadDocuments = async () => {
    const documents = await loader.load()
    const splitDocs = await splitter.splitDocuments(documents)

    return await MemoryVectorStore.fromDocuments(
      splitDocs,
      this.embeddings
    ).then((vs) => vs.asRetriever())
  }
}
