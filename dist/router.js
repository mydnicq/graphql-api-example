'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * [graphql description]
 * @param  {Object}  req
 * @param  {Object}  res
 * @return {Object}
 */
let graphql = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    let Resolvers = Object.assign({}, _queries2.default, _mutations2.default);
    let graphqlSchema = (0, _graphqlTools.makeExecutableSchema)({
      typeDefs: res.appCtx.graphqlSchema,
      resolvers: Resolvers
    });
    return {
      schema: graphqlSchema,
      context: res
    };
  });

  return function graphql(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _graphqlServerExpress = require('graphql-server-express');

var _queries = require('./graphql/resolvers/queries/');

var _queries2 = _interopRequireDefault(_queries);

var _mutations = require('./graphql/resolvers/mutations/');

var _mutations2 = _interopRequireDefault(_mutations);

var _graphqlTools = require('graphql-tools');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import KoaRouter from 'koa-router';


const router = _express2.default.Router(); // eslint-disable-line new-cap

router.use('/graphql', (0, _graphqlServerExpress.graphqlExpress)(graphql));
router.get('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));exports.default = router;