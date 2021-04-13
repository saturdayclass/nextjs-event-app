function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    console.log(email);
    res
      .status(201)
      .json({ message: 'Email was successfully registered', data: email });
  }
}

export default handler;
