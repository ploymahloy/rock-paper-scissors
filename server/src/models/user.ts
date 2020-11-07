import mongoose, { PassportLocalSchema, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema: Schema = new Schema({
  username : {
    type: String,
    unique: true,
    required: true,
  },
  topScore: {
    type: Number,
    default: 0,
  },
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema as PassportLocalSchema);

export default User;
