import { getSiteUrl } from "@/lib/site";
import { getSiteConfig } from "@/lib/site-config";

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data),
  };
}

export async function BaseJsonLd() {
  const siteUrl = getSiteUrl();
  const { profile, contact } = await getSiteConfig();

  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: profile.name,
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-dq.png`,
    description:
      "Pondok pesantren tahfidz dengan pembinaan intensif, holistik, dan integral di wilayah Solo Raya (Surakarta & sekitarnya).",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "Grogol",
      addressRegion: "Jawa Tengah",
      postalCode: "57552",
      addressCountry: "ID",
    },
    areaServed: ["Surakarta", "Sukoharjo", "Solo Raya", "Jawa Tengah"],
    telephone: contact.phone,
    email: contact.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: contact.phone,
        email: contact.email,
        areaServed: "ID",
        availableLanguage: ["id"],
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.name,
    url: siteUrl,
    inLanguage: "id-ID",
    publisher: {
      "@type": "Organization",
      name: profile.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/logo-dq.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/artikel?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organization)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(website)} />
    </>
  );
}

export function FaqJsonLd({
  title,
  items,
}: {
  title: string;
  items: readonly { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: title,
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />
  );
}

export async function ArticleJsonLd({
  title,
  description,
  datePublished,
  authorName,
  image,
  urlPath,
}: {
  title: string;
  description: string;
  datePublished: string;
  authorName: string;
  image: string;
  urlPath: string;
}) {
  const siteUrl = getSiteUrl();
  const { profile } = await getSiteConfig();
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `${siteUrl}${image}`,
    datePublished,
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: profile.name,
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/logo-dq.png` },
    },
    mainEntityOfPage: `${siteUrl}${urlPath}`,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />
  );
}

export async function EventsJsonLd({
  title,
  events,
}: {
  title: string;
  events: readonly {
    title: string;
    description: string;
    start: string;
    end?: string;
    venue: string;
    city: string;
    urlPath: string;
  }[];
}) {
  const siteUrl = getSiteUrl();
  const { profile } = await getSiteConfig();

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: events.map((e, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Event",
        name: e.title,
        description: e.description,
        startDate: e.start,
        endDate: e.end,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: e.venue,
          address: {
            "@type": "PostalAddress",
            addressLocality: e.city,
            addressCountry: "ID",
          },
        },
        organizer: {
          "@type": "Organization",
          name: profile.name,
          url: siteUrl,
        },
        url: `${siteUrl}${e.urlPath}`,
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />
  );
}
