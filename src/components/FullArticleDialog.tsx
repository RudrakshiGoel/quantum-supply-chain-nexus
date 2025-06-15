
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FullArticleDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  article: {
    title: string;
    date: string;
    author: string;
    content: string;
  } | null;
}
export default function FullArticleDialog({ open, setOpen, article }: FullArticleDialogProps) {
  if (!article) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">{article.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mb-2 text-sm text-blue-400">{article.author} &middot; {article.date}</div>
          <div className="py-2 text-blue-900 whitespace-pre-line leading-relaxed">
            {article.content}
          </div>
        </DialogDescription>
        <DialogClose asChild>
          <Button className="w-full mt-5 bg-blue-700 text-white hover:bg-blue-900">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
