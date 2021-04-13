import { MongoClient } from 'mongodb';
async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = MongoClient.connect(process.env.NEXT_PUBLIC_DB, {
    useUnifiedTopology: true,
  });

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email.includes('@') || !name || !text || !text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };
    const db = client.db();
    const res = await db.collection('comments').insertOne(newComment);

    newComment.id = res.insertedId;
    console.lof(newComment);
    res
      .status(201)
      .json({ message: 'added comment successfully', comment: newComment });
  }
  if (req.method === 'GET') {
    const db = client.db();

    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comments: documents });
  }
}

export default handler;
