'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.schema = exports.instanceMethods = exports.classMethods = exports.fields = undefined;

var _contextable = require('contextable');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const addressSchema = new _contextable.Schema({
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

const fields = exports.fields = {
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

const classMethods = exports.classMethods = {

	count() {
		var _this = this;

		return _asyncToGenerator(function* () {
			return yield _this.ctx.mongo.collection('restaurants').count();
		})();
	},

	create(input = {}) {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			let restaurant = new _this2.Model(input);
			let errors = null;

			try {
				yield restaurant.validate();
				yield _this2.ctx.mongo.collection('restaurants').insertOne(restaurant);
			} catch (e) {
				errors = yield restaurant.handle(e);
				errors = errors.toArray();
				restaurant = null;
			}
			return { restaurant, errors };
		})();
	}

};

const instanceMethods = exports.instanceMethods = {};

/*
* Model's schema.
*/

const schema = exports.schema = new _contextable.Schema({
	fields,
	classMethods,
	instanceMethods
});