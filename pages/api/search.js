
import connectToDatabase from '../../lib/db';
import User from '../../models/User';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const { name } = req.query;
        const users = await User.find({ name });
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
