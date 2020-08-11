import cheerio from 'cheerio';
import lodash from 'lodash';
import moment from 'moment';
import request from 'request-promise-native';

import {Gallery, GalleryEvent} from '../types';

const gallery: Gallery = {
  name: 'Whitechapel Gallery',
  address: '77-82 Whitechapel High Street, London E1 7QX',
  website: 'https://www.whitechapelgallery.org',
};

const parseEvents = (rawEvents: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  const contentWrappers = html('div.contentWrapper');

  const onNowContentWrappers = contentWrappers.toArray().filter(wrapper => {
    const title = cheerio.load(wrapper)('h1.whitechapelFont').first();
    const titleContents = title.text().trim();
    return titleContents.match(/on now/i);
  });

  return lodash
    .flatten(
      onNowContentWrappers.map(elem => cheerio.load(elem)('div.content').toArray()),
    )
    .map(eventHTML => {
      const elem = cheerio.load(eventHTML);

      const title = elem('h4.category_name').first().text().trim() +
                    ' - ' +
                    elem('h4.category_title').first().text().trim()
      ;

      const image = elem('img').first().attr('src');
      const website = elem('a[href]').first().attr('href');

      const rawDates = elem('p').last().text().match(/\d{1,2} [a-zA-Z]{3} \d{4}/);

      // istanbul ignore next
      if (rawDates == null) {
        return null;
      }

      const rawDate = rawDates[0];
      const closeDate = moment(rawDate, 'D MMM YYYY').toDate();

      return {
        title, website, image, closeDate, gallery,
      };
    })
    .filter(e => e != null)
    .filter(e => ! e.title.match(/offsite.exhibition/i))
  ;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.whitechapelgallery.org';

  const opts = {
    url: `${baseURL}/exhibitions`,
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents);

  return parsedEvents;
};
