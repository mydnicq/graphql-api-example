import {Schema} from 'contextable';

export const fields = {
	name: {
		type: 'String',
		validate: {
			presence: {
				message: 'is required'
			}
		}
	},
	email: {
		type: 'String',
		validate: {
			presence: {
				message: 'is required'
			}
		}
	}
};

export const classMethods = {

  async count() {
		return await this.ctx.mongo.collection('users').count();
  },

	async insert(input={}) {
    let model = new this.Model(input);
		try {
      await model.validate();
      await this.ctx.mongo.collection('users').insertOne(model);
    } catch(e) {
      throw await model.handle(e);
    }
    return model;
  }

};

export const instanceMethods = {
	insert: async (v) => {
		let res = await this.ctx.mongo.collection('users').insertOne(this);
		return this.populate(res[0]);
	}
};

/*
* Model's schema.
*/

export const schema = new Schema({
  fields,
  classMethods,
  instanceMethods
});
