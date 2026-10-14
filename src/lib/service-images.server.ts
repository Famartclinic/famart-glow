/**
 * Server-side storage and metadata for admin-managed service images.
 * Uploads live in the private `service-images` bucket and are served to
 * browsers through `/api/public/service-image/<path>`.
 */

export const SERVICE_IMAGE_BUCKET = "service-images";
export const SERVICE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/** Public: slug -> image URL map for every service that has an uploaded photo. */
export async function listServiceImages(): Promise<Record<string, string>> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("service_images").select("slug, url");
  if (error || !data) return {};
  return Object.fromEntries(data.map((row) => [row.slug, row.url]));
}

/** Admin: records (or replaces) the image URL for a service. */
export async function setServiceImage(slug: string, url: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("service_images")
    .upsert({ slug, url, updated_at: new Date().toISOString() }, { onConflict: "slug" });
  if (error) throw new Error(error.message);
}

/** Admin: removes the record and all stored variants for a service. */
export async function removeServiceImage(slug: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("service_images")
    .select("url")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (data?.url) await deleteStoredServiceImage(data.url);
  const { error: deleteError } = await supabaseAdmin.from("service_images").delete().eq("slug", slug);
  if (deleteError) throw new Error(deleteError.message);
}

/** Uploads one already-optimised image variant and returns its public proxy URL. */
export async function storeServiceImage(path: string, base64: string, contentType: string) {
  if (!SERVICE_IMAGE_TYPES.includes(contentType)) throw new Error("Unsupported image type");
  const clean = path.replace(/[^a-zA-Z0-9/_.-]/g, "-").replace(/^\/+/, "");
  const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  if (binary.byteLength > 6 * 1024 * 1024) throw new Error("Image is too large");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.storage
    .from(SERVICE_IMAGE_BUCKET)
    .upload(clean, binary, { contentType, upsert: true, cacheControl: "31536000" });
  if (error) throw new Error(error.message);
  return `/api/public/service-image/${clean}`;
}

export async function fetchServiceImage(path: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.storage.from(SERVICE_IMAGE_BUCKET).download(path);
  if (error || !data) return null;
  return data;
}

/** Removes the 800/1200/1600 variants behind a stored service image URL. */
export async function deleteStoredServiceImage(url: string) {
  if (!url.startsWith("/api/public/service-image/")) return;
  const path = url.replace("/api/public/service-image/", "");
  const variants = Array.from(
    new Set([
      path,
      path.replace(/-w1200\.webp$/, "-w800.webp"),
      path.replace(/-w1200\.webp$/, "-w1600.webp"),
    ]),
  );
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin.storage
    .from(SERVICE_IMAGE_BUCKET)
    .remove(variants)
    .then(() => undefined)
    .catch(() => undefined);
}
