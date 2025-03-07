"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
}

const ConfirmDialog: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] md:max-w-md rounded-lg border-2 border-orange/50">
        <DialogHeader>
          <DialogTitle className="text-orange">Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to
            <span className="font-semibold text-orange mx-1"></span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between gap-2">
          <Button
            size={"sm"}
            variant="outline"
            className="text-xs"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            size={"sm"}
            className="text-xs"
            variant="destructive"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
