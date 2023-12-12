import fastify from 'fastify'
import mongoose from 'mongoose';
import router from './routes';

const port = 5002;

const startServer = async () => {
  try {
	const server = fastify()

	const errorHandler = (error, address) => {
  		server.log.error(error, address);
	}

	mongoose.connect('mongodb://root:rootpassword@localhost:27017/creatures?authSource=admin', {})
		.then(() => console.log("Connected to the database"))
		.catch((e) => console.error("Error connecting: ", e))

	server.register(router, { prefix: '/api' })

	await server.listen({ port }, errorHandler)
  } catch (e) {
	console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})

startServer()