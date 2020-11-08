import { Request, Response } from 'express';

import User from '../models/user';

// TODO: only return data if current user is the user requested
async function getUserInfo (req: Request, res: Response) {
  try {
    const username = req.params.username;

    // TODO: error handling
    const userInfo = await User.findOne({ username }).exec();

    res.status(200).json({
      success: true,
      data: userInfo, // TODO: filter out unused data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occured.',
      error,
    });
  }
}

// TODO: only allow this to happen if current user is user requested
// TODO: how to prevent people hacking this
async function incrementUserScore (req: Request, res: Response) {
  try {
    const username = req.params.username;

    // TODO: error handling
    const data = await User.findOneAndUpdate({ username }, { $inc: { topScore : 1 } }, { new: true }).exec();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occured.',
      error,
    });
  }
}

function registerUser (req: Request, res: Response) {
  try {
    User.register(new User({
        username : req.body.username,
      }),
      req.body.password,
      (error: any, user: any) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'Account could not be saved.',
            error,
          });
          return;
        }

        // TODO: maybe authenticate here?
        res.status(200).json({
          success: true,
          message: 'Account has been saved.',
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occured.',
      error,
    });
  }
}

export default {
  getUserInfo,
  incrementUserScore,
  registerUser,
};
