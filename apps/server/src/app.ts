import { listen } from '@colyseus/tools';
import config from './app.config';

const port = Number(process.env.PORT) || 8080;
void listen(config, port);
