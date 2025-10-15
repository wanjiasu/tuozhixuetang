import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";

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
    bio?: any[];
  };
  categories: Array<{
    title: string;
    slug: { current: string };
  }>;
  body: any[];
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
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
      },
      bio
    },
    categories[]-> {
      title,
      slug
    },
    body
  }`;

  return client.fetch(query, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | ${AppConfig.siteName} Blog`,
    description:
      post.body?.[0]?.children?.[0]?.text?.substring(0, 160) ||
      `Read this article on ${AppConfig.siteName} blog.`,
    keywords: post.categories?.map((cat) => cat.title).join(", ") || "AI, blog",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="mt-4">
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-primary-600 mb-8">
          <Link className="hover:text-primary-700" href="/">
            Home
          </Link>
          <span>/</span>
          <Link className="hover:text-primary-700" href="/blog">
            Blog
          </Link>
          <span>/</span>
          <span className="text-primary-800">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((category) => (
              <span
                key={category.slug.current}
                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
              >
                {category.title}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              {post.author?.image && (
                <img
                  alt={post.author?.name ?? AppConfig.siteName}
                  className="w-12 h-12 rounded-full"
                  src={urlFor(post.author.image).width(48).height(48).url()}
                />
              )}
              <div>
                <div className="font-semibold text-primary-800">
                  {post.author?.name ?? AppConfig.siteName}
                </div>
                <div className="text-primary-600 text-sm">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="mb-8">
              <img
                alt={post.mainImage.alt || post.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
                src={urlFor(post.mainImage).width(800).height(450).url()}
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none prose-primary">
          <PortableText
            components={{
              types: {
                image: ({ value }) => (
                  <img
                    alt={value.alt || "Article image"}
                    className="mx-auto block rounded-lg shadow-md w-full max-w-[560px] sm:max-w-[480px]"
                    src={urlFor(value).width(800).url()}
                  />
                ),
              },
              marks: {
                link: ({ children, value }) => (
                  <a
                    className="text-primary-600 hover:text-primary-700 underline"
                    href={value.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {children}
                  </a>
                ),
              },
              block: {
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-primary-800 mt-8 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-primary-800 mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-primary-800 mt-4 mb-2">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary-300 pl-4 italic text-primary-700 my-4">
                    {children}
                  </blockquote>
                ),
              },
            }}
            value={post.body}
          />
        </div>

        {/* Author Bio */}
        {post.author?.bio && (
          <div className="bg-primary-50 rounded-xl p-6 mt-12">
            <div className="flex items-start gap-4">
              {post.author?.image && (
                <img
                  alt={post.author?.name ?? AppConfig.siteName}
                  className="w-16 h-16 rounded-full"
                  src={urlFor(post.author.image).width(64).height(64).url()}
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2">
                  About {post.author?.name ?? AppConfig.siteName}
                </h3>
                <div className="text-primary-600">
                  <PortableText value={post.author?.bio} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-primary-200">
          <Link
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            href="/blog"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </Container>
  );
}
