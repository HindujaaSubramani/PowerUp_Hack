import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";

const NextSteps = () => {
  const navigate = useNavigate();

  const handleTakeTest = () => {
  navigate("/quiz"); // ✅ redirect to quiz
};


  const handleViewCourses = () => {
    navigate("/courses");
  };

  return (
    <PageLayout showNavigation prevPath="/skill-assessment">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Next Step</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your skill assessment, we've identified areas for growth. 
            Choose how you'd like to proceed with your learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skill Test Option */}
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧪</span>
              </div>
              <CardTitle className="text-xl">Take Skill Test</CardTitle>
              <CardDescription>
                Test your knowledge with targeted questions to validate your current skills and identify specific areas for improvement.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-left text-sm text-muted-foreground space-y-2 mb-6">
                <li>✓ 20-30 targeted questions</li>
                <li>✓ Immediate feedback and scoring</li>
                <li>✓ Detailed skill breakdown</li>
                <li>✓ Personalized improvement plan</li>
              </ul>
              <Button 
                onClick={handleTakeTest}
                className="w-full"
                variant="default"
              >
                Start Skill Test
              </Button>
            </CardContent>
          </Card>

          {/* Course Recommendations Option */}
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📚</span>
              </div>
              <CardTitle className="text-xl">View Recommended Courses</CardTitle>
              <CardDescription>
                Jump straight into curated learning content specifically chosen to address your skill gaps.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-left text-sm text-muted-foreground space-y-2 mb-6">
                <li>✓ Curated video content</li>
                <li>✓ Progressive difficulty levels</li>
                <li>✓ Hands-on projects</li>
                <li>✓ Track your progress</li>
              </ul>
              <Button 
                onClick={handleViewCourses}
                className="w-full"
                variant="outline"
              >
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Options */}
        <div className="mt-12 text-center">
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Need Help Deciding?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Not sure which path to take? Our recommendation engine suggests starting with courses 
                if you're new to the field, or taking the test if you want to validate existing knowledge.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/support")}
                >
                  Get Mentorship
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                >
                  View Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default NextSteps;