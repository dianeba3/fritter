import type {HydratedDocument, Types} from 'mongoose';
import type { Interaction } from "./model";
import InteractionModel from './model';

/**
 * This files contains a class that has the functionality to explore interactions
 * stored in MongoDB, including adding, finding, updating, and deleting interactions.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Interaction> is the output of the InteractionModel() constructor,
 * and contains all the information in Interaction. https://mongoosejs.com/docs/typescript.html
 */

 class InteractionCollection {
    /**
     * Add a freet to the collection
     *
     * @param {string} authorId - The id of the author of the interaction
     * @param {string} type - The type of interaction
     * @param {string} freetId - The id of the freet of the interaction
     * @param {string} content - The content of the interaction - nonempty if 'reply'
     * @return {Promise<HydratedDocument<Interaction>>} - The newly created interaction
     */
    static async addOne(authorId: Types.ObjectId | string, type: string, freetId: string, content: string): Promise<HydratedDocument<Interaction>> {
      const interaction = new InteractionModel({authorId, type, freetId, content});
  
      await interaction.save(); // Saves interaction to MongoDB
      return interaction.populate('authorId');
    }
}

export default InteractionCollection;
