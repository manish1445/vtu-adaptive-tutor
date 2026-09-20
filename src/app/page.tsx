"use client";
import { useState, useEffect, useRef } from "react";

type Question = { id: string; text: string; options: string[] };
type Meta = {
  topicName: string;
  difficulty: string;
  questionType: string;
  reason: "weak" | "new" | "review";
};
type Result = {
  isCorrect: boolean;
  correctOptionIndex: number;
  explanation: string;
  aiFeedback: string;
};
type TopicRow = {
  topicId: string;
  topicName: string;
  attempts: number;
  masteryPercent: number;
  status: "weak" | "developing" | "strong";
};

const STORAGE_KEY = "vtu_student_id";

function newId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "s_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadStudentId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const id = newId();
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    return newId();
  }
}

const REASON_LABEL: Record<Meta["reason"], string> = {
  weak: "Practicing a weak topic",
  new: "New topic",
  review: "Review",
};

export default function PracticePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [progress, setProgress] = useState<TopicRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef<number>(0);

  async function loadProgress(id: string) {
    try {
      const res = await fetch(`/api/triage?userId=${encodeURIComponent(id)}`);
      const data = await res.json();
      if (Array.isArray(data.topics)) setProgress(data.topics);
    } catch (err) {
      console.error("Progress load failed:", err);
    }
  }

  useEffect(() => {
    const id = loadStudentId();
    setUserId(id);
    loadProgress(id);
  }, []);

  async function handleStartPractice() {
    if (!userId) return;
    setLoading(true);
    setError(null);
    setQuestion(null);
    setMeta(null);
    setSelected(null);
    setResult(null);
    try {
      const response = await fetch("/api/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (data.success) {
        setQuestion(data.question);
        setMeta(data.meta);
        startedAt.current = Date.now();
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
    if (!question || !userId || result || submitting) return;
    setSelected(index);
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          questionId: question.id,
          selectedIndex: index,
          timeTakenMs: Date.now() - startedAt.current,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data);
        loadProgress(userId);
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
        disabled={loading || submitting || !userId}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
      >
        {loading
          ? "Picking your next question..."
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
          {meta && (
            <p className="mb-3 text-xs text-gray-500">
              {REASON_LABEL[meta.reason]} · {meta.topicName} · {meta.difficulty} ·{" "}
              {meta.questionType}
            </p>
          )}
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

      {progress.length > 0 && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Your progress</h3>
          <ul className="space-y-2">
            {progress.map((t) => (
              <li key={t.topicId} className="text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>{t.topicName}</span>
                  <span className="text-gray-500">
                    {t.masteryPercent}% · {t.attempts} tried · {t.status}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded mt-1">
                  <div
                    className={`h-1.5 rounded ${
                      t.status === "weak"
                        ? "bg-red-400"
                        : t.status === "developing"
                          ? "bg-amber-400"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${t.masteryPercent}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}