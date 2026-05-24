import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blog';
import SectionBadge from '../components/ui/SectionBadge';
import NotFound from './NotFound';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const sections = post.content.split('\n## ').filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{post.title} — SoftTricksCode Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <article className="blog-hub-bg section-padding mx-auto max-w-3xl pt-28 sm:pt-32">
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
              alt=""
              className="max-h-[420px] w-full object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-stc-primary px-3 py-1 text-xs font-semibold text-white">
              {post.category}
            </span>
          </div>
          <SectionBadge className="mt-6">Article</SectionBadge>
          <h1 className="mt-4 font-serif text-3xl font-bold text-stc-black sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 border-b border-slate-200 pb-6 text-sm text-stc-muted">
            <span>By {post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <div className="mt-8">
            {sections.map((section, i) => {
              const lines = section.split('\n');
              const heading = lines[0].replace(/^#+\s*/, '');
              const body = lines.slice(1).join('\n');
              return (
                <div key={i} className="mb-8">
                  {i > 0 && (
                    <h2 className="mb-4 font-serif text-2xl font-bold text-stc-black">
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
