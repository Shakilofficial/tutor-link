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
  title: string; // Title of the dialog (customizable)
  description: string; // Description text (customizable)
  actionText: string; // Customizable action text
  confirmButtonText: string; // Text for the confirm button
}

const ConfirmDialog: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
  actionText,
  confirmButtonText,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] md:max-w-md rounded-lg border-2 border-orange-500/50 bg-gradient-to-bl from-orange-500/0.5 to-orange-700/0.5">
        <DialogHeader>
          <DialogTitle className="text-orange">{title}</DialogTitle>
          <DialogDescription>
            {description}{" "}
            <span className="font-semibold text-orange mx-1">{actionText}</span>
            ? This action cannot be undone.
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
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
