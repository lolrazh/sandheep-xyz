export const siteUrl = 'https://sandheep.xyz';
export const defaultTitle = 'Sandheep Rajkumar';
export const defaultDescription = 'Writing about things I get curious about.';
export const defaultOgImage = `${siteUrl}/og-image.png`;

export function buildTitle(title?: string): string {
  if (!title) return defaultTitle;
  return `${title} — ${defaultTitle}`;
}

export function canonical(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

export function descriptionFromMarkdown(markdown: string, maxLen = 160): string {
  try {
    // Remove code blocks and inline code
    let text = markdown
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`[^`]*`/g, ' ')
      // Remove images/links syntax but keep the text
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      // Remove headings/MD tokens
      .replace(/^\s*#+\s*/gm, '')
      .replace(/[*_>#-]+/g, ' ')
      // Collapse whitespace
      .replace(/\s+/g, ' ')
      .trim();

    if (text.length > maxLen) {
      text = text.slice(0, maxLen).trimEnd();
      // Avoid cutting mid-word
      const lastSpace = text.lastIndexOf(' ');
      if (lastSpace > 60) text = text.slice(0, lastSpace);
      text += '…';
    }

    return text || defaultDescription;
  } catch {
    return defaultDescription;
  }
}

export function buildWebPageSchema({
  url,
  title,
  description,
}: {
  url: string;
  title: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: title,
    description,
  };
}

export function buildArticleSchema({
  url,
  title,
  description,
  datePublished,
  image = defaultOgImage,
}: {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description,
    image: [image],
    author: {
      '@type': 'Person',
      name: 'Sandheep Rajkumar',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Sandheep Rajkumar',
      url: siteUrl,
    },
    datePublished,
  };
}