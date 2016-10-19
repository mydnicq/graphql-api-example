'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

let graphql = (() => {
	var _ref = _asyncToGenerator(function* (ctx, next) {
		let Resolvers = Object.assign({}, _queries2.default, _mutations2.default);
		let graphqlSchema = (0, _graphqlTools.makeExecutableSchema)({
			typeDefs: ctx.appCtx.graphqlSchema,
			resolvers: Resolvers
		});
		return {
			schema: graphqlSchema,
			context: ctx
		};
	});

	return function graphql(_x, _x2) {
		return _ref.apply(this, arguments);
	};
})();

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _apolloServer = require('apollo-server');

var _queries = require('./graphql/resolvers/queries/');

var _queries2 = _interopRequireDefault(_queries);

var _mutations = require('./graphql/resolvers/mutations/');

var _mutations2 = _interopRequireDefault(_mutations);

var _graphqlTools = require('graphql-tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = (0, _koaRouter2.default)();

router.post('/graphql', (0, _apolloServer.apolloKoa)(graphql));
router.get('/graphiql', (0, _apolloServer.graphiqlKoa)({ endpointURL: '/graphql' }));

exports.default = router;