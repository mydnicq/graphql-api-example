// import KoaRouter from 'koa-router';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import queryResolvers from './graphql/resolvers/queries/';
import mutationResolvers from './graphql/resolvers/mutations/';
import { makeExecutableSchema } from 'graphql-tools';
import Express from 'express';

const router = Express.Router(); // eslint-disable-line new-cap

router.use('/graphql', graphqlExpress(graphql));
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

/**
 * [graphql description]
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

export default router;
