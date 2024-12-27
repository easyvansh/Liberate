import { PineconeClient } from "@pinecone-database/pinecone";
import { Configuration, OpenAIApi } from "openai";

const pinecone = new PineconeClient();

export async function initPinecone() {
  await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY || "",
    environment: process.env.PINECONE_ENV || "us-west1-gcp",
  });
  return pinecone;
}

export async function upsertEmbedding(
  userId: string,
  docId: string,
  text: string
) {
  // 1. Get embedding from OpenAI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const embeddingRes = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });
  const vector = embeddingRes.data.data[0].embedding;

  // 2. Upsert into Pinecone
  const client = await initPinecone();
  const index = client.Index("liberate-index"); // e.g. "liberate-index"
  await index.upsert({
    upsertRequest: {
      vectors: [
        {
          id: `${userId}-${docId}`,
          values: vector,
          metadata: { userId, text },
        },
      ],
    },
  });
}

export async function semanticSearch(query: string): Promise<any[]> {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  // 1. get query embedding
  const embeddingRes = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: query,
  });
  const queryVector = embeddingRes.data.data[0].embedding;

  // 2. query Pinecone
  const client = await initPinecone();
  const index = client.Index("liberate-index");
  const result = await index.query({
    queryRequest: {
      topK: 5,
      vector: queryVector,
      includeMetadata: true,
    },
  });
  return result.matches || [];
}
