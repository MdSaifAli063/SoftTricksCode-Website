import Seo from '../components/ui/Seo';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blog';
import BlogCard from '../components/ui/BlogCard';
import PageBanner from '../components/ui/PageBanner';

export default function BlogPage() {
  return (
    <>
      <Seo
        title="Blog — Soft Tricks Code"
        description="Read about web development, AI solutions, full-stack product strategy, and software best practices from Soft Tricks Code."
        pathname="/blog"
      />

      <PageBanner
        badge="Our Blog"
        title="Explore Our Knowledge Hub"
        subtitle="Tips, tutorials, and case studies on web development, AI, and building digital products."
        breadcrumbs={['Blog']}
      />

      <section className="section-padding section-light !pt-12 !pb-20">
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
