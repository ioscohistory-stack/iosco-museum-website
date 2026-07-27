export type HistoryLink = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
};

export const museum = {
  name: "Iosco County Historical Society",
  shortName: "Iosco Museum",
  address: "405 West Bay Street, East Tawas, MI 48730",
  phone: "989-362-8911",
  email: "iosco.history@gmail.com",
  hours: "Thursday–Saturday · 11 AM–3 PM",
  youtube: "https://www.youtube.com/@IoscoCountyHistoricalSociety",
  donate: "/museum-check-out",
};

export const historyLinks: HistoryLink[] = [
  {
    slug: "a-history-of-iosco-county",
    title: "A History of Iosco County",
    eyebrow: "County story",
    description:
      "From the land of “water of light” to the communities that line Tawas Bay.",
    image: "/images/history-original/a-history-of-iosco-county.jpg",
  },
  {
    slug: "alabaster-township",
    title: "Alabaster Township",
    eyebrow: "Industry",
    description: "The gypsum works, quarry, railroad, and company town.",
    image: "/images/history-original/alabaster-township.jpg",
  },
  {
    slug: "ausable-township",
    title: "AuSable Township",
    eyebrow: "River & lumber",
    description: "A river community shaped by timber, fishing, and Lake Huron.",
    image: "/images/history-original/ausable-township.jpg",
  },
  {
    slug: "baldwin-township",
    title: "Baldwin Township",
    eyebrow: "Schools & farms",
    description: "The people and places of Baldwin Township.",
    image: "/images/history-original/baldwin-township.jpg",
  },
  {
    slug: "burleigh-township",
    title: "Burleigh Township",
    eyebrow: "Inland Iosco",
    description: "Settlements, farms, families, and community life.",
    image: "/images/history-original/burleigh-township.jpg",
  },
  {
    slug: "city-of-east-tawas",
    title: "City of East Tawas",
    eyebrow: "Tawas Bay",
    description: "The resort, railroad, and lakeshore city where the museum lives.",
    image: "/images/history-original/city-of-east-tawas.jpg",
  },
  {
    slug: "city-of-tawas-city",
    title: "City of Tawas City",
    eyebrow: "County seat",
    description: "The county seat founded amid the white pine era.",
    image: "/images/history-original/city-of-tawas-city.jpg",
  },
  {
    slug: "city-of-whittemore",
    title: "City of Whittemore",
    eyebrow: "Western Iosco",
    description: "A close-knit city rooted in agriculture and trade.",
    image: "/images/history-original/city-of-whittemore.jpg",
  },
  {
    slug: "grant-township",
    title: "Grant Township",
    eyebrow: "Township story",
    description: "Community history from the heart of Iosco County.",
    image: "/images/history-original/grant-township.jpg",
  },
  {
    slug: "oscoda-township",
    title: "Oscoda Township",
    eyebrow: "Au Sable River",
    description: "Lumber heritage, the river, and Wurtsmith Air Force Base.",
    image: "/images/history-original/oscoda-township.jpg",
  },
  {
    slug: "plainfield-township",
    title: "Plainfield Township",
    eyebrow: "Hale",
    description: "The history of Hale and northern inland Iosco.",
    image: "/images/history-original/plainfield-township.jpg",
  },
  {
    slug: "reno-township",
    title: "Reno Township",
    eyebrow: "Township story",
    description: "Farmsteads, schools, and families of Reno Township.",
    image: "/images/history-original/reno-township.jpg",
  },
  {
    slug: "sherman-township",
    title: "Sherman Township",
    eyebrow: "Township story",
    description: "The communities and working lives of Sherman Township.",
    image: "/images/history-original/sherman-township.jpg",
  },
  {
    slug: "tawas-township",
    title: "Tawas Township",
    eyebrow: "Township story",
    description: "Rural life between the bay and Iosco’s inland communities.",
    image: "/images/history-original/tawas-township.jpg",
  },
  {
    slug: "thompson-township",
    title: "Thompson Township",
    eyebrow: "Township story",
    description: "Stories from Iosco County’s earliest township boundaries.",
    image: "/images/history-original/thompson-township.jpg",
  },
];

export const collectionLinks = [
  {
    slug: "digital-preservation-project",
    title: "Digital Preservation Project",
    description: "Discover more than 12,000 digitized photographs and records.",
    image: "/images/onedrive-feature.jpg",
  },
  {
    slug: "photos--glass-negatives",
    title: "Photographs & Glass Negatives",
    description: "Explore rare images preserved from Iosco County’s past.",
    image: "/images/logging-crew.jpg",
  },
  {
    slug: "newsletters",
    title: "Museum Newsletters",
    description: "Read special editions, research, and Society updates.",
    image: "/images/county-building.jpg",
  },
  {
    slug: "videos",
    title: "Oral History & Videos",
    description: "Watch local history programs and recorded community stories.",
    image: "/images/wurtsmith.jpg",
  },
  {
    slug: "photo-scanning--printing-services",
    title: "Photo Services",
    description: "Preserve family photographs with scanning and printing help.",
    image: "/images/rail-roundhouse.jpg",
  },
  {
    slug: "gift-shop",
    title: "Research & Gift Shop",
    description: "Order historic newspaper reproductions and museum materials.",
    image: "/images/museum-visit-5.jpg",
  },
];

