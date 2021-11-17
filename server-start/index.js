import { createServer } from './server.js';

const server = createServer();

server.listen().then(({ url }) => console.log('server ready at ' + url));
