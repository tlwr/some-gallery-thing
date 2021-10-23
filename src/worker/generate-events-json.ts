import collectors from '../collectors';
import {GalleryEvent} from '../types';

const noCloseDateFilter = (ev : GalleryEvent) => !isNaN(Number(ev.closeDate));

console.error('Collecting events from London');
const pLondonEvents = collectors.London.collect();
console.error('Collecting events from Amsterdam');
const pAmsterdamEvents = collectors.Amsterdam.collect();

Promise
  .all([pLondonEvents, pAmsterdamEvents])
  .then((eventsByCity : ReadonlyArray<ReadonlyArray<GalleryEvent>>) => {
    const [londonEvents, amsterdamEvents] = eventsByCity;

    console.error('Collected events from London');
    console.error('Collected events from Amsterdam');

    const events = {
      london: londonEvents.filter(noCloseDateFilter),
      amsterdam: amsterdamEvents.filter(noCloseDateFilter),
    };

    console.error('Writing events to STDOUT');
    console.log(JSON.stringify(events));
    console.error('Wrote events to STDOUT');
  })
;
