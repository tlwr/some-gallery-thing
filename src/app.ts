import express from 'express';
import bodyParser from 'body-parser';
import prometheus from 'express-prom-bundle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires
const pino: any = require('express-pino-logger');

import mainCSS from './css/main.scss';

import {healthcheck} from './controllers/healthcheck';
import {listEvents} from './controllers/events';

export const app = express();

app.set("port", process.env.PORT || 8080);

// istanbul ignore next
{
  if (process.env.NODE_ENV === 'development') {
    app.use(pino({
      prettyPrint: {
        colorize: true,
        levelFirst: false,
      },
    }));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(pino());
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(prometheus({ includeMethod: true }));

app.get('/assets/main.css', (_req: express.Request, res: express.Response) => {
  res.contentType('text/css');
  res.send(mainCSS);
});

app.get('/healthcheck', healthcheck);
app.get('/events', listEvents);

app.get('/', (_req: express.Request, res: express.Response) => {
  res.redirect('/events');
});
