import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import ProfileCollection from './collection';
import * as profileValidator from './middleware';
import * as util from '../user/util';

const router = express.Router();


/**
 * Create an new user profile
 *
 * @name POST /api/profile
 *
 * @param {string} username - The user's username
 * @param {string} bio - The user's bio
 * @param {string} picture - The user's profile picture
 * @return {UserResponse} - An object with user's details
 * @throws {403} - If if the user is not logged in
 * @throws {409} - if username is already in use
 *
 */
router.post(
    '/',
    [
        profileValidator.isUserLoggedIn,
        profileValidator.isUsernameNotAlreadyInUse,
    ],
    async (req: Request, res: Response) => {
        const profile = await ProfileCollection.addOne(
        req.body.username, req.body.picture, req.body.bio );

        res.status(201).json({
        message: `Your account was created successfully.`,
        profile: profile
        });
    }
);

