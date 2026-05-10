import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "./supabase";

const Button = ({ children, className = "", ...props }) => (
  <button className={`inline-flex items-center justify-center font-semibold transition ${className}`} {...props}>
    {children}
  </button>
);

const levels = ["Primaire", "Collège"];
const subjects = [
  { name: "Mathématiques", icon: "🧮", color: "from-indigo-500 to-violet-500" },
  { name: "Français", icon: "🖊️", color: "from-rose-500 to-pink-500" },
  { name: "Anglais", icon: "🇬🇧", color: "from-sky-500 to-cyan-500" },
  { name: "Sciences", icon: "⚛️", color: "from-emerald-500 to-teal-500" },
  { name: "Histoire-Géo", icon: "🌍", color: "from-amber-500 to-orange-500" },
  { name: "Culture générale", icon: "🎵", color: "from-fuchsia-500 to-purple-500" },
];

const educationalVideos = {
  "Nombres et calculs": "https://www.youtube.com/embed/GPZhUzgT2dM",
  "Fractions et décimaux": "https://www.youtube.com/embed/Ryy9nmQxeY0",
  "Géométrie et mesures": "https://www.youtube.com/embed/bX7Bt3Cm3xc",
  "Grammaire": "https://www.youtube.com/embed/IUxs-B3wTuI",
  "Lecture compréhension": "https://www.youtube.com/embed/Sdg0pBmFzFY",
  "Se présenter": "https://www.youtube.com/embed/uYHX5ZORxy4",
  "Vocabulaire de base": "https://www.youtube.com/embed/mpW8xJ3Jaxs",
  "Les états de l’eau": "https://www.youtube.com/embed/fW8bwgRDxSY",
  "Le vivant": "https://www.youtube.com/embed/CHnqX-rVorg",
  "Lire une carte": "https://www.youtube.com/embed/kDjRugurkZY",
  "Se repérer dans le temps": "https://www.youtube.com/embed/UNaa4XYkia8",
  "Arts et musique": "https://www.youtube.com/embed/OaZ4D-hvPHc",
  "Découverte du monde": "https://www.youtube.com/embed/h_YkcmbRR4Q",
  "Calcul numérique": "https://www.youtube.com/embed/CnxrBYxzur8",
  "Équations": "https://www.youtube.com/embed/N4eWBCGQOLI",
  "Proportionnalité": "https://www.youtube.com/embed/xZGxe8eE8-c",
  "Analyse de texte": "https://www.youtube.com/embed/CqTenJ0Ph5E",
  "Expression écrite": "https://www.youtube.com/embed/HmHVd3QVPi8",
  "Prétérit": "https://www.youtube.com/embed/ZNRNm-9FBAE",
  "Compréhension écrite": "https://www.youtube.com/embed/UMDB_dd1OsU",
  "Cellule et vivant": "https://www.youtube.com/embed/iUf3d6HQ3D0",
  "Démarche scientifique": "https://www.youtube.com/embed/zNGunL4QcpM",
  "Révolution française": "https://www.youtube.com/embed/7j9QV_BKtAs",
  "Document géographique": "https://www.youtube.com/embed/8_yx4oU0de0",
  "Médias et esprit critique": "https://www.youtube.com/embed/mWhQnRLq-4s",
  "Monde actuel": "https://www.youtube.com/embed/skwiH2RNgDw",
};

function makeChapter(title, lesson, objectives, exercises, details = {}) {
  return {
    title,
    lesson,
    video: details.video || educationalVideos[title] || "",
    objectives,
    method: ["Lire toute la consigne", "Repérer les informations utiles", "Appliquer la méthode", "Répondre clairement", "Vérifier la réponse"],
    details: {
      definition: details.definition || `${lesson} Dans ce chapitre, l’élève apprend à comprendre la notion, à reconnaître les situations où elle s’utilise et à appliquer une méthode simple.`,
      example: details.example || `Exemple guidé : pour réussir un exercice sur “${title}”, l’élève lit la consigne, repère les mots importants, applique la méthode, puis vérifie sa réponse.`,
      mistakes: details.mistakes || ["Répondre trop vite", "Ne pas relire la consigne", "Oublier une étape", "Ne pas vérifier la réponse"],
      summary: details.summary || `À retenir : ${title} se travaille en trois temps : comprendre, observer un exemple, puis s’entraîner.`
    },
    exercises: exercises.map(([question, answer], index) => {
      const difficulty = index < 2 ? "Facile" : index < 4 ? "Intermédiaire" : "Défi";
      return {
        id: `${title}-${index}`,
        question,
        answer,
        difficulty,
        choices: buildChoices(answer, question, index),
      };
    }),
  };
}

