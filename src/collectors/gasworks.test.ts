import moment from 'moment';
import nock from 'nock';

import {collect} from './gasworks';

describe('collector', () => {
  let nockGasworks: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockGasworks = nock('https://www.gasworks.org.uk');
  });

  afterEach(() => {
    nockGasworks.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
<main class="container main-container exhibitions" id="contents">
  <section class="section-index">
    <header class="section-header faded">
      <h1>Exhibitions</h1>
    </header>
    <div class="contents">
      <section id="current">
        <div class="row">
          <article class="column column-100-100 list-item">
            <figure class="list-item-figure">
              <a href="/exhibitions/gasworks-online-screenings-may-june/" class="crop"><img src="/CACHE/images/2020/04/29/Farmacopea_STILL_3/81aa6968201c5af7a955e7ba16e9c61f.jpg" width="980" height="612"></a>
            </figure>
            <header>
              <h3>exhibition</h3>
              <h2 class="date nowrap">
                <span class="nowrap">
                18 May
                –</span> <span class="nowrap">5 Jul 20
                </span>
              </h2>
              <h1><a href="/exhibitions/gasworks-online-screenings-may-june/">Gasworks Online Screenings: May - June</a></h1>
            </header>
            <p class="precis ">
              Online screenings of works by Beatriz Santiago Muñoz, Patricia Domínguez, and Mathieu Kleyebe Abonnenc, accompanied by interviews with the artists, texts and reviews.
              <a href="/exhibitions/gasworks-online-screenings-may-june/" class="more">More</a>
            </p>
          </article>
          <div class="clearfix"></div>
        </div>
      </section>
      <section id="forthcoming">
        <header class="break">
          <h1>Forthcoming Exhibitions</h1>
        </header>
        <div class="row">
          <article class="column column-100-100 list-item">
            <figure class="list-item-figure">
              <a href="/exhibitions/true-currency-about-feminist-economics-podcast-2020-07-16/" class="crop"><img src="/CACHE/images/2020/05/28/Womens_March_-_sound_recordings/ca803175da4b41ba6abbc9e0a4d91277.jpg" width="980" height="612"></a>
            </figure>
            <header>
              <h3>exhibition</h3>
              <h2 class="date nowrap">
                <span class="nowrap">
                16 Jul
                –</span> <span class="nowrap">27 Aug 20
                </span>
              </h2>
              <h1><a href="/exhibitions/true-currency-about-feminist-economics-podcast-2020-07-16/">True Currency: About Feminist Economics</a></h1>
            </header>
            <p class="precis ">
              True Currency: About Feminist Economics is a six-part podcast hosted by artists Amy Feneck and Ruth Beale (The Alternative School of Economics), launching ...
              <a href="/exhibitions/true-currency-about-feminist-economics-podcast-2020-07-16/" class="more">More</a>
            </p>
          </article>
          <div class="clearfix"></div>
        </div>
      </section>
      <section id="archive" class="block  secondary-block">
        <header class="break">
          <h1>Exhibitions Archive</h1>
          <a href="archive/" class="more"><span class="highlight">View Full Archive</span></a>
        </header>
        <div class="row mob-row-split">
          <article class="column column-33-100 odd mob-column-50-100 mob-odd list-item">
            <figure class="list-item-figure">
              <a href="/exhibitions/gasworks-online-commissions/" class="crop"><img src="/CACHE/images/2020/04/06/00GASWORKS_APRIL2017.Still018/7fb760e61146b65c9fa72d45bca72f83.jpg" width="540" height="338"></a>
            </figure>
            <header>
              <h3>exhibition</h3>
              <h2 class="date nowrap">
                <span class="nowrap">
                9 Apr
                –</span> <span class="nowrap">17 May 20
                </span>
              </h2>
              <h1><a href="/exhibitions/gasworks-online-commissions/">Gasworks Online Screenings: April and May</a></h1>
            </header>
            <p class="precis desktop">
              Works by Monira Al Qadiri. Louis Henderson &amp; Filipa César,&nbsp;and&nbsp;Maryam Jafri&nbsp;will be available to stream on Gasworks’ website for one week. Each screening&nbsp;and is accompanied by interviews with the artists, audio lectures and reviews.
              <a href="/exhibitions/gasworks-online-commissions/" class="more">More</a>
            </p>
          </article>
          <article class="column column-33-100 middle mob-column-50-100 mob-even list-item">
            <figure class="list-item-figure">
              <a href="/exhibitions/exhibition-cancelled-due-to-covid-19-outbreak-2020-04-09/" class="crop"><img src="/CACHE/images/2020/03/18/Exterior_Ioana_Marinescu/7f55c38b98aa2417da1a303f64ecf1c3.jpg" width="540" height="338"></a>
            </figure>
            <header>
              <h3>exhibition</h3>
              <h2 class="date nowrap">
                <span class="nowrap">
                1 Apr
                –</span> <span class="nowrap">14 Jun 20
                </span>
              </h2>
              <h1><a href="/exhibitions/exhibition-cancelled-due-to-covid-19-outbreak-2020-04-09/">Exhibition Cancelled Due to Covid-19 Outbreak</a></h1>
            </header>
            <p class="precis desktop">
              We regret that due to the outbreak of Covid-19 this season's exhibitions and events have now been cancelled.&nbsp;
              <a href="/exhibitions/exhibition-cancelled-due-to-covid-19-outbreak-2020-04-09/" class="more">More</a>
            </p>
          </article>
          <article class="column column-33-100 even mob-column-50-100 mob-odd list-item">
            <figure class="list-item-figure">
              <a href="/exhibitions/lauren-gault-2020-01-23/" class="crop"><img src="/CACHE/images/2020/01/28/01._Lauren_Gault_at_Gasworks/4dfe037b2d7186bec862488486d526aa.jpg" width="540" height="338"></a>
            </figure>
            <header>
              <h3>exhibition</h3>
              <h2 class="date nowrap">
                <span class="nowrap">
                23 Jan
                –</span> <span class="nowrap">22 Mar 20
                </span>
              </h2>
              <h1><a href="/exhibitions/lauren-gault-2020-01-23/">Lauren Gault: C I T H R A</a></h1>
            </header>
            <p class="precis desktop">
              The first solo exhibition in London by Glasgow-based artist Lauren Gault. Experimenting with unorthodox techniques and manufacturing processes, Gault's&nbsp;work&nbsp;confronts the ethical, political and emotional implications of human interactions with the environment.
              <a href="/exhibitions/lauren-gault-2020-01-23/" class="more">More</a>
            </p>
          </article>
          <article class="column column-33-100 odd mob-column-50-100 mob-even mobile list-item">
            <figure class="list-item-figure">
              <a href="/exhibitions/kudzanai-violet-hwami-2019-09-19/" class="crop"><img src="/CACHE/images/2019/09/16/HOMEPAGE_IMAGE_KUDZANAI_VIOLET_HWAMI_UDErlrh/ea94e37aa604aee319fce06b0a53c6b4.jpg" width="540" height="338"></a>
            </figure>
            <header>
              <h3>exhibition</h3>
              <h2 class="date nowrap">
                <span class="nowrap">
                19 Sep
                –</span> <span class="nowrap">15 Dec 19
                </span>
              </h2>
              <h1><a href="/exhibitions/kudzanai-violet-hwami-2019-09-19/">Kudzanai-Violet Hwami: (15,952km) via Trans-Sahara Hwy N1</a></h1>
            </header>
            <p class="precis desktop">
              Gasworks presents the first institutional solo exhibition by London-based artist Kudzanai-Violet Hwami.
              <a href="/exhibitions/kudzanai-violet-hwami-2019-09-19/" class="more">More</a>
            </p>
          </article>
          <div class="clearfix"></div>
        </div>
        <footer class="continuation mobile">
          <a href="/exhibitions/archive/" class="more">View Full Archive</a>
        </footer>
      </section>
      <div class="clearfix"></div>
      <footer class="about-link mobile">
        <a href="/exhibitions/about">About Exhibitions</a>
      </footer>
    </div>
  </section>
  <div class="obstructor"></div>
</main>
    `;

    nockGasworks
      .get(/exhibitions/)
      .reply(200, rawHTML);
    

    const events = await collect();

    expect(events.length).toBe(2);

    expect(events).toMatchObject([{
      title: 'True Currency: About Feminist Economics',
      openDate: moment('16-07', 'DD-MM').toDate(),
      closeDate: moment('2020-08-27').toDate(),
      website: 'https://www.gasworks.org.uk/exhibitions/true-currency-about-feminist-economics-podcast-2020-07-16/',
      image: 'https://www.gasworks.org.uk/CACHE/images/2020/05/28/Womens_March_-_sound_recordings/ca803175da4b41ba6abbc9e0a4d91277.jpg',

      gallery: {
        name: 'Gasworks',
      },
    },{
      title: 'Gasworks Online Screenings: May - June',
      openDate: moment('18-05', 'DD-MM').toDate(),
      closeDate: moment('2020-07-05').toDate(),
      website: 'https://www.gasworks.org.uk/exhibitions/gasworks-online-screenings-may-june/',
      image: 'https://www.gasworks.org.uk/CACHE/images/2020/04/29/Farmacopea_STILL_3/81aa6968201c5af7a955e7ba16e9c61f.jpg',

      gallery: {
        name: 'Gasworks',
      },
    }]);
  });


  it('should fail gracefully when not OK', async () => {
    nockGasworks
      .get(/exhibitions/)
      .reply(404);
    

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockGasworks
      .get(/exhibitions/)
      .reply(200, 'malformed response');
    

    const events = await collect();

    expect(events.length).toBe(0);
  });
});
