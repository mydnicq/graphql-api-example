const { ObjectId } = require('mongodb');
const { Schema } = require('contextable');

/*
 * User model schema.
 */

module.exports = new Schema({

  /*
   * Custom data types.
   */

  types: {
    ObjectId(value) {
      return new ObjectId(value);
    }, // we use mongodb
  },

  /*
   * Model fields.
   */

  fields: {
    _id: {
      type: 'ObjectId',
    },
    name: {
      type: 'String',
      validate: [{
        validator: 'presence',
        message: 'is required',
      }],
    },
    email: {
      type: 'String',
      validate: [{
        validator: 'presence',
        message: 'is required',
      }],
    },
    restaurant_ids: {
      type: 'Array',
    },
  },

  /*
   * Instance methods.
   */

  instanceMethods: {

    /*
     * Create new or updates existing user in a database.
     */

    async save() {
      let collection = this.$context.mongo.collection('users');

      try {
        await this.validate();
        if (this._id) {
          await collection.updateOne({ _id: this._id }, this, { upsert: true });
        } else {
          await collection.insertOne(this);
        }
        return true;
      } catch (e) {
        await this.handle(e);
        return false;
      }
    },

  },

  /*
   * Class methods.
   */

  classMethods: {

    /*
     * Returns a list of users.
     */

    async getUsers({ skip = 0, limit = 100 } = {}) {
      let collection = this.$context.mongo.collection('users');

      if (skip < 0) skip = 0;
      if (limit > 100) limit = 100;

      return await collection.find().limit(limit).skip(skip).toArray();
    },

    async createUser({ input }) {
      let { User } = this.$context;
      let user = new User(input);
      await user.save();
      return user;
    },
  },
});
