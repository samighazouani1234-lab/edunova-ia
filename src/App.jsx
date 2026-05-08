import React, { useMemo, useState } from "react";
import { supabase } from "./supabase";
import { motion } from "framer-motion";
const BookOpen = () => <span>📘</span>;
const Brain = () => <span>🧠</span>;
const GraduationCap = () => <span>🎓</span>;
const Lock = () => <span>🔒</span>;
const Mail = () => <span>✉️</span>;
const Sparkles = () => <span>✨</span>;
const CheckCircle2 = () => <span>✅</span>;
const PlayCircle = () => <span>▶️</span>;
const BarChart3 = () => <span>📊</span>;
const Shield = () => <span>🛡️</span>;
const Star = () => <span>⭐</span>;
const PenTool = () => <span>🖊️</span>;
const Calculator = () => <span>🧮</span>;
const Globe2 = () => <span>🌍</span>;
const Atom = () => <span>⚛️</span>;
const Languages = () => <span>🈯</span>;
const Music = () => <span>🎵</span>;
const ArrowRight = () => <span>➡️</span>;

const Card = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>{children}</div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>{children}</div>
);

const Button = ({ children, className = "", variant, ...props }) => (
  <button className={`inline-flex items-center justify-center font-semibold transition ${className}`} {...props}>
    {children}
  </button>
);

const levels = ["Primaire", "Collège"];

const subjects = [
  { name: "Mathématiques", icon: Calculator, color: "from-indigo-500 to-violet-500" },
  { name: "Français", icon: PenTool, color: "from-rose-500 to-pink-500" },
  { name: "Anglais", icon: Languages, color: "from-sky-500 to-cyan-500" },
  { name: "Sciences", icon: Atom, color: "from-emerald-500 to-teal-500" },
  { name: "Histoire-Géo", icon: Globe2, color: "from-amber-500 to-orange-500" },
  { name: "Culture générale", icon: Music, color: "from-fuchsia-500 to-purple-500" },
];

const mathProgram = {
  Primaire: [
    {
      title: "Nombres et calculs",
      items: ["Lire et écrire les nombres", "Addition, soustraction, multiplication", "Division simple", "Calcul mental", "Problèmes à étapes"]
    },
    {
      title: "Fractions et décimaux",
      items: ["Comprendre une fraction", "Comparer des fractions", "Nombres décimaux", "Passer d’une fraction simple à un décimal"]
    },
    {
      title: "Géométrie",
      items: ["Droites, segments, angles", "Carré, rectangle, triangle, cercle", "Symétrie", "Périmètre et aire"]
    },
    {
      title: "Mesures",
      items: ["Longueurs", "Masses", "Durées", "Monnaie", "Conversions simples"]
    },
    {
      title: "Organisation de données",
      items: ["Lire un tableau", "Lire un graphique", "Résoudre un problème avec données"]
    }
  ],
  Collège: [
    {
      title: "Calcul numérique",
      items: ["Priorités opératoires", "Fractions", "Nombres relatifs", "Puissances", "Calcul littéral"]
    },
    {
      title: "Équations et problèmes",
      items: ["Équations du premier degré", "Inéquations simples", "Mise en équation", "Vérification d’une solution"]
    },
    {
      title: "Proportionnalité",
      items: ["Tableaux de proportionnalité", "Pourcentages", "Échelles", "Vitesse, distance, temps"]
    },
    {
      title: "Géométrie",
      items: ["Triangles", "Théorème de Pythagore", "Théorème de Thalès", "Angles", "Transformations"]
    },
    {
      title: "Fonctions et statistiques",
      items: ["Lire une fonction", "Graphiques", "Moyenne", "Médiane", "Probabilités simples"]
    }
  ]
};

