import moment from 'moment';

import {GalleryEvent} from '../../types';

export const exampleEvents: ReadonlyArray<GalleryEvent> = [
  {
    title: 'Van Gogh and Britain',
    website: 'https://www.tate.org.uk/whats-on/tate-britain/exhibition/ey-exhibition-van-gogh-and-britain',

    openDate: moment('2019-03-27').toDate(),
    closeDate: moment('2019-08-11').toDate(),

    gallery: {
      name: 'Tate Britain',
      address: 'Millbank, London SW1P 4RG',
      website: 'https://www.tate.org.uk/visit/tate-britain',

      image: 'https://storage.googleapis.com/tate-digital/ui/3.9.0-compressed/static/images/tate-logo.png',
    },

    image: 'https://www.tate.org.uk/sites/default/files/styles/width-600/public/van_gogh_self_portrait.jpg',
  },
  {
    title: 'Celia Paul',
    website: 'https://www.victoria-miro.com/exhibitions/548',

    openDate: moment('2019-11-13').toDate(),
    closeDate: moment('2019-12-20').toDate(),

    gallery: {
      name: 'Victoria Miro',
      address: '16 Wharf Road, London N1 7RW',
      website: 'https://www.victoria-miro.com',
    },

    image: 'https://artlogic-res.cloudinary.com/w_1600,h_1000,c_limit,f_auto,fl_lossy/ws-victoriamiro/usr/exhibitions/images/548/cp201-image-3-.jpg',
  },
  {
    title: 'Cutting Edge: Modernist British Printmaking',
    website: 'https://www.dulwichpicturegallery.org.uk/whats-on/exhibitions/2019/june/cutting-edge-modernist-british-printmaking',

    openDate: moment('2019-06-19').toDate(),
    closeDate: moment('2019-09-08').toDate(),

    gallery: {
      name: 'Dulwich Picture Gallery',
      address: 'Gallery Road, London SE21 7AD',
      website: 'https://www.dulwichpicturegallery.org.uk',

      image: 'https://www.dulwichpicturegallery.org.uk/assets/img/logo.png',
    },

    image: 'https://www.dulwichpicturegallery.org.uk/media/9413/tube-train-power-large-banner.jpg',
  },
];
