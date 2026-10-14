import { createContext, useContext, type ReactNode } from "react";

/**
 * slug -> uploaded image URL map, resolved server-side by the route loaders
 * and injected once per page. Components fall back to the static image or
 * on-brand artwork when a slug has no entry.
 */
export const ServiceImagesContext = createContext<Record<string, string>>({});

export function ServiceImagesProvider({
  images,
  children,
}: {
  images: Record<string, string>;
  children: ReactNode;
}) {
  return <ServiceImagesContext.Provider value={images}>{children}</ServiceImagesContext.Provider>;
}

/** Returns the admin-uploaded image URL for a service slug, if any. */
export function useServiceImage(slug: string): string | undefined {
  return useContext(ServiceImagesContext)[slug];
}
