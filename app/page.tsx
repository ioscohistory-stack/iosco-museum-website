import Link from "next/link";
import { Footer, Header } from "./site-components";
import { museum } from "./site-data";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="home-hero">
          <div className="home-hero__texture" />
          <div className="container home-hero__grid">
            <div className="home-hero__copy">
              <p className="eyebrow eyebrow--light">Our county. Our stories.</p>
              <h1>Iosco’s story lives here.</h1>
              <p className="home-hero__lede">
                Preserving the people, places, and memories of Iosco County.
              </p>
              <div className="button-row">
                <Link className="button button--cream" href="/visit">
                  Plan your visit
                </Link>
                <Link className="button button--outline-light" href="/history">
                  Explore local history
                </Link>
              </div>
            </div>
            <div className="home-hero__collage">
              <div className="archival-frame archival-frame--main">
                <img
                  className="museum-photo museum-photo--wide"
                  src="/images/iosco-museum-main.svg"
                  alt="The Iosco County Historical Museum in East Tawas"
                />
                <span>The Waterman house · Built 1903</span>
              </div>
              <div className="archival-frame archival-frame--small">
                <img
                  className="museum-photo museum-photo--side"
                  src="/images/iosco-museum-side-view.svg"
                  alt="Side view of the Iosco County Historical Museum"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="visit-ribbon">
          <div className="container visit-ribbon__grid">
            <div>
              <span>Open</span>
              <b>Thursday–Saturday</b>
              <small>11 AM–3 PM</small>
            </div>
            <div>
              <span>Find us</span>
              <b>405 West Bay Street</b>
              <small>East Tawas, Michigan</small>
            </div>
            <div>
              <span>Admission</span>
              <b>Come explore</b>
              <small>Donations welcome</small>
            </div>
            <Link className="text-link text-link--light" href="/visit">
              Visit details <b>→</b>
            </Link>
          </div>
        </section>

        <section className="section story-intro">
          <div className="container split-heading">
            <div>
              <p className="eyebrow">A house full of history</p>
              <h2>More than a museum. A home for Iosco’s memory.</h2>
            </div>
            <div>
              <p>
                Inside a 1903 railroad family home, photographs, objects, and
                first-person stories bring Iosco County’s past into the
                present.
              </p>
              <Link className="text-link" href="/about-us">
                Our story <b>→</b>
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--paper">
          <div className="container feature-grid">
            <div className="feature-grid__image paper-photo">
              <img
                className="museum-photo museum-photo--building"
                src="/images/iosco-museum-main.svg"
                alt="Front of the Iosco County Historical Museum"
              />
            </div>
            <div className="feature-grid__copy">
              <p className="eyebrow">Come inside</p>
              <h2>Discover something you never knew about home.</h2>
              <p>
                Walk through rooms filled with local artifacts, family
                photographs, railroad history, Indigenous history, and the
                working lives that shaped the county.
              </p>
              <ul className="check-list">
                <li>Historic 1903 Waterman house</li>
                <li>Rotating exhibits and archival displays</li>
                <li>Research help from local volunteers</li>
              </ul>
              <Link className="button button--forest" href="/visit">
                Plan your visit
              </Link>
            </div>
          </div>
        </section>

        <section className="section featured-history">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Stories from the archive</p>
                <h2>Every community has a chapter.</h2>
              </div>
              <Link className="text-link" href="/history">
                Explore all local histories <b>→</b>
              </Link>
            </div>
            <div className="editorial-grid">
              <Link
                className="editorial-card editorial-card--large"
                href="/a-history-of-iosco-county"
              >
                <img src="/images/history-hero.jpg" alt="" />
                <div>
                  <p className="eyebrow eyebrow--light">County story</p>
                  <h3>From white pine to water and light</h3>
                  <span>Read the story →</span>
                </div>
              </Link>
              <Link className="editorial-card" href="/alabaster-township">
                <img src="/images/gypsum-quarry.jpg" alt="" />
                <div>
                  <p className="eyebrow eyebrow--light">Industry</p>
                  <h3>The gypsum town of Alabaster</h3>
                  <span>Read the story →</span>
                </div>
              </Link>
              <Link className="editorial-card" href="/oscoda-township">
                <img src="/images/wurtsmith.jpg" alt="" />
                <div>
                  <p className="eyebrow eyebrow--light">Oscoda</p>
                  <h3>Wurtsmith and a county at war</h3>
                  <span>Read the story →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="section collections-home">
          <div className="container collections-home__grid">
            <div>
              <p className="eyebrow eyebrow--gold">The digital collection</p>
              <h2>12,000+ pieces of Iosco history, one click away.</h2>
              <p>
                Search digitized photographs, glass negatives, newspapers, and
                records—then visit the museum to see the stories behind them.
              </p>
              <Link className="button button--cream" href="/collections">
                Explore the collections
              </Link>
            </div>
            <div className="collection-stack">
              <img src="/images/logging-crew.jpg" alt="Historic logging crew" />
              <img
                src="/images/rail-roundhouse.jpg"
                alt="Historic railroad roundhouse"
              />
              <img
                src="/images/county-building.jpg"
                alt="Historic Iosco County building"
              />
            </div>
          </div>
        </section>

        <section className="section support-home">
          <div className="container support-home__grid">
            <div>
              <p className="eyebrow">Keep the story going</p>
              <h2>History survives because people decide it matters.</h2>
            </div>
            <div>
              <p>
                Memberships, volunteers, and gifts keep the museum open and
                preserve Iosco County’s collections for the next generation.
              </p>
              <div className="button-row">
                <Link className="button button--forest" href="/get-involved">
                  Get involved
                </Link>
                <Link className="button button--outline" href="/sponsors">
                  Meet our sponsors
                </Link>
                <a className="button button--outline" href={museum.donate}>
                  Make a donation
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
