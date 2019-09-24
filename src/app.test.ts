import request from 'supertest';

import {app} from './app';

describe('app', () => {
  it('should redirect / to /events', async () => {
    await request(app)
      .get('/')
      .expect(302)
      .expect('Location', /\/events/)
    ;
  });

  it('should serve Prometheus metrics on /metrics', async () => {
    await request(app)
      .get('/metrics')
      .expect(200)
      .expect(/TYPE up gauge/)
    ;
  });

  it('should serve css on /assets/main.css', async () => {
    await request(app)
      .get('/assets/main.css')
      .expect(200)
      .expect('Content-Type', /text.css/)
    ;
  });
});
