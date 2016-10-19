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

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Http {
	constructor() {
		this.config = Object.assign({}, _config2.default);
		this.server = null;
	}

	start() {
		var _this = this;

		return _asyncToGenerator(function* () {
			let { port } = _this.config;

			// initializing and starting application context
			let appCtx = new _context.ApplicationContext();
			yield appCtx.start();

			_this.server = new _koa2.default();
			_this.server.use((() => {
				var _ref = _asyncToGenerator(function* (ctx, next) {
					console.log(ctx.method, ctx.url);
					ctx.appCtx = appCtx;
					yield next();
				});

				return function (_x, _x2) {
					return _ref.apply(this, arguments);
				};
			})()).use((0, _koaBodyparser2.default)()).use(_router2.default.routes()).use(_router2.default.allowedMethods());
			return _this.server.listen({ port: port });
		})();
	}
}

exports.default = Http;