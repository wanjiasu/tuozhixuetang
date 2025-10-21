import { getTranslations } from "next-intl/server";

import Container from "@/components/common/container";
import Hero from "@/components/index/hero";
import Search from "@/components/index/search";
import SiteGroup from "@/components/common/sites-group";
import BlogSection from "@/components/home/blog-section";
import { getFeaturedSites, getLatestSites } from "@/lib/actions";
import { client } from "@/sanity/lib/client";

async function getBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
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

export default async function Page() {
  const t = await getTranslations("index");
  const [featuredSites, latestSites, blogPosts] = await Promise.all([
    getFeaturedSites(),
    getLatestSites(),
    getBlogPosts(),
  ]);

  return (
    <div className="cityscape-bg min-h-screen">
      <Container>
        <Hero />
        <Search />
        <SiteGroup id="featured" sites={featuredSites} title={t("featured")} />
        <SiteGroup id="latest" sites={latestSites} title={t("latest")} />
      </Container>
      <BlogSection posts={blogPosts} />
    </div>
  );
}
