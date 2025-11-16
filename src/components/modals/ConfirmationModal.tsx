// ============================================================================
// FILE: src/components/modals/ConfirmationModal.tsx
// ============================================================================
import BaseModal from './BaseModal';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export default function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
    >
      {variant === 'destructive' && (
        <div className="flex items-center gap-2 p-4 mb-4 bg-destructive/10 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">This action cannot be undone.</p>
        </div>
      )}
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          {cancelText}
        </Button>
        <Button
          variant={variant === 'destructive' ? 'destructive' : 'default'}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </BaseModal>
  );
}

