'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const mutationResolvers = {
  Mutation: {
    createUser(root, { input }, ctx) {
      return _asyncToGenerator(function* () {
        let collection = ctx.http.db.collection('users');
        let result = yield collection.insertOne(input);
        return yield collection.findOne({ '_id': result.insertedId });
      })();
    }
  }
};

const allResolvers = Object.assign({}, mutationResolvers);

exports.default = allResolvers;