import * as React from "react";

import { GalleryEvent } from '../types';
import {GalleryEventComponent} from './event';
import {truncateEven} from '../utils';

export interface GalleryEventsComponentProps {
  events: ReadonlyArray<GalleryEvent>;
}

export function sortEvents(events: ReadonlyArray<GalleryEvent>): ReadonlyArray<GalleryEvent> {
  return Array
    .from(events)
    .sort((a, b) => {
      return (new Date(a.closeDate).getTime()) - (new Date(b.closeDate).getTime());
    });
}

export class GalleryEventsComponent extends React.Component<GalleryEventsComponentProps, {}> {
  public render(): React.ReactElement {
    return <html lang="en">
      <head>
        <title>some gallery thing</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/assets/main.css"/>
      </head>
      <body>

        <div className="">
          <header className="header">
            <h1>some gallery thing</h1>
          </header>

          <main className="grid-container">
           {this.renderEvents(truncateEven(sortEvents(this.props.events)))}
          </main>

          <footer className="footer">
            <ul>
              <li>website by <a href="http://soniaturcotte.com/">sonia turcotte</a> and <a href="https://toby.codes/">tlwr</a></li>
              <li><a href="https://www.instagram.com/somegallerything/">instagram</a></li>
            </ul>
        </footer>
        </div>

      </body>
    </html>;
  }

  public renderEvents(events: ReadonlyArray<GalleryEvent>): ReadonlyArray<React.ReactElement> {
    return Array
      .from(events)
      .map((e, i) => <GalleryEventComponent key={i} event={e}/>)
    ;
  }
}
