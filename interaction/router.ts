import type { NextFunction, Request, Response } from "express";
import express from "express";
import * as userValidator from "../user/middleware";
import InteractionCollection from "./collection";
import * as util from "./util";

const router = express.Router();

/**
 * Create an new user interaction
 *
 * @name POST /api/interaction
 *
 * @param {string} username - The user's username
 * @param {string} type - The type of interaction
 * @param {string} freetId - The interaction's freetId
 * @param {string} content - The interaction's content - nonempty if 'reply'
 * @return {InteractionResponse} - An object with user's details
 * @throws {403} - If if the user is not logged in
 * 
 */
 router.post(
    "/",
    [
        userValidator.isUserLoggedIn,
        // freetValidator.isValidFreetContent
    ],
    async (req: Request, res: Response) => {
      const username = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      console.log("hello");
      const interaction = await InteractionCollection.addOne(
        username,
        req.body.type,
        req.body.freetId,
        req.body.content
      );
  
      res.status(201).json({
        message: `Your interaction was created successfully.`,
        interaction: util.constructInteractionResponse(interaction),
      });
    }
  );

export {router as interactionRouter};
