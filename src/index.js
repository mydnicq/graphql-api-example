import Http from './http/';

(async() => {
  let http = new Http();
  try {
    await http.start();
    console.log(`Server started at port ${http.config.port}!`);
  } catch (err) {
    console.log(err);
  }
})();
