import express from 'express';
import URI from 'urijs';
import { Request, Response } from "node-fetch";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires
const pino: any = require('express-pino-logger');

import {AssetsController} from './controllers/assets';
import {EventsController} from './controllers/events';

import collectors from './collectors';
import {isProduction} from './utils';

export const app = express();

app.set("port", process.env.PORT || 8080);
app.use(pino());

const collector = isProduction()
  ? /* istanbul ignore next */collectors.All
  : collectors.Stub;

const assetsController = new AssetsController();
const eventsController = new EventsController(collector);

app.get('/*', async (req: express.Request, res: express.Response) => {
  const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;

  const request = new Request(fullURL);
  let response : Response;

  switch(new URI(req.url).pathname()) {
    case '/assets/main.css':
      response = await assetsController.handleCSS(request);
      break;

    case '/events':
      response = await eventsController.handleListEvents(request);
      break;

    default:
      response = new Response('', {status: 302, headers: { 'Location': '/events' }});
  }

  for (const header in response.headers.raw()) {
    res.set(header, response.headers.get(header));
  }
  res.set('Cache-Control', 'no-cache');

  res.status(response.status)

  res.send(await response.text());
});
