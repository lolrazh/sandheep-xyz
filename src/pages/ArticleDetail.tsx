
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getArticleById } from '../data/articles';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = getArticleById(id || "");

  if (!article) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-3xl mb-4">Article Not Found</h2>
          <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')} 
            className="font-lexend text-sm uppercase tracking-wider px-6 py-2 border border-jet/20 hover:border-jet/60 transition-colors"
          >
            Return Home
          </button>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Layout>
      <article className="mx-auto max-w-3xl">
        <div className="mb-2">
          <span className="font-lexend text-xs uppercase tracking-wider text-jet/60">
            {formatDate(article.date)}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
        
        {/* This would typically come from a CMS or markdown parser */}
        <div className="prose prose-lg prose-slate mx-auto">
          <p className="text-xl mb-6 text-jet/80">{article.excerpt}</p>
          
          <p className="mb-4">
            The pursuit of the tangible in an increasingly digital world represents more than mere nostalgia—it speaks to fundamental human needs for sensory engagement and connection. When we interact with physical objects, particularly those crafted with intention and care, we access experiences that digital alternatives, for all their convenience, simply cannot replicate.
          </p>
          
          <p className="mb-4">
            Consider the subtle weight of a fountain pen, the distinctive scent of aged paper, or the varied textures of handbound leather. These sensory dimensions engage us in ways that pixels on screens never quite manage. They ground us in material reality, connecting us to traditions of craftsmanship that span generations and cultures.
          </p>
          
          <p className="mb-4">
            Furthermore, analog technologies and traditional crafts often demand our full attention. They resist the fragmented focus that characterizes so much of contemporary digital interaction. A vinyl record doesn't allow easy skipping between tracks; a letterpress requires deliberate setting of each character; a film camera limits shots and prevents immediate review. These "limitations" become virtues when understood as invitations to deeper engagement.
          </p>
          
          <p className="mb-4">
            Perhaps most significantly, physical objects age in ways that digital files do not. They develop patinas, wear patterns, and characteristics unique to their use. A well-read book bears the marks of its reader's journey; a used camera carries subtle traces of previous photographers. These objects become repositories of personal and collective history, gaining rather than losing value through their journey through time.
          </p>
          
          <p className="mb-4">
            As we navigate an era of unprecedented technological change, these material connections offer an essential counterbalance—not in rejection of digital innovation, but as complementary experiences that satisfy different aspects of our humanity. In preserving and celebrating tangible traditions, we maintain crucial dimensions of sensory experience, temporal awareness, and cultural continuity.
          </p>
        </div>
        
        <div className="mt-12 pt-6 border-t border-jet/10">
          <button 
            onClick={() => navigate('/')} 
            className="font-lexend text-sm uppercase tracking-wider text-jet/70 hover:text-jet transition-colors"
          >
            ← Back to Articles
          </button>
        </div>
      </article>
    </Layout>
  );
};

export default ArticleDetail;
