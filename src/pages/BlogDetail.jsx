import { useParams, Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, defaultAuthor } from '../data/blog';
import SectionBadge from '../components/ui/SectionBadge';
import NotFound from './NotFound';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const sections = post.content.split('\n## ').filter(Boolean);

  return (
    <>
      <Seo
        title={`${post.title} — Soft Tricks Code Blog`}
        description={post.excerpt}
        pathname={`/blog/${post.slug}`}
        image={post.cover}
        type="article"
        author={post.author}
        articlePublishedTime={new Date(post.date).toISOString()}
        articleModifiedTime={new Date(post.date).toISOString()}
      />
      <article className="blog-hub-bg mx-auto w-full max-w-3xl px-4 py-14 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:px-6 sm:py-20 sm:pt-32">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stc-primary hover:underline"
        >
          <ArrowLeft size={18} /> Back to Blog
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={post.cover}
              alt={`${post.title} cover image`}
              className="aspect-[16/10] max-h-[280px] w-full object-cover sm:aspect-auto sm:max-h-[420px]"
              loading="lazy"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-stc-primary px-3 py-1 text-xs font-semibold text-white">
              {post.category}
            </span>
          </div>
          <SectionBadge className="mt-6">Article</SectionBadge>
          <h1 className="mt-4 font-serif text-3xl font-bold text-stc-black sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar || defaultAuthor.avatar}
                alt={post.author}
                className="h-11 w-11 rounded-full border-2 border-stc-primary/25 object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <span className="text-sm text-stc-muted">
                By <span className="font-semibold text-stc-black">{post.author}</span>
              </span>
            </div>
            <span className="hidden text-stc-muted sm:inline">·</span>
            <span className="text-sm text-stc-muted">{post.date}</span>
            <span className="text-stc-muted">·</span>
            <span className="text-sm text-stc-muted">{post.readTime}</span>
          </div>
          <div className="mt-8">
            {sections.map((section, i) => {
              const lines = section.split('\n');
              const heading = lines[0].replace(/^#+\s*/, '');
              const body = lines.slice(1).join('\n');
              return (
                <div key={i} className="mb-8">
                  {i > 0 && (
                    <h2 className="mb-4 font-serif text-xl font-bold text-stc-black sm:text-2xl">
                      {heading}
                    </h2>
                  )}
                  {body.split('\n').map((para, j) =>
                    para.trim() ? (
                      <p key={j} className="mb-4 leading-relaxed text-stc-muted">
                        {para.replace(/`/g, '')}
                      </p>
                    ) : null
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </article>
    </>
  );
}
