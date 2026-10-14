import { createServerFn } from "@tanstack/react-start";

/** Public: slug -> image URL map for services with admin-uploaded photos. */
export const getServiceImages = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, string>> => {
    const { listServiceImages } = await import("@/lib/service-images.server");
    return listServiceImages();
  },
);

/** Admin: current image URL for every service. */
export const adminListServiceImages = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, string>> => {
    const { requireAdmin } = await import("@/lib/shop.server");
    const { listServiceImages } = await import("@/lib/service-images.server");
    await requireAdmin();
    return listServiceImages();
  },
);

/** Admin: uploads one already-resized image variant (base64, no data-URL prefix). */
export const adminUploadServiceImage = createServerFn({ method: "POST" })
  .inputValidator((data: { path: string; base64: string; contentType: string }) => ({
    path: String(data.path),
    base64: String(data.base64),
    contentType: String(data.contentType),
  }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/shop.server");
    const { storeServiceImage } = await import("@/lib/service-images.server");
    await requireAdmin();
    const url = await storeServiceImage(data.path, data.base64, data.contentType);
    return { url };
  });

/** Admin: records the uploaded image as the service's photo. */
export const adminSetServiceImage = createServerFn({ method: "POST" })
  .inputValidator((data: { slug: string; url: string }) => ({
    slug: String(data.slug),
    url: String(data.url),
  }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/shop.server");
    const { setServiceImage } = await import("@/lib/service-images.server");
    await requireAdmin();
    await setServiceImage(data.slug, data.url);
    return { ok: true as const };
  });

/** Admin: removes a service photo (record plus stored files). */
export const adminRemoveServiceImage = createServerFn({ method: "POST" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug) }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/shop.server");
    const { removeServiceImage } = await import("@/lib/service-images.server");
    await requireAdmin();
    await removeServiceImage(data.slug);
    return { ok: true as const };
  });

/** Admin: deletes the stored files behind a URL (used when replacing a photo). */
export const adminDeleteServiceImageFile = createServerFn({ method: "POST" })
  .inputValidator((data: { url: string }) => ({ url: String(data.url ?? "") }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/shop.server");
    const { deleteStoredServiceImage } = await import("@/lib/service-images.server");
    await requireAdmin();
    await deleteStoredServiceImage(data.url);
    return { ok: true as const };
  });
