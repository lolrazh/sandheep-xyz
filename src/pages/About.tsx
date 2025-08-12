
import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
import { buildTitle, canonical, defaultDescription, defaultOgImage, buildWebPageSchema } from '@/lib/seo';

const About = () => {
  const pageTitle = buildTitle('About');
  const pageDescription = 'About Sandheep Rajkumar — background, interests, and ways to connect.';
  const url = canonical('/about');
  const schema = buildWebPageSchema({ url, title: pageTitle, description: pageDescription });

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription || defaultDescription} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription || defaultDescription} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:site_name" content="Sandheep Rajkumar" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription || defaultDescription} />
        <meta name="twitter:image" content={defaultOgImage} />

        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="mx-auto max-w-3xl py-10">
        <h1 className="text-3xl font-playfair font-medium mb-6">About Sandheep Rajkumar</h1>
        <p className="text-lg text-foreground/80">
          Work in progress. This page will contain information about me and my interests.
        </p>
      </div>
    </Layout>
  );
};

export default About;
