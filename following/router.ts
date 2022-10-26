import type { NextFunction, Request, Response } from "express";
import express from "express";
import * as util from "./util";
import FollowingCollection from "./collection";
import UserCollection from "../user/collection";
import * as userValidator from "../user/middleware";
import * as interactionValidator from "../interaction/middleware";
import * as followingValidator from "./middleware";

const router = express.Router();


/**
 * Create an new following
 *
 * @name POST /api/following
 *
 * @param {string} follower - The user being followed 
 * @return {FollowingResponse} - An object with user's details 
 * @throws {403} if the user is not logged in
 * @throws {403} if the user is trying to follow itself
 * @throws {403} if the user already follows `follower`
 * @throws {404} if follower/user is not a recognized username of any user
 */
 router.post(
    "/",
    [
        userValidator.isUserLoggedIn,
        interactionValidator.isAuthorExists,
        followingValidator.isUserExistsBody,
        followingValidator.followerNotSameAsUser,
        followingValidator.isAlreadyFollowed,

    ],
    async (req: Request, res: Response) => {
      const userFollower = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      const user = await UserCollection.findOneByUserId(userFollower);
      const newFollow = await FollowingCollection.addOne(
        user.username as string,
        req.body.follower as string,
      );
  
      res.status(201).json({
        message: `Your following was created successfully.`,
        following: util.constructFollowingResponse(newFollow),
      });
    }
);


export { router as followingRouter };
