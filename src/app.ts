import express from 'express';
import bodyParser from 'body-parser';
import prometheus from 'express-prom-bundle';
import { Request, Response } from "node-fetch";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires
const pino: any = require('express-pino-logger');

import {app as appController} from './controllers/app';

export const app = express();

app.set("port", process.env.PORT || 8080);

app.use(pino({
  prettyPrint: {
    colorize: true,
    levelFirst: false,
  },
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(prometheus({ includeMethod: true }));

app.get('/*', async (req: express.Request, res: express.Response) => {
  const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;

  const response = await appController(new Request(fullURL));

  for (const header in response.headers.raw()) {
    res.set(header, response.headers.get(header));
  }
  res.set('Cache-Control', 'no-cache');

  res.status(response.status)

  res.send(await response.text());
});