const programs = {
  Primaire: {
    Mathématiques: [
      makeChapter("Nombres et calculs", "Lire les nombres, poser les opérations et résoudre des problèmes simples.", ["Lire les nombres", "Additionner", "Soustraire", "Multiplier", "Résoudre un problème"], [["Calcule : 245 + 138", "383"], ["Calcule : 500 - 125", "375"], ["Calcule : 8 × 7", "56"], ["Calcule : 96 ÷ 12", "8"], ["Calcule : 320 + 75", "395"]], { definition: "Les nombres servent à compter, mesurer et comparer. Les opérations permettent de résoudre des situations : additionner pour regrouper, soustraire pour enlever, multiplier pour répéter et diviser pour partager.", example: "Pour 245 + 138 : unités 5 + 8 = 13, on écrit 3 et on retient 1. Dizaines 4 + 3 + 1 = 8. Centaines 2 + 1 = 3. Résultat : 383.", mistakes: ["Oublier une retenue", "Confondre addition et multiplication", "Ne pas lire toute la question", "Oublier l’unité"], summary: "Lis l’énoncé, choisis l’opération, pose le calcul proprement et vérifie." }),
      makeChapter("Fractions et décimaux", "Comprendre les fractions, les parts d’un tout et les nombres décimaux.", ["Lire une fraction", "Comparer", "Décimaux", "Utiliser dans un problème"], [["Quelle fraction représente une moitié ?", "1/2"], ["Dans 3/4, combien de parts sont prises ?", "3"], ["Quelle fraction obtient-on avec 3 parts sur 4 ?", "3/4"], ["0,5 représente quelle fraction simple ?", "1/2"], ["Dans 2/5, combien de parts sont prises ?", "2"]], { definition: "Une fraction représente une partie d’un tout partagé en parts égales. Le nombre du haut indique les parts prises, le nombre du bas indique le nombre total de parts.", example: "Dans 3/4, le 4 signifie 4 parts égales et le 3 signifie que l’on prend 3 parts. On lit : trois quarts.", mistakes: ["Oublier que les parts doivent être égales", "Confondre le numérateur et le dénominateur", "Comparer sans dessin", "Confondre 1/2 et 2/1"], summary: "Une fraction se comprend mieux avec un dessin ou un partage." }),
      makeChapter("Géométrie et mesures", "Reconnaître les figures, mesurer et calculer des périmètres simples.", ["Figures", "Angles", "Symétrie", "Longueurs"], [["Combien de côtés possède un rectangle ?", "4"], ["Combien d’angles a un triangle ?", "3"], ["Combien de centimètres dans 1 mètre ?", "100"], ["Un carré a-t-il 4 côtés égaux ?", "oui"], ["Un triangle a-t-il 3 côtés ?", "oui"]], { definition: "La géométrie étudie les formes, les angles, les longueurs et les positions. Les mesures permettent de comparer des grandeurs.", example: "Un rectangle possède 4 côtés et 4 angles droits. Pour son périmètre, on additionne toutes les longueurs de ses côtés.", mistakes: ["Confondre carré et rectangle", "Oublier l’unité", "Confondre périmètre et aire", "Mesurer sans aligner la règle"], summary: "Observe la figure, nomme ses propriétés et utilise les bonnes unités." }),
    ],
    Français: [
      makeChapter("Grammaire", "Identifier le sujet, le verbe, le nom, l’adjectif et construire une phrase correcte.", ["Sujet", "Verbe", "Nom", "Adjectif"], [["Dans ‘Le chien court’, quel est le verbe ?", "court"], ["Dans ‘La fille chante’, quel est le sujet ?", "la fille"], ["Dans ‘un grand arbre’, quel est l’adjectif ?", "grand"], ["Dans ‘Les enfants jouent’, quel est le verbe ?", "jouent"], ["Dans ‘une maison rouge’, quel est l’adjectif ?", "rouge"]], { definition: "La grammaire explique comment une phrase est construite. Le sujet indique qui fait l’action, le verbe indique l’action, le nom désigne une chose et l’adjectif donne une précision.", example: "Dans ‘Le petit chat dort’, le sujet est ‘Le petit chat’, le verbe est ‘dort’, le nom est ‘chat’ et l’adjectif est ‘petit’.", mistakes: ["Confondre sujet et verbe", "Oublier les accords", "Ne pas relire", "Confondre nom et adjectif"], summary: "Cherche d’abord le verbe, puis demande-toi qui fait l’action." }),
      makeChapter("Lecture compréhension", "Lire un texte, repérer les informations importantes et répondre avec précision.", ["Lire", "Comprendre", "Repérer", "Justifier"], [["Pourquoi faut-il relire un texte ?", "pour mieux comprendre"], ["Comment répond-on à une question de lecture ?", "avec une phrase"], ["Que cherche-t-on dans un texte ?", "les informations importantes"], ["À quoi sert le titre d’un texte ?", "à présenter le sujet"], ["Pourquoi faut-il chercher des indices ?", "pour justifier"]], { definition: "La lecture compréhension consiste à lire, repérer les informations importantes, comprendre les personnages, les lieux, les actions et répondre clairement.", example: "Si un texte dit ‘Lina prend son cartable et part à l’école’, on comprend que Lina est le personnage et que l’action se déroule probablement le matin.", mistakes: ["Répondre sans relire", "Inventer une réponse", "Ne pas chercher les indices", "Oublier une phrase complète"], summary: "Une bonne réponse s’appuie toujours sur le texte." }),
    ],
    Anglais: [
      makeChapter("Se présenter", "Dire son nom, son âge, saluer et parler de ses goûts en anglais.", ["Hello", "My name is", "I am", "I like"], [["Traduis : Bonjour", "hello"], ["Traduis : Je m’appelle Lina", "my name is lina"], ["Que signifie I like ?", "j’aime"], ["Comment dit-on : j’ai dix ans ?", "i am ten years old"], ["Traduis : J’aime le foot", "i like football"]], { definition: "Se présenter en anglais permet de dire son nom, son âge, ses goûts et de commencer une conversation simple.", example: "Hello, my name is Lina. I am ten years old. I like football.", mistakes: ["Oublier le verbe am", "Mélanger français et anglais", "Mal placer le prénom", "Oublier I like"], summary: "Retiens : Hello, my name is…, I am…, I like…." }),
      makeChapter("Vocabulaire de base", "Apprendre les couleurs, les nombres, les jours et les objets de la classe.", ["Couleurs", "Nombres", "Jours", "Objets"], [["Comment dit-on rouge en anglais ?", "red"], ["Comment dit-on bleu en anglais ?", "blue"], ["Comment dit-on lundi en anglais ?", "monday"], ["Comment dit-on livre en anglais ?", "book"], ["Comment dit-on stylo en anglais ?", "pen"]]),
    ],
    Sciences: [
      makeChapter("Les états de l’eau", "Comprendre que l’eau peut être solide, liquide ou gazeuse.", ["Solide", "Liquide", "Gaz", "Fusion"], [["Quel est l’état d’un glaçon ?", "solide"], ["Que devient la glace quand elle fond ?", "liquide"], ["La vapeur est-elle un gaz ?", "oui"], ["L’eau du robinet est-elle liquide ?", "oui"], ["Quel changement transforme la glace en eau ?", "fusion"]]),
      makeChapter("Le vivant", "Reconnaître les êtres vivants, leurs besoins et leur croissance.", ["Animaux", "Plantes", "Besoins", "Croissance"], [["Une plante a-t-elle besoin d’eau ?", "oui"], ["Un animal est-il un être vivant ?", "oui"], ["Que permet la lumière aux plantes ?", "grandir"], ["Un caillou est-il vivant ?", "non"], ["Les êtres vivants grandissent-ils ?", "oui"]]),
    ],
    "Histoire-Géo": [
      makeChapter("Lire une carte", "Utiliser une carte, une légende et des symboles pour se repérer.", ["Carte", "Légende", "Symboles", "Repères"], [["À quoi sert la légende d’une carte ?", "à expliquer les symboles"], ["Une carte sert-elle à se repérer ?", "oui"], ["Que représente souvent le bleu sur une carte ?", "l’eau"], ["Que faut-il lire en premier sur une carte ?", "le titre"], ["La légende explique-t-elle les symboles ?", "oui"]]),
      makeChapter("Se repérer dans le temps", "Comprendre avant, après, les dates et la frise chronologique.", ["Avant", "Après", "Date", "Frise"], [["Sur une frise, que montre une date ?", "un moment"], ["Le passé vient-il avant le présent ?", "oui"], ["Une frise sert-elle à organiser le temps ?", "oui"], ["Aujourd’hui appartient-il au présent ?", "oui"], ["Demain appartient-il au futur ?", "oui"]]),
    ],
    "Culture générale": [
      makeChapter("Arts et musique", "Découvrir les instruments, les sons et les familles d’instruments.", ["Cordes", "Vent", "Percussions", "Écoute"], [["La guitare est-elle un instrument à cordes ?", "oui"], ["La flûte est-elle un instrument à vent ?", "oui"], ["Le tambour est-il une percussion ?", "oui"], ["Le piano est-il un instrument ?", "oui"], ["Le violon est-il à cordes ?", "oui"]]),
      makeChapter("Découverte du monde", "Découvrir les pays, monuments, inventions et métiers.", ["Pays", "Monuments", "Inventions", "Métiers"], [["La Tour Eiffel est-elle en France ?", "oui"], ["Un médecin soigne-t-il les personnes ?", "oui"], ["Une invention sert-elle à résoudre un problème ?", "oui"], ["Un monument est-il un lieu important ?", "oui"], ["Paris est-elle en France ?", "oui"]]),
    ],
  },
  Collège: {
    Mathématiques: [
      makeChapter("Calcul numérique", "Priorités opératoires, fractions, nombres relatifs, puissances et calcul littéral.", ["Priorités", "Relatifs", "Puissances", "Expressions"], [["Calcule : 3 + 2 × 5", "13"], ["Calcule : -3 + 8", "5"], ["Calcule : 2²", "4"], ["Calcule : 18 ÷ 3 + 2", "8"], ["Calcule : 4 × (2 + 3)", "20"]]),
      makeChapter("Équations", "Résoudre une équation, isoler l’inconnue et vérifier une solution.", ["Inconnue", "Opérations inverses", "Vérifier", "Problèmes"], [["Résous : x + 8 = 15", "x = 7"], ["Résous : x - 4 = 10", "x = 14"], ["Résous : 2x = 10", "x = 5"], ["Résous : x/2 = 6", "x = 12"], ["Résous : x + 3 = 9", "x = 6"]]),
      makeChapter("Proportionnalité", "Tableaux, pourcentages, échelles et problèmes de vitesse.", ["Tableaux", "Pourcentages", "Échelles", "Vitesse"], [["50% de 80 vaut combien ?", "40"], ["10% de 200 vaut combien ?", "20"], ["Si 2 cahiers coûtent 6€, combien coûtent 4 cahiers ?", "12"], ["25% de 100 vaut combien ?", "25"], ["Le double de 15 vaut combien ?", "30"]]),
    ],
    Français: [
      makeChapter("Analyse de texte", "Identifier le narrateur, les personnages, le cadre et la structure du récit.", ["Narrateur", "Personnages", "Cadre", "Citations"], [["Qui raconte une histoire ?", "le narrateur"], ["Quel élément lance souvent l’histoire ?", "l’élément perturbateur"], ["Pourquoi cite-t-on le texte ?", "pour justifier"], ["Le lieu et l’époque forment quoi ?", "le cadre"], ["Qui agit dans un récit ?", "les personnages"]]),
      makeChapter("Expression écrite", "Organiser ses idées, écrire un paragraphe et améliorer son style.", ["Plan", "Paragraphe", "Connecteurs", "Relecture"], [["À quoi sert un connecteur logique ?", "à relier les idées"], ["Un paragraphe développe-t-il une idée ?", "oui"], ["Pourquoi relire son texte ?", "pour corriger"], ["Quel mot peut introduire une conséquence ?", "donc"], ["Un plan sert-il à organiser ?", "oui"]]),
    ],
    Anglais: [
      makeChapter("Prétérit", "Parler d’actions passées avec verbes réguliers et irréguliers.", ["Past simple", "-ed", "Irréguliers", "Questions"], [["Mets au passé : I play football", "i played football"], ["Quel est le passé de go ?", "went"], ["Que signifie yesterday ?", "hier"], ["Quel est le passé de eat ?", "ate"], ["Quel est le passé de see ?", "saw"]]),
      makeChapter("Compréhension écrite", "Lire un texte anglais, repérer les mots-clés et répondre.", ["Who", "Where", "When", "Why"], [["Que signifie who ?", "qui"], ["Que signifie where ?", "où"], ["Que signifie when ?", "quand"], ["Que signifie why ?", "pourquoi"], ["Que signifie what ?", "quoi"]]),
    ],
    Sciences: [
      makeChapter("Cellule et vivant", "Comprendre la cellule, la membrane, le noyau et l’organisation du vivant.", ["Cellule", "Membrane", "Noyau", "Organe"], [["Quel élément délimite la cellule ?", "la membrane"], ["La cellule est-elle l’unité du vivant ?", "oui"], ["Où se trouve l’information génétique ?", "dans le noyau"], ["Un organe est-il composé de cellules ?", "oui"], ["Le noyau contient-il l’information génétique ?", "oui"]]),
      makeChapter("Démarche scientifique", "Observer, formuler une hypothèse, expérimenter et conclure.", ["Observation", "Hypothèse", "Expérience", "Conclusion"], [["Que formule-t-on avant une expérience ?", "une hypothèse"], ["À quoi sert une conclusion ?", "à répondre au problème"], ["Une expérience sert-elle à tester une idée ?", "oui"], ["Quelle étape vient après l’observation ?", "l’hypothèse"], ["Faut-il observer avant de conclure ?", "oui"]]),
    ],
    "Histoire-Géo": [
      makeChapter("Révolution française", "Causes, événements et conséquences de la Révolution française.", ["1789", "Monarchie", "Droits", "République"], [["En quelle année commence la Révolution française ?", "1789"], ["Quel régime est remis en cause ?", "la monarchie"], ["La Déclaration affirme-t-elle des droits ?", "oui"], ["Quel événement symbolique a lieu le 14 juillet 1789 ?", "la prise de la bastille"], ["1789 marque-t-elle une rupture ?", "oui"]]),
      makeChapter("Document géographique", "Analyser une carte, un graphique ou un paysage.", ["Carte", "Graphique", "Légende", "Analyse"], [["À quoi sert une légende ?", "à expliquer les symboles"], ["Un graphique représente-t-il des données ?", "oui"], ["Que faut-il lire en premier sur une carte ?", "le titre"], ["Une carte peut-elle montrer un territoire ?", "oui"], ["Une photographie peut-elle être un document géographique ?", "oui"]]),
    ],
    "Culture générale": [
      makeChapter("Médias et esprit critique", "Vérifier une information, comparer les sources et repérer les doutes.", ["Source", "Date", "Auteur", "Fiabilité"], [["Pourquoi vérifier une source ?", "pour savoir si elle est fiable"], ["Faut-il comparer plusieurs sources ?", "oui"], ["Une date aide-t-elle à vérifier une information ?", "oui"], ["Une information sans source est-elle toujours fiable ?", "non"], ["Un fait est-il différent d’une opinion ?", "oui"]]),
      makeChapter("Monde actuel", "Institutions, innovation, écologie et société contemporaine.", ["Institutions", "Innovation", "Écologie", "Société"], [["Le recyclage aide-t-il l’environnement ?", "oui"], ["Une innovation est-elle une nouveauté utile ?", "oui"], ["Pourquoi apprendre l’actualité ?", "pour comprendre le monde"], ["L’écologie concerne-t-elle l’environnement ?", "oui"], ["Une institution organise-t-elle la vie collective ?", "oui"]]),
    ],
  },
};

