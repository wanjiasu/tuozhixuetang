"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { urlFor } from "@/sanity/lib/image";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  author: {
    name: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
  };
  categories: Array<{
    title: string;
    slug: { current: string };
  }>;
  body: any[];
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const t = useTranslations("index");

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4">
            Latest from the Blog
          </h2>
          <p className="text-primary-600 max-w-2xl mx-auto text-lg">
            Stay ahead with our latest articles, tutorials, and AI industry
            news.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative">
                {post.mainImage ? (
                  <img
                    alt={post.mainImage.alt || post.title}
                    className="w-full h-48 object-cover"
                    src={urlFor(post.mainImage).width(400).height(250).url()}
                  />
                ) : (
                  <div className="w-full h-48 bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600">No Image</span>
                  </div>
                )}
                {post.categories?.[0] && (
                  <span className="absolute top-4 left-4 bg-primary-600 text-white px-2 py-1 rounded text-sm font-medium">
                    {post.categories[0].title}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-800 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-primary-600 mb-4 line-clamp-3">
                  {post.body?.[0]?.children?.[0]?.text?.substring(0, 120) ||
                    "Read this interesting article..."}
                  ...
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {post.author.image && (
                      <img
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full"
                        src={urlFor(post.author.image)
                          .width(24)
                          .height(24)
                          .url()}
                      />
                    )}
                    <span className="text-primary-700 text-sm font-medium">
                      {post.author.name}
                    </span>
                  </div>
                  <span className="text-primary-500 text-sm">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                <Link
                  className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
                  href={`/blog/${post.slug.current}`}
                >
                  Read More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            href="/blog"
          >
            View All Articles
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}