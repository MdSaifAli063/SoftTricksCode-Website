import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function parseDate(dateStr) {
  const d = new Date(dateStr);
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'long' }),
  };
}

const AUTHOR_AVATAR =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop';

export default function BlogCard({ post }) {
  const { day, month } = parseDate(post.date);

  return (
    <article className="group">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={post.cover}
            alt=""
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute right-3 top-3 rounded-lg bg-stc-black/75 px-2.5 py-2 text-center text-white backdrop-blur-sm">
            <span className="block text-lg font-bold leading-none">{day}</span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-wide opacity-90">
              {month}
            </span>
          </div>
          <span className="absolute bottom-3 left-3 rounded-full bg-stc-primary px-3 py-1 text-xs font-semibold text-white">
            {post.category}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 border-b border-slate-200 pb-4">
          <img
            src={post.authorAvatar || AUTHOR_AVATAR}
            alt={post.author}
            className="h-9 w-9 rounded-full object-cover"
            loading="lazy"
          />
          <span className="text-sm text-stc-muted">
            By <span className="font-medium text-stc-black">{post.author}</span>
          </span>
        </div>

        <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-stc-black transition group-hover:text-stc-primary group-hover:underline decoration-stc-primary underline-offset-4">
          {post.title}
        </h3>

        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-stc-black transition group-hover:text-stc-primary">
          Continue Reading
          <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </p>
      </Link>
    </article>
  );
}
