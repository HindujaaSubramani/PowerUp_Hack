import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import PageLayout from "@/components/PageLayout";

const trackSkills = {
  fsd: [
    "HTML & CSS Fundamentals", "JavaScript (ES6+)", "React.js", "State Management (Redux/Context)", 
    "Node.js & Express", "RESTful APIs", "Database Design (SQL/NoSQL)", "Git Version Control",
    "Responsive Design", "Authentication & Security", "Testing (Unit/Integration)", "Deployment & DevOps"
  ],
  sde: [
    "Data Structures", "Algorithms & Complexity", "Object-Oriented Programming", "System Design Basics",
    "Database Management", "Software Testing", "Design Patterns", "Code Review & Quality",
    "Debugging & Profiling", "Version Control (Git)", "Agile Methodologies", "Problem Solving"
  ],
  "data-science": [
    "Python Programming", "SQL & Database Querying", "Statistics & Probability", "Data Visualization",
    "Pandas & NumPy", "Machine Learning Algorithms", "Data Cleaning & Preprocessing", "Exploratory Data Analysis",
    "Model Evaluation", "Feature Engineering", "Big Data Tools", "Business Intelligence"
  ],
  "ui-ux": [
    "Design Principles", "User Research Methods", "Wireframing & Prototyping", "Figma/Sketch Proficiency",
    "Typography & Color Theory", "User Journey Mapping", "Usability Testing", "Design Systems",
    "Responsive Design", "Accessibility (WCAG)", "Information Architecture", "Visual Design"
  ]
};

const SkillAssessment = () => {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [knownSkills, setKnownSkills] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const track = localStorage.getItem("selectedTrack");
    console.log("SkillAssessment loaded, selectedTrack from localStorage:", track);
    if (track && trackSkills[track as keyof typeof trackSkills]) {
      setSelectedTrack(track);
      setSkills(trackSkills[track as keyof typeof trackSkills]);
    } else {
      navigate("/track-selection");
    }
  }, [navigate]);

  const handleSkillToggle = (skill: string) => {
    setKnownSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = () => {
    const unknownSkills = skills.filter(skill => !knownSkills.includes(skill));
    localStorage.setItem("knownSkills", JSON.stringify(knownSkills));
    localStorage.setItem("unknownSkills", JSON.stringify(unknownSkills));
    navigate("/next-steps");
  };

  const getTrackTitle = (trackId: string) => {
    const titles = {
      fsd: "Full Stack Development",
      sde: "Software Development Engineer", 
      "data-science": "Data Science",
      "ui-ux": "UI/UX Design"
    };
    return titles[trackId as keyof typeof titles] || trackId;
  };

  const completionPercentage = Math.round((knownSkills.length / skills.length) * 100);

  return (
    <PageLayout 
      showNavigation 
      nextPath="/next-steps" 
      prevPath="/track-selection"
      nextLabel="Continue"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Skill Assessment</h1>
          <p className="text-muted-foreground mb-2">
            For <span className="font-semibold text-primary">{getTrackTitle(selectedTrack)}</span>
          </p>
          <p className="text-muted-foreground">
            Select the skills you're already comfortable with. Be honest - this helps us recommend the right learning path.
          </p>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Skills Coverage</span>
              <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {knownSkills.length} of {skills.length} skills selected
            </p>
          </CardContent>
        </Card>

        {/* Skills Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                    knownSkills.includes(skill)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  <Checkbox
                    id={skill}
                    checked={knownSkills.includes(skill)}
                    onCheckedChange={() => handleSkillToggle(skill)}
                  />
                  <label
                    htmlFor={skill}
                    className={`text-sm font-medium cursor-pointer ${
                      knownSkills.includes(skill) ? "text-primary" : ""
                    }`}
                  >
                    {skill}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Assessment Summary</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-600 font-medium">✓ Known Skills:</span> {knownSkills.length}
                </div>
                <div>
                  <span className="text-orange-600 font-medium">📚 Learning Opportunities:</span> {skills.length - knownSkills.length}
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full mt-6"
              disabled={knownSkills.length === 0}
            >
              Continue to Next Steps
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SkillAssessment;
