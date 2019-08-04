import request from 'supertest';

import {app} from '../../app';

describe('events', () => {
  it('should include a title', async () => {
    await request(app)
      .get('/events')
      .expect(200)
      .expect(/Events/)
    ;
  });

  it('should include an event name', async () => {
    await request(app)
      .get('/events')
      .expect(200)
      .expect(/Van Gogh and Britain/)
    ;
  });

  it('should include a gallery name', async () => {
    await request(app)
      .get('/events')
      .expect(200)
      .expect(/Tate Britain/)
    ;
  });
});
