import Link from "next/link";
import { footerGroups, historyLinks, museum } from "./site-data";
import { GlassNegativeInquiryForm } from "./glass-negative-inquiry-form";

const navigation = [
  ["Visit", "/visit"],
  ["Explore History", "/history"],
  ["Collections", "/collections"],
  ["Membership", "/membership"],
  ["Volunteer", "/volunteers"],
  ["Sponsors", "/sponsors"],
  ["About", "/about-us"],
  ["Contact", "/contact"],
] as const;

export function MuseumMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`museum-mark ${inverted ? "museum-mark--inverted" : ""}`}>
      <span>IC</span>
    </span>
  );
}

export function Header() {
  return (
    <>
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span>{museum.hours}</span>
          <a
            href="https://maps.google.com/?q=405+West+Bay+Street+East+Tawas+MI+48730"
            target="_blank"
            rel="noreferrer"
          >
            {museum.address}
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link className="brand" href="/" aria-label="Iosco County Historical Society home">
            <MuseumMark />
            <span>
              <b>Iosco County</b>
              <small>Historical Society</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
            <a className="button button--brick button--small" href={museum.donate}>
              Donate
            </a>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Open menu">
              <b>Menu</b>
              <span className="mobile-nav__icon" aria-hidden="true"><i /><i /><i /></span>
            </summary>
            <nav aria-label="Mobile navigation">
              {navigation.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
              <a href={museum.donate}>Donate</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <MuseumMark inverted />
          <p>
            Preserving the people, places, and memories of Iosco County since
            1967.
          </p>
          <a href={`tel:${museum.phone.replaceAll("-", "")}`}>{museum.phone}</a>
          <a href={`mailto:${museum.email}`}>{museum.email}</a>
        </div>
        {footerGroups.map((group) => (
          <div className="footer-links" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map(([label, href]) =>
              href.startsWith("http") ? (
                <a href={href} key={href}>
                  {label}
                </a>
              ) : (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ),
            )}
          </div>
        ))}
      </div>
      <div className="container footer-base">
        <span>© {new Date().getFullYear()} Iosco County Historical Society</span>
        <span>East Tawas, Michigan · The land of water and light</span>
      </div>
    </footer>
  );
}

export function InteriorHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="interior-hero">
      <div className="interior-hero__image">
        <img src={image} alt="" />
      </div>
      <div className="container interior-hero__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
    </section>
  );
}

export function Breadcrumb({ title }: { title: string }) {
  return (
    <div className="container breadcrumb">
      <Link href="/">Home</Link>
      <span aria-hidden="true">/</span>
      <span>{title}</span>
    </div>
  );
}

export function HistoryDirectory() {
  return (
    <div className="card-grid card-grid--history">
      {historyLinks.map((item) => (
        <Link className="story-card" href={`/${item.slug}`} key={item.slug}>
          <div className="story-card__image">
            <img src={item.image} alt="" />
          </div>
          <div>
            <p className="eyebrow">{item.eyebrow}</p>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span className="text-link">Read this history <b>→</b></span>
          </div>
        </Link>
      ))}
    </div>
  );
}

