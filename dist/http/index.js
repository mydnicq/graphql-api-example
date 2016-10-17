'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loader = require('../graphql/loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Http {
	constructor() {
		this.config = Object.assign({}, _config2.default);
		this.server = null;
		this.db = null;
		this.graphqlSchema = null;
	}

	dbConnect() {
		var _this = this;

		return _asyncToGenerator(function* () {
			let url = 'mongodb://localhost:27017/test';
			return _this.db = yield (0, _mongodb2.default)(url);
		})();
	}

	loadGraphqlSchema() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			let path = require('path').resolve(__dirname, '../**/*.graphql');
			return _this2.graphqlSchema = yield (0, _loader2.default)(path);
		})();
	}

	start() {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			let { port } = _this3.config;

			yield _this3.dbConnect();

			yield _this3.loadGraphqlSchema();

			_this3.server = new _koa2.default();
			_this3.server.use((() => {
				var _ref = _asyncToGenerator(function* (ctx, next) {
					console.log(ctx.method, ctx.url);
					ctx.http = _this3;
					yield next();
				});

				return function (_x, _x2) {
					return _ref.apply(this, arguments);
				};
			})()).use((0, _koaBodyparser2.default)()).use(_router2.default.routes()).use(_router2.default.allowedMethods());
			return _this3.server.listen({ port: port });
		})();
	}
}

exports.default = Http;