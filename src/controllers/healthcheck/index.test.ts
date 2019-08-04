import request from 'supertest';
import express from 'express';

import {healthcheck} from './';

describe('healthcheck', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.get('/', healthcheck);
  });

  it('should return 200 OK', async () => {
    await request(app).get('/').expect(200);
  });
});
