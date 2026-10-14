import { adminUploadServiceImage } from "@/lib/service-images.functions";
import { validateImageFile } from "@/lib/image-upload";

/** Landscape ratio of the service image cards; uploads are centre-cropped to this. */
export const SERVICE_IMAGE_RATIO = 4 / 3;
/** Widths generated for every upload; the 1200px variant is the stored URL. */
export const SERVICE_IMAGE_VARIANT_WIDTHS = [800, 1200, 1600] as const;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That file could not be read as an image."));
    };
    img.src = url;
  });
}

/** Center-crops the source so its aspect ratio matches the service card (4:3). */
function cropToCardRatio(img: HTMLImageElement): { sx: number; sy: number; sw: number; sh: number } {
  const srcRatio = img.naturalWidth / img.naturalHeight;
  if (srcRatio > SERVICE_IMAGE_RATIO) {
    const sw = img.naturalHeight * SERVICE_IMAGE_RATIO;
    return { sx: (img.naturalWidth - sw) / 2, sy: 0, sw, sh: img.naturalHeight };
  }
  const sh = img.naturalWidth / SERVICE_IMAGE_RATIO;
  return { sx: 0, sy: (img.naturalHeight - sh) / 2, sw: img.naturalWidth, sh };
}

async function toWebpBase64(img: HTMLImageElement, width: number): Promise<string> {
  const crop = cropToCardRatio(img);
  const scale = Math.min(1, width / crop.sw);
  const w = Math.max(1, Math.round(crop.sw * scale));
  const h = Math.max(1, Math.round(crop.sh * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Image processing is not supported in this browser.");
  ctx.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, w, h);
  const dataUrl = canvas.toDataURL("image/webp", 0.82);
  if (!dataUrl.startsWith("data:image/webp")) {
    throw new Error("This browser cannot create optimised WEBP images.");
  }
  return dataUrl.split(",")[1] ?? "";
}

/**
 * Validates, auto-crops to the 4:3 card frame and uploads a service image.
 * Returns the URL of the 1200px variant (800 / 1200 / 1600 are all stored).
 */
export async function uploadServiceImage(slug: string, file: File): Promise<string> {
  const problem = validateImageFile(file);
  if (problem) throw new Error(problem);

  const img = await loadImage(file);
  const stamp = Date.now();
  let mainUrl = "";

  for (const width of SERVICE_IMAGE_VARIANT_WIDTHS) {
    const base64 = await toWebpBase64(img, width);
    const { url } = await adminUploadServiceImage({
      data: {
        path: `services/${slug || "service"}/${stamp}-w${width}.webp`,
        base64,
        contentType: "image/webp",
      },
    });
    if (width === 1200) mainUrl = url;
  }

  return mainUrl;
}
