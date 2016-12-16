const { parse, buildASTSchema, extendSchema, Kind } = require('graphql');

/**
 * Builds Graphql schema with
 * support for extending type definitions
 */
module.exports = function(typeDefs) {
  let astDocument = parse(typeDefs);
  let schema = buildASTSchema(astDocument);

  let extensionsAst = extractExtensionDefinitions(astDocument);
  if (extensionsAst.definitions.length > 0) {
    schema = extendSchema(schema, extensionsAst);
  }

  return schema;
};

function extractExtensionDefinitions(ast) {
  const extensionDefs =
    /* eslint-disable max-len*/
    ast.definitions.filter((def) => def.kind === Kind.TYPE_EXTENSION_DEFINITION);

  return Object.assign({}, ast, {
    definitions: extensionDefs,
  });
}
