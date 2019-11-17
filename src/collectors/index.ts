import lodash from 'lodash';

import {exampleEvents} from '../data/events';
import {GalleryEvent} from '../types';

import {collect as dpg} from './dulwich-picture-gallery';
import {collect as tate} from './tate';
import {collect as whitechapelGallery} from './whitechapel-gallery';
import {collect as whiteCube} from './white-cube';

class StubCollector {
  async collect(): Promise<ReadonlyArray<GalleryEvent>> {
    return Promise.resolve(exampleEvents);
  }
}

// istanbul ignore next
class AllCollector {
  async collect(): Promise<ReadonlyArray<GalleryEvent>> {
    const allEvents = await Promise
      .all([
        dpg(),
        tate(),
        whitechapelGallery(),
        whiteCube(),
      ])

    return lodash.flatten(allEvents);
  }
}

// istanbul ignore next
export default {
  DulwichPictureGallery: dpg,
  Tate: tate,
  WhitechapelGallery: whitechapelGallery,
  WhiteCube: whiteCube,

  Stub: new StubCollector(),
  All: new AllCollector(),
};
