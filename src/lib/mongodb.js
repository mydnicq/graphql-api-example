const { MongoClient, ObjectId } = require('mongodb');

/*
 * Exposing BSON ObjectId.
 */
exports.ObjectId = ObjectId;

/*
 * Creates a new MongoDB connection.
 */
exports.connectToMongo = async function(url) {
  return await MongoClient.connect(url);
};
