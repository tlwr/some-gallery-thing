import * as React from "react";

import { GalleryEvent } from '../types';
import {GalleryEventComponent} from './event';

export interface GalleryEventsComponentProps {
  events: ReadonlyArray<GalleryEvent>;
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
      <body className="pa4">
        <header className="mb5">
          <h1 className="ma0 f-headline lh-solid">some gallery thing</h1>
        </header>
        <main>
          <article>
            <h2 className="f3 fw4 pa3 mv0">Events</h2>
            <div className="cf pa2">
              <div className="fl w-50 w-25-m w-20-l pa2">

                {this.renderEvents(this.props.events)}

              </div>
            </div>
          </article>
        </main>
      </body>
    </html>;
  }

  public renderEvents(events: ReadonlyArray<GalleryEvent>): ReadonlyArray<React.ReactElement> {
    return events.map((e, i) => <GalleryEventComponent key={i} event={e}/>);
  }
}
