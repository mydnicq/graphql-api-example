'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _context = require('../context');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import Koa from 'koa';

// import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

/**
 * Http server module
 */
class Http {
  /**
   * Class initializing
   */
  constructor() {
    this.config = Object.assign({}, _config2.default);
    this.server = null;
  }

  /**
   * Return Server instance
   * @return {Object} Server instance
   */
  start() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let { port } = _this.config;

      // initializing and starting application context
      let appCtx = new _context.ApplicationContext();
      yield appCtx.start();

      _this.server = (0, _express2.default)();
      _this.server.use((() => {
        var _ref = _asyncToGenerator(function* (req, res, next) {
          res.appCtx = appCtx;
          yield next();
        });

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      })()).use((0, _cors2.default)({ origin: _this.config.allowOrigin })).use((0, _bodyParser2.default)()).use(_router2.default);
      // .use('/graphql', bodyParser.json(), graphqlExpress(router))
      // .use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
      // .use(router.allowedMethods());
      return _this.server.listen({ port: port });
    })();
  }
}

exports.default = Http;