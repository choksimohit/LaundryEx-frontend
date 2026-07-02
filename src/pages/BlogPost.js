import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import api from '../utils/api';

const SITE_URL = 'https://www.laundry-express.co.uk';

export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blog/${slug}`)
      .then(res => setPost(res.data))
      .catch(() => navigate('/blog'))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading article...</div>
      </div>
    );
  }

  if (!post) return null;

  const pageTitle = `${post.title} | Laundry Express`;
  const pageDescription = post.meta_description || post.excerpt || '';
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const authorName = post.author === 'Admin' ? 'Laundry Express Team' : post.author;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: pageDescription,
    url: pageUrl,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: { '@type': 'Person', name: authorName },
    publisher: { '@type': 'Organization', name: 'Laundry Express', url: SITE_URL },
    ...(post.cover_image_url && { image: post.cover_image_url }),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* React 19 head hoisting */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={post.cover_image_url || 'https://www.laundry-express.co.uk/hero-laundry.webp'} />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

      {post.cover_image_url && (
        <div className="w-full h-72 md:h-96 overflow-hidden">
          <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to all articles
        </Link>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-200">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {authorName}
            </span>
          </div>

          <div
            className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-slate-800 prose-ul:text-slate-600 prose-ol:text-slate-600 prose-blockquote:border-blue-400 prose-blockquote:text-slate-500 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* CTA */}
        <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready for fresh laundry?</h3>
          <p className="text-blue-100 mb-5">Professional laundry & dry cleaning collected from your door.</p>
          <Link
            to="/"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            Check your postcode →
          </Link>
        </div>
      </div>
    </div>
  );
};
