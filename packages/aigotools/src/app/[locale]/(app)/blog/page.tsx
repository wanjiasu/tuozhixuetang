import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/common/container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { AppConfig } from "@/lib/config";

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

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("blog");

  return {
    title: `AI Blog | Latest AI News & Insights | ${AppConfig.siteName}`,
    description:
      "Stay ahead with our latest articles, tutorials, and AI industry news.",
    keywords:
      "AI blog, artificial intelligence news, AI tutorials, AI insights",
  };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset,
      alt
    },
    author-> {
      name,
      image {
        asset
      }
    },
    categories[]-> {
      title,
      slug
    },
    body
  }`;

  return client.fetch(query);
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const posts = await getBlogPosts();

  return (
    <div className="cityscape-bg min-h-screen">
      <Container className="mt-4">
        {/* Hero Section */}
        <div className="text-center py-16 border-b border-white/20">
          <h1 className="text-4xl sm:text-5xl font-bold text-white gradient-text neon-glow mb-4">
            Latest from the Blog
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Stay ahead with our latest articles, tutorials, and AI industry news.
          </p>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <div className="my-16">
            <div className="modern-card p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    {posts[0].categories?.[0] && (
                      <span className="bg-white/10 text-white/90 px-3 py-1 rounded-full text-sm">
                        {posts[0].categories[0].title}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-white gradient-text mb-4">
                    {posts[0].title}
                  </h2>
                  <p className="text-white/80 mb-6 text-lg">
                    {posts[0].body?.[0]?.children?.[0]?.text?.substring(0, 150) ||
                      "Read this amazing article..."}
                    ...
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      {/* Guard against null author */}
                      {posts[0].author?.image && (
                        <img
                          alt={posts[0].author?.name ?? AppConfig.siteName}
                          className="w-8 h-8 rounded-full"
                          src={urlFor(posts[0].author.image)
                            .width(32)
                            .height(32)
                            .url()}
                        />
                      )}
                      <span className="text-white font-medium">
                        {posts[0].author?.name ?? AppConfig.siteName}
                      </span>
                    </div>
                    <span className="text-white/70">
                      {new Date(posts[0].publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    href={`/blog/${posts[0].slug.current}`}
                  >
                    Read Article
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
                <div className="relative">
                  {posts[0].mainImage ? (
                    <img
                      alt={posts[0].mainImage.alt || posts[0].title}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                      src={urlFor(posts[0].mainImage)
                        .width(600)
                        .height(400)
                        .url()}
                    />
                  ) : (
                    <div className="w-full h-80 bg-white/10 rounded-xl flex items-center justify-center">
                      <span className="text-white/60 text-lg">No Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white gradient-text neon-glow mb-8">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`}>
                <article className="modern-card overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <div className="relative">
                    {post.mainImage ? (
                      <img
                        alt={post.mainImage.alt || post.title}
                        className="w-full h-48 object-cover"
                        src={urlFor(post.mainImage).width(400).height(250).url()}
                      />
                    ) : (
                      <div className="w-full h-48 bg-white/10 flex items-center justify-center">
                        <span className="text-white/60">No Image</span>
                      </div>
                    )}
                    {post.categories?.[0] && (
                      <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded text-sm">
                        {post.categories[0].title}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/80 mb-4 line-clamp-3">
                      {post.body?.[0]?.children?.[0]?.text?.substring(0, 120) ||
                        "Read this interesting article..."}
                      ...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {post.author?.image && (
                          <img
                            alt={post.author?.name ?? AppConfig.siteName}
                            className="w-6 h-6 rounded-full"
                            src={urlFor(post.author.image)
                              .width(24)
                              .height(24)
                              .url()}
                          />
                        )}
                        <span className="text-white/70 text-sm font-medium">
                          {post.author?.name ?? AppConfig.siteName}
                        </span>
                      </div>
                      <span className="text-white/60 text-sm">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="modern-card text-center p-8 lg:p-12 mb-16">
          <h2 className="text-3xl font-bold text-white gradient-text mb-4">Stay Updated</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest AI insights delivered
            to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg focus:outline-none focus:border-white/40"
              placeholder="Enter your email"
              type="email"
            />
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}