const mathProgram = {
  Primaire: [
    {
      title: "Nombres et calculs",
      items: ["Lire et écrire les nombres", "Addition, soustraction, multiplication", "Division simple", "Calcul mental", "Problèmes à étapes"]
    },
    {
      title: "Fractions et décimaux",
      items: ["Comprendre une fraction", "Comparer des fractions", "Nombres décimaux", "Passer d’une fraction simple à un décimal"]
    },
    {
      title: "Géométrie",
      items: ["Droites, segments, angles", "Carré, rectangle, triangle, cercle", "Symétrie", "Périmètre et aire"]
    },
    {
      title: "Mesures",
      items: ["Longueurs", "Masses", "Durées", "Monnaie", "Conversions simples"]
    },
    {
      title: "Organisation de données",
      items: ["Lire un tableau", "Lire un graphique", "Résoudre un problème avec données"]
    }
  ],
  Collège: [
    {
      title: "Calcul numérique",
      items: ["Priorités opératoires", "Fractions", "Nombres relatifs", "Puissances", "Calcul littéral"]
    },
    {
      title: "Équations et problèmes",
      items: ["Équations du premier degré", "Inéquations simples", "Mise en équation", "Vérification d’une solution"]
    },
    {
      title: "Proportionnalité",
      items: ["Tableaux de proportionnalité", "Pourcentages", "Échelles", "Vitesse, distance, temps"]
    },
    {
      title: "Géométrie",
      items: ["Triangles", "Théorème de Pythagore", "Théorème de Thalès", "Angles", "Transformations"]
    },
    {
      title: "Fonctions et statistiques",
      items: ["Lire une fonction", "Graphiques", "Moyenne", "Médiane", "Probabilités simples"]
    }
  ]
};

const mathProgram = {
  Primaire: [
    {
      title: "Nombres et calculs",
      items: ["Lire et écrire les nombres", "Addition, soustraction, multiplication", "Division simple", "Calcul mental", "Problèmes à étapes"]
    },
    {
      title: "Fractions et décimaux",
      items: ["Comprendre une fraction", "Comparer des fractions", "Nombres décimaux", "Passer d’une fraction simple à un décimal"]
    },
    {
      title: "Géométrie",
      items: ["Droites, segments, angles", "Carré, rectangle, triangle, cercle", "Symétrie", "Périmètre et aire"]
    },
    {
      title: "Mesures",
      items: ["Longueurs", "Masses", "Durées", "Monnaie", "Conversions simples"]
    },
    {
      title: "Organisation de données",
      items: ["Lire un tableau", "Lire un graphique", "Résoudre un problème avec données"]
    }
  ],
  Collège: [
    {
      title: "Calcul numérique",
      items: ["Priorités opératoires", "Fractions", "Nombres relatifs", "Puissances", "Calcul littéral"]
    },
    {
      title: "Équations et problèmes",
      items: ["Équations du premier degré", "Inéquations simples", "Mise en équation", "Vérification d’une solution"]
    },
    {
      title: "Proportionnalité",
      items: ["Tableaux de proportionnalité", "Pourcentages", "Échelles", "Vitesse, distance, temps"]
    },
    {
      title: "Géométrie",
      items: ["Triangles", "Théorème de Pythagore", "Théorème de Thalès", "Angles", "Transformations"]
    },
    {
      title: "Fonctions et statistiques",
      items: ["Lire une fonction", "Graphiques", "Moyenne", "Médiane", "Probabilités simples"]
    }
  ]
};

const mathProgram = {
  Primaire: [
    {
      title: "Nombres et calculs",
      items: ["Lire et écrire les nombres", "Addition, soustraction, multiplication", "Division simple", "Calcul mental", "Problèmes à étapes"]
    },
    {
      title: "Fractions et décimaux",
      items: ["Comprendre une fraction", "Comparer des fractions", "Nombres décimaux", "Passer d’une fraction simple à un décimal"]
    },
    {
      title: "Géométrie",
      items: ["Droites, segments, angles", "Carré, rectangle, triangle, cercle", "Symétrie", "Périmètre et aire"]
    },
    {
      title: "Mesures",
      items: ["Longueurs", "Masses", "Durées", "Monnaie", "Conversions simples"]
    },
    {
      title: "Organisation de données",
      items: ["Lire un tableau", "Lire un graphique", "Résoudre un problème avec données"]
    }
  ],
  Collège: [
    {
      title: "Calcul numérique",
      items: ["Priorités opératoires", "Fractions", "Nombres relatifs", "Puissances", "Calcul littéral"]
    },
    {
      title: "Équations et problèmes",
      items: ["Équations du premier degré", "Inéquations simples", "Mise en équation", "Vérification d’une solution"]
    },
    {
      title: "Proportionnalité",
      items: ["Tableaux de proportionnalité", "Pourcentages", "Échelles", "Vitesse, distance, temps"]
    },
    {
      title: "Géométrie",
      items: ["Triangles", "Théorème de Pythagore", "Théorème de Thalès", "Angles", "Transformations"]
    },
    {
      title: "Fonctions et statistiques",
      items: ["Lire une fonction", "Graphiques", "Moyenne", "Médiane", "Probabilités simples"]
    }
  ]
};

