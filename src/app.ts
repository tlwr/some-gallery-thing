import express from 'express';
import nunjucks from 'nunjucks'
import bodyParser from 'body-parser';
import path from 'path';
import prometheus from 'express-prom-bundle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires
const pino: any = require('express-pino-logger');

import {healthcheck} from './controllers/healthcheck';
import {listEvents} from './controllers/events';

// istanbul ignore next
// Do not cache assets during development
const maxAge = process.env.NODE_ENV === 'production' ? '15m' : 0;

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

nunjucks.configure(
  path.join(__dirname, '..', 'views'),
  {
    autoescape: true,
    express: app,
    noCache: process.env.NODE_ENV !== 'production',
  },
);

app.use(
  express.static(
    path.join(__dirname, 'public'),
    { maxAge },
  )
);

app.use(
  express.static(
    path.join(__dirname, '..', 'node_modules', 'tachyons'),
    { maxAge },
  )
);

app.get('/healthcheck', healthcheck);
app.get('/events', listEvents);

app.get('/', (_req: express.Request, res: express.Response) => {
  res.redirect('/events');
});
