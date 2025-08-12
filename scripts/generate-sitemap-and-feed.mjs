import { promises as fs } from 'fs';
import path from 'path';

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const siteUrl = 'https://sandheep.xyz';
const publicDir = path.join(repoRoot, 'public');
const contentArticlesDir = path.join(repoRoot, 'content', 'articles');
const articlesTsPath = path.join(repoRoot, 'src', 'data', 'articles.ts');

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripMarkdown(md, maxLen = 200) {
  try {
    let text = md
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`[^`]*`/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/^\s*#+\s*/gm, '')
      .replace(/[>*_`~\-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (text.length > maxLen) {
      text = text.slice(0, maxLen).trimEnd();
      const lastSpace = text.lastIndexOf(' ');
      if (lastSpace > 60) text = text.slice(0, lastSpace);
      text += '…';
    }
    return text;
  } catch {
    return '';
  }
}

async function readArticlesDir() {
  const entries = await fs.readdir(contentArticlesDir);
  const mdFiles = entries.filter((f) => f.endsWith('.md'));
  const articles = [];
  for (const file of mdFiles) {
    const id = path.basename(file, '.md');
    const fullPath = path.join(contentArticlesDir, file);
    const stat = await fs.stat(fullPath);
    const content = await fs.readFile(fullPath, 'utf8');
    const h1Match = content.match(/^#\s+(.+)$/m);
    const titleFromH1 = h1Match ? h1Match[1].trim() : id;
    articles.push({
      id,
      path: `/article/${id}`,
      filePath: fullPath,
      mtime: stat.mtime,
      content,
      titleFromH1,
    });
  }
  return articles;
}

async function readArticlesMetadataFromTs() {
  try {
    const ts = await fs.readFile(articlesTsPath, 'utf8');
    const map = new Map();
    const regex = /\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?fullDate:\s*"([^"]+)"[\s\S]*?year:\s*(\d+)/g;
    let m;
    while ((m = regex.exec(ts)) !== null) {
      const [, id, title, fullDate, yearStr] = m;
      map.set(id, { title, fullDate, year: Number(yearStr) });
    }
    return map;
  } catch (e) {
    return new Map();
  }
}

function toISODateOnly(date) {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

async function generateSitemap(allArticles) {
  const staticPaths = ['/', '/blog', '/commonplace', '/about'];
  const urls = [];
  for (const p of staticPaths) {
    urls.push({ loc: `${siteUrl}${p}`, lastmod: null, priority: null, changefreq: null });
  }
  for (const a of allArticles) {
    urls.push({ loc: `${siteUrl}${a.path}`, lastmod: toISODateOnly(a.lastmod), priority: null, changefreq: null });
  }
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((u) => {
      return [
        '  <url>',
        `    <loc>${escapeXml(u.loc)}</loc>`,
        u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
        '  </url>'
      ].filter(Boolean).join('\n');
    }),
    '</urlset>'
  ].join('\n');
  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), xml);
}

function rfc822(date) {
  return new Date(date).toUTCString();
}

async function generateRss(allArticles) {
  const channelTitle = 'Sandheep Rajkumar — Writings';
  const channelLink = siteUrl;
  const channelDesc = 'Writing about things I get curious about.';
  const lastBuildDate = rfc822(new Date());

  const itemsXml = allArticles.map((a) => {
    const title = escapeXml(a.title);
    const link = `${siteUrl}${a.path}`;
    const guid = link;
    const pubDate = rfc822(a.pubDate);
    const description = escapeXml(a.description || '');
    return [
      '  <item>',
      `    <title>${title}</title>`,
      `    <link>${link}</link>`,
      `    <guid isPermaLink="true">${guid}</guid>`,
      `    <pubDate>${pubDate}</pubDate>`,
      `    <description>${description}</description>`,
      '  </item>'
    ].join('\n');
  }).join('\n');

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `  <title>${escapeXml(channelTitle)}</title>`,
    `  <link>${channelLink}</link>`,
    `  <description>${escapeXml(channelDesc)}</description>`,
    `  <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    itemsXml,
    '</channel>',
    '</rss>'
  ].join('\n');

  await fs.writeFile(path.join(publicDir, 'feed.xml'), rss);
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });
  const articlesByFile = await readArticlesDir();
  const metaMap = await readArticlesMetadataFromTs();

  const combined = articlesByFile.map((a) => {
    const meta = metaMap.get(a.id) || {};
    const title = meta.title || a.titleFromH1 || a.id;
    const pubDate = meta.fullDate ? new Date(meta.fullDate) : a.mtime;
    const lastmod = a.mtime;
    const description = stripMarkdown(a.content, 280);
    return { id: a.id, path: a.path, title, pubDate, lastmod, description };
  })
  // newest first
  .sort((x, y) => y.pubDate.getTime() - x.pubDate.getTime());

  await generateSitemap(combined);
  await generateRss(combined);

  // eslint-disable-next-line no-console
  console.log(`Generated sitemap.xml and feed.xml with ${combined.length} posts.`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});