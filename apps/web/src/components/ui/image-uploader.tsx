import { useState, useRef, useCallback } from "react";
import { X, Upload, ImagePlus, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8787/api";
const MEDIA_BASE = import.meta.env.PROD
  ? "https://media.marketsathi.com"
  : `${API_BASE}/uploads/file`;

/** Build a full image URL from an R2 key */
export function getImageUrl(key: string): string {
  if (key.startsWith("http")) return key;
  return `${MEDIA_BASE}/${key}`;
}

interface ImageUploaderProps {
  /** Folder path in R2 (e.g. "businesses/abc123") */
  folder: string;
  /** Current list of uploaded image URLs */
  images: string[];
  /** Callback when images change */
  onChange: (images: string[]) => void;
  /** Maximum number of images allowed */
  maxImages?: number;
  /** Label to show above the uploader */
  label?: string;
}

export function ImageUploader({
  folder,
  images,
  onChange,
  maxImages = 5,
  label = "Photos",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setError(null);

      const remaining = maxImages - images.length;
      if (remaining <= 0) {
        setError(`Maximum ${maxImages} images allowed`);
        return;
      }

      const filesToUpload = Array.from(files).slice(0, remaining);
      setUploading(true);

      try {
        const uploadedUrls: string[] = [];

        for (const file of filesToUpload) {
          // Validate client-side
          if (!file.type.startsWith("image/")) {
            setError(`${file.name} is not an image file`);
            continue;
          }
          if (file.size > 10 * 1024 * 1024) {
            setError(`${file.name} exceeds 10MB limit`);
            continue;
          }

          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);

          const response = await api.post("/uploads", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          uploadedUrls.push(response.data.key);
        }

        if (uploadedUrls.length > 0) {
          onChange([...images, ...uploadedUrls]);
        }
      } catch (err: any) {
        setError(err.response?.data?.error || err.message || "Upload failed");
      } finally {
        setUploading(false);
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [folder, images, maxImages, onChange],
  );

  const removeImage = useCallback(
    async (index: number) => {
      const key = images[index];
      try {
        await api.delete("/uploads", { data: { key } });
      } catch {
        // Still remove from UI even if delete fails
      }
      onChange(images.filter((_, i) => i !== index));
    },
    [images, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleUpload(e.dataTransfer.files);
    },
    [handleUpload],
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      {/* Thumbnail previews */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((key, index) => (
            <div
              key={key}
              className="relative group w-24 h-24 rounded-xl overflow-hidden border bg-muted/50"
            >
              <img
                src={getImageUrl(key)}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 h-6 w-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone / upload button */}
      {images.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 py-8 px-4 border-2 border-dashed border-muted-foreground/25 rounded-xl bg-muted/30 hover:bg-muted/50 hover:border-muted-foreground/40 transition-colors cursor-pointer"
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
              <span className="text-sm text-muted-foreground">
                Uploading...
              </span>
            </>
          ) : (
            <>
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                {images.length === 0 ? (
                  <Upload className="h-5 w-5" />
                ) : (
                  <ImagePlus className="h-5 w-5" />
                )}
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-foreground">
                  {images.length === 0
                    ? "Upload photos"
                    : "Add more photos"}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Drag & drop or click to browse · Max 10MB per image
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {images.length}/{maxImages} photos
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(e) => handleUpload(e.target.files)}
      />

      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}
