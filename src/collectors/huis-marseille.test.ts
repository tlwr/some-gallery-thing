import moment from 'moment';
import nock from 'nock';

import {collect} from './huis-marseille';

describe('collector', () => {
  let nockHuisMarseille: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockHuisMarseille = nock('https://www.huismarseille.nl');
  });

  afterEach(() => {
    nockHuisMarseille.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
        <main class="main" id="main">
                            <article class="article article--archive" id="post-">
        <section class="article__header">
            <div class="container mobile-container block--title is-padding-top-large is-padding-bottom-large has-text-centered">
                <h1 class="h1" data-aos="fade-up">Tentoonstellingen</h1>
            </div>
        </section>
        <section class="article__content">
            <div class="container is-padding-bottom-medium">
                                    <ul class="is-clean columns is-multiline is-centered">
                        <li class="tease tease-tentoonstelling column is-one-third has-text-centered" data-aos="fade-up"><div class="tease-image is-margin-bottom-large"><a href="https://huismarseille.nl/tentoonstellingen/vincent-delbrouck/" class="image is-4by3 lazyload has-background" data-bg="/app/uploads/2019/10/Vincent-Delbrouck.-PAPAYA-from-the-series-Champú-2020-518x768.jpg"></a></div><div class="tease-content"><time class="is-block is-margin-bottom has-text-grey">
                    04.09.2021 — 05.12.2022                </time><h3 class="h2 is-padding-bottom"><a href="https://huismarseille.nl/tentoonstellingen/vincent-delbrouck/">
                Vincent Delbrouck
                                            <span class="is-block has-text-grey">Champú</span></a></h3></div></li><li class="tease tease-tentoonstelling column is-one-third has-text-centered" data-aos="fade-up"><div class="tease-image is-margin-bottom-large"><a href="https://huismarseille.nl/tentoonstellingen/sohrab-hura/" class="image is-4by3 lazyload has-background" data-bg="/app/uploads/2021/06/sohrab-hura_press_huis-marseille_001-1-e1624533476138-553x768.jpg"></a></div><div class="tease-content"><time class="is-block is-margin-bottom has-text-grey">
                    04.09.2021 — 05.12.2022                </time><h3 class="h2 is-padding-bottom"><a href="https://huismarseille.nl/tentoonstellingen/sohrab-hura/">
                Sohrab Hura
                                            <span class="is-block has-text-grey">Spill</span></a></h3></div></li><li class="tease tease-tentoonstelling column is-one-third has-text-centered" data-aos="fade-up"><div class="tease-image is-margin-bottom-large"><a href="https://huismarseille.nl/tentoonstellingen/charlotte-dumas/" class="image is-4by3 lazyload has-background" data-bg="/app/uploads/2021/09/Ao-1-2019-614x768.jpg"></a></div><div class="tease-content"><time class="is-block is-margin-bottom has-text-grey">
                    11.12.2021 — 13.03.2022                </time><h3 class="h2 is-padding-bottom"><a href="https://huismarseille.nl/tentoonstellingen/charlotte-dumas/">
                Charlotte Dumas
                                            <span class="is-block has-text-grey">Ao</span></a></h3></div></li><li class="tease tease-tentoonstelling column is-one-third has-text-centered" data-aos="fade-up"><div class="tease-image is-margin-bottom-large"><a href="https://huismarseille.nl/tentoonstellingen/luc-delahaye/" class="image is-4by3 lazyload has-background" data-bg="/app/uploads/2021/10/Le-Champ-959x768.jpg"></a></div><div class="tease-content"><time class="is-block is-margin-bottom has-text-grey">
                    11.12.2021 — 13.03.2022                </time><h3 class="h2 is-padding-bottom"><a href="https://huismarseille.nl/tentoonstellingen/luc-delahaye/">
                Luc Delahaye
                                            <span class="is-block has-text-grey">Le Village</span></a></h3></div></li>                    </ul>
                                                </div>
        </section>
    </article>
        </main>
    `;

    nockHuisMarseille
      .get(/tentoonstellingen/)
      .reply(200, rawHTML);

    const events = await collect();

    expect(events).toMatchObject([{
        title: 'Luc Delahaye Le Village',
        closeDate: moment('2022-03-13').toDate(),
        gallery: {
          name: 'Huis Marseille',
          address: 'Keizersgracht 401, Amsterdam, 1016 EK',
          website: 'https://www.huismarseille.nl/nl'
        },
        website: 'https://www.huismarseille.nlhttps://huismarseille.nl/tentoonstellingen/luc-delahaye/',
        image: 'https://www.huismarseille.nl/app/uploads/2021/10/Le-Champ-959x768.jpg'
      },
      {
        title: 'Charlotte Dumas Ao',
        closeDate: moment('2022-03-13').toDate(),
        gallery: {
          name: 'Huis Marseille',
          address: 'Keizersgracht 401, Amsterdam, 1016 EK',
          website: 'https://www.huismarseille.nl/nl'
        },
        website: 'https://www.huismarseille.nlhttps://huismarseille.nl/tentoonstellingen/charlotte-dumas/',
        image: 'https://www.huismarseille.nl/app/uploads/2021/09/Ao-1-2019-614x768.jpg'
      },
      {
        title: 'Sohrab Hura Spill',
        closeDate: moment('2022-12-05').toDate(),
        gallery: {
          name: 'Huis Marseille',
          address: 'Keizersgracht 401, Amsterdam, 1016 EK',
          website: 'https://www.huismarseille.nl/nl'
        },
        website: 'https://www.huismarseille.nlhttps://huismarseille.nl/tentoonstellingen/sohrab-hura/',
        image: 'https://www.huismarseille.nl/app/uploads/2021/06/sohrab-hura_press_huis-marseille_001-1-e1624533476138-553x768.jpg'
      },
      {
        title: 'Vincent Delbrouck Champú',
        closeDate: moment('2022-12-05').toDate(),
        gallery: {
          name: 'Huis Marseille',
          address: 'Keizersgracht 401, Amsterdam, 1016 EK',
          website: 'https://www.huismarseille.nl/nl'
        },
        website: 'https://www.huismarseille.nlhttps://huismarseille.nl/tentoonstellingen/vincent-delbrouck/',
        image: 'https://www.huismarseille.nl/app/uploads/2019/10/Vincent-Delbrouck.-PAPAYA-from-the-series-Champú-2020-518x768.jpg'
    }])
  });

  it('should fail gracefully when not OK', async () => {
    nockHuisMarseille
      .get(/tentoonstellingen/)
      .reply(404);

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockHuisMarseille
      .get(/tentoonstellingen/)
      .reply(200, 'malformed response');

    const events = await collect();

    expect(events.length).toBe(0);
  });
});