const resourceLinks: Record<string, Array<[string, string]>> = {
  newsletters: [
    ["2024 Special Edition", "/downloads/2024-special-edition-newsletter.pdf"],
    ["Summer 2020", "/downloads/summer-2020.pdf"],
    ["Holiday Special Edition 2019", "/downloads/holiday-special-edition-2019.pdf"],
  ],
  links: [
    ["March 8, 1895 edition of The Tawas Herald", "/downloads/march-8-1895.pdf"],
  ],
  "gift-shop": [
    ["Newspaper reprint catalog", "/downloads/newspaper-reprint-catalog.pdf"],
  ],
  "glass-negatives": [
    ["Glass Negatives — Volume 1", "/downloads/glass-negatives-1.pdf"],
    ["Glass Negatives — Volume 2", "/downloads/glass-negatives-2.pdf"],
    ["Glass Negatives — Volume 3", "/downloads/glass-negatives-3.pdf"],
    [
      "History & explanation of glass negatives",
      "/downloads/history-of-glass-negatives.pdf",
    ],
    ["Glass negatives order form", "/downloads/glass-negatives-order-form.docx"],
  ],
  "photos--glass-negatives": [
    ["Glass Negatives — Volume 1", "/downloads/glass-negatives-1.pdf"],
    ["Glass Negatives — Volume 2", "/downloads/glass-negatives-2.pdf"],
    ["Glass Negatives — Volume 3", "/downloads/glass-negatives-3.pdf"],
    [
      "Iosco County: The Photography of Ard G. Emery, 1892–1904",
      "https://www.arcadiapublishing.com/products/9781467114431",
    ],
  ],
  "save-our-museum": [
    ["Museum campaign brochure", "/downloads/campaign-brochure.pdf"],
    ["Endowment pledge card", "/downloads/endowment-pledge-card.pdf"],
    ["Make an online endowment gift", museum.donate],
  ],
  videos: [["Museum YouTube channel", museum.youtube]],
};

function isHeading(value: string) {
  return (
    value.length < 90 &&
    !/[.!?]$/.test(value) &&
    (value === value.toUpperCase() ||
      /^(history|about|services|membership|volunteer|contact|sponsors|donors|contributors|resources)/i.test(
        value,
      ) ||
      /^(18|19|20)\d{2}s?(–|-|\s)/.test(value) ||
      /^(legacy|key historical anchors|a community history)/i.test(value))
  );
}

export function LegacyArticle({
  slug,
  blocks,
}: {
  slug: string;
  blocks: string[];
}) {
  const resources = resourceLinks[slug] ?? [];
  const isHistory = historyLinks.some(item => item.slug === slug);
  return (
    <div className="article-layout">
      <article className="legacy-article">
        {isHistory && <Link className="text-link history-return" href="/history">← Back to all histories</Link>}
        {blocks.length ? (
          blocks.map((block, index) =>
            isHeading(block) ? (
              <h2 key={`${index}-${block.slice(0, 20)}`}>{block}</h2>
            ) : block.startsWith("• ") ? (
              <p
                className="legacy-bullet"
                key={`${index}-${block.slice(0, 20)}`}
              >
                {block.slice(2)}
              </p>
            ) : (
              <p key={`${index}-${block.slice(0, 20)}`}>{block}</p>
            ),
          )
        ) : (
          <p>
            We are updating this page with more material from the museum
            archives. Contact the Society if you are researching this subject.
          </p>
        )}
        {resources.length ? (
          <section className="resource-box">
            <p className="eyebrow">From the archive</p>
            <h2>Downloads & resources</h2>
            {resources.map(([label, href]) => (
              <a
                href={href}
                key={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span>{label}</span>
                <b>{href.startsWith("http") ? "Visit ↗" : "Download ↓"}</b>
              </a>
            ))}
          </section>
        ) : null}
        {slug === "photos--glass-negatives" ? (
          <section className="archive-inquiry" id="glass-negative-inquiry">
            <p className="eyebrow">Search more than 4,000 images</p>
            <h2>Ask us to look for a person or subject.</h2>
            <p>
              Tell us who or what you are researching. If the collection
              contains a matching image, the museum requests a $10 donation.
            </p>
            <GlassNegativeInquiryForm />
          </section>
        ) : null}
        {isHistory && <Link className="button button--outline history-return" href="/history">← Back to all histories</Link>}
      </article>
      <aside className="article-aside">
        <p className="eyebrow">Visit the archives</p>
        <h2>Go deeper into your local history.</h2>
        <p>
          Museum volunteers can help with photographs, newspapers, family
          histories, and other research.
        </p>
        <Link className="button button--forest" href="/contact">
          Contact the museum
        </Link>
      </aside>
    </div>
  );
}
