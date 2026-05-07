import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const I = ({ children }) => <span className="text-xl leading-none">{children}</span>;
const BookOpen = () => <I>📘</I>;
const Brain = () => <I>🧠</I>;
const GraduationCap = () => <I>🎓</I>;
const Lock = () => <I>🔒</I>;
const Mail = () => <I>✉️</I>;
const Sparkles = () => <I>✨</I>;
const CheckCircle2 = () => <I>✅</I>;
const PlayCircle = () => <I>▶️</I>;
const BarChart3 = () => <I>📊</I>;
const Shield = () => <I>🛡️</I>;
const Star = () => <I>⭐</I>;
const PenTool = () => <I>🖊️</I>;
const Calculator = () => <I>🧮</I>;
const Globe2 = () => <I>🌍</I>;
const Atom = () => <I>⚛️</I>;
const Languages = () => <I>🈯</I>;
const Music = () => <I>🎵</I>;
const ArrowRight = () => <I>➡️</I>;

const Card = ({ children, className = "", ...props }) => <div className={className} {...props}>{children}</div>;
const CardContent = ({ children, className = "", ...props }) => <div className={className} {...props}>{children}</div>;
const Button = ({ children, className = "", ...props }) => <button className={`inline-flex items-center justify-center font-semibold transition ${className}`} {...props}>{children}</button>;

const levels = ["Primaire", "Collège"];
const subjects = [
  { name: "Mathématiques", icon: Calculator, color: "from-indigo-500 to-violet-500" },
  { name: "Français", icon: PenTool, color: "from-rose-500 to-pink-500" },
  { name: "Anglais", icon: Languages, color: "from-sky-500 to-cyan-500" },
  { name: "Sciences", icon: Atom, color: "from-emerald-500 to-teal-500" },
  { name: "Histoire-Géo", icon: Globe2, color: "from-amber-500 to-orange-500" },
  { name: "Culture générale", icon: Music, color: "from-fuchsia-500 to-purple-500" },
];

