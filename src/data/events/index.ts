import moment from 'moment';

import {GalleryEvent} from '../types';

export const exampleEvents: ReadonlyArray<GalleryEvent> = [
  {
    title: 'Van Gogh and Britain',
    website: 'https://www.tate.org.uk/whats-on/tate-britain/exhibition/ey-exhibition-van-gogh-and-britain',

    openDate: moment('2019-03-27').toDate(),
    closeDate: moment('2019-08-11').toDate(),

    gallery: {
      name: 'Tate Modern',
      address: 'Bankside, London SE1 9TG',
      website: 'https://www.tate.org.uk/visit/tate-modern'
    },
  },
  {
    title: 'Celia Paul',
    website: 'https://www.victoria-miro.com/exhibitions/548',

    openDate: moment('2019-11-13').toDate(),
    closeDate: moment('2019-12-20').toDate(),

    gallery: {
      name: 'Victoria Miro',
      address: '16 Wharf Road, London N1 7RW',
      website: 'https://www.victoria-miro.com'
    },
  },
  {
    title: 'Cutting Edge: Modernist British Printmaking',
    website: 'https://www.dulwichpicturegallery.org.uk/whats-on/exhibitions/2019/june/cutting-edge-modernist-british-printmaking',

    openDate: moment('2019-06-19').toDate(),
    closeDate: moment('2019-09-08').toDate(),

    gallery: {
      name: 'Dulwich Picture Gallery',
      address: 'Gallery Road, London SE21 7AD',
      website: 'https://www.dulwichpicturegallery.org.uk'
    },
  },
];
