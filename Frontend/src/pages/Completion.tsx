import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";

const Completion = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    setShowConfetti(true);
    const details = JSON.parse(localStorage.getItem("userDetails") || "{}");
    setUserDetails(details);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const achievements = [
    "✅ Completed skill assessment",
    "✅ Identified learning opportunities", 
    "✅ Received personalized recommendations",
    "✅ Connected with mentorship resources"
  ];

  return (
    <PageLayout>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', 
                    '#f9ca24', '#6c5ce7', '#a29bfe'
                  ][Math.floor(Math.random() * 6)]
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
            Congratulations{userDetails?.firstName ? `, ${userDetails.firstName}` : ''}!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You've successfully completed your skill gap analysis and are ready to begin your personalized learning journey!
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">🏆 What You've Accomplished</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <span className="text-green-600 font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">🚀 Your Learning Journey Starts Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-semibold mb-2">Start Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Access your personalized course recommendations
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your skill development with regular check-ins
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-semibold mb-2">Get Support</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with mentors and the learning community
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/courses")}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Start Learning
          </Button>
          
          <Button 
            onClick={() => navigate("/support")}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Find Mentor
          </Button>
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <p className="text-lg italic text-muted-foreground mb-2">
            "The journey of a thousand miles begins with one step."
          </p>
          <p className="text-sm text-muted-foreground">
            You've taken the first step. Keep going! 💪
          </p>
        </div>
      </div>

      <style>{`
        .confetti-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .confetti {
          position: absolute;
          width: 8px;
          height: 8px;
          animation: confetti-fall 3s linear infinite;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </PageLayout>
  );
};

export default Completion;
