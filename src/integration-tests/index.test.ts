import collectors from '../collectors';

describe('integration-tests', () => {
  describe('london', () => {
    it('should collect some events', async () => {
      const events = await collectors.London.collect();

      console.info(events);

      expect(events.length).toBeGreaterThan(5);
    });
  });

  describe('amsterdam', () => {
    it('should collect some events', async () => {
      const events = await collectors.Amsterdam.collect();

      console.info(events);

      expect(events.length).toBeGreaterThan(5);
    });
  });
});
