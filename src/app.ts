import express from 'express';
import nunjucks from 'nunjucks'
import bodyParser from 'body-parser';
import path from 'path';

import {healthcheck} from './controllers/healthcheck';
import {listEvents} from './controllers/events';

export const app = express();

app.set("port", process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.info(path.join(__dirname, 'views'));

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
    {
      maxAge: 60 * 60 * 24,
    },
  )
);

app.use(
  express.static(
    path.join(__dirname, '..', 'node_modules', 'tachyons'),
    {
      maxAge: 60 * 60 * 24,
    },
  )
);

app.get('/healthcheck', healthcheck);
app.get('/events', listEvents);

app.get('/', (_req: express.Request, res: express.Response) => {
  res.redirect('/events');
});
