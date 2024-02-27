import connectToDatabase from '../../lib/db';
import User from '../../models/User';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
      break;
    case 'POST':
      try {
        const { name, location, time, date, totalPrice } = req.body;
        let user = await User.findOne({ name });
        if (user) {
   
          user.location = location;
          user.time = time;
          user.date = date;
          user.totalPrice = totalPrice;
        } else {

          user = new User({ name, location, time, date, totalPrice });
        }
        await user.save(); 
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
