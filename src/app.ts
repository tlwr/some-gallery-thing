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

const londonCollector = isProduction()
  ? /* istanbul ignore next */collectors.London
  : collectors.Stub;

const amsterdamCollector = isProduction()
  ? /* istanbul ignore next */collectors.Amsterdam
  : collectors.Stub;

const assetsController = new AssetsController();
const londonEventsController = new EventsController('london', londonCollector);
const amsterdamEventsController = new EventsController('amsterdam', amsterdamCollector);

app.get('/*', async (req: express.Request, res: express.Response) => {
  const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;

  const request = new Request(fullURL);
  let response : Response;

  switch(new URI(req.url).pathname()) {
    case '/assets/main.css':
      response = await assetsController.handleCSS(request);
      break;

    case '/events':
      response = new Response('', {status: 302, headers: { 'Location': '/london' }});
      break;

    case '/london':
      response = await londonEventsController.handleListEvents(request);
      break;

    case '/amsterdam':
      response = await amsterdamEventsController.handleListEvents(request);
      break;

    default:
      response = new Response('', {status: 302, headers: { 'Location': '/london' }});
  }

  for (const header in response.headers.raw()) {
    res.set(header, response.headers.get(header));
  }
  res.set('Cache-Control', 'no-cache');

  res.status(response.status)

  res.send(await response.text());
});
