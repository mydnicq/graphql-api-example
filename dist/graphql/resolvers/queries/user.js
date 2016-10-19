'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  userResolvers: {
    Query: {
      user(root, { name }, ctx) {
        return _asyncToGenerator(function* () {
          return yield ctx.appCtx.mongo.collection('users').findOne({ name: name });
        })();
      },
      users(root, args, ctx) {
        return _asyncToGenerator(function* () {
          return yield ctx.appCtx.mongo.collection('users').find().toArray();
        })();
      },
      usersCount(root, args, ctx) {
        return _asyncToGenerator(function* () {
          let User = ctx.appCtx.getModel('User');
          return yield User.count();
        })();
      }
    },
    User: {
      restaurants({ restaurant_ids }, args, ctx) {
        return _asyncToGenerator(function* () {
          if (restaurant_ids) return yield ctx.appCtx.mongo.collection('restaurants').find({ restaurant_id: { $in: restaurant_ids } }).toArray();
        })();
      }
    }
  }
};