import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "./supabase";

import primaryMath from "./data/primaryMath";
import collegeMath from "./data/collegeMath";
import primaryFrench from "./data/primaryFrench";
import collegeFrench from "./data/collegeFrench";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center font-semibold transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const levels = ["Primaire", "Collège"];

const subjects = [
  { name: "Mathématiques", icon: "🧮", color: "from-indigo-500 to-violet-500" },
  { name: "Français", icon: "🖊️", color: "from-rose-500 to-pink-500" },
  { name: "Anglais", icon: "🇬🇧", color: "from-sky-500 to-cyan-500" },
  { name: "Sciences", icon: "🔬", color: "from-emerald-500 to-teal-500" },
  { name: "Histoire-Géo", icon: "🌍", color: "from-amber-500 to-orange-500" },
  { name: "Culture générale", icon: "🧠", color: "from-fuchsia-500 to-purple-500" },
];

const fallbackVideos = {
  "Nombres et calculs": "https://www.youtube-nocookie.com/embed/8mcTsyV56Zw",
  "Fractions et décimaux": "https://www.youtube-nocookie.com/embed/p33K1B0VhWk",
  "Géométrie et mesures": "https://www.youtube-nocookie.com/embed/dUqv7G7-4W8",
  "Multiplications et divisions": "https://www.youtube-nocookie.com/embed/NybHckSEQBI",
  "Grammaire": "https://www.youtube-nocookie.com/embed/5yQio1bTf5E",
  "Lecture compréhension": "https://www.youtube-nocookie.com/embed/Zilvl7Gd51A",
  "Conjugaison": "https://www.youtube-nocookie.com/embed/5yQio1bTf5E",
  "Orthographe": "https://www.youtube-nocookie.com/embed/0W0ZK8f8Mto",
  "Vocabulaire anglais": "https://www.youtube-nocookie.com/embed/hq3yfQnllfQ",
  "Les animaux": "https://www.youtube-nocookie.com/embed/q0ad1e0JSxE",
  "Le système solaire": "https://www.youtube-nocookie.com/embed/libKVRa01L8",
  "Les volcans": "https://www.youtube-nocookie.com/embed/4YlY9L9o0hQ",
  "La Révolution française": "https://www.youtube-nocookie.com/embed/zY26WwzybM8",
  "Les continents": "https://www.youtube-nocookie.com/embed/eTFE7xqSx8U",
  "Culture générale": "https://www.youtube-nocookie.com/embed/WXuK6gekU1Y"
};

const courseData = {
  Primaire: {
    Mathématiques: primaryMath,
    Français: primaryFrench,
  },
  Collège: {
    Mathématiques: collegeMath,
    Français: collegeFrench,
  },
};

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.!?]/g, "");
}

function makeSeed(email = "") {
  const base = `${email}-${Date.now()}-${Math.random()}`;
  let n = 0;
  for (let i = 0; i < base.length; i++) n += base.charCodeAt(i) * (i + 1);
  return n;
}

