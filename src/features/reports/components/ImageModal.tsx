// ============================================================================
// FILE: src/features/reports/components/ImageModal.tsx
// ============================================================================
import BaseModal from "@/components/modals/BaseModal";
import LoadingSpinner from "@/components/feedback/LoadingSpinner";
import { useState } from "react";

interface ImageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
}

export default function ImageModal({
  open,
  onOpenChange,
  imageUrl,
}: ImageModalProps) {
  const [loading, setLoading] = useState(true);

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title="Report Visualization"
      size="xl"
    >
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner text="Loading image..." />
          </div>
        )}
        <img
          src={imageUrl}
          alt="Report visualization"
          className="w-full h-auto rounded-lg"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
    </BaseModal>
  );
}
