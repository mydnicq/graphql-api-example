import Http from './http/';

(async () => {
	let http = new Http();
	try {
		await http.start();
		console.log('Server started!');
	}
	catch (err) {
		console.log(err);
	}
})();