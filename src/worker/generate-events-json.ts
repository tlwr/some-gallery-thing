import collectors from '../collectors';
import {GalleryEvent} from '../types';

console.error('Collecting events');

collectors
  .All
  .collect()
  .then((events: ReadonlyArray<GalleryEvent>) => {
    return events.filter(e => !isNaN(Number(e.closeDate)));
  })
  .then((events: ReadonlyArray<GalleryEvent>) => {
    console.error('Collected events, writing to STDOUT');
    console.log(JSON.stringify(events));
    console.error('Wrote events to STDOUT');
    process.exit(0);
  })
  .catch(() => process.exit(1));
