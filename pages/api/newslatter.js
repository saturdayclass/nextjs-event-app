import { MongoClient } from 'mongodb';

async function Connect() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB, {
    useUnifiedTopology: true,
  });
  return client;
}

async function insertDocument(client, email) {
  const db = await client.db();
  await db.collection('newslatter').insertOne(email);
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    let client;
    try {
      client = await Connect();
    } catch (err) {
      res.status(500).json({ message: 'Connecting to the database failded!' });
      return;
    }
    try {
      await insertDocument(client, { email });
      client.close();
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failded!' });
    }

    res
      .status(201)
      .json({ message: 'Email was successfully registered', data: email });
  }
}

export default handler;
