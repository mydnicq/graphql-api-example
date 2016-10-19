import {path} from 'path';
import {MongoClient} from 'mongodb';
import {loadGqlSchema} from './graphql/loader';
import {Context} from 'contextable';
import {schema as userSchema} from './models/user';
import {schema as restaurantSchema} from './models/restaurant';

/*
* Application context class.
*/

export class ApplicationContext extends Context {

  /*
  * Class constructor.
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

  /*
  * Public properties
  */

  get mongo() {
    return this._mongo;
  }

  get graphqlSchema() {
    return this._graphqlSchema;
  }

  /*
  * Starts context services.
  */

  async start() {
    if (!this._mongo) {
      this._mongo = await MongoClient.connect('mongodb://localhost:27017/test');
    }
    if (!this._graphqlSchema){
      let path = require('path').resolve(__dirname, './**/*.graphql');
      this._graphqlSchema = await loadGqlSchema(path);
    }
    return this;
  }

  /*
  * Stops context services.
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

}