const courseDatabase = {
  Primaire: {
    Mathématiques: { title: "Comprendre les fractions simplement", lesson: "Une fraction représente une partie d’un tout. Par exemple, 1/2 signifie que l’on partage quelque chose en 2 parts égales et que l’on en prend 1. Pour comparer des fractions, on regarde le nombre de parts et leur taille.", exercise: "Colorie mentalement 3 parts sur 4. Quelle fraction obtiens-tu ?", answer: "3/4", evaluation: "L’élève doit savoir lire, représenter et comparer des fractions simples." },
    Français: { title: "Identifier le sujet et le verbe", lesson: "Dans une phrase, le sujet indique qui fait l’action. Le verbe indique l’action ou l’état. Dans ‘Le chat dort’, ‘Le chat’ est le sujet et ‘dort’ est le verbe.", exercise: "Dans la phrase ‘La petite fille chante’, trouve le sujet et le verbe.", answer: "Sujet : La petite fille. Verbe : chante.", evaluation: "L’élève doit repérer les éléments principaux d’une phrase simple." },
    Anglais: { title: "Se présenter en anglais", lesson: "Pour se présenter, on peut dire : ‘Hello, my name is…’ puis ajouter son âge avec ‘I am ... years old’. Ces phrases permettent de commencer une conversation simple.", exercise: "Traduis : Bonjour, je m’appelle Lina.", answer: "Hello, my name is Lina.", evaluation: "L’élève doit savoir utiliser une formule de présentation courte." },
    Sciences: { title: "Les états de l’eau", lesson: "L’eau peut être liquide, solide ou gazeuse. Quand elle gèle, elle devient de la glace. Quand elle chauffe beaucoup, elle devient de la vapeur.", exercise: "Quel est l’état de l’eau dans un glaçon ?", answer: "Solide.", evaluation: "L’élève doit distinguer solide, liquide et gaz à partir d’exemples." },
    "Histoire-Géo": { title: "Lire une carte simple", lesson: "Une carte représente un lieu vu de dessus. Elle peut montrer des villes, des routes, des rivières ou des montagnes. La légende aide à comprendre les symboles.", exercise: "À quoi sert la légende d’une carte ?", answer: "Elle explique les symboles de la carte.", evaluation: "L’élève doit comprendre les éléments de base d’une carte." },
    "Culture générale": { title: "Découvrir les instruments", lesson: "Les instruments de musique produisent des sons de différentes façons : en soufflant, en frappant ou en pinçant des cordes.", exercise: "La guitare est-elle un instrument à cordes ou à vent ?", answer: "Un instrument à cordes.", evaluation: "L’élève doit classer quelques instruments simples." }
  },
  Collège: {
    Mathématiques: { title: "Résoudre une équation du premier degré", lesson: "Résoudre une équation, c’est trouver la valeur de l’inconnue. Pour garder l’égalité vraie, on effectue la même opération des deux côtés. Exemple : x + 5 = 12, donc x = 7.", exercise: "Résous : x + 8 = 15.", answer: "x = 7", evaluation: "L’élève doit isoler l’inconnue par opérations inverses." },
    Français: { title: "Analyser un texte narratif", lesson: "Un récit comporte souvent un narrateur, des personnages, un cadre, une situation initiale, un élément perturbateur et une résolution. Identifier ces éléments aide à comprendre le texte.", exercise: "Dans un conte, quel événement lance souvent l’histoire ?", answer: "L’élément perturbateur.", evaluation: "L’élève doit repérer la structure d’un récit." },
    Anglais: { title: "Utiliser le prétérit simple", lesson: "Le prétérit sert à parler d’une action passée et terminée. Avec les verbes réguliers, on ajoute souvent -ed : play devient played. Les verbes irréguliers doivent être appris.", exercise: "Mets au passé : I play football.", answer: "I played football.", evaluation: "L’élève doit transformer une phrase simple au passé." },
    Sciences: { title: "Comprendre la cellule", lesson: "La cellule est l’unité de base des êtres vivants. Elle contient différents éléments, comme la membrane, le cytoplasme et parfois un noyau qui contient l’information génétique.", exercise: "Quel élément protège et délimite la cellule ?", answer: "La membrane cellulaire.", evaluation: "L’élève doit connaître les principales parties d’une cellule." },
    "Histoire-Géo": { title: "La Révolution française", lesson: "La Révolution française commence en 1789. Elle transforme profondément la société française, remet en cause la monarchie absolue et affirme de nouveaux principes comme l’égalité devant la loi.", exercise: "En quelle année commence la Révolution française ?", answer: "1789.", evaluation: "L’élève doit retenir les repères majeurs et expliquer les changements." },
    "Culture générale": { title: "Comprendre les médias", lesson: "Un média transmet une information : journal, télévision, radio, site internet ou réseau social. Il faut vérifier la source, la date et comparer plusieurs informations.", exercise: "Pourquoi faut-il vérifier la source d’une information ?", answer: "Pour savoir si elle est fiable.", evaluation: "L’élève doit adopter une attitude critique face aux informations." }
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
  const [aiMessage, setAiMessage] = useState("Bonjour 👋 Je suis ton assistant IA scolaire. Choisis une matière pour commencer.");
  const course = useMemo(() => courseDatabase[level][subject], [level, subject]);
  const selectedSubject = subjects.find((item) => item.name === subject);

  return <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,.25),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(20,184,166,.18),transparent_35%)]" />
    <div className="relative z-10">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3"><div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center shadow-2xl border border-white/10"><GraduationCap /></div><div><p className="text-xl font-bold tracking-tight">ÉduNova IA</p><p className="text-xs text-white/60">Soutien scolaire intelligent</p></div></div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70"><a href="#cours" className="hover:text-white">Cours</a><a href="#exercices" className="hover:text-white">Exercices</a><a href="#evaluation" className="hover:text-white">Évaluation</a><a href="#securite" className="hover:text-white">Sécurité</a></nav>
        <Button onClick={() => setShowLogin(true)} className="rounded-2xl bg-white text-slate-950 hover:bg-white/90 px-4 py-3"><Lock /> Connexion</Button>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 mb-6 backdrop-blur"><Sparkles /> Cours générés par IA, adaptés au niveau de l’enfant</div>
            <h1 className="text-5xl md:text-7xl font-black leading-[.95] tracking-tight">Le soutien scolaire nouvelle génération.</h1>
            <p className="mt-7 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">Une plateforme haut de gamme pour les élèves du primaire au collège : cours personnalisés, exercices par matière, évaluations intelligentes et suivi des progrès.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4"><Button className="rounded-2xl px-7 py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-90 shadow-xl shadow-indigo-500/20">Commencer un cours <ArrowRight /></Button><Button onClick={() => setShowDemo(true)} className="rounded-2xl px-7 py-4 border border-white/15 bg-white/5 text-white hover:bg-white/10">Voir la démo <PlayCircle /></Button></div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg"><div className="absolute hidden lg:block right-10 top-40 w-64 rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-xl p-5 shadow-2xl"><div className="flex items-center gap-3 mb-3"><Brain /><p className="font-bold">Assistant IA</p></div><p className="text-sm text-white/70 leading-relaxed">{aiMessage}</p></div>{["2 niveaux", "6 matières", "IA adaptative"].map((item) => <div key={item} className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur"><p className="font-bold">{item}</p><p className="text-xs text-white/55 mt-1">Inclus</p></div>)}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}><Card className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl text-white overflow-hidden"><CardContent className="p-6"><div className="rounded-[1.5rem] bg-slate-950/80 border border-white/10 p-5"><div className="flex items-center justify-between mb-5"><div><p className="text-sm text-white/50">Tableau de bord élève</p><h2 className="text-2xl font-bold">Lina, 5e</h2></div><div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center"><Brain /></div></div><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/10 p-4"><p className="text-white/50 text-sm">Progression</p><p className="text-3xl font-black mt-2">78%</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-white/50 text-sm">Série</p><p className="text-3xl font-black mt-2">12 j</p></div></div><div className="mt-4 rounded-2xl bg-white p-5 text-slate-950"><div className="flex items-center gap-3 mb-3"><Star /><p className="font-bold">Recommandation IA</p></div><p className="text-sm text-slate-600">Revoir les équations simples, puis passer à une évaluation de 10 minutes.</p></div></div></CardContent></Card></motion.div>
        </section>

        <section id="cours" className="max-w-7xl mx-auto px-6 py-16"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8"><div><p className="text-indigo-300 font-semibold">Cours IA dynamiques</p><h2 className="text-4xl font-black mt-2">Choisis un niveau et une matière</h2></div><div className="flex rounded-2xl bg-white/10 p-1 border border-white/10 w-fit">{levels.map((item) => <button key={item} onClick={() => setLevel(item)} className={`px-5 py-3 rounded-xl text-sm font-semibold transition ${level === item ? "bg-white text-slate-950" : "text-white/70"}`}>{item}</button>)}</div></div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">{subjects.map((item) => { const Icon = item.icon; return <button key={item.name} onClick={() => { setSubject(item.name); setAnswerVisible(false); setAiMessage(`Très bon choix 👍 Nous allons travailler la matière ${item.name} en niveau ${level}.`); }} className={`rounded-3xl p-5 text-left border transition ${subject === item.name ? "bg-white text-slate-950 border-white" : "bg-white/10 border-white/10 hover:bg-white/15"}`}><div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}><Icon /></div><p className="font-bold text-sm">{item.name}</p></button> })}</div>
          <div className="grid lg:grid-cols-3 gap-6"><Card className="lg:col-span-2 rounded-[2rem] bg-white text-slate-950 border-0 shadow-2xl"><CardContent className="p-8"><div className="flex items-center gap-3 mb-5"><div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${selectedSubject.color} flex items-center justify-center text-white`}><BookOpen /></div><div><p className="text-sm text-slate-500">{level} · {subject}</p><h3 className="text-2xl font-black">{course.title}</h3></div></div><p className="text-slate-700 leading-relaxed text-lg">{course.lesson}</p><div className="mt-6 rounded-3xl bg-slate-100 p-5"><p className="font-bold mb-2 flex items-center gap-2"><Sparkles /> Adaptation IA</p><p className="text-slate-600 text-sm">Le contenu s’ajuste au niveau choisi, au score de l’élève et à ses erreurs fréquentes.</p></div></CardContent></Card>
          <Card id="exercices" className="rounded-[2rem] bg-white/10 border border-white/10 text-white backdrop-blur"><CardContent className="p-8"><p className="text-indigo-300 font-semibold mb-2">Exercice</p><h3 className="text-2xl font-black mb-4">À toi de jouer</h3><p className="text-white/75 leading-relaxed">{course.exercise}</p><Button onClick={() => setAnswerVisible(!answerVisible)} className="mt-6 rounded-2xl bg-white text-slate-950 hover:bg-white/90 w-full py-3">{answerVisible ? "Masquer la correction" : "Voir la correction"}</Button>{answerVisible && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 p-4"><p className="font-bold flex items-center gap-2"><CheckCircle2 /> Correction</p><p className="text-sm text-white/75 mt-2">{course.answer}</p></motion.div>}</CardContent></Card></div>
        </section>

        <section id="evaluation" className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-8 items-center"><div><p className="text-teal-300 font-semibold">Évaluation adaptative</p><h2 className="text-4xl font-black mt-2 mb-5">Un diagnostic précis pour chaque enfant</h2><p className="text-white/70 text-lg leading-relaxed">La plateforme analyse le niveau, ajuste la difficulté et propose un parcours personnalisé après chaque évaluation.</p><div className="mt-8 space-y-4">{["Questions adaptées au niveau", "Correction immédiate", "Plan de révision personnalisé", "Suivi parent et élève"].map((item) => <div key={item} className="flex items-center gap-3 text-white/80"><CheckCircle2 /> {item}</div>)}</div></div><Card className="rounded-[2rem] bg-white text-slate-950 border-0 shadow-2xl"><CardContent className="p-8"><div className="flex items-center justify-between mb-6"><div><p className="text-slate-500 text-sm">Score de simulation</p><h3 className="text-3xl font-black">{score}%</h3></div><BarChart3 /></div><input type="range" min="0" max="100" value={score} onChange={(e) => setScore(Number(e.target.value))} className="w-full" /><div className="mt-6 rounded-3xl bg-slate-100 p-5"><p className="font-bold mb-2">Analyse IA</p><p className="text-slate-600">{generateAdaptiveFeedback(score, level)}</p></div><p className="mt-5 text-sm text-slate-500">Objectif actuel : {course.evaluation}</p></CardContent></Card></section>

        <section className="max-w-7xl mx-auto px-6 py-10"><div className="grid md:grid-cols-3 gap-6">{[["Temps d’apprentissage","124h","Temps total travaillé cette année.","from-indigo-500 to-violet-600"],["Exercices réussis","842","Progression continue grâce à l’IA.","from-emerald-500 to-teal-600"],["Badge actuel","Expert Junior","Débloqué après plusieurs évaluations réussies.","from-pink-500 to-fuchsia-600"]].map(([a,b,c,d]) => <div key={a} className={`rounded-[2rem] bg-gradient-to-br ${d} p-8 shadow-2xl`}><p className="text-white/70">{a}</p><h3 className="text-4xl md:text-5xl font-black mt-3">{b}</h3><p className="mt-4 text-white/80">{c}</p></div>)}</div></section>

        <section className="max-w-7xl mx-auto px-6 py-10"><div className="rounded-[2.5rem] bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-10 shadow-2xl overflow-hidden relative"><div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center"><div><p className="uppercase tracking-[0.3em] text-white/60 text-xs">Offre Premium</p><h2 className="text-5xl font-black mt-4 leading-tight">Une expérience scolaire d’excellence.</h2><p className="mt-6 text-lg text-white/80 leading-relaxed">Accès illimité aux cours IA, évaluations intelligentes, suivi parent, statistiques détaillées et accompagnement personnalisé.</p></div><div className="rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl"><p className="text-slate-500">Abonnement</p><h3 className="text-6xl font-black mt-2">19€</h3><p className="text-slate-500">par mois</p><div className="mt-6 space-y-3">{["Cours illimités", "IA adaptative avancée", "Suivi des parents", "Exercices personnalisés", "Accès mobile et tablette"].map((item) => <div key={item} className="flex items-center gap-3"><CheckCircle2 /><span>{item}</span></div>)}</div><Button className="w-full mt-8 rounded-2xl py-4 bg-slate-950 hover:bg-slate-800 text-white">Commencer maintenant</Button></div></div></div></section>

        <section id="securite" className="max-w-7xl mx-auto px-6 py-16"><div className="rounded-[2.5rem] bg-white/10 border border-white/10 p-8 md:p-12 backdrop-blur grid lg:grid-cols-3 gap-8"><div className="lg:col-span-2"><p className="text-pink-300 font-semibold">Accès sécurisé</p><h2 className="text-4xl font-black mt-2">Espace enfant, parent et enseignant</h2><p className="text-white/70 mt-5 text-lg leading-relaxed">Connexion par email et mot de passe, profils séparés, suivi des progrès, historique des cours et recommandations personnalisées.</p></div><div className="rounded-[2rem] bg-slate-950/70 border border-white/10 p-6"><Shield /><p className="font-bold text-xl mt-4">Sécurité premium</p><p className="text-white/60 mt-3 text-sm">Protection des comptes, accès privé et interface simple pour les familles.</p></div></div></section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-10 text-white/45 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between"><p>© 2026 ÉduNova IA. Plateforme de soutien scolaire.</p><p>Primaire · Collège · Toutes matières · IA adaptative</p></footer>
    </div>

    {showDemo && <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-center justify-center p-6"><motion.div initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-3xl rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl"><div className="flex items-center justify-between mb-7"><div><p className="text-sm text-slate-500">Aperçu interactif</p><h2 className="text-3xl font-black">Démo élève</h2></div><button onClick={() => setShowDemo(false)} className="h-10 w-10 rounded-full bg-slate-100">×</button></div><div className="grid md:grid-cols-3 gap-4 mb-6">{[[BookOpen,"Cours IA","Le cours s’adapte au niveau sélectionné."],[PenTool,"Exercice","Une question est proposée avec correction."],[BarChart3,"Évaluation","L’IA donne une recommandation personnalisée."]].map(([Icon,title,text]) => <div key={title} className="rounded-3xl bg-slate-100 p-5"><Icon /><p className="font-bold mt-3">{title}</p><p className="text-sm text-slate-600 mt-2">{text}</p></div>)}</div><div className="rounded-3xl bg-slate-950 text-white p-6"><p className="text-sm text-white/50">Exemple de parcours</p><h3 className="text-2xl font-black mt-1">{level} · {subject}</h3><p className="text-white/70 mt-3">{course.lesson}</p><div className="mt-5 rounded-2xl bg-white/10 p-4"><p className="font-bold">Question rapide</p><p className="text-white/70 mt-2">{course.exercise}</p></div></div></motion.div></div>}

    {showLogin && <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-center justify-center p-6"><motion.div initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-md rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl"><div className="flex items-center justify-between mb-7"><div><p className="text-sm text-slate-500">Espace sécurisé</p><h2 className="text-3xl font-black">Connexion</h2></div><button onClick={() => setShowLogin(false)} className="h-10 w-10 rounded-full bg-slate-100">×</button></div><label className="text-sm font-semibold">Email</label><div className="mt-2 mb-4 rounded-2xl bg-slate-100 px-4 py-3 flex items-center gap-3"><Mail /><input placeholder="parent@email.com" className="bg-transparent outline-none w-full" /></div><label className="text-sm font-semibold">Mot de passe</label><div className="mt-2 mb-6 rounded-2xl bg-slate-100 px-4 py-3 flex items-center gap-3"><Lock /><input type="password" placeholder="••••••••" className="bg-transparent outline-none w-full" /></div><Button className="w-full rounded-2xl py-4 bg-slate-950 hover:bg-slate-800 text-white">Accéder au tableau de bord</Button><p className="text-xs text-slate-500 mt-4 text-center">Démo front-end : l’authentification réelle nécessite un backend sécurisé.</p></motion.div></div>}
  </div>;
}
