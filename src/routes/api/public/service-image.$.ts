import { createFileRoute } from "@tanstack/react-router";

/** Serves admin-uploaded service images from private storage with long caching. */
export const Route = createFileRoute("/api/public/service-image/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = String((params as Record<string, string>)["_splat"] ?? "");
        if (!path || path.includes("..")) return new Response("Not found", { status: 404 });

        const { fetchServiceImage } = await import("@/lib/service-images.server");
        const file = await fetchServiceImage(path);
        if (!file) return new Response("Not found", { status: 404 });

        return new Response(file, {
          headers: {
            "Content-Type": file.type || "image/webp",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
