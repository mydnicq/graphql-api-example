const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlServer } = require('./middlewares/graphql');

/**
 * Http server module
 */
exports.HTTP = class HTTP {

  constructor({ config, app }) {
    this.config = config;
    this.app = app;
    this.server = null;
  }

  /*
   * Returns a promise which starts the server.
   */
  async start() {
    if (this.server) return this;

    this.server = express();
    this.server
      .use(cors({ origin: this.config.allowOrigin }))
      .use(bodyParser.json())
      .use(graphqlServer(this));

    await new Promise((resolve) => {
      let { httpPort, httpHost } = this.config;
      this.server = this.server.listen(httpPort, httpHost, resolve);
    });
  };
};
