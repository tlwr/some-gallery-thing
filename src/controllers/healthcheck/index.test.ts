import request from 'supertest';

import {app} from '../../app'


describe('healthcheck', () => {
  it('should return 200 OK', async () => {
    await request(app).get('/healthcheck').expect(200);
  });
});
