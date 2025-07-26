import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PageLayout from "@/components/PageLayout";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  videoUrl: string;
  skills: string[];
  completed: boolean;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript including variables, functions, and DOM manipulation.",
    duration: "4h 30m",
    difficulty: "Beginner",
    videoUrl: "https://example.com/js-fundamentals",
    skills: ["JavaScript (ES6+)", "DOM Manipulation"],
    completed: false
  },
  {
    id: "2", 
    title: "React Component Architecture",
    description: "Learn to build scalable React applications with proper component design patterns.",
    duration: "6h 15m",
    difficulty: "Intermediate",
    videoUrl: "https://example.com/react-components",
    skills: ["React.js", "State Management (Redux/Context)"],
    completed: false
  },
  {
    id: "3",
    title: "RESTful API Development",
    description: "Build robust APIs using Node.js and Express with proper HTTP methods and status codes.",
    duration: "5h 45m", 
    difficulty: "Intermediate",
    videoUrl: "https://example.com/api-development",
    skills: ["Node.js & Express", "RESTful APIs"],
    completed: false
  },
  {
    id: "4",
    title: "Database Design Principles",
    description: "Understand relational and NoSQL database design, normalization, and optimization.",
    duration: "3h 20m",
    difficulty: "Beginner",
    videoUrl: "https://example.com/database-design",
    skills: ["Database Design (SQL/NoSQL)"],
    completed: false
  }
];

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [unknownSkills, setUnknownSkills] = useState<string[]>([]);
  const navigate = useNavigate(); // ✅ Use navigate here

  useEffect(() => {
    const storedUnknownSkills = JSON.parse(localStorage.getItem("unknownSkills") || "[]");
    setUnknownSkills(storedUnknownSkills);

    const relevantCourses = mockCourses.filter(course =>
      course.skills.some(skill => storedUnknownSkills.includes(skill))
    );

    setCourses(relevantCourses.length > 0 ? relevantCourses : mockCourses);
  }, []);

  const handleStartCourse = (courseId: string) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === courseId 
          ? { ...course, completed: true }
          : course
      )
    );
  };

  const completedCourses = courses.filter(course => course.completed).length;
  const overallProgress = courses.length > 0 ? (completedCourses / courses.length) * 100 : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Recommended Courses</h1>
          <p className="text-muted-foreground">
            Curated learning content based on your skill assessment. Start with any course that interests you.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Learning Progress
              <Badge variant="secondary">{completedCourses}/{courses.length} Completed</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {Math.round(overallProgress)}% of recommended courses completed
            </p>
          </CardContent>
        </Card>

        {/* Skills Gap Notice */}
        {unknownSkills.length > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50/50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Focus Areas</h3>
              <p className="text-sm text-orange-700 mb-3">
                These courses target your identified skill gaps:
              </p>
              <div className="flex flex-wrap gap-2">
                {unknownSkills.slice(0, 6).map(skill => (
                  <Badge key={skill} variant="outline" className="border-orange-300 text-orange-700">
                    {skill}
                  </Badge>
                ))}
                {unknownSkills.length > 6 && (
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    +{unknownSkills.length - 6} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className={`border-2 transition-all duration-300 hover:shadow-lg ${
                course.completed ? "border-green-200 bg-green-50/50" : "hover:border-primary/50"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {course.description}
                    </CardDescription>
                  </div>
                  {course.completed && (
                    <Badge className="bg-green-100 text-green-800 ml-2">✓ Completed</Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mt-3">
                  <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">📺 {course.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills Covered</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.skills.map(skill => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleStartCourse(course.id)}
                    className="w-full"
                    variant={course.completed ? "secondary" : "default"}
                    disabled={course.completed}
                  >
                    {course.completed ? "Completed" : "Start Course"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <Card className="text-center py-12 mt-10">
            <CardContent>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-semibold mb-2">No Courses Available</h3>
              <p className="text-muted-foreground">
                Complete your skill assessment to get personalized course recommendations.
              </p>
            </CardContent>
          </Card>
        )}

        {/* 🎉 Completion Button */}
        {courses.length > 0 && completedCourses === courses.length && (
          <div className="mt-10 text-center">
            <Button 
              onClick={() => navigate("/completion")} 
              size="lg" 
              className="px-8"
            >
              🎉 Finish and View Summary
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Courses;
