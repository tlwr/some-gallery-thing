import lodash from 'lodash';

import {exampleEvents} from '../data/events';
import {GalleryEvent} from '../types';

import {collect as dpg} from './dulwich-picture-gallery';
import {collect as gasworks} from './gasworks';
import {collect as tate} from './tate';
import {collect as tintypeGallery} from './tintype-gallery';
import {collect as thePhotographersGallery} from './the-photographers-gallery';
import {collect as whitechapelGallery} from './whitechapel-gallery';
import {collect as whiteCube} from './white-cube';

import {collect as foam} from './foam';
import {collect as rijksmuseum} from './rijksmuseum';
import {collect as stedelijk} from './stedelijk';

class StubCollector {
  async collect(): Promise<ReadonlyArray<GalleryEvent>> {
    return Promise.resolve(exampleEvents);
  }
}

// istanbul ignore next
class LondonCollector {
  async collect(): Promise<ReadonlyArray<GalleryEvent>> {
    const allEvents = await Promise
      .all([
        dpg(),
        gasworks(),
        tate(),
        // thePhotographersGallery(),
        whitechapelGallery(),
        whiteCube(),
      ])

    return lodash.flatten(allEvents);
  }
}

// istanbul ignore next
class AmsterdamCollector {
  async collect(): Promise<ReadonlyArray<GalleryEvent>> {
    const allEvents = await Promise.all([
      foam(),
      rijksmuseum(),
      stedelijk(),
    ]);

    return lodash.flatten(allEvents);
  }
}

// istanbul ignore next
export default {
  DulwichPictureGallery: dpg,
  Gasworks: gasworks,
  Tate: tate,
  TintypeGallery: tintypeGallery,
  ThePhotographersGallery: thePhotographersGallery,
  WhitechapelGallery: whitechapelGallery,
  WhiteCube: whiteCube,

  Stub: new StubCollector(),
  London: new LondonCollector(),
  Amsterdam: new AmsterdamCollector(),
};
