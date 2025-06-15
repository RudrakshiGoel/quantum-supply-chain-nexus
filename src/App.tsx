import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Technology from "./pages/Technology";
import Solutions from "./pages/Solutions";
import SuccessStories from "./pages/SuccessStories";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Confirmation from "./pages/Confirmation";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
