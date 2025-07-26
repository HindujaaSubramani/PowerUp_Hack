import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

interface SkillProgress {
  skill: string;
  progress: number;
  category: "known" | "learning" | "unknown";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [skillsProgress, setSkillsProgress] = useState<SkillProgress[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    // Load user data from localStorage
    const details = JSON.parse(localStorage.getItem("userDetails") || "{}");
    const track = localStorage.getItem("selectedTrack") || "";
    const knownSkills = JSON.parse(localStorage.getItem("knownSkills") || "[]");
    const unknownSkills = JSON.parse(localStorage.getItem("unknownSkills") || "[]");

    setUserDetails(details);
    setSelectedTrack(track);

    // Create skills progress data
    const allSkills = [...knownSkills, ...unknownSkills];
    const progress = allSkills.map(skill => ({
      skill,
      progress: knownSkills.includes(skill) ? 100 : Math.floor(Math.random() * 30), // Random progress for unknown skills
      category: knownSkills.includes(skill) ? "known" as const : "learning" as const
    }));

    setSkillsProgress(progress);
    
    // Calculate overall progress
    const totalProgress = progress.reduce((sum, skill) => sum + skill.progress, 0);
    setOverallProgress(Math.round(totalProgress / progress.length));
  }, []);

  const getTrackTitle = (trackId: string) => {
    const titles = {
      fsd: "Full Stack Development",
      sde: "Software Development Engineer",
      "data-science": "Data Science", 
      "ui-ux": "UI/UX Design"
    };
    return titles[trackId as keyof typeof titles] || "Unknown Track";
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "known": return <Badge className="bg-green-100 text-green-800">Mastered</Badge>;
      case "learning": return <Badge className="bg-yellow-100 text-yellow-800">Learning</Badge>;
      default: return <Badge variant="secondary">Not Started</Badge>;
    }
  };

  if (!userDetails.firstName) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
          <p className="text-muted-foreground mb-6">
            Please complete your profile and skill assessment to see your progress.
          </p>
          <Button onClick={() => navigate("/personal-details")}>
            Get Started
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {userDetails.firstName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Track your progress and continue your learning journey.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Track
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {getTrackTitle(selectedTrack)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className={`text-2xl font-bold ${getProgressColor(overallProgress)}`}>
                  {overallProgress}%
                </div>
                <Progress value={overallProgress} className="flex-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Skills Mastered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {skillsProgress.filter(s => s.category === "known").length}
              </div>
              <p className="text-sm text-muted-foreground">
                of {skillsProgress.length} total skills
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Skills Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Progress</CardTitle>
            <CardDescription>
              Your current proficiency across different skills in {getTrackTitle(selectedTrack)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsProgress.map((skillData) => (
                <div key={skillData.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{skillData.skill}</span>
                      {getCategoryBadge(skillData.category)}
                    </div>
                    <span className={`text-sm font-medium ${getProgressColor(skillData.progress)}`}>
                      {skillData.progress}%
                    </span>
                  </div>
                  <Progress value={skillData.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Continue your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate("/courses")}
                className="h-20 flex-col gap-2"
              >
                <span className="text-xl">📚</span>
                View Courses
              </Button>
              
              <Button 
                onClick={() => navigate("/skill-assessment")}
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <span className="text-xl">🧪</span>
                Retake Assessment
              </Button>
              
              <Button 
                onClick={() => navigate("/support")}
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <span className="text-xl">👥</span>
                Get Mentorship
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-primary mb-2">7 days</div>
                <p className="text-sm text-muted-foreground">Keep it up! 🔥</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-primary mb-2">24h 30m</div>
                <p className="text-sm text-muted-foreground">Total learning time</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;