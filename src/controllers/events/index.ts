import express from 'express';

export const listEvents = (
  _req: express.Request,
  res: express.Response,
) => {
  res.render('events/list.njk', {
    events: [],
  })
};
