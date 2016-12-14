const { Schema } = require('contextable');

const fields = {
  name: {
    type: 'String',
    validate: {
      presence: {
        message: 'is required',
      },
    },
  },
  email: {
    type: 'String',
    validate: {
      presence: {
        message: 'is required',
      },
    },
  },
  restaurant_ids: {
    type: 'Array',
  },
};

const classMethods = {

  async count() {
    return await this.ctx.mongo.collection('users').count();
  },

  async insert(input = {}) {
    let model = new this.Model(input);
    try {
      await model.validate();
      await this.ctx.mongo.collection('users').insertOne(model);
    } catch (e) {
      let handler = await model.handle(e);
      throw handler;
    }
    return model;
  },

};

const instanceMethods = {
  insert: async(v) => {
    let res = await this.ctx.mongo.collection('users').insertOne(this);
    return this.populate(res[0]);
  },
};

/*
 * Model's schema.
 */

exports.schema = new Schema({
  fields,
  classMethods,
  instanceMethods,
});
