import collectors from '../collectors';

describe('integration-tests', () => {
  describe('collectors', () => {
    it('should collect events from Dulwich Picture Gallery', async () => {
      const events = await collectors.DulwichPictureGallery();

      console.info(events);

      expect(events.length).toBeGreaterThan(0);
    });

    it('should collect events from Tate Modern & Tate Britain', async () => {
      const events = await collectors.Tate();

      console.info(events);

      expect(events.length).toBeGreaterThan(0);

      expect(
        events.filter(e => e.gallery.name.match(/tate modern/i)).length,
      ).toBeGreaterThan(0)

      expect(
        events.filter(e => e.gallery.name.match(/tate britain/i)).length,
      ).toBeGreaterThan(0)
    });

    it('should collect events from White Cube', async () => {
      const events = await collectors.WhiteCube();

      console.info(events);

      expect(events.length).toBeGreaterThan(0);
    });
  });
});
