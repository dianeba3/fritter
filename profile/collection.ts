import { Freet } from 'freet/model';
import type {HydratedDocument, Types} from 'mongoose';
import { User } from 'user/model';
import type {Profile} from './model';
import ProfileModel from './model';

/**
 * This file contains a class with functionality to interact with profiles stored
 * in MongoDB
 */
class ProfileCollection {
  /**
   * Create a profile for a (new) user
   *
   * @param {string} user - The username of the user
   * @param {string} picture - The profile picture
   * @param {string} bio - The user bio
   * @return {Promise<HydratedDocument<Profile>>} - The newly created user
   */
  static async addOne(user: string, picture: string, bio: string): Promise<HydratedDocument<Profile>> {
    // let listFreets = new Set<Freet>();
    const user_profile = new ProfileModel({user, picture, bio});
    await user_profile.save(); // Saves user_profile to MongoDB
    return user_profile;
  }

  // need to complete after interactions are done
  // /**
  //  * Find all liked Freets by a user by username (case insensitive).
  //  *
  //  * @param {string} username - The username of the user to find liked freets by
  //  * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
  //  */
  //  static async findOneByUsername(username: string): Promise<HydratedDocument<User>> {
  //   return UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
  // }

  /**
   * Update a picture with the new picture
   *
   * @param {string} user - The username of the profile to be updated
   * @param {string} newPicture - The new content of the freet
   * @return {Promise<HydratedDocument<Profile>>} - The newly updated freet
   */
   static async updatePicture(userId: Types.ObjectId | string, newPicture: string): Promise<HydratedDocument<Profile>> {
    const profile = await ProfileModel.findOne({user: userId});
    profile.picture = newPicture;
    await profile.save();
    return profile;
  }

  /**
   * Update a bio with the new bio
   *
   * @param {string} user - The username of the profile to be updated
   * @param {string} newBio - The new content of the freet
   * @return {Promise<HydratedDocument<Profile>>} - The newly updated freet
   */
   static async updateBio(userId: Types.ObjectId | string, newBio: string): Promise<HydratedDocument<Profile>> {
    const profile = await ProfileModel.findOne({user: userId});
    profile.bio = newBio;
    await profile.save();
    return profile;
  }

  /**
   * Delete a profile from the collection.
   *
   * @param {string} user - The user profile to delete
   * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
   */
   static async deleteOne(userId: Types.ObjectId | string): Promise<boolean> {
    const profile = await ProfileModel.deleteOne({user: userId});
    return profile !== null;
  }

  
}

export default ProfileCollection;
