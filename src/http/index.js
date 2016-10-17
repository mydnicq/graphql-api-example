import config from '../config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from '../router';
import MongoClient from 'mongodb';
import path from 'path';
import loadSchema from '../graphql/loader';

class Http {
	constructor() {
		this.config = Object.assign({}, config);
		this.server = null;
		this.db = null;
		this.graphqlSchema = null;
	}

	async dbConnect() {
		let url = 'mongodb://localhost:27017/test';
		return this.db = await MongoClient(url);
	}

	async loadGraphqlSchema() {
		let path = require('path').resolve(__dirname, '../**/*.graphql')
		return this.graphqlSchema = await loadSchema(path);
	}

	async start() {
		let {port} = this.config;

		await this.dbConnect();

		await this.loadGraphqlSchema();

		this.server = new Koa();
		this.server
			.use(async (ctx, next) => {
				console.log(ctx.method, ctx.url);
				ctx.http = this;
				await next();
			})
			.use(bodyParser())
			.use(router.routes())
			.use(router.allowedMethods());
		return this.server.listen({ port: port });
	}
}

export default Http;