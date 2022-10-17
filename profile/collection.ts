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
    let listFreets = new Set<Freet>();
    let listFollowers = new Set<User>();
    let listFollowing = new Set<User>();
    const user_profile = new ProfileModel({user, picture, bio, listFreets, listFollowers, listFollowing});
    await user_profile.save(); // Saves user_profile to MongoDB

    return user_profile;
  }

  /**
   * Update a picture with the new picture
   *
   * @param {string} user - The username of the profile to be updated
   * @param {string} newPicture - The new content of the freet
   * @return {Promise<HydratedDocument<Profile>>} - The newly updated freet
   */
   static async updatePicture(user: string, newPicture: string): Promise<HydratedDocument<Profile>> {
    const profile = await ProfileModel.findOne({user: user});
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
   static async updateBio(user: string, newBio: string): Promise<HydratedDocument<Profile>> {
    const profile = await ProfileModel.findOne({user: user});
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
   static async deleteOne(user: string): Promise<boolean> {
    const profile = await ProfileModel.deleteOne({user: user});
    return profile !== null;
  }

  
}

export default ProfileCollection;
