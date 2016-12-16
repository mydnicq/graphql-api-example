const { graphqlExpress } = require('graphql-server-express');
const buildSchema = require('../../lib/graphqlBuildSchema');

/*
 * Returns a GraphQL middleware.
 */
exports.graphqlServer = function({ app }) {
  let graphqlSchema = buildSchema(app.graphqlTypeDefs);

  return graphqlExpress({
    schema: graphqlSchema,
    rootValue: app.graphqlResolvers,
  });
};
