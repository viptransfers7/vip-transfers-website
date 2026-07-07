import type { MetadataRoute } from "next";

import { privateTours, servicePages, vehicles } from "@/lib/site-data";

const baseUrl = "https://viptransferskorea.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/booking", "/contact", "/faq", "/fleet", "/track/demo"];
  const serviceRoutes = Object.keys(servicePages).map((slug) => `/${slug}`);
  const fleetRoutes = vehicles.map((vehicle) => `/fleet/${vehicle.slug}`);
  const tourRoutes = Object.keys(privateTours).map((slug) => `/private-tours/${slug}`);

  return [...staticRoutes, ...serviceRoutes, ...fleetRoutes, ...tourRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
