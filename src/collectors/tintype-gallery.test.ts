import moment from 'moment';
import nock from 'nock';

import {collect} from './tintype-gallery';

describe('collector', () => {
  let nockTintype: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockTintype = nock('https://www.tintypegallery.com');
  });

  afterEach(() => {
    nockTintype.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
<body class="archive post-type-archive post-type-archive-exhibition">
<div id="page" class="hfeed site">
  <header id="masthead" class="site-header" role="banner">
      <div class="container">
        <div class="column full">
          <div class="site-branding">
            <a id="logo" href="https://www.tintypegallery.com/" rel="home">
            <img src="https://www.tintypegallery.com/wp-content/themes/tintype/img/TINTYPE_logo.png" alt="TINTYPE">
            </a>
          </div><!-- .site-branding -->
          <nav id="site-navigation" class="main-navigation" role="navigation">
            <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">Menu</button>
            <div class="menu-main-menu-container"><ul id="primary-menu" class="menu nav-menu" aria-expanded="false"><li id="menu-item-18" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-18"><a href="/artists/">Artists</a></li>
<li id="menu-item-19" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-19"><a href="/exhibitions/">Exhibitions</a></li>
<li id="menu-item-3918" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3918"><a href="https://www.tintypegallery.com/public-projects/">Public Projects</a></li>
<li id="menu-item-26" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-26"><a href="https://www.tintypegallery.com/about/">About</a></li>
<li id="menu-item-2293" class="menu-item menu-item-type-post_type menu-item-object-page current_page_parent menu-item-2293"><a href="https://www.tintypegallery.com/about/news/">News</a></li>
<li id="menu-item-25" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-25"><a href="https://www.tintypegallery.com/contact/">Contact</a></li>
</ul></div>					</nav><!-- #site-navigation -->
        </div>
      </div>
  </header><!-- #masthead -->
  <main id="content" class="site-content">
  <div id="primary" class="container content-area">
            <div class="column half">
    <section>
    <header>
    <h2 class="box"><span>Current / Forthcoming</span></h2>
    </header>
       <article id="post-5299" class="post-5299 exhibition type-exhibition status-publish hentry category-current-forthcoming">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/in-constant-use/">
        <h2><span class="nowrap title">In Constant Use</span>
                    <span class="nowrap artist">Adam Gillam</span>
                      </h2>
          <h3 class="date">10 June&nbsp;–&nbsp;18 July 2020</h3>
          <div class="extra-information"><p>The gallery has re-opened and we look forward to seeing you again.<br>
Safety procedures are in place. No more than three visitors in the gallery at one time.</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
       <article id="post-5511" class="post-5511 exhibition type-exhibition status-publish hentry category-current-forthcoming">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/dread-one-day-at-a-time/">
        <h2><span class="nowrap title">Dread one day at a time</span>
                    <span class="nowrap artist">Jo Addison</span>
                      </h2>
          <h3 class="date">22 July&nbsp;–&nbsp;12 September 2020</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
        </section>
    </div>
    <div class="column half">
    <section>
      <header class="page-header">
        <h2 class="box"><span>Past Exhibitions</span></h2>
      </header><!-- .page-header -->
      <ul class="tabs-menu">
        <!-- Year Tabs Loop -->
                                  <li class="current"><a href="#2020">2020</a></li>
                          <li><a href="#2019">2019</a></li>
                          <li><a href="#2018">2018</a></li>
                          <li><a href="#2017">2017</a></li>
                          <li><a href="#2016">2016</a></li>
                          <li><a href="#2015">2015</a></li>
                          <li><a href="#2014">2014</a></li>
                          <li><a href="#2013">2013</a></li>
                          <li><a href="#2012">2012</a></li>
                          <li><a href="#2011">2011</a></li>
                          <li><a href="#2010">2010</a></li>
              </ul>
        <!-- END Year Tabs Loop -->
    <!-- Post Loop -->
     <div class="tab">
                    <div id="2020" class="tab-content active-tab">
           <article id="post-5186" class="post-5186 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/together-with-them-she-went/">
        <h2><span class="nowrap title">Together With Them She Went</span>
          <span class="nowrap artist">Alice Walton with Anna Lucas</span>	   				</h2>
          <h3 class="date">1 April&nbsp;–&nbsp;30 May 2020</h3>
          <div class="extra-information"><p>Open by appointment only<br>
Contact: info@tintypegallery.com</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-5109" class="post-5109 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/time-smoking-a-picture/">
        <h2><span class="nowrap title">Time Smoking a Picture</span>
                    <span class="nowrap artist">George Eksts</span>
                      </h2>
          <h3 class="date">13 February&nbsp;–&nbsp;14 March 2020</h3>
          <div class="extra-information"><p>Opening:  Wednesday 12 February, 6.30 – 8.30pm</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-5025" class="post-5025 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/essex-road-6/">
        <h2><span class="nowrap title">Essex Road 6</span>
          <span class="nowrap artist">Ayo Akingbade, Adam Chodzko, Patrick Goddard, Lucy Harris, Rebecca Lennon, Maryam Mohajer, Melanie Smith, Webb-Ellis</span>	   				</h2>
          <h3 class="date">10 January&nbsp;–&nbsp;9 February 2020</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
              </div>
                    <div id="2019" class="tab-content">
           <article id="post-5019" class="post-5019 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/more-gravy/">
        <h2><span class="nowrap title">More Gravy!</span>
          <span class="nowrap artist"> Jo Addison • Edwina Ashton • Alice Browne • An Gee Chan • Suki Chan • David Micheaud • George Eksts • Adam Gillam • Grant Foster • Oona Grimes • Katrin Hanusch • Vanessa Jackson • Jost Münster • Kit Poulson • Kathy Prendergast • Neal Rock • Neal Tait • Alison Turnbull • Virginia Verran • Alice Walton • Laura White • Joby Williamson • Michelle Williams Gamaker • Madalina Zaharia</span>	   				</h2>
          <h3 class="date">11 December&nbsp;–&nbsp;4 January 2020</h3>
          <div class="extra-information"><p>Opening: Tuesday 10 December 6pm – 8pm</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-4845" class="post-4845 exhibition type-exhibition status-publish has-post-thumbnail hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/drawn-breath/">
        <h2><span class="nowrap title">Drawn Breath</span>
                    <span class="nowrap artist">David Cheeseman</span>
                      </h2>
          <h3 class="date">2 November&nbsp;–&nbsp;7 December 2019</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-4778" class="post-4778 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/distant-relative/">
        <h2><span class="nowrap title">Distant Relative</span>
                    <span class="nowrap artist">Michelle Williams Gamaker</span>
                      </h2>
          <h3 class="date">12 September&nbsp;–&nbsp;19 October 2019</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-4717" class="post-4717 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/correction-tintype-summer-window/">
        <h2><span class="nowrap title">Correction | Tintype Summer Window</span>
          <span class="nowrap artist">Josephine Baker</span>	   				</h2>
          <h3 class="date">25 July&nbsp;–&nbsp;2 September 2019</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-4486" class="post-4486 exhibition type-exhibition status-publish has-post-thumbnail hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/why-we-got-so-fat/">
        <h2><span class="nowrap title">Why we got so fat | Tintype Project Space 2019</span>
          <span class="nowrap artist">Edwina Ashton</span>	   				</h2>
          <h3 class="date">19 June&nbsp;–&nbsp;20 July 2019</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-4266" class="post-4266 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/the-clever-girl-painter/">
        <h2><span class="nowrap title">The Clever Girl Painter</span>
          <span class="nowrap artist">Laura White</span>	   				</h2>
          <h3 class="date">1 May&nbsp;–&nbsp;1 June 2019</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-4262" class="post-4262 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/1d-for-abroad/">
        <h2><span class="nowrap title">1d for Abroad</span>
          <span class="nowrap artist">Jonathan Allen, Josephine Baker, Frances Burden, Marion Coutts, Phil Coy, Tim Davies, Judith Dean, Alec Finlay, Grant Foster, Ana Genoves, Jeff Gibbons, Adam Gillam, Andrew Gillespie, Oona Grimes, Lucy Gunning, Lucy Harris, Rebecca Loweth, Jeff McMillan, Simon Morley, Harold Offeh, Rose O'Gallivan, Kit Poulson, Clunie Reid, Aura Satz, Kate Squires, Paul Tarragó, Roy Voss, John Walter, Joby Williamson, Mick Williamson</span>	   				</h2>
          <h3 class="date">7 March&nbsp;–&nbsp;6 April 2019</h3>
          <div class="extra-information"><p>Opening event Wednesday 6 March, 6.30 – 9.30</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-4209" class="post-4209 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/found/">
        <h2><span class="nowrap title">Found</span>
          <span class="nowrap artist">Alice Browne</span>	   				</h2>
          <h3 class="date">24 January&nbsp;–&nbsp;23 February 2019</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
              </div>
                    <div id="2018" class="tab-content">
           <article id="post-4146" class="post-4146 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/essex-road-5/">
        <h2><span class="nowrap title">Essex Road 5</span>
          <span class="nowrap artist">David Blandy, Michelle Deignan, Rä di Martino, Dmitri Galitzine, Jayne Parker, Hiraki Sawa, Nicole Vinokur, Michelle Williams Gamaker</span>	   				</h2>
          <h3 class="date">13 December&nbsp;–&nbsp;19 January 2019</h3>
          <div class="extra-information"><p>The eight films are screened every day from 4pm to 11pm in the gallery window. They are on a loop and the total running time is 42 minutes.</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-4084" class="post-4084 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/thicc-bills-adventure/">
        <h2><span class="nowrap title">Thicc Bill’s Adventures</span>
          <span class="nowrap artist">Neal Tait</span>	   				</h2>
          <h3 class="date">25 October&nbsp;–&nbsp;1 December 2018</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3954" class="post-3954 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/taking-positions/">
        <h2><span class="nowrap title">Taking Positions</span>
                    <span class="nowrap artist">Lynne Marsh</span>
                      </h2>
          <h3 class="date">13 September&nbsp;–&nbsp;13 October 2018</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3920" class="post-3920 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/the-slip-summer-window-installation/">
        <h2><span class="nowrap title">The Slip</span>
          <span class="nowrap artist">Milly Peck</span>	   				</h2>
          <h3 class="date">18 July&nbsp;–&nbsp;31 August 2018</h3>
          <div class="extra-information"><p>2018 Tintype Summer Window Installation</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3783" class="post-3783 exhibition type-exhibition status-publish has-post-thumbnail hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/animal-condensedanimal-expanded-2/">
        <h2><span class="nowrap title">Animal Condensed&gt;Animal Expanded</span>
                    <span class="nowrap artist">Jennet Thomas</span>
                      </h2>
          <h3 class="date">14 June&nbsp;–&nbsp;14 July 2018</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3741" class="post-3741 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/go-on-without-me/">
        <h2><span class="nowrap title">Go On Without Me</span>
          <span class="nowrap artist">An Gee Chan</span>	   				</h2>
          <h3 class="date">27 April&nbsp;–&nbsp;26 May 2018</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3624" class="post-3624 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/interval-still-now/">
        <h2><span class="nowrap title">Interval [ ] still : now</span>
          <span class="nowrap artist">Moyra Derby, Nicky Hamlyn, Conor Kelly, Joan Key, Jost Münster</span>	   				</h2>
          <h3 class="date">2 March&nbsp;–&nbsp;31 March 2018</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3569" class="post-3569 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/tar-paintings/">
        <h2><span class="nowrap title">Tar Paintings</span>
          <span class="nowrap artist">Eleanor Bartlett</span>	   				</h2>
          <h3 class="date">19 January&nbsp;–&nbsp;17 February 2018</h3>
          <div class="extra-information"><p>Curated by Michael Simpson</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
              </div>
                    <div id="2017" class="tab-content">
           <article id="post-3459" class="post-3459 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/essex-road-iv/">
        <h2><span class="nowrap title">Essex Road IV</span>
          <span class="nowrap artist">Edwina Ashton, Chloe Dewe Mathews, Benedict Drew, Judith Goddard, Matthew Noel-Tod, Paul Tarragó, Richard Wentworth, Xiaowen Zhu</span>	   				</h2>
          <h3 class="date">8 December&nbsp;–&nbsp;13 January 2018</h3>
          <div class="extra-information"><p>The films screen in the gallery window every day from 4pm to 11pm</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3414" class="post-3414 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/work-work/">
        <h2><span class="nowrap title">Work Work</span>
          <span class="nowrap artist">Jo Addison, Buffet d'art, Rachel Cattle, Jenny Dunseath, Adam Gillam, Brian Griffiths, Mark Harris, Kevin Hunt, Hollington &amp; Kyprianou, Dean Kenning, Natasha Kidd, Neill Kidgell, John Lawrence, Anna Lucas, Mary Maclean, Zoë Mendelson, Max Mosscrop, Harold Offeh, Alex Schady, Bob &amp; Roberta Smith, Kate Squires, Emma Talbot, Mandy Ure, Roxy Walsh, We Are Publication, Michelle Williams Gamaker</span>	   				</h2>
          <h3 class="date">2 November&nbsp;–&nbsp;2 December 2017</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3311" class="post-3311 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/debt/">
        <h2><span class="nowrap title">DEBT.</span>
                    <span class="nowrap artist">Madalina Zaharia</span>
                      </h2>
          <h3 class="date">7 September&nbsp;–&nbsp;14 October 2017</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3250" class="post-3250 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/a-light-here/">
        <h2><span class="nowrap title">A Light Here…</span>
          <span class="nowrap artist">Vanessa Jackson</span>	   				</h2>
          <h3 class="date">21 July&nbsp;–&nbsp;2 September 2017</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-3172" class="post-3172 exhibition type-exhibition status-publish has-post-thumbnail hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/and-now-grants-for-irish-lesbians/">
        <h2><span class="nowrap title">And Now…Grants for Irish Lesbians! | Tintype Project Space 2017</span>
          <span class="nowrap artist">Alice May Williams</span>	   				</h2>
          <h3 class="date">16 June&nbsp;–&nbsp;15 July 2017</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-2833" class="post-2833 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/ground-figure-sky/">
        <h2><span class="nowrap title">Ground, Figure, Sky</span>
          <span class="nowrap artist">Grant Foster</span>	   				</h2>
          <h3 class="date">27 April&nbsp;–&nbsp;3 June 2017</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-2774" class="post-2774 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/marion-coutts-aiming-or-hitting/">
        <h2><span class="nowrap title">Aiming or Hitting</span>
          <span class="nowrap artist">Marion Coutts</span>	   				</h2>
          <h3 class="date">10 March&nbsp;–&nbsp;13 April 2017</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-2654" class="post-2654 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/mudhook/">
        <h2><span class="nowrap title">Mudhook</span>
          <span class="nowrap artist">Emma Cousin, Milly Peck</span>	   				</h2>
          <h3 class="date">18 January&nbsp;–&nbsp;18 February 2017</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
              </div>
                    <div id="2016" class="tab-content">
           <article id="post-2565" class="post-2565 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/essex-road-iii/">
        <h2><span class="nowrap title">Essex Road III</span>
          <span class="nowrap artist">Susan Collins, Lynne Marsh, Jennet Thomas, Amikam Toren, John Walter, Alice May Williams, Joby Williamson, Andrea Luka Zimmerman</span>	   				</h2>
          <h3 class="date">9 December&nbsp;–&nbsp;14 January 2017</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-2440" class="post-2440 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/almost-all-the-girls-raise-their-hands/">
        <h2><span class="nowrap title">Almost All the Girls Raise Their Hands</span>
                    <span class="nowrap artist">Alice Walton</span>
                      </h2>
          <h3 class="date">2 November&nbsp;–&nbsp;3 December 2016</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-2350" class="post-2350 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/lucida/">
        <h2><span class="nowrap title">Lucida</span>
                    <span class="nowrap artist">Suki Chan</span>
                      </h2>
          <h3 class="date">16 September&nbsp;–&nbsp;22 October 2016</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-2298" class="post-2298 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/youll-thank-me-later-promise/">
        <h2><span class="nowrap title">You’ll thank me later, promise</span>
          <span class="nowrap artist">Lucia Quevedo</span>	   				</h2>
          <h3 class="date">28 July&nbsp;–&nbsp;20 August 2016</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-2184" class="post-2184 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/paridayda-tintype-project-space/">
        <h2><span class="nowrap title">Paridayda | Tintype Project Space 2016</span>
          <span class="nowrap artist">Nicole Vinokur</span>	   				</h2>
          <h3 class="date">27 June&nbsp;–&nbsp;23 July 2016</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-2100" class="post-2100 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/david-cheeseman-slime-mould-logic/">
        <h2><span class="nowrap title">Slime Mould Logic</span>
          <span class="nowrap artist">David Cheeseman</span>	   				</h2>
          <h3 class="date">20 May&nbsp;–&nbsp;18 June 2016</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-1990" class="post-1990 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/joby-williamson/">
        <h2><span class="nowrap title">Heel Bar</span>
                    <span class="nowrap artist">Joby Williamson</span>
                      </h2>
          <h3 class="date">14 April&nbsp;–&nbsp;7 May 2016</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-1668" class="post-1668 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/jost-munster-new-neighbours/">
        <h2><span class="nowrap title">New Neighbours</span>
                    <span class="nowrap artist">Jost Münster</span>
                      </h2>
          <h3 class="date">25 February&nbsp;–&nbsp;26 March 2016</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-1627" class="post-1627 exhibition type-exhibition status-publish has-post-thumbnail hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/bench/">
        <h2><span class="nowrap title">Bench</span>
          <span class="nowrap artist">Assemble, Helen Barff, Adam Clarke, Anna Lucas, Michael Simpson, Richard Wentworth, Joby Williamson, Madalina Zaharia.</span>	   				</h2>
          <h3 class="date">21 January&nbsp;–&nbsp;13 February 2016</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
              </div>
                    <div id="2015" class="tab-content">
           <article id="post-118" class="post-118 exhibition type-exhibition status-publish has-post-thumbnail hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/essex-road-ii/">
        <h2><span class="nowrap title">Essex Road II</span>
          <span class="nowrap artist">Jordan Baseman, Helen Benigson, Sebastian Buerkner, Jem Cohen, Ruth Maclennan, Melanie Manchot, Uriel Orlow, John Smith</span>	   				</h2>
          <h3 class="date">10 December&nbsp;–&nbsp;16 January 2016</h3>
          <div class="extra-information"><p>The eight films screen continuously in the window of the gallery – every day from 4pm to midnight</p>
</div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-1300" class="post-1300 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/stop-bugging-me-frame-3/">
        <h2><span class="nowrap title">Stop Bugging Me: Frame 3</span>
          <span class="nowrap artist">Jo Addison</span>	   				</h2>
          <h3 class="date">11 November&nbsp;–&nbsp;5 December 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-1289" class="post-1289 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/stop-bugging-me-frame-2-oona-grimes/">
        <h2><span class="nowrap title">Stop Bugging Me: Frame 2</span>
          <span class="nowrap artist">Oona Grimes</span>	   				</h2>
          <h3 class="date">14 October&nbsp;–&nbsp;7 November 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-110" class="post-110 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/stop-bugging-me/">
        <h2><span class="nowrap title">Stop Bugging Me: Frame 1</span>
          <span class="nowrap artist">Adam Gillam</span>	   				</h2>
          <h3 class="date">9 September&nbsp;–&nbsp;10 October 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-336" class="post-336 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/looking-london-talking-tokyo/">
        <h2><span class="nowrap title">Looking London, Talking Tokyo</span>
          <span class="nowrap artist">Madalina Zaharia</span>	   				</h2>
          <h3 class="date">25 July&nbsp;–&nbsp;1 September 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-41" class="post-41 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/home-not-home/">
        <h2><span class="nowrap title">Home not Home</span>
          <span class="nowrap artist">Kayde Anobile</span>	   				</h2>
          <h3 class="date">25 June&nbsp;–&nbsp;18 July 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-54" class="post-54 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/behind-the-curtain/">
        <h2><span class="nowrap title">Behind The Curtain | Tintype Project Space 2015</span>
          <span class="nowrap artist">Holly Slingsby</span>	   				</h2>
          <h3 class="date">6 May&nbsp;–&nbsp;1 July 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-330" class="post-330 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/burn/">
        <h2><span class="nowrap title">Burn</span>
          <span class="nowrap artist">Elizabeth Gosling</span>	   				</h2>
          <h3 class="date">16 April&nbsp;–&nbsp;9 May 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-324" class="post-324 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/the-duddo-field-club-audit/">
        <h2><span class="nowrap title">The Duddo Field Club Audit</span>
          <span class="nowrap artist">William Cobbing</span>	   				</h2>
          <h3 class="date">27 February&nbsp;–&nbsp;4 April 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-52" class="post-52 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/when-youre-not-around/">
        <h2><span class="nowrap title">When You’re Not Around</span>
                    <span class="nowrap artist">An Gee Chan</span>
                      </h2>
          <h3 class="date">21 January&nbsp;–&nbsp;21 February 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
              </div>
                    <div id="2014" class="tab-content">
           <article id="post-208" class="post-208 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/essex-road/">
        <h2><span class="nowrap title">Essex Road</span>
          <span class="nowrap artist">Suki Chan, George Eksts, Tony Grisoni,  Andrew Kötting, Anna Lucas, Emily Richardson, Frances Scott, Penny Woolcock</span>	   				</h2>
          <h3 class="date">18 December&nbsp;–&nbsp;15 January 2015</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-320" class="post-320 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/is-this-why-i-cannot-tell-lies/">
        <h2><span class="nowrap title">Is This Why I Cannot Tell Lies?</span>
          <span class="nowrap artist">Aikaterini Gegisian</span>	   				</h2>
          <h3 class="date">19 November&nbsp;–&nbsp;13 December 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-204" class="post-204 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/cause-unknown/">
        <h2><span class="nowrap title">Cause Unknown</span>
                    <span class="nowrap artist">George Eksts</span>
                      </h2>
          <h3 class="date">8 October&nbsp;–&nbsp;8 November 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-315" class="post-315 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/screaming-hornets/">
        <h2><span class="nowrap title">Screaming Hornets</span>
          <span class="nowrap artist">Hadas Auerbach, Jack Brindley, Nicholas Brooks, Adam Clarke, Charlotte Develter, Aimee Parrott, Milly Peck, Tobias Teschner</span>	   				</h2>
          <h3 class="date">5 September&nbsp;–&nbsp;27 September 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-313" class="post-313 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/dividend/">
        <h2><span class="nowrap title">Dividend</span>
          <span class="nowrap artist">Joby Williamson</span>	   				</h2>
          <h3 class="date">1 August&nbsp;–&nbsp;6 September 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-309" class="post-309 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/filiation/">
        <h2><span class="nowrap title">Filiation</span>
          <span class="nowrap artist">Sofie Grevelius</span>	   				</h2>
          <h3 class="date">19 June&nbsp;–&nbsp;19 July 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-307" class="post-307 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/not-her-real-name/">
        <h2><span class="nowrap title">Not Her Real Name</span>
          <span class="nowrap artist">Alice Walton</span>	   				</h2>
          <h3 class="date">8 May&nbsp;–&nbsp;7 June 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-303" class="post-303 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/ec1-wc1-galleries-day/">
        <h2><span class="nowrap title">EC1 &amp; WC1 Galleries Day</span>
          <span class="nowrap artist">An Gee Chan, Suki Chan, George Eksts, Adam Gillam, Sofie Grevelius, Oona Grimes, Serena Korda, Stephanie Land, Jost Munster, Alice Walton, Joby Williamson, Tom Woolner</span>	   				</h2>
          <h3 class="date">25 April&nbsp;–&nbsp;1 May 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-298" class="post-298 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/fixed-position/">
        <h2><span class="nowrap title">Fixed Position</span>
          <span class="nowrap artist">Flora Parrott</span>	   				</h2>
          <h3 class="date">12 March&nbsp;–&nbsp;19 April 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-296" class="post-296 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/some-chthonic-swamp-experience/">
        <h2><span class="nowrap title">Some Chthonic Swamp Experience | Tintype Project Space 2014</span>
          <span class="nowrap artist">Beth Collar</span>	   				</h2>
          <h3 class="date">12 February&nbsp;–&nbsp;8 March 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
              </div>
                    <div id="2013" class="tab-content">
           <article id="post-293" class="post-293 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/together-for-now/">
        <h2><span class="nowrap title">Together for Now</span>
                    <span class="nowrap artist">Jost Münster</span>
                      </h2>
          <h3 class="date">11 December&nbsp;–&nbsp;25 January 2014</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-291" class="post-291 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/kltz-pmz-aaaaaa/">
        <h2><span class="nowrap title">KLTZ. PMZ. AAAAAA!</span>
          <span class="nowrap artist">Madalina Zaharia</span>	   				</h2>
          <h3 class="date">6 November&nbsp;–&nbsp;7 December 2013</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-289" class="post-289 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/not-trees-and-people/">
        <h2><span class="nowrap title">Not Trees and People</span>
          <span class="nowrap artist">Jo Addison</span>	   				</h2>
          <h3 class="date">18 September&nbsp;–&nbsp;26 October 2013</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-287" class="post-287 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/filing-down-a-steel-bar-until-a-needle-is-made/">
        <h2><span class="nowrap title">Filing Down a Steel Bar until a Needle is Made</span>
          <span class="nowrap artist">Morgan Wong</span>	   				</h2>
          <h3 class="date">14 September&nbsp;–&nbsp;14 September 2013</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-285" class="post-285 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/ideal-paste/">
        <h2><span class="nowrap title">Ideal Paste</span>
          <span class="nowrap artist">Adam Gillam</span>	   				</h2>
          <h3 class="date">24 April&nbsp;–&nbsp;8 June 2013</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-281" class="post-281 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/chorus-swell-the-thickening-surface-of/">
        <h2><span class="nowrap title">Chorus: Swell the Thickening Surface Of | Tintype Project Space 2013</span>
          <span class="nowrap artist">Florence Peake</span>	   				</h2>
          <h3 class="date">6 March&nbsp;–&nbsp;6 April 2013</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-279" class="post-279 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/open-close-thing/">
        <h2><span class="nowrap title">Open Close Thing</span>
          <span class="nowrap artist">Cian McConn</span>	   				</h2>
          <h3 class="date">9 January&nbsp;–&nbsp;2 February 2013</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
              </div>
                    <div id="2012" class="tab-content">
           <article id="post-277" class="post-277 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/the-back-of-your-head/">
        <h2><span class="nowrap title">The Back of Your Head</span>
          <span class="nowrap artist">An Gee Chan</span>	   				</h2>
          <h3 class="date">14 November&nbsp;–&nbsp;15 December 2012</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-273" class="post-273 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/crazee-golf/">
        <h2><span class="nowrap title">Crazee Golf</span>
          <span class="nowrap artist">Jo Addison, Jordan Baseman, Fran Burden, William Cobbing, Nicky Coutts, Marcia Farquhar &amp; Jem Finer, Edward Fornieles, Adam Gillam, Oona Grimes, Tony Grisoni, Jost Münster, Clunie Reid, Alice Walton, Richard Wentworth, Joby Williamson, Sarah Woodfine, Tom Woolner</span>	   				</h2>
          <h3 class="date">7 September&nbsp;–&nbsp;27 October 2012</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-271" class="post-271 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/greenhorn/">
        <h2><span class="nowrap title">Greenhorn</span>
          <span class="nowrap artist">Kira Freije</span>	   				</h2>
          <h3 class="date">14 June&nbsp;–&nbsp;14 July 2012</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-269" class="post-269 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/sight-unseen/">
        <h2><span class="nowrap title">Sight Unseen</span>
          <span class="nowrap artist">Rachel Lichtenstein</span>	   				</h2>
          <h3 class="date">30 May&nbsp;–&nbsp;9 June 2012</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
           <article id="post-266" class="post-266 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
        <a href="https://www.tintypegallery.com/exhibitions/in-the-pleasing/">
        <h2><span class="nowrap title">In the Pleasing</span>
          <span class="nowrap artist">Alice Walton</span>	   				</h2>
          <h3 class="date">25 April&nbsp;–&nbsp;26 May 2012</h3>
          <div class="extra-information"></div>
                  </a>
      </header><!-- .entry-header -->
     </article><!-- #post-## -->
      <article id="post-264" class="post-264 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/infinials/">
      <h2><span class="nowrap title">Infinials</span>
      <span class="nowrap artist">George Eksts</span>	   				</h2>
      <h3 class="date">29 February&nbsp;–&nbsp;31 March 2012</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      <article id="post-262" class="post-262 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/self-portrait-as-a-plank-of-wood-tintype-project-space/">
      <h2><span class="nowrap title">Self Portrait as a Plank of Wood | Tintype Project Space 2012</span>
      <span class="nowrap artist">Tom Woolner</span>	   				</h2>
      <h3 class="date">25 January&nbsp;–&nbsp;11 February 2012</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      </div>
      <div id="2011" class="tab-content">
      <article id="post-258" class="post-258 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/shadow-lines/">
      <h2><span class="nowrap title">Shadow Lines</span>
      <span class="nowrap artist">Anne Harild, Rose O'Gallivan, Maya Ramsay</span>	   				</h2>
      <h3 class="date">9 November&nbsp;–&nbsp;10 December 2011</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      <article id="post-251" class="post-251 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/circuit-five-deductions/">
      <h2><span class="nowrap title">Circuit: Five Deductions</span>
      <span class="nowrap artist">Flora Parrott</span>	   				</h2>
      <h3 class="date">21 September&nbsp;–&nbsp;22 October 2011</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      <article id="post-248" class="post-248 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/simulacra/">
      <h2><span class="nowrap title">Simulacra</span>
      <span class="nowrap artist">Kayde Anobile</span>	   				</h2>
      <h3 class="date">9 March&nbsp;–&nbsp;9 April 2011</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      <article id="post-241" class="post-241 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/an-gee-chan/">
      <h2><span class="nowrap title">Tintype Project Space 2011</span>
      <span class="nowrap artist">An Gee Chan</span>	   				</h2>
      <h3 class="date">7 February&nbsp;–&nbsp;5 March 2011</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      <article id="post-237" class="post-237 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/smokefall/">
      <h2><span class="nowrap title">Smokefall</span>
      <span class="nowrap artist">Jo Addison, Suki Chan, Oona Grimes, Serena Korda, Littlewhitehead, Flora Parrott, Catherine Shakespeare Lane, Stephen Smith, Amikam Toren, John Walter, Alice Walton,  Joby Williamson,</span>	   				</h2>
      <h3 class="date">13 January&nbsp;–&nbsp;5 February 2011</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      </div>
      <div id="2010" class="tab-content">
      <article id="post-234" class="post-234 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/utopia-on-the-horizon/">
      <h2><span class="nowrap title">Utopia on the Horizon</span>
      <span class="nowrap artist">Suki Chan</span>	   				</h2>
      <h3 class="date">11 November&nbsp;–&nbsp;18 December 2010</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      <article id="post-227" class="post-227 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/theres-a-strange-wind-blowing/">
      <h2><span class="nowrap title">There’s a Strange Wind Blowing</span>
      <span class="nowrap artist">Serena Korda</span>	   				</h2>
      <h3 class="date">23 September&nbsp;–&nbsp;30 October 2010</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      <article id="post-224" class="post-224 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/what-have-you-forgotten/">
      <h2><span class="nowrap title">What Have You Forgotten?</span>
      <span class="nowrap artist">Joby Williamson</span>	   				</h2>
      <h3 class="date">11 June&nbsp;–&nbsp;18 July 2010</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      <article id="post-217" class="post-217 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/irregular-wasps/">
      <h2><span class="nowrap title">Irregular Wasps</span>
      <span class="nowrap artist">Ed Fornieles, Kasia Fudakowski, Andrew Gillespie, Eloise Hawser, Alan McQuillan, Sam Nias, Ruairiadh O'Connell, Samuel Williams, Flora Parrott</span>	   				</h2>
      <h3 class="date">29 April&nbsp;–&nbsp;3 June 2010</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      <article id="post-202" class="post-202 exhibition type-exhibition status-publish hentry">
      <header class="entry-header">
      <a href="https://www.tintypegallery.com/exhibitions/stripped-away/">
      <h2><span class="nowrap title">Stripped Away</span>
      <span class="nowrap artist">Birgir Snæbjörn Birgisson, Helgi Hjaltalin Eyjolfsson, Helgi Thorgils Fridjónsson</span>	   				</h2>
      <h3 class="date">24 February&nbsp;–&nbsp;14 March 2010</h3>
      <div class="extra-information"></div>
      </a>
      </header><!-- .entry-header -->
      </article><!-- #post-## -->
      </div>
      </div>
      <!-- END Post Loop -->
      </section>
      </div>
      </div><!-- #primary -->
      </main><!-- #content -->
      <footer id="colophon" class="site-footer container" role="contentinfo">
      <div class="site-info">
      <div class="column half left">
      <p>
      <span>107 Essex Road, London N1 2SL</span>&nbsp;&nbsp;
    <!--<span>Opening Hours: Wed – Sat 12 – 6pm</span>-->
      </p>
      </div>
      <div class="column half right">
      <p>
      <span><a href="https://twitter.com/tintypegallery" target="_blank"><i class="fa fa-twitter"></i></a>&nbsp;&nbsp;<a href="https://www.facebook.com/tintype.art.gallery?fref=ts" target="_blank"><i class="fa fa-facebook"></i></a>&nbsp;&nbsp;<a href="https://instagram.com/tintypelondon" target="_blank"><i class="fa fa-instagram"></i></a></span><span><a class="various" href="#mc-newsletter">Mailing List Signup</a></span>
      </p>
      </div>
      </div><!-- END site-info -->
      </footer><!-- #colophon -->
      </div><!-- #page -->
    `;

    nockTintype
      .get(/exhibitions/)
      .reply(200, rawHTML);
    ;

    const events = await collect();

    expect(events.length).toBe(2);

    expect(events).toMatchObject([{
      title: 'Jo Addison: Dread one day at a time',
      openDate: moment('22-07', 'DD-MM').toDate(),
      closeDate: moment('2020-09-12').toDate(),
      website: 'https://www.tintypegallery.com/exhibitions/dread-one-day-at-a-time/',

      gallery: {
        name: 'Tintype',
      },
    },{
      title: 'Adam Gillam: In Constant Use',
      openDate: moment('10-06', 'DD-MM').toDate(),
      closeDate: moment('2020-07-18').toDate(),
      website: 'https://www.tintypegallery.com/exhibitions/in-constant-use/',

      gallery: {
        name: 'Tintype',
      },
    }]);
  });


  it('should fail gracefully when not OK', async () => {
    nockTintype
      .get(/exhibitions/)
      .reply(404);
    ;

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockTintype
      .get(/exhibitions/)
      .reply(200, 'malformed response');
    ;

    const events = await collect();

    expect(events.length).toBe(0);
  });
});
