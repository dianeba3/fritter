import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';

/**
 * This file defines the properties stored in a Profile
 */

// Type definition for Profile on the backend
export type Profile = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  username: User;
  picture: string; // for now - need to find type for image
  bio: string;
  // listFreets: Set<Freet>;
  // listLikes: Set<Freet>;

};

// Mongoose schema definition for interfacing with a MongoDB table
// Profile stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ProfileSchema = new Schema({
  // The user the profile belongs to
  user: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // the profile picture
  picture: {
    type: String,
    required: true,
  },
  // the profile bio
  bio: {
    type: String,
    required: true,
  },
  // // the list of freets associated with the user profile
  // listFreets: {
  //   type: Set,
  //   required: true,
  // },
  // // the list of liked freets
  // listLikes: {
  //   type: Set,
  //   required: true,
  // },
  
});

const ProfileModel = model<Profile>('Profile', ProfileSchema);
export default ProfileModel;
