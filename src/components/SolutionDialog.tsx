
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface SolutionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  example: string;
}

export default function SolutionDialog({ open, setOpen, title, example }: SolutionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title} — Test Example</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="pt-3 pb-2 text-blue-800 font-semibold">
            {example}
          </div>
          <div className="mt-2 text-sm text-blue-500">
            (This is a sample interactive case study; real-world cases and advanced simulation features can be demoed live.)
          </div>
        </DialogDescription>
        <DialogClose asChild>
          <button className="mt-5 bg-blue-700 text-white rounded px-6 py-2 font-semibold hover:bg-blue-900 transition">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
