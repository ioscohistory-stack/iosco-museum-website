import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import legacyContent from "../legacy-content.json";
import { restoredLegacyBlocks } from "../legacy-restored-content";
import {
  Breadcrumb,
  Footer,
  Header,
  HistoryDirectory,
  InteriorHero,
  LegacyArticle,
} from "../site-components";
import {
  imageForSlug,
  museum,
  participationLinks,
  siteDirectoryGroups,
} from "../site-data";
import { PayPalMembershipButton } from "../paypal-membership";
import { PayPalMuseumCheckoutButton } from "../paypal-museum-checkout";
import { PayPalPreservationButton } from "../paypal-preservation";
import { VolunteerForm } from "../volunteer-form";

type LegacyPage = {
  slug: string;
  title: string;
  blocks: string[];
};

const legacyPages = (legacyContent as LegacyPage[]).map((page) => ({
  ...page,
  blocks: restoredLegacyBlocks[page.slug] ?? page.blocks,
}));

const sponsorEmblems = [
  {
    name: "Hicks Tax Service",
    image: "/images/sponsors-original/sponsor-01.jpg",
    href: "https://hickstaxservice.com/",
  },
  {
    name: "Klenow’s Market",
    image: "/images/sponsors-original/sponsor-02.jpg",
    href: "https://klenowsjerky.com/",
  },
  {
    name: "Brew Krew",
    image: "/images/sponsors-original/sponsor-03.jpg",
    href: "https://brew-krew-kitchen-bath.edan.io/",
  },
  {
    name: "Cozy Cup Coffee Company",
    image: "/images/sponsors-original/sponsor-04.jpg",
    href: "https://www.cozycupcoffee.com/",
  },
  {
    name: "WKJC 104.7 FM",
    image: "/images/sponsors-original/sponsor-05.jpg",
    href: "https://wkjc.com/",
  },
  {
    name: "Tilly’s Cafe & Tea House",
    image: "/images/sponsors-original/sponsor-06.jpg",
    href: "https://www.facebook.com/61572736894355/about/",
    linkLabel: "Visit Facebook ↗",
  },
  {
    name: "Nina the Notary",
    image: "/images/sponsors-original/sponsor-07.jpg",
    href: "https://www.facebook.com/NINATHENOTARY/",
    linkLabel: "Visit Facebook ↗",
  },
  {
    name: "City of Tawas City",
    image: "/images/sponsors-original/sponsor-08.jpg",
    href: "https://tawascity.org/",
  },
  {
    name: "John Henry Excavating",
    image: "/images/sponsors-original/sponsor-09.jpg",
    href: "http://www.johnhenryexcavating.com/",
  },
  {
    name: "Huron Coast Dental",
    image: "/images/sponsors-original/sponsor-10.jpg",
    href: "https://www.huroncoastdental.net/",
  },
  {
    name: "Wurtsmith Air Museum",
    image: "/images/sponsors-original/sponsor-11.png",
    href: "https://wurtsmithairmuseum.net/",
  },
  {
    name: "Bernard Building Center",
    image: "/images/sponsors-original/sponsor-12.jpg",
    href: "https://www.bernardbuilding.com/hale",
  },
  {
    name: "Nick Papas Plumbing & Heating",
    image: "/images/sponsors-original/sponsor-13.jpg",
    href: "https://contractorfinder.bradfordwhite.com/contractors/nick-papas-plumbing-and-heating-llc-29695-east-tawas-mi",
  },
  {
    name: "T’s Cuts",
    image: "/images/sponsors-original/sponsor-14.jpg",
    href: "https://www.facebook.com/p/Ts-Cuts-Specialty-mens-cuts-61565941636670/",
    linkLabel: "Visit Facebook ↗",
  },
  {
    name: "Crest View Farm",
    image: "/images/sponsors-original/sponsor-15.jpg",
    href: "https://www.facebook.com/100064749696525",
    linkLabel: "Visit Facebook ↗",
  },
  {
    name: "Mason Depot Diner",
    image: "/images/sponsors-original/sponsor-16.jpg",
    href: "https://www.facebook.com/MasonDepotDiner/",
    linkLabel: "Visit Facebook ↗",
  },
  {
    name: "Tawas Bay Insurance Agency",
    image: "/images/sponsors-original/sponsor-17.jpg",
    href: "https://tawasbayagency.com/",
  },
  {
    name: "Shipwreck and Tawas Point Treasure Hunt",
    image: "/images/sponsors-original/sponsor-18.jpg",
    href: "https://www.facebook.com/100068275483415/posts/-we-have-a-great-sponsor-to-spotlight-former-owner-of-our-local-paper-neal-r-mil/1284266090525895/",
    linkLabel: "View sponsor spotlight ↗",
  },
] as const;
const specialSlugs = ["visit", "history", "collections", "get-involved"];