function seededShuffle(list, seed) {
  const arr = [...list];
  let s = seed || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function feedback(score, level) {
  if (score >= 85) return `${level} : excellent niveau. Passe à des exercices plus complexes.`;
  if (score >= 60) return `${level} : niveau solide. Continue les exercices pour progresser.`;
  if (score >= 40) return `${level} : quelques difficultés. Revois les exemples du cours.`;
  return `${level} : reprends la leçon avant de continuer.`;
}

function buildChoices(answer, question, index = 0) {
  if (!answer) return [];
  const clean = String(answer).trim();
  const numeric = Number(clean.replace("x = ", "").replace(",", "."));

  let choices;
  if (!Number.isNaN(numeric) && normalize(clean) !== "oui" && normalize(clean) !== "non") {
    choices = [clean, String(numeric + 1), String(Math.max(0, numeric - 1)), String(numeric + 2)];
  } else if (normalize(clean) === "oui" || normalize(clean) === "non") {
    choices = [clean, normalize(clean) === "oui" ? "non" : "oui", "peut-être", "je ne sais pas"];
  } else if (clean.includes("/")) {
    choices = [clean, "1/2", "2/3", "3/5"];
  } else if (clean.startsWith("x =")) {
    choices = [clean, "x = 5", "x = 10", "x = 12"];
  } else {
    choices = [clean, "autre réponse", "réponse incomplète", "je ne sais pas"];
  }

  return seededShuffle([...new Set(choices)].slice(0, 4), index + clean.length + question.length);
}

function enrichChapter(chapter) {
  return {
    ...chapter,
    video: chapter.video || fallbackVideos[chapter.title] || "https://www.youtube.com/embed/H14bBuluwB8",
    method: chapter.method || [
      "Lire toute la consigne",
      "Repérer les informations utiles",
      "Appliquer la méthode",
      "Répondre clairement",
      "Vérifier la réponse",
    ],
    details: chapter.details || {
      definition: `${chapter.lesson} Dans ce chapitre, l’élève apprend à comprendre la notion, à reconnaître les situations où elle s’utilise et à appliquer une méthode simple.`,
      example: `Exemple guidé : pour réussir un exercice sur “${chapter.title}”, l’élève lit la consigne, repère les mots importants, applique la méthode, puis vérifie sa réponse.`,
      mistakes: [
        "Répondre trop vite",
        "Ne pas relire la consigne",
        "Oublier une étape",
        "Ne pas vérifier la réponse",
      ],
      summary: `À retenir : ${chapter.title} se travaille en trois temps : comprendre, observer un exemple, puis s’entraîner.`,
    },
    exercises: (chapter.exercises || []).map((exercise, index) => {
      const difficulty = index < 2 ? "Facile" : index < 4 ? "Intermédiaire" : "Défi";
      return {
        id: exercise.id || `${chapter.title}-${index}`,
        question: exercise.question,
        answer: exercise.answer,
        difficulty: exercise.difficulty || difficulty,
        choices: exercise.choices || buildChoices(exercise.answer, exercise.question, index),
      };
    }),
  };
}

export default function App() {
  const [page, setPage] = useState("home");
  const [level, setLevel] = useState("Primaire");
  const [subject, setSubject] = useState("Mathématiques");
  const [chapterIndex, setChapterIndex] = useState(null);
  const [exerciseStep, setExerciseStep] = useState(0);
  const [score, setScore] = useState(72);
  const [completed, setCompleted] = useState([]);
  const [sessionSeed, setSessionSeed] = useState(makeSeed());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aiMessage, setAiMessage] = useState("Connecte-toi pour accéder aux cours.");
  const [answer, setAnswer] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [result, setResult] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);

  const selectedSubject = subjects.find((s) => s.name === subject) || subjects[0];

  const chapters = useMemo(() => {
    const source = courseData[level]?.[subject] || [];
    return source.map(enrichChapter);
  }, [level, subject]);

  const activeChapter = chapterIndex !== null ? chapters[chapterIndex] : null;

  const shuffledExercises = useMemo(() => {
    if (!activeChapter) return [];
    return seededShuffle(
      activeChapter.exercises,
      sessionSeed + chapterIndex + level.length + subject.length
    );
  }, [activeChapter, sessionSeed, chapterIndex, level, subject]);

  const currentExercise = shuffledExercises.length
    ? shuffledExercises[exerciseStep % shuffledExercises.length]
    : null;

  function resetExercise() {
    setAnswer("");
    setSelectedChoice("");
    setResult("");
    setShowCorrection(false);
  }

  function changeLevel(nextLevel) {
    setLevel(nextLevel);
    setChapterIndex(null);
    setPage("home");
    resetExercise();
  }

  function changeSubject(nextSubject) {
    setSubject(nextSubject);
    setChapterIndex(null);
    setPage("home");
    resetExercise();
  }

  function openChapter(index) {
    setChapterIndex(index);
    setExerciseStep(0);
    resetExercise();
    setPage("course");
    setAiMessage(`Chapitre ouvert : ${chapters[index].title}.`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }

  function startExercise() {
    if (!activeChapter) return;
    resetExercise();
    setPage("exercise");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }

  function nextExercise() {
    setExerciseStep((prev) => prev + 1);
    resetExercise();
    setAiMessage("Nouvel exercice chargé. Les questions sont mélangées à chaque connexion.");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }

  function validateExercise() {
    if (!currentExercise) return;
    const finalAnswer = selectedChoice || answer;

    if (!finalAnswer) {
      setResult("Choisis une réponse ou écris ta réponse avant de valider.");
      return;
    }

    if (normalize(finalAnswer) === normalize(currentExercise.answer)) {
      setResult("✅ Bonne réponse !");
      setScore((prev) => Math.min(prev + 5, 100));
      setTimeout(nextExercise, 800);
    } else {
      setResult("❌ Réponse incorrecte. Réessaie ou passe au suivant.");
      setScore((prev) => Math.max(prev - 3, 0));
    }
  }

  function completeChapter() {
    if (!activeChapter) return;
    const key = `${level}-${subject}-${activeChapter.title}`;
    if (!completed.includes(key)) setCompleted([...completed, key]);
    setScore((prev) => Math.min(prev + 8, 100));
    setAiMessage(`Bravo, chapitre terminé : ${activeChapter.title}.`);
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setIsLoggedIn(true);
    setShowLogin(false);
    setSessionSeed(makeSeed(userEmail));
    setExerciseStep(0);
    setPage("home");
    setAiMessage(`Bienvenue ${userEmail}. Nouveaux exercices préparés pour cette connexion.`);
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email: userEmail,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Compte créé. Vérifie ton email si Supabase demande une confirmation.");
  }

  function logout() {
    supabase.auth.signOut();
    setIsLoggedIn(false);
    setPassword("");
    setSessionSeed(makeSeed());
    setExerciseStep(0);
    setPage("home");
    setAiMessage("Connecte-toi pour accéder aux cours.");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,.25),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(20,184,166,.18),transparent_35%)]" />

      <div className="relative z-10">
        <Header
          isLoggedIn={isLoggedIn}
          setShowLogin={setShowLogin}
          logout={logout}
          setPage={setPage}
        />

        {page === "home" && (
          <Home
            isLoggedIn={isLoggedIn}
            setShowLogin={setShowLogin}
            setShowDemo={setShowDemo}
            score={score}
            completed={completed}
            aiMessage={aiMessage}
            level={level}
            setLevel={changeLevel}
            subject={subject}
            setSubject={changeSubject}
            subjects={subjects}
            chapters={chapters}
            openChapter={openChapter}
          />
        )}

        {page === "course" && isLoggedIn && activeChapter && (
          <CoursePage
            level={level}
            subject={subject}
            selectedSubject={selectedSubject}
            chapter={activeChapter}
            setPage={setPage}
            startExercise={startExercise}
            completeChapter={completeChapter}
          />
        )}

        {page === "exercise" && isLoggedIn && activeChapter && currentExercise && (
          <ExercisePage
            level={level}
            subject={subject}
            chapter={activeChapter}
            currentExercise={currentExercise}
            exerciseStep={exerciseStep}
            answer={answer}
            setAnswer={setAnswer}
            selectedChoice={selectedChoice}
            setSelectedChoice={setSelectedChoice}
            validateExercise={validateExercise}
            nextExercise={nextExercise}
            result={result}
            showCorrection={showCorrection}
            setShowCorrection={setShowCorrection}
            setPage={setPage}
          />
        )}

        {page === "home" && (
          <>
            <Evaluation score={score} setScore={setScore} level={level} />
            <Security />
            <Footer />
          </>
        )}
      </div>

      {showDemo && <DemoModal setShowDemo={setShowDemo} />}

      {showLogin && (
        <LoginModal
          setShowLogin={setShowLogin}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
        />
      )}
    </div>
  );
}

