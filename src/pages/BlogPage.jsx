import Seo from '../components/ui/Seo';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blog';
import BlogCard from '../components/ui/BlogCard';
import SectionBadge from '../components/ui/SectionBadge';

export default function BlogPage() {
  return (
    <>
      <Seo
        title="Blog — Soft Tricks Code"
        description="Read about web development, AI solutions, full-stack product strategy, and software best practices from Soft Tricks Code."
        pathname="/blog"
      />

      <section className="blog-hub-bg border-b border-slate-200/60 pb-12 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:pb-16 sm:pt-32">
        <div className="container-page text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <SectionBadge className="mb-4">Our Blog</SectionBadge>
            <h1 className="font-serif text-3xl font-bold text-stc-black sm:text-4xl md:text-5xl">
              Explore Our Knowledge Hub
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-stc-muted">
              Tips, tutorials, and case studies on web development, AI, and building digital products.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="blog-hub-bg section-padding !pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
