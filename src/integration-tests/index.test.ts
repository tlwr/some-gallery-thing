import collectors from '../collectors';

describe('integration-tests', () => {
  describe('collectors', () => {
    it('should collect events from Dulwich Picture Gallery', async () => {
      const events = await collectors.DulwichPictureGallery();

      console.info(events);

      expect(events.length).toBeGreaterThan(0);
    });
  });
});
