"use client";
import { useState } from "react";

type Question = { id: string; text: string; options: string[] };
type Result = {
  isCorrect: boolean;
  correctOptionIndex: number;
  explanation: string;
  aiFeedback: string;
};

const USER_ID = "student_123"; // MVP: replace with the logged-in user later
const TOPIC_NAME = "Discrete Mathematical Structures";

export default function PracticePage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStartPractice() {
    setLoading(true);
    setError(null);
    setQuestion(null);
    setSelected(null);
    setResult(null);
    try {
      const response = await fetch("/api/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicName: TOPIC_NAME }),
      });
      const data = await response.json();
      if (data.success) {
        setQuestion(data.question);
      } else {
        setError("Failed to generate question: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Failed to fetch:", err);
      setError("Error contacting the API route.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAnswer(index: number) {
    if (!question || result || submitting) return;
    setSelected(index);
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          questionId: question.id,
          selectedIndex: index,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        setSelected(null);
        setError("Could not submit answer: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Submit failed:", err);
      setSelected(null);
      setError("Error contacting the API route.");
    } finally {
      setSubmitting(false);
    }
  }

  function optionClass(index: number) {
    const base =
      "border p-3 rounded-md text-left transition-colors text-gray-800 disabled:cursor-not-allowed ";
    if (!result) {
      return base + "border-gray-300 hover:bg-blue-50 hover:border-blue-300";
    }
    if (index === result.correctOptionIndex) {
      return base + "border-green-500 bg-green-50";
    }
    if (index === selected) {
      return base + "border-red-500 bg-red-50";
    }
    return base + "border-gray-200 opacity-60";
  }

  return (
    <div className="p-8 font-sans max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">VTU Adaptive Tutor</h1>

      <button
        onClick={handleStartPractice}
        disabled={loading || submitting}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
      >
        {loading
          ? "Generating question..."
          : question
            ? "Next Question"
            : "Start Practice"}
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {question && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">{question.text}</h2>
          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={optionClass(index)}
                disabled={!!result || submitting}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>

          {submitting && <p className="mt-4 text-sm text-gray-500">Checking...</p>}

          {result && (
            <div className="mt-6 space-y-3">
              <div
                className={`p-4 text-sm rounded border ${
                  result.isCorrect
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}
              >
                <strong>{result.isCorrect ? "Correct!" : "Not quite."}</strong>{" "}
                {result.aiFeedback}
              </div>
              <div className="p-4 bg-gray-50 text-sm text-gray-700 rounded border border-gray-200">
                <strong>Explanation:</strong> {result.explanation}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
