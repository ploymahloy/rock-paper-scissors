import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import User from './models/user';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';

dotenv.config();
const { API_PORT, DB_HOST, DB_PORT, DB_NAME, JWT_KEY } = process.env;

// ========== MONGO CONFIG ========== //

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to database.');
  })
  .catch((error) => {
    if (error) throw error;
  })
;

mongoose.connection.on('error', (error) => {
  if (error) {
    throw error;
  }
});

// ========== EXPRESS CONFIG ========== //

const app = express();

// --- MIDDLWARE --- //

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// parse application/json
app.use(express.json());

app.use(cors());

// init and configure passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new JWTStrategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey    : JWT_KEY,
  }, function (jwtPayload, done) {
    User.findOne({ username: jwtPayload.username})
      .then((user: any) => {
        return done(null, user);
      })
      .catch((error: any) => {
        if (error) {
          return done(error);
        }
      })
    ;
  }
));

// --- ROUTES --- //

app.use('/', authRoutes);
app.use('/users/', userRoutes);

// TODO: default route

// --- LISTEN --- //

app.listen(parseInt(API_PORT, 10), () => {
  console.log(`Example app listening at http://localhost:${API_PORT}`)
});
