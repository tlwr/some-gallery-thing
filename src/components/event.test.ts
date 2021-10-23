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

  ['london', 'amsterdam'].forEach(city => {
    const untilToday = {
      london: 'until today',
      amsterdam: 't/m vandaag',
    }[city];

    const untilTomorrow = {
      london: 'until tomorrow',
      amsterdam: 't/m morgen',
    }[city];

    const u = {
      london: 'until',
      amsterdam: 't/m',
    }[city];

    const locale = {
      london: 'en-gb',
      amsterdam: 'nl',
    }[city];

    describe('niceCloseDate', () => {
      const today = moment();
      const tomorrow = moment().locale(locale).add(1, 'days');
      const thisWeek = moment().locale(locale).add(4, 'days');
      const nextWeek = moment().locale(locale).add(8, 'days');

      it('should return today', () => {
        const until = niceCloseDate(today.toDate(), city);
        expect(until).toBe(untilToday);
      });

      it('should return tomorrow', () => {
        const until = niceCloseDate(tomorrow.toDate(), city);
        expect(until).toBe(untilTomorrow);
      });

      it('should return the day of the week', () => {
        const until = niceCloseDate(thisWeek.toDate(), city);
        expect(until).toBe(
          `${u} ${thisWeek.format('dddd')}`.toLowerCase(),
        );
      });

      it('should return the day of the week and the date', () => {
        const until = niceCloseDate(nextWeek.toDate(), city);

        expect(until).toBe(
          `${u} ${nextWeek.format('D MMM YYYY')}`.toLowerCase(),
        );
      });
    });
  });
});
