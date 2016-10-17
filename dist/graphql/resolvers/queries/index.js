'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const queryResolvers = {
  Query: {
    user(root, { name }, ctx) {
      return _asyncToGenerator(function* () {
        let collection = ctx.http.db.collection('users');
        return yield collection.findOne({ name: name });
      })();
    },
    users(root, args, ctx) {
      return _asyncToGenerator(function* () {
        let collection = ctx.http.db.collection('users');
        return yield collection.find().toArray();
      })();
    }
  }
};

const allResolvers = Object.assign({}, queryResolvers, _user2.default);

exports.default = allResolvers;