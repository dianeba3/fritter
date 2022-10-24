import type { HydratedDocument, Types } from "mongoose";
import type { Profile } from "./model";
import ProfileModel from "./model";
import UserCollection from "../user/collection";

/**
 * This file contains a class with functionality to interact with profiles stored
 * in MongoDB
 */
class ProfileCollection {
  /**
   * Create a profile for a (new) user
   *
   * @param {string} userId - The username of the user
   * @param {string} picture - The profile picture
   * @param {string} bio - The user bio
   * @return {Promise<HydratedDocument<Profile>>} - The newly created user
   */
  static async addOne(userId: Types.ObjectId | string, picture: string, bio: string): Promise<HydratedDocument<Profile>> {
    const profile = new ProfileModel({ userId, picture, bio });
    await profile.save(); // Saves user_profile to MongoDB
    return profile.populate('userId');
  }

  /**
   * Find a user by userId (case insensitive).
   *
   * @param {string} userId - The userId of the user to find
   * @return {Promise<HydratedDocument<Profile>> | Promise<null>} - The user with the given userId, if any
   */
  static async findOneByUserID(userId: Types.ObjectId | string): Promise<HydratedDocument<Profile>> {
    const author = await UserCollection.findOneByUserId(userId);
    return ProfileModel.findOne({ userId: author._id }).populate("userId");
  }


  // need to complete after interactions are done
  // /**
  //  * Find all liked Freets by a user by userId (case insensitive).
  //  *
  //  * @param {string} userId - The userId of the user to find liked freets by
  //  * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given userId, if any
  //  */
  //  static async findOneByuserId(userId: string): Promise<HydratedDocument<User>> {
  //   return UserModel.findOne({userId: new RegExp(`^${userId.trim()}$`, 'i')});
  // }


  /**
   * Update a profile with the new bio or picture
   *
   * @param {string} user - The userId of the profile to be updated
   * @param {string} details - The new content of the bio or picture
   * @return {Promise<HydratedDocument<Profile>>} - The newly updated profile
   */
  static async updateOne(userId: Types.ObjectId | string, details: any): Promise<HydratedDocument<Profile>> {
    const profile = await ProfileModel.findOne({ userId: userId }).populate("userId");
    if (details.bio) {
      profile.bio = details.bio as string;
    }

    if (details.picture) {
      profile.picture = details.picture as string;
    }

    await profile.save();
    return profile.populate("userId");
  }

  /**
   * Delete a profile from the collection.
   *
   * @param {string} userId - The user profile to delete
   * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
   */
  static async deleteOne(userId: Types.ObjectId | string): Promise<boolean> {
    const profile = await ProfileModel.deleteOne({ userId: userId });
    return profile !== null;
  }
}

export default ProfileCollection;
