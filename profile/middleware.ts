import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ProfileCollection from '../profile/collection';

/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
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

export {
    
  };