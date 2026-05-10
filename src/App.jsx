import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "./supabase";

import primaryMath from "./data/primaryMath.js";
import collegeMath from "./data/collegeMath.js";
import primaryFrench from "./data/primaryFrench.js";
import collegeFrench from "./data/collegeFrench.js";
import primaryEnglish from "./data/primaryEnglish.js";
import collegeEnglish from "./data/collegeEnglish.js";
import primaryScience from "./data/primaryScience.js";
import collegeScience from "./data/collegeScience.js";
import primaryHistory from "./data/primaryHistory.js";
import collegeHistory from "./data/collegeHistory.js";
import primaryCulture from "./data/primaryCulture.js";
import collegeCulture from "./data/collegeCulture.js";

import videoLibrary from "./data/videoLibrary.js";

const levels = ["Primaire", "Collège"];

const subjects = [
  { name: "Mathématiques", icon: "🧮" },
  { name: "Français", icon: "🖊️" },
  { name: "Anglais", icon: "🇬🇧" },
  { name: "Sciences", icon: "🔬" },
  { name: "Histoire-Géo", icon: "🌍" },
  { name: "Culture générale", icon: "🧠" },
];

const courseData = {
  Primaire: {
    Mathématiques: primaryMath,
    Français: primaryFrench,
    Anglais: primaryEnglish,
    Sciences: primaryScience,
    "Histoire-Géo": primaryHistory,
    "Culture générale": primaryCulture,
  },

  Collège: {
    Mathématiques: collegeMath,
    Français: collegeFrench,
    Anglais: collegeEnglish,
    Sciences: collegeScience,
    "Histoire-Géo": collegeHistory,
    "Culture générale": collegeCulture,
  },
};

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.!?]/g, "");
}

function seededShuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function buildChoices(answer) {
  if (!answer) return [];

  const base = [
    answer,
    "Je ne sais pas",
    "Autre réponse",
    "Réponse incorrecte",
  ];

  return seededShuffle(base).slice(0, 4);
}

function enrichChapter(chapter) {
  return {
    ...chapter,

    video: videoLibrary[chapter.title] || chapter.video || "",

    exercises: (chapter.exercises || []).map((exercise, index) => ({
      ...exercise,

      id: exercise.id || `${chapter.title}-${index}`,

      choices:
        exercise.choices ||
        buildChoices(exercise.answer),
    })),
  };
}

export default function App() {
  const [level, setLevel] = useState("Primaire");
  const [subject, setSubject] = useState("Mathématiques");

  const chapters = useMemo(() => {
    const source = courseData[level]?.[subject] || [];
    return source.map(enrichChapter);
  }, [level, subject]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="p-6 border-b border-white/10">
        <h1 className="text-4xl font-black">
          ÉduNova IA
        </h1>
      </header>

      <main className="max-w-7xl mx-auto p-6">

        <div className="flex gap-4 flex-wrap mb-8">

          {levels.map((item) => (
            <button
              key={item}
              onClick={() => setLevel(item)}
              className={`px-5 py-3 rounded-2xl ${
                level === item
                  ? "bg-white text-black"
                  : "bg-white/10"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        <div className="flex gap-4 flex-wrap mb-12">

          {subjects.map((item) => (
            <button
              key={item.name}
              onClick={() => setSubject(item.name)}
              className={`px-5 py-3 rounded-2xl ${
                subject === item.name
                  ? "bg-indigo-500"
                  : "bg-white/10"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {chapters.map((chapter, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white text-black rounded-3xl p-6"
            >

              <h2 className="text-2xl font-black mb-4">
                {chapter.title}
              </h2>

              <p className="mb-4 text-slate-700">
                {chapter.lesson}
              </p>

              {chapter.video &&
                chapter.video.trim() !== "" && (

                <div className="mb-6 overflow-hidden rounded-2xl">

                  <iframe
                    className="w-full aspect-video"
                    src={chapter.video}
                    title={chapter.title}
                    allowFullScreen
                  />

                </div>
              )}

              <div className="mb-6">

                <h3 className="font-black mb-2">
                  Objectifs
                </h3>

                <ul className="space-y-1">

                  {(chapter.objectives || []).map((objective) => (
                    <li key={objective}>
                      ✅ {objective}
                    </li>
                  ))}

                </ul>

              </div>

              <div>

                <h3 className="font-black mb-2">
                  Exercices
                </h3>

                <div className="space-y-4">

                  {(chapter.exercises || []).map((exercise) => (

                    <div
                      key={exercise.id}
                      className="bg-slate-100 rounded-2xl p-4"
                    >

                      <p className="font-semibold mb-3">
                        {exercise.question}
                      </p>

                      <div className="grid gap-2">

                        {(exercise.choices || []).map((choice) => (

                          <button
                            key={choice}
                            className="bg-white border rounded-xl px-4 py-2 text-left hover:bg-indigo-50"
                          >
                            {choice}
                          </button>

                        ))}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </main>

    </div>
  );
}
