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

    it('should collect events from The Photographers Gallery', async () => {
      const events = await collectors.ThePhotographersGallery();

      console.info(events);

      expect(events.length).toBeGreaterThan(0);
    });

    it.skip('should collect events from White Cube', async () => {
      const events = await collectors.WhiteCube();

      console.info(events);

      expect(events.length).toBeGreaterThan(0);
    });

    it('should expire the collect events from White Cube test', async () => {
      expect(
        new Date().getTime(),
      ).toBeLessThan(
        new Date(2020, 2, 14).getTime(),
      );
    });

    it('should collect events from Whitechapel Gallery', async () => {
      const events = await collectors.WhitechapelGallery();

      console.info(events);

      expect(events.length).toBeGreaterThan(0);
    });
  });
});