function buildChoices(answer, question, index = 0) {
  const clean = String(answer).trim();
  const numeric = Number(clean.replace("x = ", "").replace(",", "."));

  let choices;
  if (!Number.isNaN(numeric) && clean !== "oui" && clean !== "non") {
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

function normalize(value) {
  return String(value || "").toLowerCase().trim().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[.!?]/g, "");
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
  const [result, setResult] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");

  const selectedSubject = subjects.find((s) => s.name === subject) || subjects[0];
  const chapters = programs[level][subject];
  const activeChapter = chapterIndex !== null ? chapters[chapterIndex] : null;
  const shuffledExercises = useMemo(() => {
    if (!activeChapter) return [];
    return seededShuffle(activeChapter.exercises, sessionSeed + chapterIndex + level.length + subject.length);
  }, [activeChapter, sessionSeed, chapterIndex, level, subject]);
  const currentExercise = shuffledExercises.length ? shuffledExercises[exerciseStep % shuffledExercises.length] : null;

  function resetExercise() {
    setAnswer("");
    setSelectedChoice("");
    setResult("");
    setShowCorrection(false);
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
    const { error } = await supabase.auth.signInWithPassword({ email: userEmail, password });
    if (error) return alert(error.message);
    setIsLoggedIn(true);
    setShowLogin(false);
    setSessionSeed(makeSeed(userEmail));
    setExerciseStep(0);
    setPage("home");
    setAiMessage(`Bienvenue ${userEmail}. Nouveaux exercices préparés pour cette connexion.`);
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email: userEmail, password });
    if (error) return alert(error.message);
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
        <Header isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} logout={logout} setPage={setPage} />
        {page === "home" && <Home isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} setShowDemo={setShowDemo} score={score} completed={completed} aiMessage={aiMessage} level={level} setLevel={setLevel} subject={subject} setSubject={setSubject} subjects={subjects} chapters={chapters} openChapter={openChapter} />}
        {page === "course" && isLoggedIn && activeChapter && <CoursePage level={level} subject={subject} selectedSubject={selectedSubject} chapter={activeChapter} setPage={setPage} startExercise={startExercise} completeChapter={completeChapter} />}
        {page === "exercise" && isLoggedIn && activeChapter && currentExercise && <ExercisePage level={level} subject={subject} chapter={activeChapter} currentExercise={currentExercise} exerciseStep={exerciseStep} answer={answer} setAnswer={setAnswer} selectedChoice={selectedChoice} setSelectedChoice={setSelectedChoice} validateExercise={validateExercise} nextExercise={nextExercise} result={result} showCorrection={showCorrection} setShowCorrection={setShowCorrection} setPage={setPage} />}
        {page === "home" && <><Evaluation score={score} setScore={setScore} level={level} /><Security /><Footer /></>}
      </div>
      {showDemo && <DemoModal setShowDemo={setShowDemo} />}
      {showLogin && <LoginModal setShowLogin={setShowLogin} userEmail={userEmail} setUserEmail={setUserEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} handleSignup={handleSignup} />}
    </div>
  );
}

