const MongoClient = require('mongodb');
const { loadGqlSchema } = require('./graphql/loader');
const { Context } = require('contextable');
const userSchema = require('./models/user').schema;
const restaurantSchema = require('./models/restaurant').schema;

/**
 * Application context class.
 */
exports.ApplicationContext = class ApplicationContext extends Context {

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
    this.defineModel('User', userSchema);
    this.defineModel('Restaurant', restaurantSchema);
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
  async start() {
    if (!this._mongo) {
      this._mongo = await MongoClient.connect('mongodb://localhost:27017/test');
    }
    if (!this._graphqlSchema) {
      let path = require('path').resolve(__dirname, './**/*.graphql');
      this._graphqlSchema = await loadGqlSchema(path);
    }
    return this;
  }

  /**
   * Stops context services.
   * @return {Object}
   */
  async stop() {
    if (this._mongo) {
      this._mongo.close();
      this._mongo = null;
    }
    if (this._graphqlSchema) {
      this._graphqlSchema = null;
    }
    return this;
  }

};
