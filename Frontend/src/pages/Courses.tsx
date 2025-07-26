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
  completed: boolean;
}

const courseMapping: Record<string, Course[]> = {
  sde: [
    { id: "1", title: "Data Structures & Algorithms", description: "Master core DS & Algorithms used in interviews.", duration: "8h 20m", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=RBSGKlAvoiM", completed: false },
    { id: "2", title: "System Design Basics", description: "Understand scalability, load balancing and design patterns.", duration: "5h 10m", difficulty: "Advanced", videoUrl: "https://www.youtube.com/watch?v=lxzGfKX0Q2Q", completed: false },
    { id: "3", title: "Database Management", description: "Learn SQL, indexing, and transactions for efficient backends.", duration: "4h 40m", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY", completed: false },
    { id: "4", title: "Object-Oriented Programming", description: "Master OOP principles and their real-world applications.", duration: "3h 30m", difficulty: "Beginner", videoUrl: "https://www.youtube.com/watch?v=SiBw7os-_zI", completed: false }
  ],
  fsd: [
    { id: "1", title: "HTML & CSS Fundamentals", description: "Build responsive and modern UI layouts.", duration: "4h 30m", difficulty: "Beginner", videoUrl: "https://www.youtube.com/watch?v=G3e-cpL7ofc", completed: false },
    { id: "2", title: "JavaScript & ES6+", description: "Master modern JS syntax and DOM manipulation.", duration: "6h 00m", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg", completed: false },
    { id: "3", title: "React & State Management", description: "Build interactive SPAs with React and Context API.", duration: "5h 45m", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8", completed: false },
    { id: "4", title: "Backend with Node.js", description: "Develop scalable APIs using Express and MongoDB.", duration: "5h 20m", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE", completed: false }
  ],
  uiux: [
    { id: "1", title: "Design Thinking", description: "Learn empathy-driven design process.", duration: "3h 45m", difficulty: "Beginner", videoUrl: "https://www.youtube.com/watch?v=_r0VX-aU_T8", completed: false },
    { id: "2", title: "Figma for Beginners", description: "Master UI design basics with Figma.", duration: "4h 00m", difficulty: "Beginner", videoUrl: "https://www.youtube.com/watch?v=jwCmIBJ8Jtc", completed: false },
    { id: "3", title: "UX Principles", description: "Understand usability, accessibility, and design patterns.", duration: "5h 20m", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=Ovj4hFxko7c", completed: false },
    { id: "4", title: "Portfolio Design", description: "Create a professional design portfolio.", duration: "3h 30m", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=ZtY4JfL4dQ8", completed: false }
  ],
  "data science": [
    { id: "1", title: "Python for Data Science", description: "Learn Python libraries used in data science.", duration: "6h 10m", difficulty: "Beginner", videoUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", completed: false },
    { id: "2", title: "Statistics & Probability", description: "Understand statistical concepts for data analysis.", duration: "4h 55m", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=xxpc-HPKN28", completed: false },
    { id: "3", title: "Machine Learning Basics", description: "Introduction to supervised and unsupervised ML models.", duration: "7h 20m", difficulty: "Intermediate", videoUrl: "https://www.youtube.com/watch?v=GwIo3gDZCVQ", completed: false },
    { id: "4", title: "Data Visualization", description: "Learn to create insightful visualizations using Python.", duration: "4h 05m", difficulty: "Beginner", videoUrl: "https://www.youtube.com/watch?v=3Xc3CA655Y4", completed: false }
  ]
};

const Courses = () => {
  const [selectedTrack, setSelectedTrack] = useState("fsd");
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCourses(courseMapping[selectedTrack].map(course => ({ ...course, completed: false })));
  }, [selectedTrack]);

  const handleCompleteCourse = (courseId: string) => {
    setCourses(prev => prev.map(course => course.id === courseId ? { ...course, completed: true } : course));
  };

  const completedCourses = courses.filter(c => c.completed).length;
  const overallProgress = courses.length > 0 ? (completedCourses / courses.length) * 100 : 0;

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Recommended Courses</h1>
        <Progress value={overallProgress} className="mb-4" />
        <p className="mb-8">{Math.round(overallProgress)}% completed</p>

        {/* Domain Selector */}
        <div className="flex gap-4 mb-6">
          {Object.keys(courseMapping).map(track => (
            <Button
              key={track}
              onClick={() => setSelectedTrack(track)}
              variant={selectedTrack === track ? "default" : "outline"}
            >
              {track.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map(course => (
            <Card key={course.id} className={`border-2 ${course.completed ? "border-green-200 bg-green-50/50" : "hover:border-primary/50"}`}>
              <CardHeader>
                <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
                <div className="flex items-center gap-3 mt-3">
                  <Badge>{course.difficulty}</Badge>
                  <span className="text-sm">📺 {course.duration}</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button asChild>
                  <a href={course.videoUrl} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                </Button>
                <Button
                  onClick={() => handleCompleteCourse(course.id)}
                  variant={course.completed ? "secondary" : "default"}
                  disabled={course.completed}
                >
                  {course.completed ? "Completed" : "Mark as Completed"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Finish Learning Button */}
        {courses.length > 0 && completedCourses === courses.length && (
          <div className="mt-10 text-center">
            <Button onClick={() => navigate("/completion")} size="lg" className="px-8">
              🎉 Finish Learning
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Courses;
