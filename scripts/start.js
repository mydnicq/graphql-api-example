const { HTTP } = require('../src');

(async() => {
  let http = new HTTP();
  try {
    await http.start();
    console.log(`Server started at port ${http.config.port}!`);
  } catch (err) {
    console.log(err);
  }
})();
