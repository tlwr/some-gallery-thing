import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';

import {Gallery, GalleryEvent} from '../types';

const tateEventWebsitePrefix = 'https://www.tate.org.uk';

const tateModern: Gallery = {
  name: 'Tate Modern',
  address: 'Bankside, London SE1 9TG',
  website: 'https://www.tate.org.uk/visit/tate-modern',
};

const tateBritain: Gallery = {
  name: 'Tate Britain',
  address: 'Millbank, London SW1P 4RG',
  website: 'https://www.tate.org.uk/visit/tate-britain',
};

const parseEvents = (rawEvents: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents, { scriptingEnabled: false });

  const eventDefs = html('div.card');

  let events: Array<GalleryEvent> = [];

  eventDefs.map((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    const galleryHint = loadedElem('div.card-header h3.card__label--type').first().text().trim();

    let gallery: Gallery;

    if (galleryHint.match(/tate modern/i)) {
      gallery = tateModern;
    } else if (galleryHint.match(/tate britain/i)) {
      gallery = tateBritain;
    } else {
      throw new Error(`Unknown gallery '${galleryHint}'`);
    }

    const title = loadedElem('span.card__title--maintitle.card__title--exhibition').text().trim();

    const dateText = loadedElem('span.card__when--date').text();
    let openDate: Date | undefined = undefined;
    let closeDate: Date | undefined = undefined;
    if (dateText.indexOf('Until') >= 0) {
      closeDate = moment(dateText.replace(/Until/, '').trim(), 'DD MMM YYYY').toDate();
    } else {
      const closeDateText = dateText.split('–')[1];
      openDate = moment(openDate, 'DD MMM').toDate();
      closeDate = moment(closeDateText, 'DD MMM YYYY').toDate();
    }

    const image = loadedElem('noscript img').attr('src');

    let website = loadedElem('h2.card__title a').first().attr('href');

    if (typeof website !== 'undefined') {
      website = `${tateEventWebsitePrefix}${website.trim()}`
    }

    events = [...events, {title, openDate, closeDate, gallery, image, website}];
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const opts = {
    url: 'https://www.tate.org.uk/whats-on?daterange=next_week&event_type=exhibition&gallery_group=tate_britain%2Ctate_modern&ajax=1&ajax_scope=card-group',
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents);

  return parsedEvents;
};
