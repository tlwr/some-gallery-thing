import collectors from '../collectors';

describe('integration-tests', () => {
  describe('collectors', () => {
    it('should collect some events', async () => {
      const events = await collectors.All.collect();

      console.info(events);

      expect(events.length).toBeGreaterThan(8);
    });
  });
});
