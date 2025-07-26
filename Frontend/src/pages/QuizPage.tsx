import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGlobal } from "@/GlobalContext";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

const QuizPage = () => {
  const { selectedTrack } = useGlobal();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedTrack) {
        setError("No track selected");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/generate_quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ domain: selectedTrack }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch quiz questions");
        }

        const data = await response.json();
        console.log("Fetched quiz data:", data);

        // Format the questions with ids
        const formatted = data.map((q: any, index: number) => ({
          id: index + 1,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
        }));

        setQuestions(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Quiz fetch error:", err);
        setError("Unable to load quiz. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedTrack]);

  const handleAnswer = (id: number, answer: string) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate("/completion"), 3000);
  };

  if (loading) {
    return (
      <PageLayout showNavigation prevPath="/next-steps">
        <div className="text-center text-lg">Loading quiz...</div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout showNavigation prevPath="/next-steps">
        <div className="text-center text-red-600">{error}</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showNavigation prevPath="/next-steps">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Track-Based Quiz</h1>

        {questions.map((q) => (
          <Card key={q.id} className="p-4">
            <div className="mb-2 font-medium">
              {q.id}. {q.question}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt;
                const isCorrect = submitted && opt === q.correctAnswer;
                const isWrong = submitted && isSelected && opt !== q.correctAnswer;

                return (
                  <Button
                    key={opt}
                    variant={
                      isCorrect
                        ? "default"
                        : isWrong
                        ? "destructive"
                        : "outline"
                    }
                    className={`justify-start w-full ${
                      isSelected ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => !submitted && handleAnswer(q.id, opt)}
                  >
                    {opt}
                  </Button>
                );
              })}
            </div>
          </Card>
        ))}

        {!submitted ? (
          <div className="text-center">
            <Button
              disabled={Object.keys(answers).length < questions.length}
              onClick={handleSubmit}
              className="px-6"
            >
              Submit Quiz
            </Button>
          </div>
        ) : (
          <div className="text-center text-green-600 font-semibold text-lg">
            ✅ Quiz submitted! Redirecting to results...
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default QuizPage;
