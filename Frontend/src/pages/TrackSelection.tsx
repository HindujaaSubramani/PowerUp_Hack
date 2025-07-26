import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { useGlobal } from "@/GlobalContext";

const tracks = [
  {
    id: "fsd",
    title: "Full Stack Development",
    description: "Master both frontend and backend technologies to build complete web applications. Learn React, Node.js, databases, and deployment.",
    icon: "🚀",
    color: "from-blue-500 to-cyan-500",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Git", "AWS"]
  },
  {
    id: "sde",
    title: "Software Development Engineer",
    description: "Focus on algorithmic thinking, data structures, and system design. Perfect for roles at tech companies.",
    icon: "💻",
    color: "from-purple-500 to-pink-500",
    skills: ["Data Structures", "Algorithms", "System Design", "Java/Python", "SQL", "Testing", "Git", "Debugging"]
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Analyze data, build machine learning models, and derive insights. Combine statistics, programming, and domain expertise.",
    icon: "📊",
    color: "from-green-500 to-emerald-500",
    skills: ["Python", "SQL", "Statistics", "Machine Learning", "Pandas", "NumPy", "Visualization", "R"]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Create beautiful, user-friendly interfaces and experiences. Master design principles, prototyping, and user research.",
    icon: "🎨",
    color: "from-orange-500 to-red-500",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Typography", "Color Theory", "Usability", "HTML/CSS"]
  }
];

const TrackSelection = () => {
  const navigate = useNavigate();
  const { selectedTrack, setSelectedTrack } = useGlobal();

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId);
    localStorage.setItem("selectedTrack", trackId); // store the ID

    setTimeout(() => {
      navigate("/skill-assessment");
    }, 500);
  };

  return (
    <PageLayout showNavigation prevPath="/personal-details">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Track</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the career domain that aligns with your interests and goals. 
            We'll customize your assessment and recommendations accordingly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <Card
              key={track.id}
              className={`cursor-pointer transition-all duration-300 border-2 hover:border-primary/50 hover:shadow-lg transform hover:-translate-y-1 ${
                selectedTrack === track.id ? "border-primary shadow-lg scale-105" : ""
              }`}
              onClick={() => handleTrackSelect(track.id)} // fix: use id
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center text-2xl`}>
                    {track.icon}
                  </div>
                  <CardTitle className="text-xl">{track.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {track.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Key Skills Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {track.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTrack && (
          <div className="text-center mt-8">
            <p className="text-primary font-medium">
              ✓ Track selected! Redirecting to assessment...
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default TrackSelection;
