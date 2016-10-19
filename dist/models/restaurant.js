'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.schema = exports.instanceMethods = exports.classMethods = exports.fields = undefined;

var _contextable = require('contextable');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
		type: 'String'
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
			let model = new _this2.Model(input);
			try {
				yield model.validate();
				yield _this2.ctx.mongo.collection('restaurants').insertOne(model);
			} catch (e) {
				throw yield model.handle(e);
			}
			return model;
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