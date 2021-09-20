import express from 'express';
import { Request, Response } from "node-fetch";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires
const pino: any = require('express-pino-logger');

import {AppController} from './controllers/app';
import collectors from './collectors';
import {isProduction} from './utils';

export const app = express();

app.set("port", process.env.PORT || 8080);
app.use(pino());

const collector = isProduction()
  ? /* istanbul ignore next */collectors.All
  : collectors.Stub;

const appController = new AppController(collector);

app.get('/*', async (req: express.Request, res: express.Response) => {
  const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;

  const response = await appController.handle(new Request(fullURL));

  for (const header in response.headers.raw()) {
    res.set(header, response.headers.get(header));
  }
  res.set('Cache-Control', 'no-cache');

  res.status(response.status)

  res.send(await response.text());
});