const mathProgram = {
  Primaire: [
    {
      title: "Nombres et calculs",
      items: ["Lire et écrire les nombres", "Addition, soustraction, multiplication", "Division simple", "Calcul mental", "Problèmes à étapes"]
    },
    {
      title: "Fractions et décimaux",
      items: ["Comprendre une fraction", "Comparer des fractions", "Nombres décimaux", "Passer d’une fraction simple à un décimal"]
    },
    {
      title: "Géométrie",
      items: ["Droites, segments, angles", "Carré, rectangle, triangle, cercle", "Symétrie", "Périmètre et aire"]
    },
    {
      title: "Mesures",
      items: ["Longueurs", "Masses", "Durées", "Monnaie", "Conversions simples"]
    },
    {
      title: "Organisation de données",
      items: ["Lire un tableau", "Lire un graphique", "Résoudre un problème avec données"]
    }
  ],
  Collège: [
    {
      title: "Calcul numérique",
      items: ["Priorités opératoires", "Fractions", "Nombres relatifs", "Puissances", "Calcul littéral"]
    },
    {
      title: "Équations et problèmes",
      items: ["Équations du premier degré", "Inéquations simples", "Mise en équation", "Vérification d’une solution"]
    },
    {
      title: "Proportionnalité",
      items: ["Tableaux de proportionnalité", "Pourcentages", "Échelles", "Vitesse, distance, temps"]
    },
    {
      title: "Géométrie",
      items: ["Triangles", "Théorème de Pythagore", "Théorème de Thalès", "Angles", "Transformations"]
    },
    {
      title: "Fonctions et statistiques",
      items: ["Lire une fonction", "Graphiques", "Moyenne", "Médiane", "Probabilités simples"]
    }
  ]
};