function Header({ isLoggedIn, setShowLogin, logout, setPage }) {
  return (
    <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <button onClick={() => setPage("home")} className="flex items-center gap-3 text-left">
        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
          🎓
        </div>
        <div>
          <p className="text-xl font-bold">ÉduNova IA</p>
          <p className="text-xs text-white/60">Soutien scolaire intelligent</p>
        </div>
      </button>

      <div className="flex gap-3">
        {isLoggedIn && (
          <Button
            onClick={logout}
            className="rounded-2xl bg-white/10 text-white px-5 py-3 border border-white/10"
          >
            Déconnexion
          </Button>
        )}

        <Button
          onClick={() => setShowLogin(true)}
          className="rounded-2xl bg-white text-slate-950 hover:bg-white/90 px-5 py-3"
        >
          🔒 {isLoggedIn ? "Connecté" : "Connexion"}
        </Button>
      </div>
    </header>
  );
}

function Home({
  isLoggedIn,
  setShowLogin,
  setShowDemo,
  score,
  completed,
  aiMessage,
  level,
  setLevel,
  subject,
  setSubject,
  subjects,
  chapters,
  openChapter,
}) {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 mb-6">
            ✨ Cours personnalisés après connexion
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[.95] tracking-tight">
            Le soutien scolaire nouvelle génération.
          </h1>

          <p className="mt-7 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
            Cours détaillés, vidéos intégrées, exercices plein écran, QCM et progression.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              onClick={
                isLoggedIn
                  ? () => document.getElementById("cours")?.scrollIntoView({ behavior: "smooth" })
                  : () => setShowLogin(true)
              }
              className="rounded-2xl px-7 py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-90 shadow-xl shadow-indigo-500/20"
            >
              {isLoggedIn ? "Accéder aux cours" : "Se connecter pour commencer"} ➡️
            </Button>

            <Button
              onClick={() => setShowDemo(true)}
              className="rounded-2xl px-7 py-4 border border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              Voir la démo ▶️
            </Button>
          </div>
        </motion.div>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl text-white overflow-hidden p-6">
          <div className="rounded-[1.5rem] bg-slate-950/80 border border-white/10 p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm text-white/50">Tableau de bord élève</p>
                <h2 className="text-2xl font-bold">
                  {isLoggedIn ? "Espace connecté" : "Connexion requise"}
                </h2>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
                🧠
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-white/50 text-sm">Progression</p>
                <p className="text-3xl font-black mt-2">{score}%</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-white/50 text-sm">Chapitres terminés</p>
                <p className="text-3xl font-black mt-2">{completed.length}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white p-5 text-slate-950">
              <p className="font-bold flex items-center gap-3">⭐ Assistant IA</p>
              <p className="text-sm text-slate-600 mt-3">{aiMessage}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cours" className="max-w-7xl mx-auto px-6 py-16">
        {!isLoggedIn ? (
          <LockedCourses setShowLogin={setShowLogin} />
        ) : (
          <CourseSelector
            level={level}
            setLevel={setLevel}
            subject={subject}
            setSubject={setSubject}
            subjects={subjects}
            chapters={chapters}
            openChapter={openChapter}
          />
        )}
      </section>
    </main>
  );
}

