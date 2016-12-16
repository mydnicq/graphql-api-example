const { Schema } = require('contextable');

/**
 * Shema for nested document in main model schema
 */
const addressSchema = new Schema({
  fields: {
    building: {
      type: 'String',
    },
    coord: {
      type: ['Float'],
      validate: {
        presence: {
          message: 'is required',
        },
      },
    },
    street: {
      type: 'String',
      validate: {
        presence: {
          message: 'is required',
        },
      },
    },
    zipcode: {
      type: 'String',
    },
  },
});

/*
 * Model's schema.
 */

module.exports = new Schema({
  fields: {
    borough: {
      type: 'String',
    },
    cuisine: {
      type: 'String',
    },
    name: {
      type: 'String',
      validate: [{
        validator: 'presence',
        message: 'is required',
      }],
    },
    restaurant_id: {
      type: 'String',
    },
    address: {
      type: addressSchema,
    },
  },


  classMethods: {

    async restaurantCount() {
      return await this.$context.mongo.collection('restaurants').count();
    },

    async create(input = {}) {
      let { Restuarant } = this.$context;
      let restaurant = new Restuarant(input);
      let errors = null;

      try {
        await restaurant.validate();
        await this.$context.mongo.collection('restaurants')
          .insertOne(restaurant);
      } catch (e) {
        errors = await restaurant.handle(e);
        errors = errors.toArray();
        restaurant = null;
      }
      return { restaurant, errors };
    },

  },
});
