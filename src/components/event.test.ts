import moment from 'moment';

import {link, niceCloseDate} from './event';

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

  describe('niceCloseDate', () => {
    const today = moment();
    const tomorrow = moment().add(1, 'days');
    const thisWeek = moment().add(4, 'days');
    const nextWeek = moment().add(8, 'days');


    it('should return today', () => {
      const until = niceCloseDate(today.toDate());
      expect(until).toBe('until today');
    });

    it('should return tomorrow', () => {
      const until = niceCloseDate(tomorrow.toDate());
      expect(until).toBe('until tomorrow');
    });

    it('should return the day of the week', () => {
      const until = niceCloseDate(thisWeek.toDate());
      expect(until).toBe(
        `until ${thisWeek.format('dddd')}`.toLowerCase(),
      );
    });

    it('should return the day of the week and the date', () => {
      const until = niceCloseDate(nextWeek.toDate());

      expect(until).toBe(
        `until ${nextWeek.format('D MMM YYYY')}`.toLowerCase(),
      );
    });
  });
});
