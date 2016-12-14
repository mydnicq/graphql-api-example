const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { queryResolvers } = require('./graphql/resolvers/queries/');
const { mutationResolvers } = require('./graphql/resolvers/mutations/');
const { makeExecutableSchema } = require('graphql-tools');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/graphql', graphqlExpress(graphql));
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

/**
 * @param  {Object}  req
 * @param  {Object}  res
 * @return {Object}
 */
async function graphql(req, res) {
  let Resolvers = Object.assign({}, queryResolvers, mutationResolvers);
  let graphqlSchema = makeExecutableSchema({
    typeDefs: res.appCtx.graphqlSchema,
    resolvers: Resolvers,
  });
  return {
    schema: graphqlSchema,
    context: res,
  };
}

exports.router = router;
