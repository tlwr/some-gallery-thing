import express from 'express';

export const healthcheck = (
  _req: express.Request,
  res: express.Response,
) => {
  res
    .status(200)
    .send('OK')
  ;
};
