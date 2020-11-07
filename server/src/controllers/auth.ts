import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

function login (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.username) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Username was not given.',
        }
      });
      return;
    }

    if (!req.body.password) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Password was not given.',
        }
      });
      return;
    }

    passport.authenticate('local', function (error, user, info) {
      if (error) {
        res.status(400).json({
          success: false,
          error: {
            message: error,
          }
        });
        return;
      }

      if (!user) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Username or password incorrect.',
          }
        });
        return;
      }

      req.login(user, { session: false }, function (error) {
        if (error) {
          res.status(400).json({
            success: false,
            error: {
              message: error,
            }
          });
          return;
        }

        const token = jwt.sign({
            userId: user._id,
            username: user.username,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '24h',
          }
        );

        res.status(200).json({
          success: true,
          message: 'Authentication successful.',
          username: user.username,
          topScore: user.topScore,
          token: token,
        });
      });
    })(req, res);
  } catch (error) {
    // TODO: Maybe do something with this?
    console.error(error);
  }
};

export default {
  login,
};