function Header({ isLoggedIn, setShowLogin, logout, setPage }) {
  return <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between"><button onClick={() => setPage("home")} className="flex items-center gap-3 text-left"><div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">🎓</div><div><p className="text-xl font-bold">ÉduNova IA</p><p className="text-xs text-white/60">Soutien scolaire intelligent</p></div></button><div className="flex gap-3">{isLoggedIn && <Button onClick={logout} className="rounded-2xl bg-white/10 text-white px-5 py-3 border border-white/10">Déconnexion</Button>}<Button onClick={() => setShowLogin(true)} className="rounded-2xl bg-white text-slate-950 hover:bg-white/90 px-5 py-3">🔒 {isLoggedIn ? "Connecté" : "Connexion"}</Button></div></header>;
}

function Home({ isLoggedIn, setShowLogin, setShowDemo, score, completed, aiMessage, level, setLevel, subject, setSubject, subjects, chapters, openChapter }) {
  return <main><section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 mb-6">✨ Cours personnalisés après connexion</div><h1 className="text-5xl md:text-7xl font-black leading-[.95] tracking-tight">Le soutien scolaire nouvelle génération.</h1><p className="mt-7 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">Cours détaillés, pages séparées, exercices en plein écran et exercices renouvelés à chaque connexion.</p><div className="mt-8 flex flex-col sm:flex-row gap-4"><Button onClick={isLoggedIn ? () => document.getElementById("cours")?.scrollIntoView({ behavior: "smooth" }) : () => setShowLogin(true)} className="rounded-2xl px-7 py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-90 shadow-xl shadow-indigo-500/20">{isLoggedIn ? "Accéder aux cours" : "Se connecter pour commencer"} ➡️</Button><Button onClick={() => setShowDemo(true)} className="rounded-2xl px-7 py-4 border border-white/15 bg-white/5 text-white hover:bg-white/10">Voir la démo ▶️</Button></div></motion.div><div className="rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl text-white overflow-hidden p-6"><div className="rounded-[1.5rem] bg-slate-950/80 border border-white/10 p-5"><div className="flex items-center justify-between mb-5"><div><p className="text-sm text-white/50">Tableau de bord élève</p><h2 className="text-2xl font-bold">{isLoggedIn ? "Espace connecté" : "Connexion requise"}</h2></div><div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">🧠</div></div><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/10 p-4"><p className="text-white/50 text-sm">Progression</p><p className="text-3xl font-black mt-2">{score}%</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-white/50 text-sm">Chapitres terminés</p><p className="text-3xl font-black mt-2">{completed.length}</p></div></div><div className="mt-4 rounded-2xl bg-white p-5 text-slate-950"><p className="font-bold flex items-center gap-3">⭐ Assistant IA</p><p className="text-sm text-slate-600 mt-3">{aiMessage}</p></div></div></div></section><section id="cours" className="max-w-7xl mx-auto px-6 py-16">{!isLoggedIn ? <LockedCourses setShowLogin={setShowLogin} /> : <CourseSelector level={level} setLevel={setLevel} subject={subject} setSubject={setSubject} subjects={subjects} chapters={chapters} openChapter={openChapter} />}</section></main>;
}

