import moment from 'moment';
import nock from 'nock';

import {collect} from './tate';

describe('collector', () => {
  let nockTate: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockTate = nock('https://www.tate.org.uk');
  });

  afterEach(() => {
    nockTate.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
    <div class="btn-row btn-row--align__right btn-row--selected-filters">
      <h3 aria-live="polite">Showing
        8 results
        </strong>
      </h3>
      <a href="/whats-on?daterange=next_week&amp;gallery_group=tate_britain%2Ctate_modern" class="btn btn--type__outline btn--filter-remove" data-filter-key="event_type" data-filter-value="exhibition" title="remove filter">
        <i class="icon btn__icon icon--cross"></i>
        <span class="btn__text">Exhibitions</span>
      </a>
      <a href="/whats-on?daterange=next_week&amp;gallery_group=tate_modern&amp;event_type=exhibition" class="btn btn--type__outline btn--filter-remove" data-filter-key="gallery_group" data-filter-value="tate_britain" title="remove filter">
        <i class="icon btn__icon icon--cross"></i>
        <span class="btn__text">Tate Britain</span>
      </a>
      <a href="/whats-on?daterange=next_week&amp;gallery_group=tate_britain&amp;event_type=exhibition" class="btn btn--type__outline btn--filter-remove" data-filter-key="gallery_group" data-filter-value="tate_modern" title="remove filter">
        <i class="icon btn__icon icon--cross"></i>
        <span class="btn__text">Tate Modern</span>
      </a>
      <a href="/whats-on?gallery_group=tate_britain%2Ctate_modern&amp;event_type=exhibition" class="btn btn--type__outline btn--filter-remove" data-filter-key="daterange" data-filter-value="next_week" title="remove filter">
        <i class="icon btn__icon icon--cross"></i>
        <span class="btn__text">Next week</span>
      </a>
    </div>
    <div class="card-list card-list--4col card-list--type__image-canvas card-list--type__2-col-mobile" data-current-page="1" data-page-size="20" data-total-results="8" data-page-count="1">
      <div class="card">
        <div class="card__inner">
          <div class="card-media card-media--image">
            <div class="card-media__inner responsive-container">
              <a href="/whats-on/tate-modern/exhibition/andy-warhol" aria-label="Andy Warhol" data-gtm-name="card_link_image" data-gtm-destination="page--event">
  <div class="responsive-container__outer-sizer" style=" max-width: 576px; margin: 0 auto;">
    <div class="responsive-container__sizer protected" style="--aspect-ratio: 100/70.3125; --aspect-ratio-percentage: 70.3125%; ">
  <noscript><img src="https://www.tate.org.uk/sites/default/files/styles/width-340/public/warhol_marilyn_diptych.jpg" alt="" /></noscript>
  </div></div>
              </a>
          </div>
      </div>
      <div class="card-header">
        <h3 class="card__label card__label--type">Tate Modern</h3>
        <h3 class="card__label card__label--type">Exhibition</h3>
      </div>
      <div class="card-content ">
        <div class="card-content__inner">
          <h2 class="card__title">
                <a href="/whats-on/tate-modern/exhibition/andy-warhol" aria-label="Andy Warhol" data-gtm-name="card_link_title" data-gtm-destination="page--event">
                    <span class="card__title--maintitle card__title--exhibition">Andy Warhol</span>
                </a>
          </h2>
          <div class="card__when">
              <span class="card__when--date">12 Mar – 6 Sep 2020</span>
          </div>
          <span class="card__label card__label--status">Now booking</span>
          </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card__inner">
          <div class="card-media card-media--image">
            <div class="card-media__inner responsive-container">
              <a href="/whats-on/tate-modern/exhibition/olafur-eliasson/olafur-eliasson-cubic-structural-evolution-project" aria-label="Olafur Eliasson: The cubic structural evolution project" data-gtm-name="card_link_image" data-gtm-destination="page--event">
                <div class="responsive-container__outer-sizer" style=" max-width: 1600px; margin: 0 auto;">
                  <div class="responsive-container__sizer" style="--aspect-ratio: 100/66.5625; --aspect-ratio-percentage: 66.5625%; ">
                    <noscript><img src="https://www.tate.org.uk/sites/default/files/styles/width-170/public/olafur_eliasson_the_cubic_structural_evolution_project.jpg" alt="" /></noscript>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="card-header">
            <h3 class="card__label card__label--type">Tate Modern</h3>
            <h3 class="card__label card__label--type">Exhibition</h3>
          </div>
          <div class="card-content ">
            <div class="card-content__inner">
              <h2 class="card__title">
                <a href="/whats-on/tate-modern/exhibition/olafur-eliasson/olafur-eliasson-cubic-structural-evolution-project" aria-label="Olafur Eliasson: The cubic structural evolution project" data-gtm-name="card_link_title" data-gtm-destination="page--event">
                  <span class="card__title--maintitle card__title--exhibition">Olafur Eliasson: The cubic structural evolution project</span>
                </a>
              </h2>
              <div class="card__when">
                <span class="card__when--date">Until 18 Aug 2019</span>
              </div>
              <span class="card__label card__label--status">Free entry</span>
              <!-- Button to launch Net Art acquisition links -->
              <!-- end button -->
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card__inner">
          <div class="card-media card-media--image">
            <div class="card-media__inner responsive-container">
              <a href="/whats-on/tate-britain/exhibition/frank-bowling" aria-label="Frank Bowling" data-gtm-name="card_link_image" data-gtm-destination="page--event">
                <div class="responsive-container__outer-sizer" style=" max-width: 4912px; margin: 0 auto;">
                  <noscript><img src="https://www.tate.org.uk/sites/default/files/styles/width-170/public/frank_bowling_bartica_born_i_1967_acrylic_on_canvas_235.6_x_121.9_cm.jpg" alt="" /></noscript>
                </div>
            </div>
              </a>
          </div>
        </div>
        <div class="card-header">
          <h3 class="card__label card__label--type">Tate Britain</h3>
          <h3 class="card__label card__label--type">Exhibition</h3>
        </div>
        <div class="card-content ">
          <div class="card-content__inner">
            <h2 class="card__title">
              <a href="/whats-on/tate-britain/exhibition/frank-bowling" aria-label="Frank Bowling" data-gtm-name="card_link_title" data-gtm-destination="page--event">
                <span class="card__title--maintitle card__title--exhibition">Frank Bowling</span>
              </a>
            </h2>
            <div class="card__when">
              <span class="card__when--date">Until 26 Aug 2019</span>
            </div>
            <span class="card__label card__label--status">Now booking</span>
            <!-- Button to launch Net Art acquisition links -->
            <!-- end button -->
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__inner">
        <div class="card-media card-media--image">
          <div class="card-media__inner responsive-container">
            <a href="/whats-on/tate-modern/exhibition/natalia-goncharova" aria-label="Natalia Goncharova" data-gtm-name="card_link_image" data-gtm-destination="page--event">
              <div class="responsive-container__outer-sizer" style=" max-width: 1116px; margin: 0 auto;">
                <div class="responsive-container__sizer" style="--aspect-ratio: 100/143.3692; --aspect-ratio-percentage: 143.3692%; ">
                  <noscript><img src="https://www.tate.org.uk/sites/default/files/styles/width-170/public/j_2392_1.jpg" alt="" /></noscript>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="card-header">
          <h3 class="card__label card__label--type">Tate Modern</h3>
          <h3 class="card__label card__label--type">Exhibition</h3>
        </div>
        <div class="card-content ">
          <div class="card-content__inner">
            <h2 class="card__title">
              <a href="/whats-on/tate-modern/exhibition/natalia-goncharova" aria-label="Natalia Goncharova" data-gtm-name="card_link_title" data-gtm-destination="page--event">
                <span class="card__title--maintitle card__title--exhibition">Natalia Goncharova</span>
              </a>
            </h2>
            <div class="card__when">
              <span class="card__when--date">Until 8 Sep 2019</span>
            </div>
            <span class="card__label card__label--status">Now booking</span>
            <!-- Button to launch Net Art acquisition links -->
            <!-- end button -->
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__inner">
        <div class="card-media card-media--image">
          <div class="card-media__inner responsive-container">
            <a href="/whats-on/tate-britain/exhibition/france-lise-mcgurn" aria-label="Art Now: France-Lise McGurn: Sleepless" data-gtm-name="card_link_image" data-gtm-destination="page--event">
              <div class="responsive-container__outer-sizer" style=" max-width: 2601px; margin: 0 auto;">
                <div class="responsive-container__sizer" style="--aspect-ratio: 100/105.3441; --aspect-ratio-percentage: 105.3441%; ">
                  <noscript><img src="https://www.tate.org.uk/sites/default/files/styles/width-170/public/francelisemcgurn_get_in_the_car_oil_300x200cm_spray_and_acrylic_on_canvas_2019_crop_new.jpg" alt="" /></noscript>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="card-header">
          <h3 class="card__label card__label--type">Tate Britain</h3>
          <h3 class="card__label card__label--type">Exhibition</h3>
        </div>
        <div class="card-content ">
          <div class="card-content__inner">
            <h2 class="card__title">
              <a href="/whats-on/tate-britain/exhibition/france-lise-mcgurn" aria-label="Art Now: France-Lise McGurn: Sleepless" data-gtm-name="card_link_title" data-gtm-destination="page--event">
                <span class="card__title--maintitle card__title--exhibition">Art Now: France-Lise McGurn: Sleepless</span>
              </a>
            </h2>
            <div class="card__when">
              <span class="card__when--date">Until 8 Sep 2019</span>
            </div>
            <span class="card__label card__label--status">Free entry</span>
            <!-- Button to launch Net Art acquisition links -->
            <!-- end button -->
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__inner">
        <div class="card-media card-media--image">
          <div class="card-media__inner responsive-container">
            <a href="/whats-on/tate-britain/exhibition/mike-nelson" aria-label="Tate Britain Commission: Mike Nelson: The Asset Strippers" data-gtm-name="card_link_image" data-gtm-destination="page--event">
              <div class="responsive-container__outer-sizer" style=" max-width: 5504px; margin: 0 auto;">
                <div class="responsive-container__sizer" style="--aspect-ratio: 100/150.0; --aspect-ratio-percentage: 150.0%; ">
                  <noscript><img src="https://www.tate.org.uk/sites/default/files/styles/width-170/public/mike_nelson_009.jpg" alt="" /></noscript>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="card-header">
          <h3 class="card__label card__label--type">Tate Britain</h3>
          <h3 class="card__label card__label--type">Exhibition</h3>
        </div>
        <div class="card-content ">
          <div class="card-content__inner">
            <h2 class="card__title">
              <a href="/whats-on/tate-britain/exhibition/mike-nelson" aria-label="Tate Britain Commission: Mike Nelson: The Asset Strippers" data-gtm-name="card_link_title" data-gtm-destination="page--event">
                <span class="card__title--maintitle card__title--exhibition">Tate Britain Commission: Mike Nelson: The Asset Strippers</span>
              </a>
            </h2>
            <div class="card__when">
              <span class="card__when--date">Until 6 Oct 2019</span>
            </div>
            <span class="card__label card__label--status">Free entry</span>
            <!-- Button to launch Net Art acquisition links -->
            <!-- end button -->
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__inner">
        <div class="card-media card-media--image">
          <div class="card-media__inner responsive-container">
            <a href="/whats-on/tate-modern/exhibition/takis" aria-label="Takis" data-gtm-name="card_link_image" data-gtm-destination="page--event">
              <div class="responsive-container__outer-sizer" style=" max-width: 2250px; margin: 0 auto;">
                <div class="responsive-container__sizer" style="--aspect-ratio: 100/133.3333; --aspect-ratio-percentage: 133.3333%; ">
                  <noscript><img src="https://www.tate.org.uk/sites/default/files/styles/width-170/public/x60685_det_0008.jpg" alt="" /></noscript>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="card-header">
          <h3 class="card__label card__label--type">Tate Modern</h3>
          <h3 class="card__label card__label--type">Exhibition</h3>
        </div>
        <div class="card-content ">
          <div class="card-content__inner">
            <h2 class="card__title">
              <a aria-label="Takis" data-gtm-name="card_link_title" data-gtm-destination="page--event">
                <span class="card__title--maintitle card__title--exhibition">Takis</span>
              </a>
            </h2>
            <div class="card__when">
              <span class="card__when--date">Until 27 Oct 2019</span>
            </div>
            <span class="card__label card__label--status">Now booking</span>
            <!-- Button to launch Net Art acquisition links -->
            <!-- end button -->
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__inner">
        <div class="card-media card-media--image">
          <div class="card-media__inner responsive-container">
            <a href="/whats-on/tate-modern/exhibition/olafur-eliasson" aria-label="Olafur Eliasson: In real life" data-gtm-name="card_link_image" data-gtm-destination="page--event">
              <div class="responsive-container__outer-sizer" style=" max-width: 1200px; margin: 0 auto;">
                <div class="responsive-container__sizer" style="--aspect-ratio: 100/116.6667; --aspect-ratio-percentage: 116.6667%; ">
                  <noscript><img src="https://www.tate.org.uk/sites/default/files/styles/width-170/public/your_uncertain_shaddow_crop_eliasson.jpg" alt="" /></noscript>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="card-header">
      <h3 class="card__label card__label--type">Tate Modern</h3>
      <h3 class="card__label card__label--type">Exhibition</h3>
      </div>
      <div class="card-content ">
      <div class="card-content__inner">
      <h2 class="card__title">
      <a href="/whats-on/tate-modern/exhibition/olafur-eliasson" aria-label="Olafur Eliasson: In real life" data-gtm-name="card_link_title" data-gtm-destination="page--event">
      <span class="card__title--maintitle card__title--exhibition">Olafur Eliasson: In real life</span>
      </a>
      </h2>
      <div class="card__when">
      <span class="card__when--date">Until 5 Jan 2020</span>
      </div>
      <span class="card__label card__label--status">Now booking</span>
      <!-- Button to launch Net Art acquisition links -->
      <!-- end button -->
      </div>
      </div>
      </div>
      </div>
      <div class="card">
      <div class="card__inner">
      <div class="card-media card-media--image">
      <div class="card-media__inner responsive-container">
      <a href="/whats-on/tate-modern/exhibition/dora-maurer" aria-label="Dóra Maurer" data-gtm-name="card_link_image" data-gtm-destination="page--event">
      <div class="responsive-container__outer-sizer" style=" max-width: 3720px; margin: 0 auto;">
      <div class="responsive-container__sizer" style="--aspect-ratio: 100/100.0; --aspect-ratio-percentage: 100.0%; ">
      <noscript><img src="https://www.tate.org.uk/sites/default/files/styles/width-170/public/x74284_relative_quasi_image_1996_photography_vintage_galeria_andras_bozso_1.jpg" alt="" /></noscript>
      </div>
      </div>
      </a>
      </div>
      </div>
      <div class="card-header">
      <h3 class="card__label card__label--type">Tate Modern</h3>
      <h3 class="card__label card__label--type">Exhibition</h3>
      </div>
      <div class="card-content ">
      <div class="card-content__inner">
      <h2 class="card__title">
      <a href="/whats-on/tate-modern/exhibition/dora-maurer" aria-label="Dóra Maurer" data-gtm-name="card_link_title" data-gtm-destination="page--event">
      <span class="card__title--maintitle card__title--exhibition">Dóra Maurer</span>
      </a>
      </h2>
      <div class="card__when">
      <span class="card__when--date">Until 5 Jul 2020</span>
      </div>
      <span class="card__label card__label--status">Free entry</span>
      <!-- Button to launch Net Art acquisition links -->
      <!-- end button -->
      </div>
      </div>
      </div>
      </div>
      </div>
        `;

    nockTate
      .get(/whats-on/)
      .reply(200, rawHTML);
    

    const events = await collect();

    expect(events.length).toBe(9);

    expect(events).toMatchObject([{
      title: 'Andy Warhol',
      closeDate: moment('2020-09-06').toDate(),
      image: 'https://www.tate.org.uk/sites/default/files/styles/width-340/public/warhol_marilyn_diptych.jpg',
      website: 'https://www.tate.org.uk/whats-on/tate-modern/exhibition/andy-warhol',

      gallery: {
        name: 'Tate Modern',
      },
    }, {
      title: 'Olafur Eliasson: The cubic structural evolution project',
      closeDate: moment('2019-08-18').toDate(),
      image: 'https://www.tate.org.uk/sites/default/files/styles/width-170/public/olafur_eliasson_the_cubic_structural_evolution_project.jpg',
      website: 'https://www.tate.org.uk/whats-on/tate-modern/exhibition/olafur-eliasson/olafur-eliasson-cubic-structural-evolution-project',

      gallery: {
        name: 'Tate Modern',
      },
    }, {
      title: 'Frank Bowling',
      closeDate: moment('2019-08-26').toDate(),
      image: 'https://www.tate.org.uk/sites/default/files/styles/width-170/public/frank_bowling_bartica_born_i_1967_acrylic_on_canvas_235.6_x_121.9_cm.jpg',
      website: 'https://www.tate.org.uk/whats-on/tate-britain/exhibition/frank-bowling',

      gallery: {
        name: 'Tate Britain',
      },
    }, {
      title: 'Natalia Goncharova',
      closeDate: moment('2019-09-08').toDate(),
      image: 'https://www.tate.org.uk/sites/default/files/styles/width-170/public/j_2392_1.jpg',
      website:  'https://www.tate.org.uk/whats-on/tate-modern/exhibition/natalia-goncharova',

      gallery: {
        name: 'Tate Modern',
      },
    }, {
      title: 'Art Now: France-Lise McGurn: Sleepless',
      closeDate: moment('2019-09-08').toDate(),
      image: 'https://www.tate.org.uk/sites/default/files/styles/width-170/public/francelisemcgurn_get_in_the_car_oil_300x200cm_spray_and_acrylic_on_canvas_2019_crop_new.jpg',
      website:  'https://www.tate.org.uk/whats-on/tate-britain/exhibition/france-lise-mcgurn',

      gallery: {
        name: 'Tate Britain',
      },
    }, {
      title: 'Tate Britain Commission: Mike Nelson: The Asset Strippers',
      closeDate: moment('2019-10-06').toDate(),
      image: 'https://www.tate.org.uk/sites/default/files/styles/width-170/public/mike_nelson_009.jpg',
      website:  'https://www.tate.org.uk/whats-on/tate-britain/exhibition/mike-nelson',

      gallery: {
        name: 'Tate Britain',
      },
    }, {
      title: 'Takis',
      closeDate: moment('2019-10-27').toDate(),
      image: 'https://www.tate.org.uk/sites/default/files/styles/width-170/public/x60685_det_0008.jpg',
      website:  undefined,

      gallery: {
        name: 'Tate Modern',
      },
    }, {
      title: 'Olafur Eliasson: In real life',
      closeDate: moment('2020-01-05').toDate(),
      image: 'https://www.tate.org.uk/sites/default/files/styles/width-170/public/your_uncertain_shaddow_crop_eliasson.jpg',
      website:  'https://www.tate.org.uk/whats-on/tate-modern/exhibition/olafur-eliasson',

      gallery: {
        name: 'Tate Modern',
      },
    }, {
      title: 'Dóra Maurer',
      closeDate: moment('2020-07-05').toDate(),
      image: 'https://www.tate.org.uk/sites/default/files/styles/width-170/public/x74284_relative_quasi_image_1996_photography_vintage_galeria_andras_bozso_1.jpg',
      website:  'https://www.tate.org.uk/whats-on/tate-modern/exhibition/dora-maurer',

      gallery: {
        name: 'Tate Modern',
      },
    }]);

  });

  it('should fail gracefully when not OK', async () => {
    nockTate
      .get(/whats-on/)
      .reply(404);
    

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should throw an error when the gallery is unknown', async () => {
    const rawHTML = `
      <div class="card">
        <div class="card__inner">
          <div class="card-header">
            <h3 class="card__label card__label--type">Not the Tate</h3>
          </div>
        </div>
      </div>
    `;

    nockTate
      .get(/whats-on/)
      .reply(200, rawHTML);
    

    await expect(collect()).rejects.toThrow(/Unknown gallery/);
  });
});
