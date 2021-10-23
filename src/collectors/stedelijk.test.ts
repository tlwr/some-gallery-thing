import moment from 'moment';
import nock from 'nock';

import {collect} from './stedelijk';

describe('collector', () => {
  let nockStedelijk: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockStedelijk = nock('https://www.stedelijk.nl');
  });

  afterEach(() => {
    nockStedelijk.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
            <main role="main" id="main">
<nav
    class="breadcrumbs grid grid--no-vpadding"
    aria-label="Kruimelpad">
    <div class="grid__item--12">
        <ol class="breadcrumbs__list">
                        <li class="breadcrumbs__item">
                <a href="/nl" class="breadcrumbs__link"><span>Home</span></a>
            </li>
                        <li class="breadcrumbs__item">
                <a href="/nl/nu-te-zien" class="breadcrumbs__link"><span>Nu te zien</span></a>
            </li>
                    </ol>
    </div>
</nav>
                    <div class="readspeaker">
    <div class="grid grid--bottom-none">
        <div class="grid__item grid__item--12">
<div class="readspeaker-button">
    <div id="readspeaker_button1" class="rs_skip rsbtn rs_preserve">
        <a rel="nofollow" class="rsbtn_play" accesskey="L" title="Laat de tekst voorlezen met ReadSpeaker webReader" href="//app-eu.readspeaker.com/cgi-bin/rsent?customerid=12485&amp;lang=nl_nl&amp;readid=main&amp;url=https%3A%2F%2Fwww.stedelijk.nl%2Fnl%2Fnu-te-zien%2Ftentoonstellingen">
            <span class="rsbtn_left rsimg rspart"><span class="rsbtn_text"><span>Lees voor</span></span></span>
            <span class="rsbtn_right rsimg rsplay rspart"></span>
        </a>
    </div>
</div>        </div>
    </div>
</div>                                <header
    class="page-header grid
        "
    role="banner">
    <div class="grid__item--12">
        <h1 class="page-header__title ">
                            Tentoon­stel­lingen
                    </h1>

            </div>
</header>


<div class="bar-group">
    <h2 class="bar-group__title">
        Nu
    </h2>
        <ul>
                                <li>
<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/stedelijk-base"
    class="bar bar--medium bar--collection"
    aria-label="De collectie Stedelijk base"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>
            <header class="bar__header">
                <h3 class="bar__title">

            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2018/StedelijkBase/scaled/x-small/Raysse-A%2023906.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            >

            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2018/StedelijkBase/scaled/x-small/A5573%20copy.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            >
                    <span class="bar__title-part">
                        De collectie<br>Stedelijk base
                    </span>


            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_collectie/scaled/1024/malevich-a-7662.jpg"
        srcset="
                        https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_collectie/scaled/x-small/malevich-a-7662.jpg 1w,                        https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_collectie/scaled/320/malevich-a-7662.jpg 300w,                        https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_collectie/scaled/768/malevich-a-7662.jpg 700w            "
                alt=""
        class="image
            image
            bar__image
            "
            >

            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_collectie/scaled/1024/KleinA%2023546.jpg"
        srcset="
                        https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_collectie/scaled/x-small/KleinA%2023546.jpg 1w,                        https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_collectie/scaled/320/KleinA%2023546.jpg 300w,                        https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_collectie/scaled/768/KleinA%2023546.jpg 700w            "
                alt=""
        class="image
            image
            bar__image
            "
            >
                                    </h3>

                                    <p class="bar__extra-info">400 hoogtepunten<br>in kunst en design<br>vóór 1980</p>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>Doorlopend</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>
<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/tomorrow-is-a-different-day"
    class="bar bar--medium
    "
    aria-label="Tomorrow is a Different Day Collectie 1980-nu"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>
            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    Tomorrow is a Different Day
                                            </span>

            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2021/nieuwe%20collectieopstelling/scaled/x-small/anatsui%20klein.jpeg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">
                                            <span class="bar__subtitle  bar__title-part">
                                                    Collectie 1980-nu
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>Doorlopend</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>
<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/bruce-nauman"
    class="bar bar--medium
    "
    aria-label="Bruce Nauman "
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>
            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    Bruce Nauman
                                            </span>

            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2021/Bruce%20Nauman/scaled/x-small/1995.1.0003%20Seven%20Figures.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>5 jun t/m 24 okt 2021</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>
<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/De-Best-Verzorgde-Boeken-2020"
    class="bar bar--medium
    "
    aria-label="De Best Verzorgde Boeken 2020 "
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>
            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    De Best Verzorgde Boeken 2020
                                            </span>

            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2021/Best%20Verzorgde%20Boeken%202020/scaled/x-small/Rij%20selectie%20-%20middel2.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>25 sep t/m 31 okt 2021</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>
<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/kirchner-en-nolde-expressionisme-kolonialisme"
    class="bar bar--medium
    "
    aria-label="KIRCHNER EN NOLDE: EXPRESSIONISME. KOLONIALISME "
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>
            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    KIRCHNER EN NOLDE: EXPRESSIONISME. KOLONIALISME
                                            </span>

            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2021/kirchner%20nolde/scaled/x-small/KirchnerNolde.bar.image.website.NW.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>4 sep t/m 5 dec 2021</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>
<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/oliver-laric"
    class="bar bar--medium
    "
    aria-label="OLIVER LARIC BETWEENNESS"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    OLIVER LARIC
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_nieuws%20en%20pers/2021/programma%20winter%20najaar%202021-2021/scaled/x-small/betweenness_still_2.jpeg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                            <span class="bar__subtitle  bar__title-part">
                                                    BETWEENNESS
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>2 okt 2021 t/m 9 jan 2022</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/now-you-see-me-moria"
    class="bar bar--medium
    "
    aria-label="Now You See Me Moria POST/NO/BILLS #2"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    Now You See Me Moria
                                            </span>

                                            <span class="bar__subtitle  bar__title-part">
                                                    POST/NO/BILLS #2
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>23 okt 2021 t/m 30 jan 2022</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                        </ul>
    </div>



<div class="bar-group">
    <h2 class="bar-group__title">
        Verwacht
    </h2>
        <ul>
                                <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/prix-de-rome-2021"
    class="bar bar--medium
    "
    aria-label="Prix de Rome 2021 "
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    Prix de Rome 2021
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_nieuws%20en%20pers/2021/prix%20de%20rome/scaled/x-small/Prix-shortlist_1280x845px.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>13 nov 2021 t/m 20 mrt 2022</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/let-textiles-talk-2"
    class="bar bar--medium
    "
    aria-label="LET TEXTILES TALK Zes tapijten ontrafeld"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    LET TEXTILES TALK
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2021/Let%20Textiles%20Talk/scaled/x-small/web_kna_1766_download.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                            <span class="bar__subtitle  bar__title-part">
                                                    Zes tapijten ontrafeld
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>13 nov 2021 t/m 20 mrt 2022</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/remy-jungerman"
    class="bar bar--medium
    "
    aria-label="Remy Jungerman Behind the Forest"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    Remy Jungerman
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2021/Remy%20Jungerman/scaled/x-small/07.%20PEEPINA%20A4.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                            <span class="bar__subtitle  bar__title-part">
                                                    Behind the Forest
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>20 nov 2021 t/m 13 mrt 2022</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/hito-steyerl"
    class="bar bar--medium
    "
    aria-label="HITO STEYERL I WILL SURVIVE"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    HITO STEYERL
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_nieuws%20en%20pers/persbeeld/2022/Hito%20Steyerl/scaled/x-small/HS14-005.28.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                            <span class="bar__subtitle  bar__title-part">
                                                    I WILL SURVIVE
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>28 jan t/m 12 jun 2022</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                        </ul>
    </div>



<div class="bar-group">
    <h2 class="bar-group__title">
        Geweest
    </h2>
        <ul>
                                <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/postnobills"
    class="bar bar--medium
    "
    aria-label="We&#039;re Out Here Post/No/Bills #1"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    We&#039;re Out Here
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2020/POST%20NO%20BILLS%20We%20re%20Out%20Here/scaled/x-small/thumbnails-isntprettyenough7-kopie.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                            <span class="bar__subtitle  bar__title-part">
                                                    Post/No/Bills #1
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>5 jun t/m 19 sep 2021</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/van-thonet-tot-dutch-design"
    class="bar bar--medium
    "
    aria-label="VAN THONET TOT DUTCH DESIGN 125 JAAR WONEN IN HET STEDELIJK"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    VAN THONET TOT DUTCH DESIGN
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2020/125%20jaar%20wonen/Thumbnails/scaled/x-small/Persfoto%201%20VTtDD.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                            <span class="bar__subtitle  bar__title-part">
                                                    125 JAAR WONEN IN HET STEDELIJK
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>25 jul 2020 t/m 12 sep 2021</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/charlotte-prodger"
    class="bar bar--medium
    "
    aria-label="CHARLOTTE PRODGER SAF05"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    CHARLOTTE PRODGER
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_nieuws%20en%20pers/persbeeld/2020/Charlotte%20Prodger/scaled/x-small/SaF05_2k_4.34.2.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                            <span class="bar__subtitle  bar__title-part">
                                                    SAF05
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>23 jan t/m 5 sep 2021</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/surinaamse-school"
    class="bar bar--medium
    "
    aria-label="Surinaamse School Schilderkunst van Paramaribo tot Amsterdam"
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    Surinaamse School
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_nieuws%20en%20pers/persbeeld/2020/Surinaamse%20school/scaled/x-small/3armand-baag-familieportet-baag.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                            <span class="bar__subtitle  bar__title-part">
                                                    Schilderkunst van Paramaribo tot Amsterdam
                                                </span>
                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>12 dec 2020 t/m 11 jul 2021</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                                            <li>

<a
    href="https://www.stedelijk.nl/nl/tentoonstellingen/ulay"
    class="bar bar--medium
    "
    aria-label="Ulay Was Here "
    data-enhancer="bar">

    <article class="bar__inner js-bar-inner">
        <div>



            <header class="bar__header">
                <h3 class="bar__title">
                   <span class="bar__title-part">
                                                    Ulay Was Here
                                            </span>



            <img
                src="https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_nieuws%20en%20pers/persbeeld/2020/Ulay/scaled/x-small/031973-74she.jpg"

                alt=""
        class="image
            image
            bar__image
            "
            role="presentation">


                                    </h3>
                                <span aria-hidden="true" class="bar__arrow"></span>
            </header>

            <footer class="bar__footer">
                <h4></h4>
                <p>21 nov 2020 t/m 30 mei 2021</p>
            </footer>
        </div>
    </article>
    <div class="bar__hotspot js-bar-hotspot" data-type="left"></div>
    <div class="bar__hotspot js-bar-hotspot" data-type="right"></div>
</a>            </li>
                        </ul>
    </div>
        <nav class="paginator" aria-label="Paginering">
    <ul>
                <li class="disabled"><span>&laquo;</span></li>

                                                                        <li class="active">
                        <span class="paginator__page-label">
                            Pagina
                        </span>
                        <span class="paginator__page">1</span>
                    </li>
                                                                <li>
                        <a href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=2" class="paginator__page">
                            <span class="paginator__page-label">
                                Pagina
                            </span>
                            2
                        </a>
                    </li>
                                                                <li>
                        <a href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=3" class="paginator__page">
                            <span class="paginator__page-label">
                                Pagina
                            </span>
                            3
                        </a>
                    </li>
                                                                <li>
                        <a href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=4" class="paginator__page">
                            <span class="paginator__page-label">
                                Pagina
                            </span>
                            4
                        </a>
                    </li>
                                                                <li>
                        <a href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=5" class="paginator__page">
                            <span class="paginator__page-label">
                                Pagina
                            </span>
                            5
                        </a>
                    </li>
                                                                <li>
                        <a href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=6" class="paginator__page">
                            <span class="paginator__page-label">
                                Pagina
                            </span>
                            6
                        </a>
                    </li>
                                                                <li>
                        <a href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=7" class="paginator__page">
                            <span class="paginator__page-label">
                                Pagina
                            </span>
                            7
                        </a>
                    </li>
                                                                <li>
                        <a href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=8" class="paginator__page">
                            <span class="paginator__page-label">
                                Pagina
                            </span>
                            8
                        </a>
                    </li>
                                                                    <li class="disabled"><span>...</span></li>
                                                                            <li>
                        <a href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=67" class="paginator__page">
                            <span class="paginator__page-label">
                                Pagina
                            </span>
                            67
                        </a>
                    </li>
                                                                <li>
                        <a href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=68" class="paginator__page">
                            <span class="paginator__page-label">
                                Pagina
                            </span>
                            68
                        </a>
                    </li>

                <li>
            <a
                href="https://www.stedelijk.nl/nl/nu-te-zien/tentoonstellingen?page_past=2"
                class="paginator__next"
                rel="next">
                <span>
                    Volgende pagina
                </span>
            </a>
        </li>
        </ul>
</nav>

            </main>
    `;

    nockStedelijk
      .get(/nu-te-zien/)
      .reply(200, rawHTML);

    const events = await collect();

    expect(events).toMatchObject([{
        title: "Now You See Me Moria POST/NO/BILLS #2",
        closeDate: moment('2022-01-30').toDate(),
        website: "https://www.stedelijk.nl/nl/tentoonstellingen/now-you-see-me-moria",
        gallery: {
          address: "Museumplein 10, 1071 DJ Amsterdam",
          name: "Stedelijk",
          website: "https://www.stedelijk.nl/nl",
        },
    }, {
        title: "OLIVER LARIC BETWEENNESS",
        closeDate: moment('2022-01-09').toDate(),
        gallery: {
            name: "Stedelijk",
            address: "Museumplein 10, 1071 DJ Amsterdam",
            website: "https://www.stedelijk.nl/nl"
        },
        website: "https://www.stedelijk.nl/nl/tentoonstellingen/oliver-laric",
        image: "https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_nieuws%20en%20pers/2021/programma%20winter%20najaar%202021-2021/scaled/x-small/betweenness_still_2.jpeg"
    }, {
        title: "KIRCHNER EN NOLDE: EXPRESSIONISME. KOLONIALISME",
        closeDate: moment('2021-12-05').toDate(),
        gallery: {
            name: "Stedelijk",
            address: "Museumplein 10, 1071 DJ Amsterdam",
            website: "https://www.stedelijk.nl/nl"
        },
        website: "https://www.stedelijk.nl/nl/tentoonstellingen/kirchner-en-nolde-expressionisme-kolonialisme",
        image: "https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2021/kirchner%20nolde/scaled/x-small/KirchnerNolde.bar.image.website.NW.jpg"
    }, {
        title: "De Best Verzorgde Boeken 2020",
        closeDate: moment('2021-10-31').toDate(),
        gallery: {
            name: "Stedelijk",
            address: "Museumplein 10, 1071 DJ Amsterdam",
            website: "https://www.stedelijk.nl/nl"
        },
        website: "https://www.stedelijk.nl/nl/tentoonstellingen/De-Best-Verzorgde-Boeken-2020",
        image: "https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2021/Best%20Verzorgde%20Boeken%202020/scaled/x-small/Rij%20selectie%20-%20middel2.jpg"
    }, {
        title: "Bruce Nauman",
        closeDate: moment('2021-10-24').toDate(),
        gallery: {
            name: "Stedelijk",
            address: "Museumplein 10, 1071 DJ Amsterdam",
            website: "https://www.stedelijk.nl/nl"
        },
        website: "https://www.stedelijk.nl/nl/tentoonstellingen/bruce-nauman",
        image: "https://s3-eu-west-1.amazonaws.com/production-static-stedelijk/images/_whats%20on/tentoonstellingen/2021/Bruce%20Nauman/scaled/x-small/1995.1.0003%20Seven%20Figures.jpg"
    }]);
  });

  it('should fail gracefully when not OK', async () => {
    nockStedelijk
      .get(/nu-te-zien/)
      .reply(404);

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockStedelijk
      .get(/nu-te-zien/)
      .reply(200, 'malformed response');

    const events = await collect();

    expect(events.length).toBe(0);
  });
});
