'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationContext = undefined;

var _mongodb = require('mongodb');

var _loader = require('./graphql/loader');

var _contextable = require('contextable');

var _user = require('./models/user');

var _restaurant = require('./models/restaurant');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Application context class.
 */
class ApplicationContext extends _contextable.Context {

  /**
   * Class constructor.
   * @param {Object} attrs
   */
  constructor(attrs) {
    super(attrs);

    // initializing variables
    this._mongo = null;
    this._graphqlSchema = null;
    // attaching models
    this.defineModel('User', _user.schema);
    this.defineModel('Restaurant', _restaurant.schema);
  }

  /**
   * Public properties
   */
  get mongo() {
    return this._mongo;
  }

  /**
   * [graphqlSchema description]
   * @return {Object} Returns graphqlSchema object
   */
  get graphqlSchema() {
    return this._graphqlSchema;
  }

  /**
   * Starts context services.
   * @return {Object}
   */
  start() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this._mongo) {
        _this._mongo = yield _mongodb.MongoClient.connect('mongodb://localhost:27017/test');
      }
      if (!_this._graphqlSchema) {
        let path = require('path').resolve(__dirname, './**/*.graphql');
        _this._graphqlSchema = yield (0, _loader.loadGqlSchema)(path);
      }
      return _this;
    })();
  }

  /**
   * Stops context services.
   * @return {Object}
   */
  stop() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (_this2._mongo) {
        _this2._mongo.close();
        _this2._mongo = null;
      }
      if (_this2._graphqlSchema) {
        _this2._graphqlSchema = null;
      }
      return _this2;
    })();
  }

}
exports.ApplicationContext = ApplicationContext;