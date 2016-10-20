import {Schema} from 'contextable';

const addressSchema = new Schema({
	fields: {
		building: {
			type: 'String'
		},
		coord: {
			type: ['Float'],
			validate: {
				presence: {
					message: 'is required'
				}
			}
		},
		street: {
			type: 'String',
			validate: {
				presence: {
					message: 'is required'
				}
			}
		},
		zipcode: {
			type: 'String'
		}
	}
});

export const fields = {
	borough: {
		type: 'String'
	},
	cuisine: {
		type: 'String'
	},
	name: {
		type: 'String',
		validate: {
			presence: {
				message: 'is required'
			}
		}
	},
	restaurant_id: {
		type: 'String',
		validate: {
			absence: {
				message: 'is required'
			}
		}
	},
	address: {
		type: addressSchema
	}
};

export const classMethods = {

  async count() {
		return await this.ctx.mongo.collection('restaurants').count();
  },

	async create(input={}) {
		let restaurant = new this.Model(input);
		let errors = null;

		try {
			await restaurant.validate();
			await this.ctx.mongo.collection('restaurants').insertOne(restaurant);
		}
		catch(e){
			errors = await restaurant.handle(e);
			errors = errors.toArray();
			restaurant = null;
		}
		return {restaurant, errors};
	}

};

export const instanceMethods = {

};

/*
* Model's schema.
*/

export const schema = new Schema({
  fields,
  classMethods,
  instanceMethods
});
