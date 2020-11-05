import express, { Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';

// export interface ICat extends Document {
//   name: string,
// }

const app = express();
const PORT = 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/connect', (req: Request, res: Response) => {
  const CatSchema: Schema = new Schema({
    name: String,
  });

  mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

  // const Cat = mongoose.model<ICat>('Cat', CatSchema);
  const Cat = mongoose.model('Cat', CatSchema);

  const kitty = new Cat({ name: 'Zildjian' });
  kitty.save().then(() => console.log('meow'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
