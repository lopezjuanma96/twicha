process.env.ROOT_DIR = __dirname;

import express from 'express';
import { Server as HttpServer } from 'http';

import { createSocket } from './controllers/socket';
import {router as posterRouter} from './routes/poster';
import {router as showerRouter} from './routes/shower';

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/', express.static(__dirname + '/../public'))

app.use('/post', posterRouter)
app.use('/show', showerRouter)

const server: HttpServer = createSocket(app);

server.listen(PORT, ()=>console.log('server listening on port', PORT))