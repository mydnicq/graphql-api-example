import {Schema} from 'contextable';

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
		type: 'String'
	}
};

export const classMethods = {

  async count() {
		return await this.ctx.mongo.collection('restaurants').count();
  },

	async create(input={}) {
		let model = new this.Model(input);
		try {
			await model.validate();
			await this.ctx.mongo.collection('restaurants').insertOne(model);
		}
		catch(e){
			throw await model.handle(e);
		}
		return model;
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