const courseDatabase = {
  Primaire: {
    Mathématiques: {
      title: "Fractions, calculs et problèmes",
      lesson: "Dans ce cours, l’élève apprend à comprendre les fractions, poser des additions et résoudre des problèmes simples. Une fraction représente une partie d’un tout : 3/4 signifie que l’on prend 3 parts sur 4 parts égales.",
      objectives: ["Lire une fraction simple", "Comparer deux nombres", "Résoudre un problème court", "Expliquer son raisonnement"],
      method: ["Lire attentivement l’énoncé", "Repérer les nombres importants", "Choisir l’opération", "Écrire une phrase-réponse"],
      example: "Exemple : si une pizza est coupée en 4 parts et que Lina mange 3 parts, elle a mangé 3/4 de la pizza.",
      exercise: "Colorie mentalement 3 parts sur 4. Quelle fraction obtiens-tu ?",
      answer: "3/4",
      quiz: ["Que signifie le chiffre du bas dans une fraction ?", "Quelle fraction représente une moitié ?", "Dans 2/5, combien de parts sont prises ?"],
      evaluation: "L’élève doit savoir lire, représenter et comparer des fractions simples."
    },
    Français: {
      title: "Grammaire, lecture et expression",
      lesson: "L’élève apprend à reconnaître le sujet, le verbe, les noms, les adjectifs et à écrire des phrases correctes. Dans une phrase, le sujet indique qui fait l’action et le verbe indique l’action.",
      objectives: ["Identifier le sujet", "Trouver le verbe", "Comprendre un texte court", "Écrire une phrase complète"],
      method: ["Lire la phrase", "Chercher l’action", "Demander qui fait l’action", "Relire pour vérifier le sens"],
      example: "Dans ‘La petite fille chante’, le sujet est ‘La petite fille’ et le verbe est ‘chante’.",
      exercise: "Dans la phrase ‘La petite fille chante’, trouve le sujet et le verbe.",
      answer: "Sujet : La petite fille. Verbe : chante.",
      quiz: ["Quel mot indique l’action ?", "Comment trouve-t-on le sujet ?", "Un adjectif sert à quoi ?"],
      evaluation: "L’élève doit repérer les éléments principaux d’une phrase simple."
    },
    Anglais: {
      title: "Se présenter et parler de soi",
      lesson: "L’élève apprend les phrases de base pour se présenter : Hello, my name is…, I am … years old, I like… Ces structures permettent de commencer une conversation simple.",
      objectives: ["Dire son nom", "Dire son âge", "Utiliser I like", "Comprendre une question simple"],
      method: ["Apprendre la phrase modèle", "Changer le prénom", "Répéter à voix haute", "Répondre en phrase complète"],
      example: "Hello, my name is Lina. I am ten years old. I like football.",
      exercise: "Traduis : Bonjour, je m’appelle Lina.",
      answer: "Hello, my name is Lina.",
      quiz: ["Comment dit-on bonjour ?", "Comment dit-on je m’appelle ?", "Que signifie I like ?"],
      evaluation: "L’élève doit savoir utiliser une formule de présentation courte."
    },
    Sciences: {
      title: "L’eau, la matière et le vivant",
      lesson: "L’élève découvre les états de l’eau, les objets, les plantes et les animaux. L’eau peut être liquide, solide ou gazeuse selon la température.",
      objectives: ["Distinguer solide, liquide et gaz", "Observer une expérience", "Utiliser le bon vocabulaire", "Classer des exemples"],
      method: ["Observer", "Nommer", "Comparer", "Conclure"],
      example: "Un glaçon est de l’eau solide. Quand il fond, il devient liquide.",
      exercise: "Quel est l’état de l’eau dans un glaçon ?",
      answer: "Solide.",
      quiz: ["Quels sont les trois états de l’eau ?", "Que devient l’eau quand elle chauffe beaucoup ?", "Que devient la glace quand elle fond ?"],
      evaluation: "L’élève doit distinguer solide, liquide et gaz à partir d’exemples."
    },
    "Histoire-Géo": {
      title: "Se repérer dans le temps et l’espace",
      lesson: "L’élève apprend à lire une carte, utiliser une légende, situer un lieu et comprendre une frise chronologique simple.",
      objectives: ["Lire une carte", "Comprendre une légende", "Situer un lieu", "Utiliser avant/après"],
      method: ["Lire le titre", "Observer les symboles", "Utiliser la légende", "Répondre avec précision"],
      example: "Sur une carte, un trait bleu peut représenter une rivière si la légende l’indique.",
      exercise: "À quoi sert la légende d’une carte ?",
      answer: "Elle explique les symboles de la carte.",
      quiz: ["À quoi sert une carte ?", "Où trouve-t-on les symboles ?", "Que veut dire se repérer ?"],
      evaluation: "L’élève doit comprendre les éléments de base d’une carte."
    },
    "Culture générale": {
      title: "Arts, musique et découverte du monde",
      lesson: "L’élève découvre les instruments, les métiers, les pays, les monuments et les grandes inventions avec des exemples simples.",
      objectives: ["Identifier un instrument", "Classer des objets", "Découvrir des pays", "Développer la curiosité"],
      method: ["Observer", "Comparer", "Nommer", "Mémoriser par exemple"],
      example: "La guitare produit du son grâce à ses cordes : c’est un instrument à cordes.",
      exercise: "La guitare est-elle un instrument à cordes ou à vent ?",
      answer: "Un instrument à cordes.",
      quiz: ["Le piano est-il un instrument ?", "Comment produit-on un son avec une flûte ?", "Pourquoi apprend-on la culture générale ?"],
      evaluation: "L’élève doit classer quelques instruments simples."
    }
  },
  Collège: {
    Mathématiques: {
      title: "Équations, proportionnalité et raisonnement",
      lesson: "L’élève apprend à résoudre une équation du premier degré, reconnaître une situation de proportionnalité et justifier ses calculs. Résoudre une équation consiste à trouver la valeur de l’inconnue.",
      objectives: ["Isoler une inconnue", "Utiliser les opérations inverses", "Vérifier une solution", "Résoudre un problème"],
      method: ["Repérer l’inconnue", "Effectuer la même opération des deux côtés", "Calculer", "Remplacer pour vérifier"],
      example: "x + 5 = 12. On enlève 5 des deux côtés : x = 7.",
      exercise: "Résous : x + 8 = 15.",
      answer: "x = 7",
      quiz: ["Que signifie résoudre une équation ?", "Pourquoi fait-on la même opération des deux côtés ?", "Comment vérifier une solution ?"],
      evaluation: "L’élève doit isoler l’inconnue par opérations inverses."
    },
    Français: {
      title: "Analyse de texte et expression écrite",
      lesson: "L’élève apprend à analyser un récit, identifier le narrateur, les personnages, le cadre, la situation initiale, l’élément perturbateur et la résolution.",
      objectives: ["Identifier le narrateur", "Repérer la structure du récit", "Justifier avec le texte", "Rédiger une réponse organisée"],
      method: ["Lire le texte", "Surligner les indices", "Nommer les étapes", "Rédiger avec une citation courte"],
      example: "Dans un conte, l’élément perturbateur est souvent l’événement qui change la situation de départ.",
      exercise: "Dans un conte, quel événement lance souvent l’histoire ?",
      answer: "L’élément perturbateur.",
      quiz: ["Qu’est-ce qu’un narrateur ?", "À quoi sert le cadre ?", "Comment justifier une réponse ?"],
      evaluation: "L’élève doit repérer la structure d’un récit."
    },
    Anglais: {
      title: "Passé simple, vocabulaire et compréhension",
      lesson: "L’élève apprend à parler d’actions passées avec le prétérit. Les verbes réguliers prennent souvent -ed, tandis que les verbes irréguliers doivent être mémorisés.",
      objectives: ["Former le prétérit", "Distinguer régulier et irrégulier", "Comprendre une phrase au passé", "Écrire une phrase simple"],
      method: ["Identifier le verbe", "Vérifier s’il est régulier", "Ajouter -ed ou utiliser la forme irrégulière", "Relire la phrase"],
      example: "I play football devient I played football.",
      exercise: "Mets au passé : I play football.",
      answer: "I played football.",
      quiz: ["À quoi sert le prétérit ?", "Comment transforme-t-on play ?", "Pourquoi apprendre les verbes irréguliers ?"],
      evaluation: "L’élève doit transformer une phrase simple au passé."
    },
    Sciences: {
      title: "Cellule, énergie et démarche scientifique",
      lesson: "L’élève découvre la cellule, les organes, l’énergie et la méthode scientifique. La cellule est l’unité de base des êtres vivants.",
      objectives: ["Décrire une cellule", "Comprendre une expérience", "Identifier une hypothèse", "Utiliser le vocabulaire scientifique"],
      method: ["Observer", "Formuler une hypothèse", "Tester", "Conclure"],
      example: "La membrane cellulaire délimite la cellule et la protège.",
      exercise: "Quel élément protège et délimite la cellule ?",
      answer: "La membrane cellulaire.",
      quiz: ["Qu’est-ce qu’une cellule ?", "À quoi sert le noyau ?", "Qu’est-ce qu’une hypothèse ?"],
      evaluation: "L’élève doit connaître les principales parties d’une cellule."
    },
    "Histoire-Géo": {
      title: "Révolution française, cartes et sociétés",
      lesson: "L’élève étudie les grands repères historiques et géographiques. La Révolution française commence en 1789 et transforme la société française.",
      objectives: ["Retenir des repères", "Expliquer un changement historique", "Lire un document", "Construire une réponse argumentée"],
      method: ["Identifier la date", "Comprendre les causes", "Repérer les conséquences", "Rédiger clairement"],
      example: "1789 marque le début de la Révolution française et la remise en cause de la monarchie absolue.",
      exercise: "En quelle année commence la Révolution française ?",
      answer: "1789.",
      quiz: ["Que se passe-t-il en 1789 ?", "Qu’est-ce qu’une monarchie absolue ?", "Pourquoi la Révolution est-elle importante ?"],
      evaluation: "L’élève doit retenir les repères majeurs et expliquer les changements."
    },
    "Culture générale": {
      title: "Médias, esprit critique et monde actuel",
      lesson: "L’élève apprend à comprendre les médias, vérifier une source, comparer des informations et développer son esprit critique.",
      objectives: ["Identifier un média", "Vérifier une source", "Comparer deux informations", "Repérer une information douteuse"],
      method: ["Regarder la source", "Vérifier la date", "Comparer avec d’autres sites", "Chercher l’auteur"],
      example: "Une information fiable indique souvent sa source, sa date et son auteur.",
      exercise: "Pourquoi faut-il vérifier la source d’une information ?",
      answer: "Pour savoir si elle est fiable.",
      quiz: ["Qu’est-ce qu’un média ?", "Pourquoi comparer plusieurs sources ?", "Que faire face à une information douteuse ?"],
      evaluation: "L’élève doit adopter une attitude critique face aux informations."
    }
  }
};

