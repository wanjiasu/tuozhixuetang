import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import Container from "@/components/common/container";
import { getFeaturedSites, getLatestSites } from "@/lib/actions";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("tools");

  return {
    title: "AI Tools Directory | AIverseTools",
    description: "Search, filter, and find the perfect AI tool for any task.",
    keywords:
      "AI tools, artificial intelligence, productivity tools, AI directory",
  };
}

export default async function ToolsPage() {
  const t = await getTranslations("tools");
  const [featuredSites, latestSites] = await Promise.all([
    getFeaturedSites(),
    getLatestSites(),
  ]);

  const allSites = [...featuredSites, ...latestSites];

  return (
    <Container className="mt-4">
      <div className="text-center py-16 border-b border-primary-200 dark:border-primary-700">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 dark:text-primary-200 mb-4">
          AI Tools Directory
        </h1>
        <p className="text-primary-600 dark:text-primary-400 max-w-2xl mx-auto text-lg">
          Search, filter, and find the perfect AI tool for any task.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-primary-50 dark:bg-primary-800 p-6 rounded-xl my-10 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <input
          className="w-full p-3 bg-white dark:bg-primary-700 border border-primary-200 dark:border-primary-600 text-primary-800 dark:text-primary-200 rounded-lg text-base"
          placeholder="Search by tool name..."
          type="text"
        />
        <select className="w-full p-3 bg-white dark:bg-primary-700 border border-primary-200 dark:border-primary-600 text-primary-800 dark:text-primary-200 rounded-lg text-base">
          <option>All Categories</option>
          <option>AI Writing</option>
          <option>Image Generation</option>
          <option>Video Generation</option>
          <option>Productivity</option>
        </select>
        <select className="w-full p-3 bg-white dark:bg-primary-700 border border-primary-200 dark:border-primary-600 text-primary-800 dark:text-primary-200 rounded-lg text-base">
          <option>All Pricing</option>
          <option>Free</option>
          <option>Freemium</option>
          <option>Paid</option>
        </select>
        <button className="w-full p-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all">
          Filter
        </button>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {allSites.map((site) => (
          <a
            key={site._id}
            className="bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-xl p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            href={`/s/${site.siteKey}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-700 rounded-lg flex items-center justify-center">
                {site.snapshot ? (
                  <img
                    alt={site.name}
                    className="w-8 h-8 rounded"
                    src={site.snapshot}
                  />
                ) : (
                  <span className="text-primary-600 dark:text-primary-300 font-bold text-lg">
                    {site.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-200 flex-1">
                {site.name}
              </h3>
            </div>
            <p className="text-primary-600 dark:text-primary-400 flex-grow mb-4 line-clamp-3">
              {site.desceription || "Discover this amazing AI tool."}
            </p>
            <div className="flex flex-wrap gap-2">
              {site.categories?.slice(0, 2).map((category, index) => (
                <span
                  key={index}
                  className="bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-200 px-2 py-1 rounded text-sm"
                >
                  {typeof category === "string" ? category : "AI Tool"}
                </span>
              ))}
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                {site.pricingType || "Free"}
              </span>
            </div>
          </a>
        ))}
      </div>
    </Container>
  );
}
