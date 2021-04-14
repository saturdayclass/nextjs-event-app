import { MongoClient } from 'mongodb';
import { Connect, insertDocument } from './../../helpers/db-util';

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
      await insertDocument(client, 'newslatter', { email });
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
