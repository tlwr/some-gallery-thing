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
      <body>
        
        <div className="grid-container">
          <header className="header">
            <h1>some gallery thing</h1>
          </header>
          
          {this.renderEvents(this.props.events)}
          <footer className="footer">
          <p>website by <a href="">sonia turcotte</a> and <a href="">tlwr</a></p>
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
