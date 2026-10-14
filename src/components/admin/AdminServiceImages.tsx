import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site";
import { uploadServiceImage } from "@/lib/service-image-upload";
import {
  adminDeleteServiceImageFile,
  adminListServiceImages,
  adminRemoveServiceImage,
  adminSetServiceImage,
} from "@/lib/service-images.functions";
import { cn } from "@/lib/utils";

export function AdminServiceImages() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const map = await adminListServiceImages();
        if (active) {
          setImages(map);
          setLoadError(false);
        }
      } catch {
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const upload = async (slug: string, file: File) => {
    setBusySlug(slug);
    const previousUrl = images[slug];
    try {
      const url = await uploadServiceImage(slug, file);
      await adminSetServiceImage({ data: { slug, url } });
      setImages((prev) => ({ ...prev, [slug]: url }));
      toast.success("Service image updated — it is now live on the site.");
      if (previousUrl) {
        await adminDeleteServiceImageFile({ data: { url: previousUrl } }).catch(() => undefined);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not upload that image.");
    } finally {
      setBusySlug(null);
    }
  };

  const remove = async (slug: string) => {
    setBusySlug(slug);
    try {
      await adminRemoveServiceImage({ data: { slug } });
      setImages((prev) => {
        const next = { ...prev };
        delete next[slug];
        return next;
      });
      toast.success("Service image removed.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove that image.");
    } finally {
      setBusySlug(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Service Images</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Add a photo to any service. Uploads are automatically centre-cropped to the 4:3 landscape
        frame used by the service cards, so they always fit without distorting.
      </p>

      {loadError && (
        <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Could not load service images. Check that Supabase is connected and the{" "}
          <code>service_images</code> migration has been applied.
        </p>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {services.map((service) => {
          const url = images[service.slug];
          const busy = busySlug === service.slug;
          return (
            <div
              key={service.slug}
              className="flex flex-col gap-4 rounded-3xl border bg-card p-5 shadow-soft sm:flex-row sm:items-center"
            >
              <Preview slug={service.slug} url={url} icon={service.icon} />
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-display text-sm font-semibold">{service.name}</h2>
                <p className="truncate text-xs text-muted-foreground">/{service.slug}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <UploadButton
                    disabled={busy}
                    onFile={(file) => void upload(service.slug, file)}
                  />
                  {url && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={busy}
                      onClick={() => void remove(service.slug)}
                    >
                      <Trash2 /> Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <p className="mt-6 text-sm text-muted-foreground">Loading service images…</p>}
    </div>
  );
}

function Preview({ slug, url, icon }: { slug: string; url: string | undefined; icon: string }) {
  return (
    <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl border bg-gradient-to-br from-accent via-soft-blue/70 to-accent sm:w-40">
      {url ? (
        <img src={url} alt={`${slug} preview`} className="h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full border border-primary/15 bg-white/70 shadow-soft backdrop-blur-sm">
            <Icon name={icon} strokeWidth={1.5} className="size-6 text-primary/70" />
          </span>
        </span>
      )}
    </div>
  );
}

function UploadButton({
  disabled,
  onFile,
}: {
  disabled: boolean;
  onFile: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
      <Button
        variant="hero"
        size="sm"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className={cn(disabled && "cursor-wait")}
      >
        {disabled ? <Loader2 className="animate-spin" /> : <ImagePlus />}
        {disabled ? "Uploading…" : "Upload image"}
      </Button>
    </>
  );
}
