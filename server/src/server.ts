import express, { Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';
import cors from 'cors';

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
app.use(cors());

// create new user
app.post('/users', async (req: Request, res: Response) => {
  // what happens if the username field is missing
  // what happens if someone puts in a username that is all emojis / non-supported characters
  // what happens if the username is already taken
  // what hpapens if the `.save()` command fails?

  const username = req.body['username'];
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
  // what happens if the username is made up of invalid characters
  // what hpapens if the username is not found in the databse

  const username = req.params['username'];
  const userData = await User.findOne({ username }).exec();

  res.json({
    message: `${username}`,
    data: userData,
  });
});

// update top score for user
app.patch('/users/:username', async (req: Request, res: Response) => {
  // what happens if the username is not found hte DB
  // what happens if a invalid username is passed in
  // what happens ifthe new score is lower than the current score

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
