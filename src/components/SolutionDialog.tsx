
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SolutionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  example: string;
}

export default function SolutionDialog({ open, setOpen, title, example }: SolutionDialogProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  function handleTest() {
    // Simulated demo output based on input and title (for demo only)
    if (!input.trim()) {
      setOutput("Please enter a value to run the test.");
      return;
    }
    const number = Number(input);
    let result = "";
    // Simple demonstration logic per title
    switch (title) {
      case "Inventory Management":
        result = `Optimal inventory for demand "${input}": ${number ? Math.ceil(number * 0.92) : "42"}`;
        break;
      case "Last-Mile Delivery":
        result = `Expected fastest route for ${input} stops: ${number ? (number * 4.2).toFixed(1) : "21"} km.`;
        break;
      case "Demand Forecasting":
        result = `Demand forecast for "${input}": Quantum error rate: 5.8%.`;
        break;
      case "Supplier Optimization":
        result = `Optimal supplier selection for "${input}": Cost reduced by 8%.`;
        break;
      case "Production Scheduling":
        result = `Recommended schedule output for "${input}": +21% throughput.`;
        break;
      case "Network Design":
        result = `Savings for network "${input}": $${number ? number * 1000 : 2500} simulated.`;
        break;
      case "Risk Mitigation":
        result = `Mitigated risk scenario "${input}": $700K saved (demo).`;
        break;
      case "Sustainability Analytics":
        result = `Carbon output for "${input}": 12% reduction achieved.`;
        break;
      default:
        result = "Demo result.";
    }
    setOutput(result);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title} — Test Example</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="pt-3 pb-2 text-blue-800 font-semibold">{example}</div>
          <form
            className="space-y-2 mt-3"
            onSubmit={e => {
              e.preventDefault();
              handleTest();
            }}
          >
            <Input
              placeholder={`Enter a value to test (${title})`}
              value={input}
              onChange={e => setInput(e.target.value)}
              className="bg-blue-100"
              autoFocus
            />
            <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-900">
              Run Quantum Test
            </Button>
          </form>
          {output && (
            <div className="mt-3 rounded-md bg-blue-50 p-3 text-blue-900 border border-blue-300 animate-fade-in">
              {output}
            </div>
          )}
          <div className="mt-3 text-xs text-blue-500">
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