function LockedCourses({ setShowLogin }) {
  return <div className="rounded-[2rem] bg-white text-slate-950 p-10 shadow-2xl text-center max-w-3xl mx-auto"><div className="text-5xl">🔒</div><h2 className="text-4xl font-black mt-4">Cours réservés aux utilisateurs connectés</h2><p className="text-slate-600 mt-4">Connecte-toi ou crée un compte pour accéder aux cours détaillés et aux exercices plein écran.</p><Button onClick={() => setShowLogin(true)} className="mt-6 rounded-2xl px-7 py-4 bg-slate-950 text-white">Se connecter</Button></div>;
}

function CourseSelector({ level, setLevel, subject, setSubject, subjects, chapters, openChapter }) {
  return <><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8"><div><p className="text-indigo-300 font-semibold">Cours détaillés</p><h2 className="text-4xl font-black mt-2">Choisis ton niveau, ta matière et ton chapitre</h2><p className="text-white/60 mt-3 max-w-2xl">Chaque chapitre ouvre une page complète avec explications détaillées, méthode et exercice en plein écran.</p></div><div className="flex rounded-2xl bg-white/10 p-1 border border-white/10 w-fit">{levels.map((item) => <button key={item} onClick={() => setLevel(item)} className={`px-5 py-3 rounded-xl text-sm font-semibold transition ${level === item ? "bg-white text-slate-950" : "text-white/70"}`}>{item}</button>)}</div></div><div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">{subjects.map((item) => <button key={item.name} onClick={() => setSubject(item.name)} className={`rounded-3xl p-5 text-left border transition ${subject === item.name ? "bg-white text-slate-950 border-white" : "bg-white/10 border-white/10 hover:bg-white/15"}`}><div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}>{item.icon}</div><p className="font-bold text-sm">{item.name}</p></button>)}</div><div className="rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl"><p className="text-sm text-slate-500">{level} · {subject}</p><h3 className="text-3xl font-black mb-6">Chapitres disponibles</h3><div className="grid md:grid-cols-2 gap-5">{chapters.map((chapter, index) => <button key={chapter.title} onClick={() => openChapter(index)} className="rounded-3xl bg-slate-100 p-6 text-left hover:bg-slate-200 transition border border-slate-200"><p className="text-xl font-black mb-3">{chapter.title}</p><p className="text-slate-600 mb-4">{chapter.lesson}</p><ul className="text-sm text-slate-600 space-y-1">{chapter.objectives.map((item) => <li key={item}>✅ {item}</li>)}</ul><p className="mt-5 text-indigo-600 font-bold">Ouvrir le cours →</p></button>)}</div></div></>;
}

