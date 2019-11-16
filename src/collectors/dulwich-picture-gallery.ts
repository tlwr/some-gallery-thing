import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';

import {Gallery, GalleryEvent} from '../types';

const dpgEventWebsitePrefix = 'https://www.dulwichpicturegallery.org.uk';

const gallery: Gallery = {
  name: 'Dulwich Picture Gallery',
  address: 'Gallery Road, London SE21 7AD',
  website: 'https://www.dulwichpicturegallery.org.uk',
};

const parseEvents = (rawEvents: string, baseURL: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  const eventDefs = html('div.stack-article.grid-nest-1234');

  let events: Array<GalleryEvent> = [];

  eventDefs.map((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    const title = loadedElem('h2 a').text().trim();

    if (title === '') {
      throw new Error('Could not find title when parsing event');
    }

    const times = loadedElem('time');

    if (times.length !== 2) {
      throw new Error('Wrong number of dates found');
    }

    const openDate = moment(times.first().attr('datetime')).toDate();
    const closeDate = moment(times.last().attr('datetime')).toDate();

    let website = loadedElem('a.more-info').first().attr('href');

    if (typeof website !== 'undefined') {
      website = `${dpgEventWebsitePrefix}${website.trim()}`
    }

    const event: GalleryEvent = {
      title, openDate, closeDate, gallery, website
    };

    const image = loadedElem('img').attr('src');
    if (typeof image !== 'undefined') {
      event.image = `${baseURL}${image}`;
    }

    events = [event, ...events];
  }).toArray();

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.dulwichpicturegallery.org.uk';

  const opts = {
    url: `${baseURL}/umbraco/surface/WhatsOnPage/GetEvents?category=43986&date=7d&PageId=43985&page=1`,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents, baseURL);

  return parsedEvents;
};
