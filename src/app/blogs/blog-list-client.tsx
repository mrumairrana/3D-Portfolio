"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowUpRight, Clock } from "lucide-react";
import { motion } from "motion/react";

type Post = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    author?: string;
    tags?: string[];
  };
  wordCount: number;
};

function readTime(wordCount: number) {
  return Math.max(1, Math.ceil(wordCount / 200));
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BlogCard({ post, isFeatured }: { post: Post; isFeatured?: boolean }) {
  const rt = readTime(post.wordCount);
  const date = formatDate(post.metadata.publishedAt);

  return (
    <div className={`border border-border/50 rounded-2xl overflow-hidden transition-colors hover:border-[hsl(20,100%,70%)]/30 group ${isFeatured ? "bg-card backdrop-blur-sm p-8 md:p-12" : "bg-card/20 backdrop-blur-sm p-6 md:p-8 h-full"}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
          <span className="text-[hsl(20,100%,70%)] font-medium tracking-[0.15em] uppercase text-xs">
            {isFeatured ? "Featured" : post.metadata.tags?.[0] || "Article"}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>
            <CalendarDays className="w-3 h-3 md:w-3.5 md:h-3.5" />
            {date}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>
            <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
            {rt} min read
          </span>
        </div>
        {isFeatured && (
          <span className="text-[hsl(20,100%,70%)] text-sm font-medium group-hover:underline">
            Read article &rarr;
          </span>
        )}
      </div>

      <h2 className={`font-display leading-[1.1] mb-4 group-hover:text-[hsl(20,100%,70%)] transition-colors duration-300 ${isFeatured ? "text-2xl md:text-3xl text-foreground" : "text-lg md:text-xl"}`}>
        {post.metadata.title}
      </h2>

      <p className={`text-muted-foreground leading-relaxed mb-6 font-sans ${isFeatured ? "text-sm md:text-base max-w-lg" : "text-sm line-clamp-2"}`}>
        {post.metadata.summary}
      </p>

      {isFeatured ? (
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex gap-2 flex-wrap">
            {post.metadata.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-[hsl(20,100%,70%)]/20 text-[hsl(20,100%,70%)] bg-[hsl(20,100%,70%)]/5 text-xs px-3 py-1.5 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-[hsl(20,100%,70%)] text-sm font-medium group-hover:underline">
            Read article &rarr;
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex gap-1.5 flex-wrap">
            {post.metadata.tags?.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-border/50 text-muted-foreground text-[10px] rounded-full px-2 py-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(20,100%,70%)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      )}
    </div>
  );
}

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(20,100%,70%)]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(20,100%,70%)]/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-24 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-[hsl(20,100%,70%)]" />
            <span className="text-[hsl(20,100%,70%)] text-sm font-medium tracking-[0.2em] uppercase font-sans">
              Blog
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-[0.95] tracking-tight">
            Thoughts &<br />
            <span className="text-[hsl(20,100%,70%)]">Dispatches</span>
          </h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-lg leading-relaxed font-sans">
            Notes on building things, breaking things, and occasionally writing about it.
          </p>
        </motion.div>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <Link href={`/blogs/${featured.slug}`} className="group block">
              <BlogCard post={featured} isFeatured />
            </Link>
          </motion.div>
        )}

        {rest.length > 0 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16 origin-left"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-6">
          {rest.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.35 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-16 w-full"
            >
              <Link href={`/blogs/${post.slug}`} className="group block h-full">
                <BlogCard post={post} />
              </Link>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-24"
          >
            <p className="text-muted-foreground text-lg font-sans">
              No posts yet. Check back soon.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}