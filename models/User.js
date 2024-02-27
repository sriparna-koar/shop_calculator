// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  time: String,
  date: Date,
  totalPrice: Number 
});

let User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
