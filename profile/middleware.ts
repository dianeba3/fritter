import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ProfileCollection from '../profile/collection';
import UserCollection from '../user/collection';


/**
 * 403 if the user is not logged in - DONE
 * 409 if username is already in use - DONE
 * 404 if userId is not a recognized username of any user - DONE 
 * 
 * 400 if the new bio content is empty or a stream of empty spaces - DONE 
 * 413 if the new bio content is more than 140 characters long - DONE 
 * 404 if newPic is not found in the database - not sure yet how to do
 * 400 if the new picture content is empty or a stream of empty spaces - DONE 
*/

/**
 * Checks if a username in req.body is already in use
 */
 const isUsernameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserCollection.findOneByUsername(req.body.username.username);

  // If the current session user wants to change their username to one which matches
  // the current one irrespective of the case, we should allow them to do so
  if (!user || (user?._id.toString() === req.session.userId)) {
    next();
    return;
  }

  res.status(409).json({
    error: {
      username: 'An account with this username already exists.'
    }
  });
};

/**
 * Checks if the user is logged in, that is, whether the userId is set in session
 */
 const isUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res.status(403).json({
      error: {
        auth: 'You must be logged in to complete this action.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the NEW BIO in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
 const isValidBio = (req: Request, res: Response, next: NextFunction) => {
    const {content} = req.body as {content: string};
    if (!content.trim()) {
      res.status(400).json({
        error: 'Freet content must be at least one character long.'
      });
      return;
    }
  
    if (content.length > 140) {
      res.status(413).json({
        error: 'Freet content must be no more than 140 characters.'
      });
      return;
    }
  
    next();
  };

  /**
 * Checks if the content of the NEW PICTURE in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
 const isValidPic = (req: Request, res: Response, next: NextFunction) => {
  const {content} = req.body as {content: string};
  if (!content.trim()) {
    res.status(400).json({
      error: 'Freet content must be at least one character long.'
    });
    return;
  }

  next();
};

export {
  isValidBio,
  isValidPic,
  isUsernameNotAlreadyInUse,
  isUserLoggedIn,

  };


