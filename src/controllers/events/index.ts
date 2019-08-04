import express from 'express';

import {exampleEvents} from '../../data/events';

export const listEvents = (
  _req: express.Request,
  res: express.Response,
) => {
  res.render('events/list.njk', {
    events: exampleEvents,
  })
};