function CoursePage({ level, subject, selectedSubject, chapter, setPage, startExercise, completeChapter }) {
  return <main className="max-w-6xl mx-auto px-6 py-12"><Button onClick={() => { setPage("home"); setTimeout(() => document.getElementById("cours")?.scrollIntoView({ behavior: "smooth" }), 50); }} className="mb-6 rounded-2xl bg-white/10 text-white px-5 py-3 border border-white/10">← Retour aux chapitres</Button><div className="rounded-[2rem] bg-white text-slate-950 p-8 md:p-12 shadow-2xl"><div className="flex items-center gap-4 mb-8"><div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${selectedSubject.color} flex items-center justify-center text-white text-2xl`}>{selectedSubject.icon}</div><div><p className="text-slate-500">{level} · {subject}</p><h1 className="text-4xl font-black">{chapter.title}</h1></div></div><p className="text-xl text-slate-700 leading-relaxed">{chapter.lesson}</p>{chapter.video && (
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

<div className="mt-8 grid md:grid-cols-2 gap-6"><div className="rounded-3xl bg-slate-100 p-6"><h2 className="text-2xl font-black mb-4">Objectifs</h2><ul className="space-y-2 text-slate-700">{chapter.objectives.map((o) => <li key={o}>✅ {o}</li>)}</ul></div><div className="rounded-3xl bg-slate-100 p-6"><h2 className="text-2xl font-black mb-4">Méthode</h2><ol className="space-y-2 text-slate-700">{chapter.method.map((m, i) => <li key={m}>{i + 1}. {m}</li>)}</ol></div></div><div className="mt-8 rounded-3xl bg-indigo-50 border border-indigo-100 p-6"><h2 className="text-2xl font-black mb-3">Leçon détaillée</h2><p className="text-slate-700 leading-relaxed text-lg">{chapter.details.definition}</p></div><div className="mt-6 rounded-3xl bg-emerald-50 border border-emerald-100 p-6"><h2 className="text-2xl font-black mb-3">Exemple guidé</h2><p className="text-slate-700 leading-relaxed text-lg">{chapter.details.example}</p></div><div className="mt-6 grid md:grid-cols-2 gap-6"><div className="rounded-3xl bg-rose-50 border border-rose-100 p-6"><h2 className="text-2xl font-black mb-4">Erreurs fréquentes</h2><ul className="space-y-2 text-slate-700">{chapter.details.mistakes.map((m) => <li key={m}>⚠️ {m}</li>)}</ul></div><div className="rounded-3xl bg-slate-100 p-6"><h2 className="text-2xl font-black mb-4">Résumé à retenir</h2><p className="text-slate-700 leading-relaxed">{chapter.details.summary}</p><p className="mt-4 text-indigo-700 font-bold">Conseil IA : commence par 2 exercices simples, puis passe au niveau supérieur.</p></div></div><div className="mt-8 flex flex-col sm:flex-row gap-4"><Button onClick={startExercise} className="rounded-2xl px-8 py-4 bg-indigo-600 text-white hover:bg-indigo-500">Commencer les exercices plein écran</Button><Button onClick={completeChapter} className="rounded-2xl px-8 py-4 bg-slate-950 text-white hover:bg-slate-800">Marquer le chapitre terminé</Button></div></div></main>;
}

function ExercisePage({ level, subject, chapter, currentExercise, exerciseStep, answer, setAnswer, selectedChoice, setSelectedChoice, validateExercise, nextExercise, result, showCorrection, setShowCorrection, setPage }) {
  return <main className="min-h-[80vh] max-w-5xl mx-auto px-6 py-10 flex items-center"><div className="w-full rounded-[2.5rem] bg-white text-slate-950 p-8 md:p-14 shadow-2xl"><div className="flex justify-between items-start gap-4 mb-8"><div><p className="text-indigo-600 font-bold">{level} · {subject}</p><h1 className="text-4xl md:text-5xl font-black mt-2">{chapter.title}</h1><p className="text-slate-500 mt-2">Exercice {(exerciseStep % chapter.exercises.length) + 1} sur {chapter.exercises.length} · {currentExercise.difficulty} · choix multiples</p></div><Button onClick={() => { setPage("course"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); }} className="rounded-2xl bg-slate-100 px-5 py-3">Retour cours</Button></div><div className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 mb-8"><p className="text-indigo-300 font-semibold mb-3">Question</p><h2 className="text-3xl md:text-4xl font-black leading-tight">{currentExercise.question}</h2></div><div className="grid md:grid-cols-2 gap-4 mb-6">{currentExercise.choices.map((choice) => <button key={choice} onClick={() => { setSelectedChoice(choice); setAnswer(""); }} className={`rounded-3xl border px-6 py-5 text-left text-xl font-bold transition ${selectedChoice === choice ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-100 text-slate-950 border-slate-200 hover:bg-slate-200"}`}>{choice}</button>)}</div><div className="rounded-3xl bg-slate-50 border border-slate-200 p-4 mb-6"><p className="text-sm text-slate-500 mb-2">Ou écrire une réponse libre</p><input value={answer} onChange={(e) => { setAnswer(e.target.value); setSelectedChoice(""); }} autoFocus placeholder="Écris ta réponse ici..." className="w-full bg-transparent text-2xl outline-none" /></div><div className="mt-6 grid md:grid-cols-3 gap-4"><Button onClick={validateExercise} className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white py-4 text-lg">Valider</Button><Button onClick={nextExercise} className="rounded-2xl bg-slate-950 hover:bg-slate-800 text-white py-4 text-lg">Exercice suivant</Button><Button onClick={() => setShowCorrection(!showCorrection)} className="rounded-2xl bg-slate-100 text-slate-950 py-4 text-lg">Correction</Button></div>{result && <div className="mt-6 rounded-3xl bg-slate-100 p-5 text-lg font-semibold">{result}</div>}{showCorrection && <div className="mt-6 rounded-3xl bg-emerald-50 border border-emerald-100 p-6"><p className="font-black text-xl">Correction</p><p className="text-slate-700 mt-2 text-2xl">{currentExercise.answer}</p></div>}</div></main>;
}

function Evaluation({ score, setScore, level }) {
  return <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-8 items-center"><div><p className="text-teal-300 font-semibold">Évaluation adaptative</p><h2 className="text-4xl font-black mt-2 mb-5">Un diagnostic précis</h2><p className="text-white/70 text-lg leading-relaxed">Le score évolue avec les réponses et permet d’adapter le niveau.</p></div><div className="rounded-[2rem] bg-white text-slate-950 border-0 shadow-2xl p-8"><p className="text-slate-500 text-sm">Score</p><h3 className="text-3xl font-black">{score}%</h3><input type="range" min="0" max="100" value={score} onChange={(e) => setScore(Number(e.target.value))} className="w-full mt-5" /><div className="mt-6 rounded-3xl bg-slate-100 p-5"><p className="font-bold mb-2">Analyse IA</p><p className="text-slate-600">{feedback(score, level)}</p></div></div></section>;
}

function Security() {
  return <section className="max-w-7xl mx-auto px-6 py-16"><div className="rounded-[2.5rem] bg-white/10 border border-white/10 p-8 md:p-12 grid lg:grid-cols-3 gap-8"><div className="lg:col-span-2"><p className="text-pink-300 font-semibold">Accès sécurisé</p><h2 className="text-4xl font-black mt-2">Cours accessibles uniquement après connexion</h2><p className="text-white/70 mt-5 text-lg leading-relaxed">Connexion Supabase. Exercices renouvelés à chaque session.</p></div><div className="rounded-[2rem] bg-slate-950/70 border border-white/10 p-6"><p className="text-4xl">🛡️</p><p className="font-bold text-xl mt-4">Sécurité premium</p><p className="text-white/60 mt-3 text-sm">Protection des comptes et accès privé.</p></div></div></section>;
}

function Footer() {
  return <footer className="max-w-7xl mx-auto px-6 py-10 text-white/45 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between"><p>© 2026 ÉduNova IA.</p><p>Primaire · Collège · Toutes matières · Exercices plein écran</p></footer>;
}

function DemoModal({ setShowDemo }) {
  return <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-6"><motion.div initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-3xl rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl"><div className="flex items-center justify-between mb-7"><div><p className="text-sm text-slate-500">Aperçu interactif</p><h2 className="text-3xl font-black">Démo élève</h2></div><button onClick={() => setShowDemo(false)} className="h-10 w-10 rounded-full bg-slate-100">×</button></div><div className="rounded-3xl bg-slate-950 text-white p-6"><h3 className="text-2xl font-black">Cours détaillé + exercice plein écran</h3><p className="text-white/70 mt-3">Après connexion, l’élève ouvre une vraie page de cours puis travaille exercice par exercice.</p></div></motion.div></div>;
}

function LoginModal({ setShowLogin, userEmail, setUserEmail, password, setPassword, handleLogin, handleSignup }) {
  return <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-6"><motion.div initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-md rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl"><div className="flex items-center justify-between mb-7"><div><p className="text-sm text-slate-500">Espace sécurisé</p><h2 className="text-3xl font-black">Connexion</h2></div><button onClick={() => setShowLogin(false)} className="h-10 w-10 rounded-full bg-slate-100">×</button></div><label className="text-sm font-semibold">Email</label><div className="mt-2 mb-4 rounded-2xl bg-slate-100 px-4 py-3 flex items-center gap-3">✉️<input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="parent@email.com" className="bg-transparent outline-none w-full" /></div><label className="text-sm font-semibold">Mot de passe</label><div className="mt-2 mb-6 rounded-2xl bg-slate-100 px-4 py-3 flex items-center gap-3">🔒<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-transparent outline-none w-full" /></div><Button onClick={handleLogin} className="w-full rounded-2xl h-12 bg-slate-950 hover:bg-slate-800 text-white">Accéder au tableau de bord</Button><Button onClick={handleSignup} className="w-full rounded-2xl h-12 mt-3 bg-indigo-500 hover:bg-indigo-400 text-white">Créer un compte</Button><p className="text-xs text-slate-500 mt-4 text-center">Connexion sécurisée avec Supabase.</p></motion.div></div>;
}