export const participationLinks = [
  {
    slug: "membership",
    title: "Become a member",
    description: "Join the people who keep Iosco County history accessible.",
  },
  {
    slug: "volunteers",
    title: "Volunteer with us",
    description: "Help welcome visitors, care for objects, and share stories.",
  },
  {
    slug: "save-our-museum",
    title: "Support the museum",
    description: "Help preserve the 1903 Waterman house and its collections.",
  },
  {
    slug: "sponsors",
    title: "Community sponsors",
    description: "Meet the local partners who make the museum possible.",
  },
  {
    slug: "endowment-fund-contributors",
    title: "Endowment fund",
    description: "Build a lasting future for Iosco County history.",
  },
];

export const imageForSlug: Record<string, string> = {
  "about-us": "/images/museum-visit-4.jpg",
  "a-history-of-iosco-county":
    "/images/history-original/a-history-of-iosco-county.jpg",
  "alabaster-township": "/images/history-original/alabaster-township.jpg",
  "ausable-township": "/images/history-original/ausable-township.jpg",
  "baldwin-township": "/images/history-original/baldwin-township.jpg",
  "burleigh-township": "/images/history-original/burleigh-township.jpg",
  "city-of-east-tawas": "/images/history-original/city-of-east-tawas.jpg",
  "city-of-tawas-city": "/images/history-original/city-of-tawas-city.jpg",
  "city-of-whittemore": "/images/history-original/city-of-whittemore.jpg",
  contact: "/images/museum-visit-1.jpg",
  "digital-preservation-project": "/images/onedrive-feature.jpg",
  "endowment-fund-contributors": "/images/county-building.jpg",
  "gift-shop": "/images/museum-visit-5.jpg",
  "glass-negatives": "/images/logging-crew.jpg",
  "grant-township": "/images/history-original/grant-township.jpg",
  links: "/images/rail-trestle.jpg",
  membership: "/images/museum-visit-3.jpg",
  "museum-check-out": "/images/museum-visit-2.jpg",
  newsletters: "/images/county-building.jpg",
  "oscoda-township": "/images/history-original/oscoda-township.jpg",
  "photo-scanning--printing-services": "/images/rail-roundhouse.jpg",
  "photos--glass-negatives": "/images/logging-crew.jpg",
  "plainfield-township": "/images/history-original/plainfield-township.jpg",
  "reno-township": "/images/history-original/reno-township.jpg",
  "save-our-museum": "/images/museum-visit-4.jpg",
  "schedule-of-events": "/images/museum-visit-2.jpg",
  "sherman-township": "/images/history-original/sherman-township.jpg",
  sponsors: "/images/museum-visit-1.jpg",
  "tawas-township": "/images/history-original/tawas-township.jpg",
  "thompson-township": "/images/history-original/thompson-township.jpg",
  videos: "/images/wurtsmith.jpg",
  volunteers: "/images/museum-visit-4.jpg",
};

export const footerGroups = [
  {
    title: "Plan a visit",
    links: [
      ["Hours & directions", "/visit"],
      ["Events", "/schedule-of-events"],
      ["Museum checkout", "/museum-check-out"],
      ["Contact", "/contact"],
      ["All website pages", "/site-directory"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["Local history", "/history"],
      ["Collections", "/collections"],
      ["Digital archive", "/digital-preservation-project"],
      ["Videos", "/videos"],
      ["Newsletters", "/newsletters"],
      ["Research links", "/links"],
    ],
  },
  {
    title: "Take part",
    links: [
      ["Membership", "/membership"],
      ["Volunteer", "/volunteers"],
      ["Support the museum", "/save-our-museum"],
      ["Sponsors", "/sponsors"],
      ["Donate", museum.donate],
    ],
  },
] as const;

export const siteDirectoryGroups = [
  {
    title: "Visit & museum information",
    links: [
      ["Museum home", "/"],
      ["Plan your visit", "/visit"],
      ["About the Society", "/about-us"],
      ["Schedule of events", "/schedule-of-events"],
      ["Contact the museum", "/contact"],
      ["Museum checkout", "/museum-check-out"],
    ],
  },
  {
    title: "Collections & services",
    links: [
      ["Collections overview", "/collections"],
      ["Digital Preservation Project", "/digital-preservation-project"],
      ["Photos & glass negatives", "/photos--glass-negatives"],
      ["Glass-negative lists and ordering", "/glass-negatives"],
      ["Museum newsletters", "/newsletters"],
      ["Videos & recorded lectures", "/videos"],
      ["Photo scanning & printing services", "/photo-scanning--printing-services"],
      ["Gift shop & newspaper reprints", "/gift-shop"],
      ["Research links", "/links"],
    ],
  },
  {
    title: "Membership & support",
    links: [
      ["Membership", "/membership"],
      ["Volunteer", "/volunteers"],
      ["Save Our Museum campaign", "/save-our-museum"],
      ["Endowment fund contributors", "/endowment-fund-contributors"],
      ["Museum sponsors", "/sponsors"],
      ["Get involved", "/get-involved"],
    ],
  },
  {
    title: "Iosco County history",
    links: [
      ["History overview", "/history"],
      ["A History of Iosco County", "/a-history-of-iosco-county"],
      ...historyLinks
        .filter((item) => item.slug !== "a-history-of-iosco-county")
        .map((item) => [item.title, `/${item.slug}`] as const),
    ],
  },
] as const;
