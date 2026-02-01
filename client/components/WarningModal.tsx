import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface WarningModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export function WarningModal({ isOpen, onConfirm }: WarningModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <DialogTitle>Warning</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-foreground">
            All content inside this page is accessed at your own responsibility.
            Please proceed with caution and ensure you understand the risks
            involved.
          </p>

          <Button onClick={onConfirm} className="w-full">
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
