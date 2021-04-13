import { MongoClient } from 'mongodb';
async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    console.log(process.env.NEXT_PUBLIC_DB);

    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB, {
      useUnifiedTopology: true,
    });
    const db = await client.db();
    await db.collection('emails').insertOne({ email });

    client.close();
    res
      .status(201)
      .json({ message: 'Email was successfully registered', data: email });
  }
}

export default handler;
