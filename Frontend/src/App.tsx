import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./GlobalContext";

import Home from "./pages/Home";
import PersonalDetails from "./pages/PersonalDetails";
import TrackSelection from "./pages/TrackSelection";
import SkillAssessment from "./pages/SkillAssessment";
import NextSteps from "./pages/NextSteps";
import Courses from "./pages/Courses";
import Support from "./pages/Support";
import Completion from "./pages/Completion";
import NotFound from "./pages/NotFound";
import QuizPage from "./pages/QuizPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal-details" element={<PersonalDetails />} />
            <Route path="/track-selection" element={<TrackSelection />} />
            <Route path="/skill-assessment" element={<SkillAssessment />} />
            <Route path="/next-steps" element={<NextSteps />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/support" element={<Support />} />
            <Route path="/completion" element={<Completion />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GlobalProvider>
  </QueryClientProvider>
);

export default App;
