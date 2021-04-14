import { getAllDocuments } from '../../../helpers/db-util';
import { Connect, insertDocument } from './../../../helpers/db-util';
async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await Connect();
  } catch (err) {
    res.status({ message: 'Connect to database failed' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email.includes('@') || !name || !text || !text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: 'added comment successfully', comment: newComment });
    } catch (err) {
      res.status(500).json({ message: 'Inserting comment failed' });
    }
  }
  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (err) {
      res.status(500).json({ message: 'getting comments failed' });
    }
  }
  client.close();
}

export default handler;
