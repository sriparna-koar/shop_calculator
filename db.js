// db.js (or any other appropriate file)
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://koarsk03:hirOBqDzJ4OirvLf@cluster0.cjynyy9.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;
