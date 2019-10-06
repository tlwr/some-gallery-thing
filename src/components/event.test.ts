import {link} from './event';

describe('GalleyEventComponent', () => {
  describe('link', () => {
    it('should return the event website if specified', () => {
      const l = link('gal', 'event');
      expect(l).toBe('event');
    });

    it('should fallback to the gallery website', () => {
      const l = link('gal', undefined);
      expect(l).toBe('gal');
    });
  });
});
