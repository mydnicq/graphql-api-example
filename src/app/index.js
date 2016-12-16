const { isFunction } = require('typeable');
const { Context } = require('contextable');
const { loadGqlFiles } = require('../lib/graphqlFileLoader');
const userSchema = require('./models/user/user');
const restaurantSchema = require('./models/restaurant/restaurant');

/**
 * Application context class.
 */
exports.APP = class App extends Context {

  constructor({ mongo } = {}) {
    super();

    this.mongo = mongo;
    this.graphqlTypeDefs = null;
    this.graphqlResolvers = {};
  }

  async start() {
    // attaching models
    this.defineModel('User', userSchema);
    this.defineModel('Restaurant', restaurantSchema);

    // Load all graphql files
    let path = require('path').resolve(__dirname, '../**/*.graphql');
    this.graphqlTypeDefs = await loadGqlFiles(path);

    this.createResolvers();
  }

  /**
   * Creates resolvers from all classMethods of each Contextable Model
   */
  createResolvers() {
    ['User', 'Restaurant'].forEach((v) => {
      let obj = Object.getOwnPropertyDescriptors(this[v]);
      for (let name in obj) {
        if (this.graphqlResolvers.hasOwnProperty(name)) {
          /* eslint-disable max-len */
          throw new Error(`Resolver function "${name}" from "${v}" model was already set.`);
        }
        if (isFunction(obj[name].value)) {
          Object.defineProperty(this.graphqlResolvers, name, {
            value: obj[name].value,
            enumerable: true,
          });
        }
      }
    });
  }

};
