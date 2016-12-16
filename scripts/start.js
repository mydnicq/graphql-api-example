const config = require('../config');
const { connectToMongo } = require('../src/lib/mongodb');
const { APP, HTTP } = require('../src');

(async() => {
  let mongo = await connectToMongo(config.mongoUrl);
  console.log('Mongo connection established!');
  let app = new APP({ mongo });
  await app.start();

  let http = new HTTP({ config, app });
  await http.start();
  console.log(`Server started at port ${config.httpPort}!`);
})()
.catch((err) => {
  console.error('ERROR:', err);
});
