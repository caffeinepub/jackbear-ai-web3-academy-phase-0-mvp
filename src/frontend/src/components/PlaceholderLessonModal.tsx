import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface PlaceholderLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
}

export default function PlaceholderLessonModal({
  isOpen,
  onClose,
  lessonTitle,
}: PlaceholderLessonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md max-h-[90dvh] mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
            Lesson Unavailable
          </DialogTitle>
          <DialogDescription className="text-center py-6">
            <p className="text-base mb-2">{lessonTitle}</p>
            <p className="text-sm text-muted-foreground">
              This lesson content could not be loaded. Please try again later or
              contact support if the issue persists.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
