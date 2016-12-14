import config from '../config';
// import Koa from 'koa';
import bodyParser from 'body-parser';
import router from '../router';
import { ApplicationContext } from '../context';
import cors from 'cors';
// import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import express from 'express';

/**
 * Http server module
 */
class Http {
  /**
   * Class initializing
   */
  constructor() {
    this.config = Object.assign({}, config);
    this.server = null;
  }

  /**
   * Return Server instance
   * @return {Object} Server instance
   */
  async start() {
    let { port } = this.config;

    // initializing and starting application context
    let appCtx = new ApplicationContext();
    await appCtx.start();

    this.server = express();
    this.server
      .use(async(req, res, next) => {
        res.appCtx = appCtx;
        await next();
      })
      .use(cors({ origin: this.config.allowOrigin }))
      .use(bodyParser())
      .use(router);
    // .use('/graphql', bodyParser.json(), graphqlExpress(router))
    // .use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
    // .use(router.allowedMethods());
    return this.server.listen({ port: port });
  }
}

export default Http;