function generateAdaptiveFeedback(score, level) {
  if (score >= 85) return `${level} : excellent niveau. L’élève peut passer à des exercices plus complexes.`;
  if (score >= 60) return `${level} : niveau solide. Quelques révisions ciblées permettront de progresser vite.`;
  return `${level} : accompagnement recommandé. Le cours doit être repris avec des exemples très guidés.`;
}

export default function App() {
  const [level, setLevel] = useState("Primaire");
  const [subject, setSubject] = useState("Mathématiques");
  const [score, setScore] = useState(72);
  const [showLogin, setShowLogin] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [exerciseResult, setExerciseResult] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aiMessage, setAiMessage] = useState("Bonjour 👋 Je suis ton assistant IA scolaire. Choisis une matière pour commencer.");
  const [completedCourses, setCompletedCourses] = useState([]);

  const course = useMemo(() => courseDatabase[level][subject], [level, subject]);

  function handleExerciseValidation() {
    if (userAnswer.toLowerCase().trim() === course.answer.toLowerCase().trim()) {
      setExerciseResult("✅ Bonne réponse ! Excellent travail.");
      setScore((prev) => Math.min(prev + 5, 100));
    } else {
      setExerciseResult("❌ Réponse incorrecte. Essaie encore.");
      setScore((prev) => Math.max(prev - 3, 0));
    }
  }

  function markCourseCompleted() {
    const courseKey = `${level}-${subject}`;
    if (!completedCourses.includes(courseKey)) {
      setCompletedCourses([...completedCourses, courseKey]);
      setScore((prev) => Math.min(prev + 8, 100));
      setAiMessage(`Bravo 🎉 Tu as terminé le cours de ${subject} niveau ${level}.`);
    }
  }

  function scrollToCourses() {
    document.getElementById("cours")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setIsLoggedIn(true);
    setShowLogin(false);
    setAiMessage(`Bienvenue ${userEmail || 'élève'} 👋 Ton espace IA est prêt.`);
  }
  const selectedSubject = subjects.find((item) => item.name === subject);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,.25),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(20,184,166,.18),transparent_35%)]" />
      <div className="relative z-10">
        <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center shadow-2xl border border-white/10">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight">ÉduNova IA</p>
              <p className="text-xs text-white/60">Soutien scolaire intelligent</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#cours" className="hover:text-white">Cours</a>
            <a href="#exercices" className="hover:text-white">Exercices</a>
            <a href="#evaluation" className="hover:text-white">Évaluation</a>
            <a href="#securite" className="hover:text-white">Sécurité</a>
          </nav>
          <Button onClick={() => setShowLogin(true)} className="rounded-2xl bg-white text-slate-950 hover:bg-white/90">
            {isLoggedIn ? '✅ Connecté' : ''} 
            <Lock className="h-4 w-4 mr-2" /> Connexion
          </Button>
        </header>

        <main>
          <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 mb-6 backdrop-blur">
                <Sparkles className="h-4 w-4" /> Cours générés par IA, adaptés au niveau de l’enfant
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[.95] tracking-tight">
                Le soutien scolaire nouvelle génération.
              </h1>
              <p className="mt-7 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                Une plateforme haut de gamme pour les élèves du primaire au collège : cours personnalisés, exercices par matière, évaluations intelligentes et suivi des progrès.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button onClick={scrollToCourses} className="rounded-2xl h-13 px-7 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-90 shadow-xl shadow-indigo-500/20">
                  Commencer un cours <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button onClick={() => setShowDemo(true)} variant="outline" className="rounded-2xl h-13 px-7 border-white/15 bg-white/5 text-white hover:bg-white/10">
                  Voir la démo <PlayCircle className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                <div className="absolute hidden lg:block right-10 top-40 w-64 rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-xl p-5 shadow-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="h-6 w-6" />
                    <p className="font-bold">Assistant IA</p>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{aiMessage}</p>
                </div>
                {["2 niveaux", "6 matières", "IA adaptative"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur">
                    <p className="font-bold">{item}</p>
                    <p className="text-xs text-white/55 mt-1">Inclus</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}>
              <Card className="rounded-[2rem] border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="rounded-[1.5rem] bg-slate-950/80 border border-white/10 p-5">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-sm text-white/50">Tableau de bord élève</p>
                        <h2 className="text-2xl font-bold">{isLoggedIn ? userEmail || 'Lina' : 'Lina'}, 5e</h2>
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
                        <Brain className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/10 p-4">
                        <p className="text-white/50 text-sm">Progression</p>
                        <p className="text-3xl font-black mt-2">{score}%</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4">
                        <p className="text-white/50 text-sm">Série</p>
                        <p className="text-3xl font-black mt-2">{completedCourses.length} cours</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl bg-white p-5 text-slate-950">
                      <div className="flex items-center gap-3 mb-3">
                        <Star className="h-5 w-5" />
                        <p className="font-bold">Recommandation IA</p>
                      </div>
                      <p className="text-sm text-slate-600">{completedCourses.length === 0 ? "Commence un premier cours, puis valide l’exercice pour faire progresser ton niveau." : `Déjà ${completedCourses.length} cours terminé(s). Continue avec une nouvelle matière.`}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          <section id="cours" className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <p className="text-indigo-300 font-semibold">Cours IA dynamiques</p>
                <h2 className="text-4xl font-black mt-2">Choisis un niveau et une matière</h2>
                <p className="text-white/60 mt-3 max-w-2xl">Chaque module contient une leçon complète, des objectifs, une méthode, un exemple guidé, un mini-quiz et un exercice corrigé.</p>
              </div>
              <div className="flex rounded-2xl bg-white/10 p-1 border border-white/10 w-fit">
                {levels.map((item) => (
                  <button key={item} onClick={() => setLevel(item)} className={`px-5 py-3 rounded-xl text-sm font-semibold transition ${level === item ? "bg-white text-slate-950" : "text-white/70"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {subjects.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.name} onClick={() => { setSubject(item.name); setAnswerVisible(false); setAiMessage(`Très bon choix 👍 Nous allons travailler la matière ${item.name} en niveau ${level}.`); }} className={`rounded-3xl p-5 text-left border transition ${subject === item.name ? "bg-white text-slate-950 border-white" : "bg-white/10 border-white/10 hover:bg-white/15"}`}>
                    <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="font-bold text-sm">{item.name}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 rounded-[2rem] bg-white text-slate-950 border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${selectedSubject.color} flex items-center justify-center text-white`}>
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{level} · {subject}</p>
                      <h3 className="text-2xl font-black">{course.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-lg">{course.lesson}</p>

                  {subject === "Mathématiques" && (
                    <div className="mt-6 rounded-3xl bg-slate-950 text-white p-6">
                      <p className="text-indigo-300 font-semibold mb-2">Programme complet de mathématiques</p>
                      <h4 className="text-2xl font-black mb-5">Tous les chapitres disponibles</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {mathProgram[level].map((chapter) => (
                          <div key={chapter.title} className="rounded-2xl bg-white/10 border border-white/10 p-5">
                            <p className="font-bold mb-3">{chapter.title}</p>
                            <ul className="space-y-2 text-sm text-white/70">
                              {chapter.items.map((item) => (
                                <li key={item}>✅ {item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {subject === "Mathématiques" && (
                    <div className="mt-6 rounded-3xl bg-slate-950 text-white p-6">
                      <p className="text-indigo-300 font-semibold mb-2">Programme complet de mathématiques</p>
                      <h4 className="text-2xl font-black mb-5">Tous les chapitres disponibles</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {mathProgram[level].map((chapter) => (
                          <div key={chapter.title} className="rounded-2xl bg-white/10 border border-white/10 p-5">
                            <p className="font-bold mb-3">{chapter.title}</p>
                            <ul className="space-y-2 text-sm text-white/70">
                              {chapter.items.map((item) => (
                                <li key={item}>✅ {item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {subject === "Mathématiques" && (
                    <div className="mt-6 rounded-3xl bg-slate-950 text-white p-6">
                      <p className="text-indigo-300 font-semibold mb-2">Programme complet de mathématiques</p>
                      <h4 className="text-2xl font-black mb-5">Tous les chapitres disponibles</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {mathProgram[level].map((chapter) => (
                          <div key={chapter.title} className="rounded-2xl bg-white/10 border border-white/10 p-5">
                            <p className="font-bold mb-3">{chapter.title}</p>
                            <ul className="space-y-2 text-sm text-white/70">
                              {chapter.items.map((item) => (
                                <li key={item}>✅ {item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {subject === "Mathématiques" && (
                    <div className="mt-6 rounded-3xl bg-slate-950 text-white p-6">
                      <p className="text-indigo-300 font-semibold mb-2">Programme complet de mathématiques</p>
                      <h4 className="text-2xl font-black mb-5">Tous les chapitres disponibles</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {mathProgram[level].map((chapter) => (
                          <div key={chapter.title} className="rounded-2xl bg-white/10 border border-white/10 p-5">
                            <p className="font-bold mb-3">{chapter.title}</p>
                            <ul className="space-y-2 text-sm text-white/70">
                              {chapter.items.map((item) => (
                                <li key={item}>✅ {item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {subject === "Mathématiques" && (
                    <div className="mt-6 rounded-3xl bg-slate-950 text-white p-6">
                      <p className="text-indigo-300 font-semibold mb-2">Programme complet de mathématiques</p>
                      <h4 className="text-2xl font-black mb-5">Tous les chapitres disponibles</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {mathProgram[level].map((chapter) => (
                          <div key={chapter.title} className="rounded-2xl bg-white/10 border border-white/10 p-5">
                            <p className="font-bold mb-3">{chapter.title}</p>
                            <ul className="space-y-2 text-sm text-white/70">
                              {chapter.items.map((item) => (
                                <li key={item}>✅ {item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="rounded-3xl bg-slate-100 p-5">
                      <p className="font-bold mb-3">Objectifs du cours</p>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {course.objectives.map((item) => <li key={item}>✅ {item}</li>)}
                      </ul>
                    </div>
                    <div className="rounded-3xl bg-slate-100 p-5">
                      <p className="font-bold mb-3">Méthode</p>
                      <ol className="space-y-2 text-sm text-slate-600">
                        {course.method.map((item, index) => <li key={item}>{index + 1}. {item}</li>)}
                      </ol>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl bg-indigo-50 border border-indigo-100 p-5">
                    <p className="font-bold mb-2">Exemple guidé</p>
                    <p className="text-slate-600 text-sm">{course.example}</p>
                  </div>

                  <div className="mt-6 rounded-3xl bg-slate-100 p-5">
                    <p className="font-bold mb-3">Mini-quiz du cours</p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {course.quiz.map((item) => (
                        <div key={item} className="rounded-2xl bg-white p-4 text-sm text-slate-600 border border-slate-200">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl bg-slate-100 p-5">
                    <p className="font-bold mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4" /> Adaptation IA</p>
                    <p className="text-slate-600 text-sm">Le contenu s’ajuste au niveau choisi, au score de l’élève et à ses erreurs fréquentes.</p>
                  </div>

                  <Button onClick={markCourseCompleted} className="mt-6 rounded-2xl h-12 px-6 bg-slate-950 hover:bg-slate-800 text-
