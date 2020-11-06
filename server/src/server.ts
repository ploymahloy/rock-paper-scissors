import express, { Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';

const API_PORT = 4000;

const DB_HOST = 'localhost';
const DB_PORT = 27017;
const DB_NAME = 'swamprun';

// ========== MONGO CONFIG ==========

  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const UserSchema: Schema = new Schema({
    username: String,
    topScore: Number,
  });

  const User = mongoose.model('User', UserSchema);

  // ========== EXPRESS CONFIG ==========

const app = express();

app.use(express.json());

// create new user
app.post('/users', async (req: Request, res: Response) => {
  const username = 'patrick';
  const user = new User({
    username: username,
    topScore: 0,
  });

  const userData = await user.save();

  res.json({
    message: 'User successfully created.',
    data: userData,
  });
});

// get user information
app.get('/users/:username', async (req: Request, res: Response) => {
  const username = req.params['username'];
  const userData = await User.findOne({ username }).exec();

  res.json({
    message: `${username}`,
    data: userData,
  });
});

// update top score for user
app.patch('/users/:username', async (req: Request, res: Response) => {
  const username = req.params['username'];
  const newScore = req.body['topScore'];

  await User.findOneAndUpdate({ username }, { topScore: newScore }).exec();

  res.json({
    message: `${username} ${newScore}`,
  });
});

app.listen(API_PORT, () => {
  console.log(`Example app listening at http://localhost:${API_PORT}`)
});
