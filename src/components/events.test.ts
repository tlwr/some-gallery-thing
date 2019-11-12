import moment from 'moment';

import {sortEvents} from './events';

describe('GalleryEventsComponent', () => {
  describe('sortEvents', () => {
    it('should sort the events by date', () => {
      const gallery = {
        name: 'my-gallery',
        address: 'somewhere',
        website: 'my-gallery.com',
      };

      const events = [{
        title: 'an event',
        gallery,
        closeDate: new Date(2019, 10, 1),
      }, {
        title: 'an earlier event',
        gallery,
        closeDate: new Date(2019, 9, 1),
      }];

      const sortedEvents = sortEvents(events);

      expect(sortedEvents.length).toBe(2);
      expect(sortedEvents[0].closeDate).toEqual(new Date(2019, 9, 1));
      expect(sortedEvents[1].closeDate).toEqual(new Date(2019, 10, 1));
    });
  });
});