export function generateStaticParams() {
  return [...legacyPages.map((page) => page.slug), ...specialSlugs].map(
    (slug) => ({ slug }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = legacyPages.find((entry) => entry.slug === slug);
  const title =
    page?.title ??
    {
      visit: "Plan Your Visit",
      history: "Explore Iosco History",
      collections: "Explore the Collections",
      "get-involved": "Get Involved",
    }[slug] ??
    "Iosco County Historical Society";
  return {
    title: `${title} | Iosco County Historical Society`,
    description: `Explore ${title.toLowerCase()} with the Iosco County Historical Society in East Tawas, Michigan.`,
  };
}

function PageShell({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          image={image}
        />
        <Breadcrumb title={title} />
        {children}
      </main>
      <Footer />
    </>
  );
}

function VisitPage() {
  return (
    <PageShell
      eyebrow="Come see us"
      title="Plan your visit"
      description="Step into a 1903 East Tawas home and discover the people, places, and working lives of Iosco County."
      image="/images/museum-visit-1.jpg"
    >
      <section className="container interior-section">
        <div className="visit-detail-grid">
          <div className="visit-detail-card">
            <p className="eyebrow">Hours</p>
            <h2>Thursday–Saturday</h2>
            <p className="big-detail">11 AM–3 PM</p>
            <p>
              Seasonal or holiday hours may vary. Call before a long-distance
              visit.
            </p>
          </div>
          <div className="visit-detail-card">
            <p className="eyebrow">Location</p>
            <h2>405 West Bay Street</h2>
            <p className="big-detail">East Tawas, MI 48730</p>
            <a
              className="text-link"
              href="https://maps.google.com/?q=405+West+Bay+Street+East+Tawas+MI+48730"
              target="_blank"
              rel="noreferrer"
            >
              Open in maps <b>↗</b>
            </a>
          </div>
          <div className="visit-detail-card">
            <p className="eyebrow">Contact</p>
            <h2>Questions?</h2>
            <a className="big-detail" href={`tel:${museum.phone.replaceAll("-", "")}`}>
              {museum.phone}
            </a>
            <a href={`mailto:${museum.email}`}>{museum.email}</a>
          </div>
        </div>
        <div className="experience-grid">
          <div className="paper-photo">
            <img
              src="/images/museum-visit-5.jpg"
              alt="Historic front details of the Iosco County Museum"
            />
          </div>
          <div>
            <p className="eyebrow">What you’ll find</p>
            <h2>A small museum with a county-sized story.</h2>
            <p>
              Explore rooms devoted to railroads, lumbering, maritime life,
              local businesses, schools, military service, family life, and
              the communities that make Iosco County home.
            </p>
            <p>
              The museum is housed in the Waterman residence, built in 1903.
              Accessibility is supported by an exterior ramp.
            </p>
            <Link className="button button--forest" href="/schedule-of-events">
              See events
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function HistoryPage() {
  return (
    <PageShell
      eyebrow="The land of water and light"
      title="Explore Iosco history"
      description="Travel through Iosco County, one community and one story at a time."
      image="/images/history-original/a-history-of-iosco-county.jpg"
    >
      <section className="container interior-section">
        <div className="prose-intro">
          <p className="eyebrow">15 communities. Countless stories.</p>
          <h2>Find the history closest to home.</h2>
          <p>
            Iosco’s story was shaped by Anishinaabe homelands, Great Lakes
            waters, white pine, railroads, farms, industry, and generations of
            neighbors. Choose a place to begin.
          </p>
        </div>
        <HistoryDirectory />
      </section>
    </PageShell>
  );
}

function CollectionsPage() {
  return (
    <PageShell
      eyebrow="What the museum preserves"
      title="Collections & research"
      description="Explore Iosco County photographs, glass negatives, newspapers, newsletters, documents, and recorded local-history programs."
      image="/images/collections-original/digital-preservation.jpg"
    >
      <section className="container interior-section">
        <div className="collections-explainer">
          <div>
            <p className="eyebrow">What is on this page?</p>
            <h2>Several ways to explore Iosco County history.</h2>
          </div>
          <p>
            Start with the Digital Preservation Project, search the historic
            glass-negative collection, download museum publications, watch
            recorded programs, or request scanning and newspaper-reproduction
            services.
          </p>
        </div>

        <div className="collection-stats">
          <div>
            <strong>12,000+</strong>
            <span>Digitized photographs and documents</span>
          </div>
          <div>
            <strong>4,000+</strong>
            <span>Ard G. Emery glass-negative images</span>
          </div>
          <div>
            <strong>1890–1980</strong>
            <span>Iosco County Herald proof-copy coverage</span>
          </div>
        </div>

        <section className="collection-feature collection-feature--digital">
          <div className="collection-feature__image">
            <Link
              className="collection-image-link"
              href="/digital-preservation-project"
            >
              <span className="collection-image-title">
                <span>
                  <small>Featured collection</small>
                  <strong>Digital Preservation Project</strong>
                </span>
                <b>Explore →</b>
              </span>
              <img
                src="/images/collections-original/digital-preservation.jpg"
                alt="Original Iosco County Digital Preservation Project artwork"
              />
            </Link>
          </div>
          <div className="collection-feature__copy">
            <p className="eyebrow">Digital Preservation Project</p>
            <h2>Preserving yesterday—and the history made yesterday.</h2>
            <p>
              More than 12,000 photographs and documents have already been
              digitized. The growing database is intended for the public,
              researchers, educators, schools, and local history groups.
            </p>
            <div className="button-row">
              <Link
                className="button button--forest"
                href="/digital-preservation-project"
              >
                About the project
              </Link>
              <Link
                className="button button--outline"
                href="/digital-preservation-project#support-preservation"
              >
                Support preservation
              </Link>
            </div>
          </div>
        </section>

        <section className="collection-feature collection-feature--glass">
          <Link
            className="collection-image-link collection-image-link--glass"
            href="/photos--glass-negatives"
          >
            <span className="collection-image-title">
              <span>
                <small>Historic photography</small>
                <strong>Ard G. Emery Glass Negatives</strong>
              </span>
              <b>Explore →</b>
            </span>
            <span className="collection-glass-images">
              <img
                src="/images/collections-original/glass-negatives-1.jpg"
                alt="Historic family portrait from the museum glass-negative collection"
              />
              <img
                src="/images/collections-original/glass-negatives-2.jpg"
                alt="Historic portrait from the museum glass-negative collection"
              />
            </span>
          </Link>
          <div className="collection-feature__copy">
            <p className="eyebrow">Photographs & glass negatives</p>
            <h2>The photography of Ard G. Emery, 1892–1904.</h2>
            <p>
              The museum cares for more than 4,000 Emery photographs depicting
              Iosco County families, workers, children, and community life.
              Research inquiries are welcome; a $10 donation is requested when
              a matching image is found.
            </p>
            <div className="collection-link-list">
              <Link href="/photos--glass-negatives">
                Learn about Ard G. Emery <b>→</b>
              </Link>
              <Link href="/glass-negatives">
                Glass-negative lists and ordering <b>→</b>
              </Link>
              <a href="/downloads/glass-negatives-1.pdf">
                Browse glass negatives: List 1 <b>↓</b>
              </a>
              <a href="/downloads/glass-negatives-2.pdf">
                Browse glass negatives: List 2 <b>↓</b>
              </a>
              <a href="/downloads/glass-negatives-3.pdf">
                Browse glass negatives: List 3 <b>↓</b>
              </a>
              <a href="/downloads/glass-negatives-order-form.docx">
                Download the order form <b>↓</b>
              </a>
            </div>
          </div>
        </section>

        <section className="collection-resources">
          <div className="section-heading services-heading">
            <div>
              <p className="eyebrow">Read, watch, and request</p>
              <h2>More collection resources</h2>
            </div>
            <p>Every link below opens a museum resource or service.</p>
          </div>
          <div className="collection-resource-grid">
            <article className="collection-resource-card">
              <div className="collection-resource-card__label">Publications</div>
              <h3>Museum newsletters</h3>
              <p>
                Read the Iosco County Gazette and special museum editions in
                PDF format.
              </p>
              <div className="collection-link-list">
                <a href="/downloads/2024-special-edition-newsletter.pdf">
                  2024 Special Edition <b>↓</b>
                </a>
                <a href="/downloads/summer-2020.pdf">
                  Summer 2020 <b>↓</b>
                </a>
                <a href="/downloads/holiday-special-edition-2019.pdf">
                  Holiday 2019 <b>↓</b>
                </a>
                <Link href="/newsletters">
                  Newsletter archive <b>→</b>
                </Link>
              </div>
            </article>

            <article className="collection-resource-card collection-resource-card--image">
              <a
                className="collection-image-link"
                href={museum.youtube}
                target="_blank"
                rel="noreferrer"
              >
                <span className="collection-image-title collection-image-title--compact">
                  <span>
                    <small>Recorded programs</small>
                    <strong>Videos & lectures</strong>
                  </span>
                  <b>Watch ↗</b>
                </span>
                <img
                  src="/images/collections-original/videos.jpg"
                  alt="The Iosco County Historical Museum"
                />
              </a>
              <div>
                <div className="collection-resource-card__label">
                  Recorded programs
                </div>
                <h3>Videos & lectures</h3>
                <p>
                  Watch museum programs and recorded Iosco County history
                  presentations.
                </p>
                <a
                  className="text-link"
                  href={museum.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit our YouTube channel <b>↗</b>
                </a>
              </div>
            </article>

            <article className="collection-resource-card">
              <div className="collection-resource-card__label">
                Preservation service
              </div>
              <h3>Scanning & photo printing</h3>
              <p>
                Digitize family photographs, negatives, documents, and
                blueprints—or order professional prints and restoration.
              </p>
              <Link
                className="text-link"
                href="/photo-scanning--printing-services"
              >
                See services and prices <b>→</b>
              </Link>
            </article>

            <article className="collection-resource-card">
              <div className="collection-resource-card__label">
                Newspaper archive
              </div>
              <h3>Iosco County Herald reprints</h3>
              <p>
                Proof copies cover 1890–1980. Full-size page reprints are $10
                per page; front-page photo prints are $30 unframed.
              </p>
              <div className="collection-link-list">
                <a href="/downloads/newspaper-reprint-catalog.pdf">
                  Open the newspaper catalog <b>↓</b>
                </a>
                <Link href="/gift-shop">
                  Reprint information <b>→</b>
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="collections-help">
          <div>
            <p className="eyebrow eyebrow--light">Looking for something?</p>
            <h2>Ask the museum archives.</h2>
            <p>
              Contact the Society for help with a person, family, photograph,
              newspaper date, local business, or other Iosco County subject.
            </p>
          </div>
          <div className="button-row">
            <a className="button button--cream" href={`mailto:${museum.email}`}>
              Email a research question
            </a>
            <a
              className="button button--outline-light"
              href={`tel:${museum.phone.replaceAll("-", "")}`}
            >
              Call {museum.phone}
            </a>
          </div>
        </section>
      </section>
    </PageShell>
  );
}

function DigitalPreservationPage() {
  return (
    <PageShell
      eyebrow="A growing community archive"
      title="Digital Preservation Project"
      description="Digitizing Iosco County photographs, documents, artifacts, and recent history so they remain accessible for generations."
      image="/images/collections-original/digital-preservation.jpg"
    >
      <section className="container interior-section">
        <div className="digital-project-intro">
          <div className="digital-project-logo">
            <img
              src="/images/collections-original/digital-preservation.jpg"
              alt="Original Iosco County Digital Preservation Project artwork"
            />
          </div>
          <div>
            <p className="eyebrow">History was yesterday</p>
            <h2>More than 12,000 items preserved—and growing.</h2>
            <p>
              The Society has invested in the equipment and software needed to
              digitize its archives. Photographs and documents are being placed
              in a central database intended for the general public,
              researchers, educators, schools, local history groups, and future
              generations.
            </p>
          </div>
        </div>

        <div className="digital-project-audience">
          <div>
            <span>01</span>
            <h3>For the public</h3>
            <p>Discover the people, places, and events that shaped home.</p>
          </div>
          <div>
            <span>02</span>
            <h3>For researchers</h3>
            <p>Connect photographs and records with family and local history.</p>
          </div>
          <div>
            <span>03</span>
            <h3>For educators</h3>
            <p>Bring primary local sources into classrooms and programs.</p>
          </div>
        </div>

        <section
          className="digital-project-support"
          id="support-preservation"
        >
          <div>
            <p className="eyebrow eyebrow--light">Help complete the project</p>
            <h2>Support Iosco County’s digital archive.</h2>
            <p>
              The project budget is approximately $18,000. Tax-deductible gifts
              help complete the equipment and software purchases needed to
              preserve and grow this community resource.
            </p>
            <p className="digital-mail-gift">
              Gifts may also be mailed to:<br />
              Iosco County Historical Society<br />
              405 West Bay Street<br />
              East Tawas, MI 48730
            </p>
          </div>
          <div className="digital-project-payment">
            <h3>Donate online</h3>
            <p>Pay securely using PayPal, Venmo, or a credit/debit card.</p>
            <PayPalPreservationButton />
            <a
              className="paypal-fallback-link"
              href="https://www.paypal.com/ncp/payment/UV9BLZJTJ65JU"
              target="_blank"
              rel="noreferrer"
            >
              Payment form not showing? Open secure checkout ↗
            </a>
          </div>
        </section>

        <section className="digital-project-contribute">
          <div>
            <p className="eyebrow">Add to the archive</p>
            <h2>Have Iosco County photographs or documents?</h2>
          </div>
          <div>
            <p>
              Contact the museum about contributing digital copies of family,
              school, business, military, community, or recent-history
              materials. Originals can be returned after scanning.
            </p>
            <div className="button-row">
              <a className="button button--forest" href={`mailto:${museum.email}`}>
                Contact the project
              </a>
              <Link
                className="button button--outline"
                href="/photo-scanning--printing-services"
              >
                Scanning services
              </Link>
            </div>
          </div>
        </section>
      </section>
    </PageShell>
  );
}

function GetInvolvedPage() {
  return (
    <PageShell
      eyebrow="History needs a future"
      title="Get involved"
      description="Your time, membership, and support keep Iosco County’s stories accessible to everyone."
      image="/images/museum-visit-4.jpg"
    >
      <section className="container interior-section">
        <div className="participation-grid">
          {participationLinks.map((item, index) => (
            <Link
              className={`participation-card participation-card--${index + 1}`}
              href={`/${item.slug}`}
              key={item.slug}
            >
              <span>0{index + 1}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <b>Learn more →</b>
            </Link>
          ))}
        </div>
        <div className="donation-callout">
          <div>
            <p className="eyebrow eyebrow--light">Make an immediate difference</p>
            <h2>Help preserve Iosco County history.</h2>
          </div>
          <a className="button button--cream" href={museum.donate}>
            Donate securely
          </a>
        </div>
      </section>
    </PageShell>
  );
}

function MuseumCheckoutPage() {
  return (
    <PageShell
      eyebrow="Secure online payment"
      title="Museum checkout"
      description="Pay for museum purchases or make a general donation using PayPal, Venmo, or a credit or debit card."
      image="/images/iosco-museum-main.svg"
    >
      <section className="container interior-section">
        <div className="prose-intro">
          <p className="eyebrow">Choose your payment method</p>
          <h2>Make a secure online payment.</h2>
          <p>
            Use the museum checkout for general donations, photograph and
            reprint purchases, scanning services, and other museum payments.
            Enter the amount and briefly describe what the payment is for.
          </p>
        </div>

        <section className="join-online museum-checkout" id="online-checkout">
          <div className="join-online__copy">
            <p className="eyebrow eyebrow--light">Museum general checkout</p>
            <h2>Pay online with the method you prefer.</h2>
            <p>
              The secure checkout accepts PayPal, Venmo, major credit cards,
              debit cards, and other payment methods offered by PayPal.
            </p>
            <p className="secure-note">
              Secure payment processing is provided by PayPal.
            </p>
          </div>
          <div className="join-online__payment">
            <h3>Enter your payment</h3>
            <p>
              Add the amount, then use the “What was sold” field to identify
              your donation, purchase, or service.
            </p>
            <PayPalMuseumCheckoutButton />
            <a
              className="paypal-fallback-link"
              href="https://www.paypal.com/ncp/payment/2YA6BRLV2VYS2"
              target="_blank"
              rel="noreferrer"
            >
              Payment form not showing? Open secure checkout ↗
            </a>
          </div>
        </section>

        <div className="membership-other-ways">
          <div>
            <p className="eyebrow">Questions before paying?</p>
            <h2>Contact the museum</h2>
            <p>
              We can confirm the amount or help identify what to enter with
              your payment.
            </p>
            <a className="text-link" href={`mailto:${museum.email}`}>
              {museum.email} <b>→</b>
            </a>
          </div>
          <div>
            <p className="eyebrow">Prefer to pay by mail?</p>
            <h2>Mail your payment</h2>
            <p>
              Iosco County Historical Society
              <br />
              405 West Bay Street
              <br />
              East Tawas, MI 48730
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function SiteDirectoryPage() {
  return (
    <PageShell
      eyebrow="Complete website directory"
      title="Every museum page in one place"
      description="Use this directory to reach every page and resource transferred from the original museum website."
      image="/images/museum-visit-2.jpg"
    >
      <section className="container interior-section">
        <div className="site-directory-grid">
          {siteDirectoryGroups.map((group) => (
            <section className="site-directory-group" key={group.title}>
              <h2>{group.title}</h2>
              <div className="collection-link-list">
                {group.links.map(([label, href]) => (
                  <Link href={href} key={href}>
                    {label} <b>→</b>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function SponsorsPage() {
  return (
    <PageShell
      eyebrow="Community partners"
      title="Our museum sponsors"
      description="These businesses and organizations help preserve Iosco County’s history and keep the museum serving our community."
      image="/images/museum-visit-1.jpg"
    >
      <section className="container interior-section">
        <div className="sponsor-page-intro">
          <div>
            <p className="eyebrow">Please support those who support us</p>
            <h2>Our sponsors make the museum’s work possible.</h2>
          </div>
          <p>
            Their support helps keep the museum open, preserve our collections,
            fund community programs, and protect local history for future
            generations. Select a linked emblem to visit that sponsor’s
            website or Facebook page.
          </p>
        </div>
        <div className="sponsor-emblem-grid">
          {sponsorEmblems.map((sponsor) => {
            const emblem = (
              <>
                <span className="sponsor-emblem__image">
                  <img src={sponsor.image} alt={`${sponsor.name} emblem`} />
                </span>
                <strong>{sponsor.name}</strong>
                {"href" in sponsor ? (
                  <span>
                    {"linkLabel" in sponsor
                      ? sponsor.linkLabel
                      : "Visit website ↗"}
                  </span>
                ) : null}
              </>
            );

            return "href" in sponsor ? (
              <a
                className="sponsor-emblem"
                href={sponsor.href}
                key={sponsor.name}
                target="_blank"
                rel="noreferrer"
              >
                {emblem}
              </a>
            ) : (
              <article className="sponsor-emblem" key={sponsor.name}>
                {emblem}
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

const membershipLevels = [
  {
    name: "Bronze Member",
    price: "$25",
    subtitle: "Supporter of Local History",
    benefits: [
      "Free admission to the museum",
      "Bring guests at no additional cost",
      "Email updates and event notifications",
    ],
  },
  {
    name: "Silver Member",
    price: "$50",
    subtitle: "History Insider",
    benefits: [
      "All Bronze benefits",
      "Access to our digital archives",
      "Free admission to special speaking events",
    ],
  },
  {
    name: "Business Member",
    price: "$100",
    subtitle: "Community Partner",
    benefits: [
      "All Silver benefits",
      "Recognition at museum events",
      "Promotion through our website and outreach efforts",
    ],
  },
  {
    name: "Benefactor",
    price: "Your choice",
    subtitle: "Legacy Supporter",
    benefits: [
      "Contribute at any level",
      "Make a lasting impact on preserving Iosco County history",
    ],
  },
];

function MembershipPage() {
  return (
    <PageShell
      eyebrow="Become part of Iosco County’s story"
      title="Membership"
      description="Join the people helping preserve the photographs, artifacts, and stories that make our community unique."
      image="/images/museum-visit-3.jpg"
    >
      <section className="container interior-section">
        <div className="prose-intro">
          <p className="eyebrow">Your membership makes a difference</p>
          <h2>Help keep Iosco County history alive.</h2>
          <p>
            Every membership protects local history, expands the museum’s
            collections, supports educational programs, and helps keep the
            museum accessible for future generations.
          </p>
        </div>

        <div className="membership-levels">
          {membershipLevels.map((level) => (
            <article className="membership-card" key={level.name}>
              <p className="eyebrow">{level.subtitle}</p>
              <h2>{level.name}</h2>
              <p className="membership-price">{level.price}</p>
              <ul>
                {level.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <a className="text-link" href="#join-online">
                Choose this membership <b>↓</b>
              </a>
            </article>
          ))}
        </div>

        <section className="join-online" id="join-online">
          <div className="join-online__copy">
            <p className="eyebrow eyebrow--light">Join in minutes</p>
            <h2>Sign up and pay online.</h2>
            <p>
              Choose your membership level in the secure payment form. You can
              pay with PayPal, Venmo, or a credit or debit card.
            </p>
            <p className="secure-note">Secure payment processing by PayPal.</p>
          </div>
          <div className="join-online__payment">
            <PayPalMembershipButton />
            <a
              className="paypal-fallback-link"
              href="https://www.paypal.com/ncp/payment/YQSQJPLMMF6BL"
              target="_blank"
              rel="noreferrer"
            >
              Payment form not showing? Open secure membership checkout ↗
            </a>
          </div>
        </section>

        <div className="membership-other-ways">
          <div>
            <p className="eyebrow">Join by mail</p>
            <h2>Send your membership</h2>
            <p>
              Iosco County Historical Society
              <br />
              405 W Bay Street
              <br />
              East Tawas, MI 48730
            </p>
          </div>
          <div>
            <p className="eyebrow">Request a form</p>
            <h2>We’re happy to help</h2>
            <p>
              Email the museum and we’ll send you a membership form or answer
              questions.
            </p>
            <a className="text-link" href={`mailto:${museum.email}`}>
              Email the museum <b>→</b>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

const photoPrintPrices = [
  ["4 × 6", "$0.50"],
  ["5 × 7", "$2.00"],
  ["8 × 10", "$10.00"],
  ["11 × 14", "$16.00"],
  ["12 × 18", "$22.00"],
  ["16 × 20", "$30.00"],
  ["20 × 30", "$41.00"],
  ["24 × 36", "$46.00"],
];

function ScanningServicesPage() {
  return (
    <PageShell
      eyebrow="Preserve your family history"
      title="Photo scanning & printing"
      description="Clear, affordable help digitizing photographs, negatives, documents, and blueprints—or printing a new copy to share."
      image="/images/rail-roundhouse.jpg"
    >
      <section className="container interior-section">
        <div className="services-intro">
          <div>
            <p className="eyebrow">Museum preservation services</p>
            <h2>Scan it. Save it. Share it.</h2>
          </div>
          <div>
            <p>
              Bring your originals to the museum and we can scan them into
              digital files, make professional photo prints, or help repair a
              damaged image.
            </p>
            <div className="button-row">
              <a
                className="button button--forest"
                href={`tel:${museum.phone.replaceAll("-", "")}`}
              >
                Call {museum.phone}
              </a>
              <a className="button button--outline" href={`mailto:${museum.email}`}>
                Email the museum
              </a>
            </div>
          </div>
        </div>

        <section className="service-group">
          <div className="section-heading services-heading">
            <div>
              <p className="eyebrow">Digital scanning</p>
              <h2>Scanning services & prices</h2>
            </div>
            <p>Printing is not included in scanning prices.</p>
          </div>
          <div className="service-price-grid">
            <article className="service-price-card">
              <span className="service-number">01</span>
              <h3>Photos & documents</h3>
              <p className="service-limit">Up to 8 × 10 inches</p>
              <dl>
                <div>
                  <dt>First scan</dt>
                  <dd>$10.00</dd>
                </div>
                <div>
                  <dt>Each additional scan</dt>
                  <dd>$1.00</dd>
                </div>
              </dl>
            </article>
            <article className="service-price-card">
              <span className="service-number">02</span>
              <h3>Large-format items</h3>
              <p className="service-limit">
                Pictures, documents, and blueprints up to 36 inches
              </p>
              <dl>
                <div>
                  <dt>First scan</dt>
                  <dd>$20.00</dd>
                </div>
                <div>
                  <dt>Each additional scan</dt>
                  <dd>$10.00</dd>
                </div>
              </dl>
            </article>
            <article className="service-price-card">
              <span className="service-number">03</span>
              <h3>Film negatives</h3>
              <p className="service-limit">
                Negatives converted into digital images
              </p>
              <dl>
                <div>
                  <dt>First scan</dt>
                  <dd>$10.00</dd>
                </div>
                <div>
                  <dt>Each additional scan</dt>
                  <dd>$1.00</dd>
                </div>
              </dl>
            </article>
            <article className="service-price-card service-price-card--accent">
              <span className="service-number">04</span>
              <h3>Document copies</h3>
              <p className="service-limit">Printed documents up to 8 × 10</p>
              <p className="single-price">$1.00 <small>per page</small></p>
              <p className="service-note">
                Documents larger than 8 × 10 must be picked up at Print & Go.
              </p>
            </article>
          </div>
          <div className="delivery-note">
            <b>Receiving your digital files</b>
            <p>
              Bring a thumb drive for your scans, or ask us to email the
              completed digital files to you.
            </p>
          </div>
        </section>

        <section className="service-group service-group--paper">
          <div className="print-pricing-layout">
            <div className="print-pricing-copy">
              <p className="eyebrow">Professional photo printing</p>
              <h2>Choose your print size.</h2>
              <p>
                These prices are for professional photo prints. If you need a
                size that is not listed, contact us and we’ll check the
                available options.
              </p>
              <a className="text-link" href={`mailto:${museum.email}`}>
                Ask about a custom size <b>→</b>
              </a>
            </div>
            <div className="price-table-wrap">
              <table className="price-table">
                <thead>
                  <tr>
                    <th scope="col">Print size</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {photoPrintPrices.map(([size, price]) => (
                    <tr key={size}>
                      <td>{size}</td>
                      <td>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="restoration-callout">
          <div>
            <p className="eyebrow eyebrow--light">Photo restoration</p>
            <h2>Repair a damaged or faded memory.</h2>
            <p>
              Scanned photographs can be restored starting at an additional
              $5.00, then printed in any of the sizes listed above.
            </p>
          </div>
          <a className="button button--cream" href={`mailto:${museum.email}`}>
            Ask about restoration
          </a>
        </section>

        <section className="service-steps">
          <div className="prose-intro">
            <p className="eyebrow">How to get started</p>
            <h2>Bring your originals to the museum.</h2>
          </div>
          <ol>
            <li>
              <span>1</span>
              <div>
                <h3>Call before your visit</h3>
                <p>
                  Tell us what you have, the approximate quantity, and whether
                  you need scans, prints, or restoration.
                </p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Bring your items</h3>
                <p>
                  Visit during museum hours with your photographs, documents,
                  negatives, or blueprints and a thumb drive if desired.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Choose your delivery</h3>
                <p>
                  Receive digital files on your thumb drive or by email, and
                  order any photo prints you would like.
                </p>
              </div>
            </li>
          </ol>
        </section>
      </section>
    </PageShell>
  );
}

const volunteerOpportunities = [
  {
    number: "01",
    title: "Museum guides",
    description:
      "Welcome visitors and share Iosco County’s story through the museum exhibits.",
  },
  {
    number: "02",
    title: "Collections & archives",
    description:
      "Catalog artifacts, organize historical documents, and help preserve the collection.",
  },
  {
    number: "03",
    title: "Research assistance",
    description:
      "Help visitors researching genealogy and local history with museum records.",
  },
  {
    number: "04",
    title: "Events & programs",
    description:
      "Support educational programs, special events, and community activities.",
  },
  {
    number: "05",
    title: "Grounds & maintenance",
    description:
      "Help with landscaping, outdoor projects, and general museum upkeep.",
  },
];

function VolunteersPage() {
  return (
    <PageShell
      eyebrow="Give a little time. Make a lasting difference."
      title="Volunteer at the museum"
      description="Help preserve and share the photographs, artifacts, and memories that tell the story of Iosco County."
      image="/images/volunteer-original.jpg"
    >
      <section className="container interior-section">
        <div className="volunteer-intro">
          <div>
            <p className="eyebrow">There is a place for you here</p>
            <h2>Use your interests to help local history.</h2>
          </div>
          <div>
            <p>
              Whether you enjoy meeting people, organizing historical
              materials, researching, helping at events, or working outdoors,
              your time can make a real difference.
            </p>
            <p className="volunteer-highlight">
              No experience is required. Training is provided.
            </p>
            <a
              className="button button--brick"
              href="#volunteer-signup"
            >
              Sign up to volunteer
            </a>
          </div>
        </div>

        <section className="volunteer-benefits">
          <div className="volunteer-benefits__heading">
            <p className="eyebrow eyebrow--light">Why volunteer?</p>
            <h2>Be part of something meaningful.</h2>
          </div>
          <ul>
            <li>Preserve the history of Iosco County</li>
            <li>Meet people who share an interest in local history</li>
            <li>Learn about historical artifacts and research</li>
            <li>Choose flexible opportunities that fit your schedule</li>
            <li>Make a visible impact in your community</li>
          </ul>
        </section>

        <section className="volunteer-opportunities">
          <div className="section-heading services-heading">
            <div>
              <p className="eyebrow">Volunteer opportunities</p>
              <h2>How you can help</h2>
            </div>
            <p>A few hours, a special event, or an ongoing project—all help.</p>
          </div>
          <div className="volunteer-opportunity-grid">
            {volunteerOpportunities.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="volunteer-schedule">
          <div>
            <p className="eyebrow">Flexible time commitment</p>
            <h2>Volunteer when it works for you.</h2>
          </div>
          <ul>
            <li>A few hours per month</li>
            <li>Weekly or occasional museum help</li>
            <li>Special events and programs</li>
            <li>Seasonal or project-based work</li>
          </ul>
        </section>

        <section className="volunteer-signup-form" id="volunteer-signup">
          <div className="volunteer-signup-form__heading">
            <p className="eyebrow">Ready to help?</p>
            <h2>Join our volunteer team.</h2>
            <p>
              Complete the form below and send it directly to the museum. We’ll
              contact you about opportunities that match your interests and
              availability.
            </p>
          </div>
          <VolunteerForm />
          <div className="volunteer-form-contact">
            <span>Prefer to talk with someone?</span>
            <a href={`tel:${museum.phone.replaceAll("-", "")}`}>
              Call {museum.phone}
            </a>
            <a href={`mailto:${museum.email}`}>{museum.email}</a>
          </div>
        </section>
      </section>
    </PageShell>
  );
}

function LegacyPageView({ page }: { page: LegacyPage }) {
  const image = imageForSlug[page.slug] ?? "/images/museum-visit-2.jpg";
  const isCommunity =
    page.slug.endsWith("-township") || page.slug.startsWith("city-of-");
  const eyebrow = isCommunity
    ? "Iosco County communities"
    : page.slug === "about-us"
      ? "Our Society"
      : "Museum resources";
  const description = isCommunity
    ? `People, places, and memories from ${page.title}.`
    : undefined;
  return (
    <PageShell
      eyebrow={eyebrow}
      title={page.title}
      description={description}
      image={image}
    >
      <section className="container interior-section">
        <LegacyArticle slug={page.slug} blocks={page.blocks} />
      </section>
    </PageShell>
  );
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "visit") return <VisitPage />;
  if (slug === "history") return <HistoryPage />;
  if (slug === "collections") return <CollectionsPage />;
  if (slug === "digital-preservation-project")
    return <DigitalPreservationPage />;
  if (slug === "get-involved") return <GetInvolvedPage />;
  if (slug === "site-directory") return <SiteDirectoryPage />;
  if (slug === "sponsors") return <SponsorsPage />;
  if (slug === "membership") return <MembershipPage />;
  if (slug === "photo-scanning--printing-services")
    return <ScanningServicesPage />;
  if (slug === "volunteers") return <VolunteersPage />;
  if (slug === "museum-check-out") return <MuseumCheckoutPage />;
  const page = legacyPages.find((entry) => entry.slug === slug);
  if (!page) notFound();
  return <LegacyPageView page={page} />;
}
