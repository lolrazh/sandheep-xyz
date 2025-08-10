import React from 'react';
import Layout from '../components/Layout';
import { Separator } from "@/components/ui/separator";

interface Link {
  title: string;
  url: string;
}

const links: Link[] = [
  {
    title: "Steve Jobs' 2005 Stanford Commencement Address",
    url: "https://youtu.be/UF8uR6Z6KLc?si=NZ33mTIRvYuhDOYw"
  },
  {
    title: "The Almanack of Naval Ravikant",
    url: "https://www.goodreads.com/book/show/54898389-the-almanack-of-naval-ravikant"
  },
  {
    title: "How To Be Successful",
    url: "https://blog.samaltman.com/how-to-be-successful"
  },
  {
    title: "How To Do Great Work",
    url: "https://www.paulgraham.com/greatwork.html"
  },
  {
    title: "Software 2.0",
    url: "https://karpathy.medium.com/software-2-0-a64152b37c35"
  },
  {
    title: "Thinking Better on Purpose",
    url: "https://www.lesswrong.com/s/NBDFAKt3GbFwnwzQF"
  },
  {
    title: "Inside Einstein's Mind",
    url: "https://www.youtube.com/watch?v=7CZyDPELXs4&ab_channel=PBSAmerica"
  },
  {
    title: "The Darthmouth Scar Experiment",
    url: "https://www.psychologytoday.com/us/blog/beyond-school-walls/202410/invisible-scars"
  },
  {
    title: "Invisible Gorilla Test",
    url: "https://en.wikipedia.org/wiki/Inattentional_blindness#Invisible_Gorilla_Test"
  },
  {
    title: "Outliers",
    url: "https://www.goodreads.com/book/show/3228917-outliers"
  },
  {
    title: "Human Behavioral Biology",
    url: "https://www.youtube.com/playlist?list=PL848F2368C90DDC3D"
  }
];

const Commonplace = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-10">
        <h1 className="text-3xl font-playfair font-medium mb-10">Commonplace Book</h1>
        <div className="space-y-0">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <article className="group py-4">
                <div className="flex justify-between items-baseline">
                  <h2 className="text-base md:text-lg font-medium group-hover:opacity-80 transition-opacity">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-link"
                    >
                      {link.title}
                    </a>
                  </h2>
                  <span className="font-mono text-xs text-foreground/60 whitespace-nowrap pl-4">
                    {new URL(link.url).hostname.replace('www.', '')}
                  </span>
                </div>
              </article>
              {index < links.length - 1 && (
                <Separator className="bg-border/10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Commonplace;
