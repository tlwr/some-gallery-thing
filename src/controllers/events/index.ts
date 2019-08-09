import express from 'express';

import {exampleEvents} from '../../data/events';
import collectors from '../../collectors';

import {isProduction} from '../../utils';

export const listEvents = async (
  _req: express.Request,
  res: express.Response,
) => {

  const events = isProduction()
    ? await collectors.All()
    : await collectors.Stub();

  res.render('events/list.njk', {
    events,
  });
};