function LockedCourses({ setShowLogin }) {
  return (
    <div className="rounded-[2rem] bg-white text-slate-950 p-10 shadow-2xl text-center max-w-3xl mx-auto">
      <div className="text-5xl">🔒</div>
      <h2 className="text-4xl font-black mt-4">Cours réservés aux utilisateurs connectés</h2>
      <p className="text-slate-600 mt-4">
        Connecte-toi ou crée un compte pour accéder aux cours détaillés et aux exercices plein écran.
      </p>
      <Button
        onClick={() => setShowLogin(true)}
        className="mt-6 rounded-2xl px-7 py-4 bg-slate-950 text-white"
      >
        Se connecter
      </Button>
    </div>
  );
}

function CourseSelector({ level, setLevel, subject, setSubject, subjects, chapters, openChapter }) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <p className="text-indigo-300 font-semibold">Cours détaillés</p>
          <h2 className="text-4xl font-black mt-2">Choisis ton niveau, ta matière et ton chapitre</h2>
          <p className="text-white/60 mt-3 max-w-2xl">
            Chaque chapitre ouvre une page complète avec vidéo, méthode, QCM et exercices plein écran.
          </p>
        </div>

        <div className="flex rounded-2xl bg-white/10 p-1 border border-white/10 w-fit">
          {levels.map((item) => (
            <button
              key={item}
              onClick={() => setLevel(item)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition ${
                level === item ? "bg-white text-slate-950" : "text-white/70"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {subjects.map((item) => (
          <button
            key={item.name}
            onClick={() => setSubject(item.name)}
            className={`rounded-3xl p-5 text-left border transition ${
              subject === item.name
                ? "bg-white text-slate-950 border-white"
                : "bg-white/10 border-white/10 hover:bg-white/15"
            }`}
          >
            <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}>
              {item.icon}
            </div>
            <p className="font-bold text-sm">{item.name}</p>
          </button>
        ))}
      </div>

      <div className="rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl">
        <p className="text-sm text-slate-500">{level} · {subject}</p>
        <h3 className="text-3xl font-black mb-6">Chapitres disponibles</h3>

        {chapters.length === 0 ? (
          <div className="rounded-3xl bg-slate-100 p-8 text-slate-600">
            Aucun chapitre installé pour cette matière pour le moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {chapters.map((chapter, index) => (
              <button
                key={`${chapter.title}-${index}`}
                onClick={() => openChapter(index)}
                className="rounded-3xl bg-slate-100 p-6 text-left hover:bg-slate-200 transition border border-slate-200"
              >
                <p className="text-xl font-black mb-3">{chapter.title}</p>
                <p className="text-slate-600 mb-4">{chapter.lesson}</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  {(chapter.objectives || []).map((item) => (
                    <li key={item}>✅ {item}</li>
                  ))}
                </ul>
                <p className="mt-5 text-indigo-600 font-bold">Ouvrir le cours →</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function CoursePage({ level, subject, selectedSubject, chapter, setPage, startExercise, completeChapter }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Button
        onClick={() => {
          setPage("home");
          setTimeout(() => document.getElementById("cours")?.scrollIntoView({ behavior: "smooth" }), 50);
        }}
        className="mb-6 rounded-2xl bg-white/10 text-white px-5 py-3 border border-white/10"
      >
        ← Retour aux chapitres
      </Button>

      <div className="rounded-[2rem] bg-white text-slate-950 p-8 md:p-12 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${selectedSubject.color} flex items-center justify-center text-white text-2xl`}>
            {selectedSubject.icon}
          </div>
          <div>
            <p className="text-slate-500">{level} · {subject}</p>
            <h1 className="text-4xl font-black">{chapter.title}</h1>
          </div>
        </div>

        <p className="text-xl text-slate-700 leading-relaxed">{chapter.lesson}</p>

        {chapter.video && (
          <div className="mt-8 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
            <div className="p-5 text-white">
              <p className="text-indigo-300 font-semibold">Vidéo du cours</p>
              <h2 className="text-2xl font-black mt-1">Regarder l’explication avant les exercices</h2>
            </div>
            <iframe
              className="w-full aspect-video"
              src={chapter.video}
              title={`Vidéo ${chapter.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-slate-100 p-6">
            <h2 className="text-2xl font-black mb-4">Objectifs</h2>
            <ul className="space-y-2 text-slate-700">
              {(chapter.objectives || []).map((o) => (
                <li key={o}>✅ {o}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-100 p-6">
            <h2 className="text-2xl font-black mb-4">Méthode</h2>
            <ol className="space-y-2 text-slate-700">
              {(chapter.method || []).map((m, i) => (
                <li key={m}>{i + 1}. {m}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-indigo-50 border border-indigo-100 p-6">
          <h2 className="text-2xl font-black mb-3">Leçon détaillée</h2>
          <p className="text-slate-700 leading-relaxed text-lg">{chapter.details.definition}</p>
        </div>

        <div className="mt-6 rounded-3xl bg-emerald-50 border border-emerald-100 p-6">
          <h2 className="text-2xl font-black mb-3">Exemple guidé</h2>
          <p className="text-slate-700 leading-relaxed text-lg">{chapter.details.example}</p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-rose-50 border border-rose-100 p-6">
            <h2 className="text-2xl font-black mb-4">Erreurs fréquentes</h2>
            <ul className="space-y-2 text-slate-700">
              {(chapter.details.mistakes || []).map((m) => (
                <li key={m}>⚠️ {m}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-100 p-6">
            <h2 className="text-2xl font-black mb-4">Résumé à retenir</h2>
            <p className="text-slate-700 leading-relaxed">{chapter.details.summary}</p>
            <p className="mt-4 text-indigo-700 font-bold">
              Conseil IA : commence par 2 exercices simples, puis passe au niveau supérieur.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={startExercise}
            className="rounded-2xl px-8 py-4 bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Commencer les exercices plein écran
          </Button>

          <Button
            onClick={completeChapter}
            className="rounded-2xl px-8 py-4 bg-slate-950 text-white hover:bg-slate-800"
          >
            Marquer le chapitre terminé
          </Button>
        </div>
      </div>
    </main>
  );
}

function ExercisePage({
  level,
  subject,
  chapter,
  currentExercise,
  exerciseStep,
  answer,
  setAnswer,
  selectedChoice,
  setSelectedChoice,
  validateExercise,
  nextExercise,
  result,
  showCorrection,
  setShowCorrection,
  setPage,
}) {
  return (
    <main className="min-h-[80vh] max-w-5xl mx-auto px-6 py-10 flex items-center">
      <div className="w-full rounded-[2.5rem] bg-white text-slate-950 p-8 md:p-14 shadow-2xl">
        <div className="flex justify-between items-start gap-4 mb-8">
          <div>
            <p className="text-indigo-600 font-bold">{level} · {subject}</p>
            <h1 className="text-4xl md:text-5xl font-black mt-2">{chapter.title}</h1>
            <p className="text-slate-500 mt-2">
              Exercice {(exerciseStep % chapter.exercises.length) + 1} sur {chapter.exercises.length} · {currentExercise.difficulty} · QCM
            </p>
          </div>

          <Button
            onClick={() => {
              setPage("course");
              setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
            }}
            className="rounded-2xl bg-slate-100 px-5 py-3"
          >
            Retour cours
          </Button>
        </div>

        <div className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 mb-8">
          <p className="text-indigo-300 font-semibold mb-3">Question</p>
          <h2 className="text-3xl md:text-4xl font-black leading-tight">
            {currentExercise.question}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {(currentExercise.choices || []).map((choice) => (
            <button
              key={choice}
              onClick={() => {
                setSelectedChoice(choice);
                setAnswer("");
              }}
              className={`rounded-3xl border px-6 py-5 text-left text-xl font-bold transition ${
                selectedChoice === choice
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-slate-100 text-slate-950 border-slate-200 hover:bg-slate-200"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>

        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4 mb-6">
          <p className="text-sm text-slate-500 mb-2">Ou écrire une réponse libre</p>
          <input
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setSelectedChoice("");
            }}
            autoFocus
            placeholder="Écris ta réponse ici..."
            className="w-full bg-transparent text-2xl outline-none"
          />
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Button
            onClick={validateExercise}
            className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white py-4 text-lg"
          >
            Valider
          </Button>

          <Button
            onClick={nextExercise}
            className="rounded-2xl bg-slate-950 hover:bg-slate-800 text-white py-4 text-lg"
          >
            Exercice suivant
          </Button>

          <Button
            onClick={() => setShowCorrection(!showCorrection)}
            className="rounded-2xl bg-slate-100 text-slate-950 py-4 text-lg"
          >
            Correction
          </Button>
        </div>

        {result && (
          <div className="mt-6 rounded-3xl bg-slate-100 p-5 text-lg font-semibold">
            {result}
          </div>
        )}

        {showCorrection && (
          <div className="mt-6 rounded-3xl bg-emerald-50 border border-emerald-100 p-6">
            <p className="font-black text-xl">Correction</p>
            <p className="text-slate-700 mt-2 text-2xl">{currentExercise.answer}</p>
          </div>
        )}
      </div>
    </main>
  );
}

function Evaluation({ score, setScore, level }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <p className="text-teal-300 font-semibold">Évaluation adaptative</p>
        <h2 className="text-4xl font-black mt-2 mb-5">Un diagnostic précis</h2>
        <p className="text-white/70 text-lg leading-relaxed">
          Le score évolue avec les réponses et permet d’adapter le niveau.
        </p>
      </div>

      <div className="rounded-[2rem] bg-white text-slate-950 border-0 shadow-2xl p-8">
        <p className="text-slate-500 text-sm">Score</p>
        <h3 className="text-3xl font-black">{score}%</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full mt-5"
        />
        <div className="mt-6 rounded-3xl bg-slate-100 p-5">
          <p className="font-bold mb-2">Analyse IA</p>
          <p className="text-slate-600">{feedback(score, level)}</p>
        </div>
      </div>
    </section>
  );
}

function Security() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="rounded-[2.5rem] bg-white/10 border border-white/10 p-8 md:p-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <p className="text-pink-300 font-semibold">Accès sécurisé</p>
          <h2 className="text-4xl font-black mt-2">Cours accessibles uniquement après connexion</h2>
          <p className="text-white/70 mt-5 text-lg leading-relaxed">
            Connexion Supabase. Exercices renouvelés à chaque session.
          </p>
        </div>
        <div className="rounded-[2rem] bg-slate-950/70 border border-white/10 p-6">
          <p className="text-4xl">🛡️</p>
          <p className="font-bold text-xl mt-4">Sécurité premium</p>
          <p className="text-white/60 mt-3 text-sm">Protection des comptes et accès privé.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-10 text-white/45 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <p>© 2026 ÉduNova IA.</p>
      <p>Primaire · Collège · Toutes matières · Exercices plein écran</p>
    </footer>
  );
}

function DemoModal({ setShowDemo }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-3xl rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-sm text-slate-500">Aperçu interactif</p>
            <h2 className="text-3xl font-black">Démo élève</h2>
          </div>
          <button onClick={() => setShowDemo(false)} className="h-10 w-10 rounded-full bg-slate-100">
            ×
          </button>
        </div>
        <div className="rounded-3xl bg-slate-950 text-white p-6">
          <h3 className="text-2xl font-black">Cours détaillé + exercice plein écran</h3>
          <p className="text-white/70 mt-3">
            Après connexion, l’élève ouvre une vraie page de cours puis travaille exercice par exercice.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function LoginModal({
  setShowLogin,
  userEmail,
  setUserEmail,
  password,
  setPassword,
  handleLogin,
  handleSignup,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-sm text-slate-500">Espace sécurisé</p>
            <h2 className="text-3xl font-black">Connexion</h2>
          </div>
          <button onClick={() => setShowLogin(false)} className="h-10 w-10 rounded-full bg-slate-100">
            ×
          </button>
        </div>

        <label className="text-sm font-semibold">Email</label>
        <div className="mt-2 mb-4 rounded-2xl bg-slate-100 px-4 py-3 flex items-center gap-3">
          ✉️
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="parent@email.com"
            className="bg-transparent outline-none w-full"
          />
        </div>

        <label className="text-sm font-semibold">Mot de passe</label>
        <div className="mt-2 mb-6 rounded-2xl bg-slate-100 px-4 py-3 flex items-center gap-3">
          🔒
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-transparent outline-none w-full"
          />
        </div>

        <Button
          onClick={handleLogin}
          className="w-full rounded-2xl h-12 bg-slate-950 hover:bg-slate-800 text-white"
        >
          Accéder au tableau de bord
        </Button>

        <Button
          onClick={handleSignup}
          className="w-full rounded-2xl h-12 mt-3 bg-indigo-500 hover:bg-indigo-400 text-white"
        >
          Créer un compte
        </Button>

        <p className="text-xs text-slate-500 mt-4 text-center">
          Connexion sécurisée avec Supabase.
        </p>
      </motion.div>
    </div>
  );
}
