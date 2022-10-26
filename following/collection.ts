import type { HydratedDocument, Types } from "mongoose";
import type { Following } from "./model";
import FollowingModel from "./model";

/**
 * This file contains a class with functionality to interact with profiles stored
 * in MongoDB
 */
 class FollowingCollection {
    /**
     * Create a profile for a (new) user
     *
     * @param {string} username - The user doing the following 
     * @param {string} following - The user being followed 
     * @return {Promise<HydratedDocument<Following>>} - The newly created following
     */
    static async addOne(username: string, following: string): Promise<HydratedDocument<Following>> {
      const follow = new FollowingModel({ username, following });
      await follow.save();
      return follow;
    }

    /**
     * Find the following between username and following
     *
     * @param {string} username - The username of the following
     * @param {string} following - The following
     * @return {Promise<HydratedDocument<Following>[]>} - An array of all of the freets
     */
     static async findOneByBoth(user: string, following: string): Promise<Array<HydratedDocument<Following>>>  {
        return FollowingModel.find({
            username: user, 
            following: following
        });
    }

    // /**
    //  * Delete a following - user is unfollowing `follower`.
    //  *
    //  * @param {string} username - The username of the following
    //  * @param {string} following - The following
    //  * @return {Promise<Boolean>} - true if the following has been deleted, false otherwise
    //  */
    // static async deleteOne(user: string, following: string): Promise<boolean> {
    //     const freet = await FreetModel.deleteOne({_id: freetId});
    //     return freet !== null;
    // }

}

export default FollowingCollection;
