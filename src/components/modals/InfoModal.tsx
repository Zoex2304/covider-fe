// ============================================================================
// FILE: src/components/modals/InfoModal.tsx
// ============================================================================
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface InfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: React.ReactNode;
}

export default function InfoModal({
  open,
  onOpenChange,
  title,
  content,
}: InfoModalProps) {
  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title={title} size="md">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">{content}</div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </div>
    </BaseModal>
  );
}
