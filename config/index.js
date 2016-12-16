/* eslint-disable max-len */
exports.env = process.env.NODE_ENV || process.env.npm_package_config_env;
exports.httpPort = process.env.HTTP_PORT || process.env.npm_package_config_httpPort;
exports.httpHost = process.env.HTTP_HOST || process.env.npm_package_config_httpHost;
exports.mongoUrl = process.env.MONGO_URL || process.env.npm_package_config_mongoUrl;
// Access-Control-Allow-Origin CORS header can be string to restrict allowed origin (i.e. http://localhost:4444)
// or true/false to completely enable/disable CORS
exports.allowOrigin = process.env.ALLOW_ORIGIN || process.env.npm_package_config_allowOrigin;
