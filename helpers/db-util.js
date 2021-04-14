export async function Connect() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB, {
    useUnifiedTopology: true,
  });
  return client;
}

export async function insertDocument(client, collection, data) {
  const db = await client.db();
  const result = await db.collection(collection).insertOne(data);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
