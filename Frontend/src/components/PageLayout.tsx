import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "./Navbar";

interface PageLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  nextPath?: string;
  prevPath?: string;
  nextLabel?: string;
  prevLabel?: string;
}

const PageLayout = ({ 
  children, 
  showNavigation = false, 
  nextPath, 
  prevPath,
  nextLabel = "Next",
  prevLabel = "Back"
}: PageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {children}
        
        {showNavigation && (
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            {prevPath ? (
              <Button
                variant="outline"
                onClick={() => navigate(prevPath)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {prevLabel}
              </Button>
            ) : <div />}
            
            {nextPath && (
              <Button
                onClick={() => navigate(nextPath)}
                className="flex items-center gap-2"
              >
                {nextLabel}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PageLayout;