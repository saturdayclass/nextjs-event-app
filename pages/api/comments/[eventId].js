function handler(req, res) {
  const eventId = req.query.eventId;
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
    };
    console.log(newComment);
    res
      .status(201)
      .json({ message: 'added comment successfully', comment: newComment });
  }
  if (req.method === 'GET') {
    const dummyList = [
      {
        id: 'c1',
        name: 'Raihan',
        email: 'raihan@gmail.com',
        text: 'Very Nice!',
      },
      {
        id: 'c1',
        name: 'Santoso',
        email: 'santoso@gmail.com',
        text: 'Very Good!',
      },
      {
        id: 'c1',
        name: 'Bambang',
        email: 'raihan@gmail.com',
        text: 'Very Well!',
      },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
