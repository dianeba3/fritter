import type {Request, Response, NextFunction} from 'express';
import UserCollection from '../user/collection';
import FollowingCollection from './collection';

/**
 * Checks if a user with username in req.body exists
 */
 const isUserExistsBody = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.following) {
      res.status(400).json({
        error: 'Provided follower username must be nonempty.'
      });
      return;
    }
  
    const user = await UserCollection.findOneByUsername(req.body.following as string);
    if (!user) {
      res.status(404).json({
        error: `A user with username ${req.body.following as string} does not exist.`
      });
      return;
    }
  
    next();
};

/**
 * Checks that user is not trying to follow itself
 */
 const followerNotSameAsUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserCollection.findOneByUserId(req.session.userId);

    if (req.body.following as string === user.username as string) {
      res.status(403).json({
        error: 'You cannot follow yourself'
      });
      return;
    }
  
    next();
};


/**
 * Checks that user is not already following `following`
 */
 const isAlreadyFollowed = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserCollection.findOneByUserId(req.session.userId);
    const followExists = await FollowingCollection.findOneByBoth(user.username as string, req.body.following as string);
    
    if (followExists.length >= 1) {
      res.status(403).json({
        error: 'You cannot follow this user more than once'
      });
      return;
    }
  
    next();
};


export {
    isUserExistsBody,
    followerNotSameAsUser,
    isAlreadyFollowed,
};