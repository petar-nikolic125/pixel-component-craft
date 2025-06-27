import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* finished / heavy pages (lazy keeps bundle small) */
const Index                = lazy(() => import("./pages/Index"));
const EditorNewProfessional = lazy(() => import("./pages/EditorNewProfessional"));
const Features             = lazy(() => import("./pages/Features"));
const Pricing              = lazy(() => import("./pages/Pricing"));
const Templates            = lazy(() => import("./pages/Templates"));
const Docs                 = lazy(() => import("./pages/Docs"));
const SignIn               = lazy(() => import("./pages/SignIn"));
const GettingStarted       = lazy(() => import("./pages/GettingStarted"));

/* quick placeholders for links that exist in the UI */
import Placeholder from "./pages/Placeholder";

const queryClient = new QueryClient();

const Loader = (
    <div className="min-h-screen grid place-items-center text-xl p-10">
      Loading…
    </div>
);

const App = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Suspense fallback={Loader}>
            <Routes>
              {/* ─────────────────── main pages ─────────────────── */}
              <Route path="/"           element={<Index />} />
              <Route path="/editor"     element={<EditorNewProfessional />} />
              <Route path="/features"   element={<Features />} />
              <Route path="/pricing"    element={<Pricing />} />
              <Route path="/templates"  element={<Templates />} />
              <Route path="/docs"       element={<Docs />} />
              <Route path="/sign-in"    element={<SignIn />} />
              <Route path="/getting-started" element={<GettingStarted />} />

              {/* ─────────────────── placeholder pages ──────────── */}
              <Route path="/about"   element={<Placeholder title="About" />} />
              <Route path="/blog"    element={<Placeholder title="Blog" />} />
              <Route path="/contact" element={<Placeholder title="Contact" />} />
              <Route path="/support" element={<Placeholder title="Support" />} />

              {/* catch-all → back to home (can swap for real 404 later) */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
);

export default App;
