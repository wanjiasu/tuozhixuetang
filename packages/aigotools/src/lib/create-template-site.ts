import { Site } from "@/models/site";

import { ProcessStage, SiteState } from "./constants";

export const createTemplateSite = (site: Partial<Site> = {}) => {
  const newSite: Omit<Site, "_id"> = {
    userId: "",
    url: "",
    siteKey: "",
    featured: false,
    weight: 0,
    name: "",
    snapshot: "",
    desceription: "",
    pricingType: "",
    categories: [],
    images: [],
    features: [],
    usecases: [],
    users: [],
    relatedSearchs: [],
    pricings: [],
    links: {},
    voteCount: 0,
    metaKeywords: [],
    metaDesceription: "",
    searchSuggestWords: [],
    state: SiteState.unpublished,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    processStage: ProcessStage.pending,
  };

  return { newSite, ...site } as Site;
};
