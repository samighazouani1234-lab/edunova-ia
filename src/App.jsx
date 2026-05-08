import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "./supabase";

const Icon = ({ children }) => <span>{children}</span>;
const BookOpen = () => <Icon>📘</Icon>;
const Brain = () => <Icon>🧠</Icon>;
const GraduationCap = () => <Icon>🎓</Icon>;
const Lock = () => <Icon>🔒</Icon>;
const Mail = () => <Icon>✉️</Icon>;
const Sparkles = () => <Icon>✨</Icon>;
const CheckCircle2 = () => <Icon>✅</Icon>;
const PlayCircle = () => <Icon>▶️</Icon>;
const BarChart3 = () => <Icon>📊</Icon>;
const Shield = () => <Icon>🛡️</Icon>;
const Star = () => <Icon>⭐</Icon>;
const PenTool = () => <Icon>🖊️</Icon>;
const Calculator = () => <Icon>🧮</Icon>;
const Globe2 = () => <Icon>🌍</Icon>;
const Atom = () => <Icon>⚛️</Icon>;
const Languages = () => <Icon>🈯</Icon>;
const Music = () => <Icon>🎵</Icon>;
const ArrowRight = () => <Icon>➡️</Icon>;

const Card = ({ children, className = "", ...props }) => <div className={className} {...props}>{children}</div>;
const CardContent = ({ children, className = "", ...props }) => <div className={className} {...props}>{children}</div>;
const Button = ({ children, className = "", ...props }) => (
  <button className={`inline-flex items-center justify-center font-semibold transition ${className}`} {...props}>{children}</button>
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

const subjectPrograms = {
  Primaire: {
    Mathématiques: [
      {
        title: "Nombres et calculs",
        lesson: "Tu apprends à lire les grands nombres, poser les opérations et résoudre des problèmes simples avec plusieurs étapes.",
        items: ["Lire et écrire les nombres", "Addition", "Soustraction", "Multiplication", "Division simple"],
        exercises: [
          { question: "Calcule : 245 + 138 = ?", answer: "383" },
          { question: "Calcule : 500 - 125 = ?", answer: "375" },
          { question: "Calcule : 8 × 7 = ?", answer: "56" }
        ]
      },
      {
        title: "Fractions et décimaux",
        lesson: "Tu découvres les fractions, les nombres décimaux et la manière de comparer deux quantités.",
        items: ["Comprendre une fraction", "Comparer des fractions", "Nombres décimaux", "Passer d’une fraction simple à un décimal"],
        exercises: [
          { question: "Quelle fraction représente une moitié ?", answer: "1/2" },
          { question: "Dans 3/4, combien de parts sont prises ?", answer: "3" },
          { question: "Quelle fraction obtient-on avec 3 parts sur 4 ?", answer: "3/4" }
        ]
      },
      {
        title: "Géométrie",
        lesson: "Tu apprends à reconnaître les figures, utiliser les angles, comprendre la symétrie et calculer des périmètres simples.",
        items: ["Droites", "Segments", "Angles", "Carré", "Rectangle", "Symétrie"],
        exercises: [
          { question: "Combien de côtés possède un rectangle ?", answer: "4" },
          { question: "Combien d’angles a un triangle ?", answer: "3" },
          { question: "Un carré a-t-il 4 côtés égaux ?", answer: "oui" }
        ]
      }
    ],
    Français: [
      {
        title: "Grammaire",
        lesson: "Tu apprends à identifier le sujet, le verbe, les noms, les adjectifs et les phrases correctes.",
        items: ["Sujet", "Verbe", "Nom", "Adjectif", "Phrase simple"],
        exercises: [
          { question: "Dans ‘Le chien court’, quel est le verbe ?", answer: "court" },
          { question: "Dans ‘La fille chante’, quel est le sujet ?", answer: "La fille" },
          { question: "Dans ‘un grand arbre’, quel mot est l’adjectif ?", answer: "grand" }
        ]
      },
      {
        title: "Lecture compréhension",
        lesson: "Tu apprends à lire un court texte, retrouver les informations importantes et répondre avec une phrase complète.",
        items: ["Lire", "Comprendre", "Repérer", "Répondre", "Justifier"],
        exercises: [
          { question: "Pourquoi faut-il relire un texte ?", answer: "Pour mieux comprendre" },
          { question: "Comment répond-on à une question de lecture ?", answer: "Avec une phrase" },
          { question: "Que cherche-t-on dans un texte ?", answer: "Les informations importantes" }
        ]
      }
    ],
    Anglais: [
      {
        title: "Se présenter",
        lesson: "Tu apprends à dire ton nom, ton âge et ce que tu aimes en anglais.",
        items: ["Hello", "My name is", "I am", "I like"],
        exercises: [
          { question: "Traduis : Bonjour", answer: "Hello" },
          { question: "Traduis : Je m’appelle Lina", answer: "My name is Lina" },
          { question: "Que signifie I like ?", answer: "J’aime" }
        ]
      },
      {
        title: "Vocabulaire de base",
        lesson: "Tu apprends les couleurs, les nombres, les jours et les objets de la classe.",
        items: ["Couleurs", "Nombres", "Jours", "Objets"],
        exercises: [
          { question: "Comment dit-on rouge en anglais ?", answer: "red" },
          { question: "Comment dit-on bleu en anglais ?", answer: "blue" },
          { question: "Comment dit-on lundi en anglais ?", answer: "Monday" }
        ]
      }
    ],
    Sciences: [
      {
        title: "Les états de l’eau",
        lesson: "Tu apprends que l’eau peut être solide, liquide ou gazeuse selon la température.",
        items: ["Solide", "Liquide", "Gaz", "Fusion", "Évaporation"],
        exercises: [
          { question: "Quel est l’état d’un glaçon ?", answer: "solide" },
          { question: "Que devient la glace quand elle fond ?", answer: "liquide" },
          { question: "La vapeur est-elle un gaz ?", answer: "oui" }
        ]
      },
      {
        title: "Le vivant",
        lesson: "Tu apprends à reconnaître les êtres vivants, leurs besoins et leur cycle de vie.",
        items: ["Animaux", "Plantes", "Besoins", "Croissance"],
        exercises: [
          { question: "Une plante a-t-elle besoin d’eau ?", answer: "oui" },
          { question: "Un animal est-il un être vivant ?", answer: "oui" },
          { question: "Que permet la lumière aux plantes ?", answer: "grandir" }
        ]
      }
    ],
    "Histoire-Géo": [
      {
        title: "Lire une carte",
        lesson: "Tu apprends à utiliser une carte, une légende et des repères pour situer un lieu.",
        items: ["Carte", "Légende", "Symboles", "Repères"],
        exercises: [
          { question: "À quoi sert la légende d’une carte ?", answer: "À expliquer les symboles" },
          { question: "Une carte sert-elle à se repérer ?", answer: "oui" },
          { question: "Que représente souvent le bleu sur une carte ?", answer: "l’eau" }
        ]
      },
      {
        title: "Se repérer dans le temps",
        lesson: "Tu apprends à utiliser avant, après, une date et une frise chronologique.",
        items: ["Avant", "Après", "Date", "Frise"],
        exercises: [
          { question: "Sur une frise, que montre une date ?", answer: "un moment" },
          { question: "Le passé vient-il avant le présent ?", answer: "oui" },
          { question: "Une frise sert-elle à organiser le temps ?", answer: "oui" }
        ]
      }
    ],
    "Culture générale": [
      {
        title: "Arts et musique",
        lesson: "Tu découvres les instruments, les œuvres, les sons et les familles d’instruments.",
        items: ["Instruments", "Sons", "Cordes", "Vent", "Percussions"],
        exercises: [
          { question: "La guitare est-elle un instrument à cordes ?", answer: "oui" },
          { question: "La flûte est-elle un instrument à vent ?", answer: "oui" },
          { question: "Le tambour est-il une percussion ?", answer: "oui" }
        ]
      },
      {
        title: "Découverte du monde",
        lesson: "Tu découvres les pays, les monuments, les inventions et les métiers.",
        items: ["Pays", "Monuments", "Inventions", "Métiers"],
        exercises: [
          { question: "La Tour Eiffel est-elle en France ?", answer: "oui" },
          { question: "Un médecin soigne-t-il les personnes ?", answer: "oui" },
          { question: "Une invention sert-elle à résoudre un problème ?", answer: "oui" }
        ]
      }
    ]
  },
  Collège: {
    Mathématiques: [
      {
        title: "Calcul numérique",
        lesson: "Tu travailles les priorités opératoires, les fractions, les nombres relatifs, les puissances et le calcul littéral.",
        items: ["Priorités opératoires", "Fractions", "Nombres relatifs", "Puissances", "Calcul littéral"],
        exercises: [
          { question: "Calcule : 3 + 2 × 5 = ?", answer: "13" },
          { question: "Calcule : -3 + 8 = ?", answer: "5" },
          { question: "Calcule : 2² = ?", answer: "4" }
        ]
      },
      {
        title: "Équations et problèmes",
        lesson: "Tu apprends à résoudre des équations, mettre un problème en équation et vérifier une solution.",
        items: ["Équations", "Inéquations", "Mise en équation", "Vérification"],
        exercises: [
          { question: "Résous : x + 8 = 15.", answer: "x = 7" },
          { question: "Résous : x - 4 = 10.", answer: "x = 14" },
          { question: "Résous : 2x = 10.", answer: "x = 5" }
        ]
      },
      {
        title: "Proportionnalité",
        lesson: "Tu apprends les tableaux de proportionnalité, les pourcentages, les échelles et les problèmes de vitesse.",
        items: ["Tableaux", "Pourcentages", "Échelles", "Vitesse"],
        exercises: [
          { question: "50% de 80 vaut combien ?", answer: "40" },
          { question: "10% de 200 vaut combien ?", answer: "20" },
          { question: "Si 2 cahiers coûtent 6€, combien coûtent 4 cahiers ?", answer: "12" }
        ]
      }
    ],
    Français: [
      {
        title: "Analyse de texte",
        lesson: "Tu apprends à identifier le narrateur, les personnages, le cadre et la structure d’un récit.",
        items: ["Narrateur", "Personnages", "Cadre", "Récit", "Citations"],
        exercises: [
          { question: "Qui raconte une histoire ?", answer: "le narrateur" },
          { question: "Quel élément lance souvent l’histoire ?", answer: "l’élément perturbateur" },
          { question: "Pourquoi cite-t-on le texte ?", answer: "pour justifier" }
        ]
      },
      {
        title: "Expression écrite",
        lesson: "Tu apprends à organiser tes idées, écrire un paragraphe et améliorer ton style.",
        items: ["Plan", "Paragraphe", "Connecteurs", "Correction"],
        exercises: [
          { question: "À quoi sert un connecteur logique ?", answer: "à relier les idées" },
          { question: "Un paragraphe développe-t-il une idée ?", answer: "oui" },
          { question: "Pourquoi relire son texte ?", answer: "pour corriger" }
        ]
      }
    ],
    Anglais: [
      {
        title: "Prétérit",
        lesson: "Tu apprends à parler d’actions passées avec les verbes réguliers et irréguliers.",
        items: ["Past simple", "Verbes réguliers", "Verbes irréguliers", "Questions"],
        exercises: [
          { question: "Mets au passé : I play football.", answer: "I played football" },
          { question: "Quel est le passé de go ?", answer: "went" },
          { question: "Que signifie yesterday ?", answer: "hier" }
        ]
      },
      {
        title: "Compréhension écrite",
        lesson: "Tu apprends à lire un texte en anglais, repérer les mots clés et répondre à des questions.",
        items: ["Mots clés", "Questions", "Réponses", "Vocabulaire"],
        exercises: [
          { question: "Que signifie who ?", answer: "qui" },
          { question: "Que signifie where ?", answer: "où" },
          { question: "Que signifie when ?", answer: "quand" }
        ]
      }
    ],
    Sciences: [
      {
        title: "Cellule et vivant",
        lesson: "Tu découvres la cellule, les organes et l’organisation des êtres vivants.",
        items: ["Cellule", "Noyau", "Membrane", "Organe"],
        exercises: [
          { question: "Quel élément délimite la cellule ?", answer: "la membrane" },
          { question: "La cellule est-elle l’unité du vivant ?", answer: "oui" },
          { question: "Où se trouve l’information génétique ?", answer: "dans le noyau" }
        ]
      },
      {
        title: "Démarche scientifique",
        lesson: "Tu apprends à formuler une hypothèse, faire une expérience et conclure.",
        items: ["Observation", "Hypothèse", "Expérience", "Conclusion"],
        exercises: [
          { question: "Que formule-t-on avant une expérience ?", answer: "une hypothèse" },
          { question: "À quoi sert une conclusion ?", answer: "à répondre au problème" },
          { question: "Une expérience sert-elle à tester une idée ?", answer: "oui" }
        ]
      }
    ],
    "Histoire-Géo": [
      {
        title: "Révolution française",
        lesson: "Tu étudies les causes, les événements et les conséquences de la Révolution française.",
        items: ["1789", "Monarchie", "République", "Droits"],
        exercises: [
          { question: "En quelle année commence la Révolution française ?", answer: "1789" },
          { question: "Quel régime est remis en cause ?", answer: "la monarchie" },
          { question: "La Déclaration affirme-t-elle des droits ?", answer: "oui" }
        ]
      },
      {
        title: "Lire un document géographique",
        lesson: "Tu apprends à analyser une carte, un graphique ou un paysage géographique.",
        items: ["Carte", "Graphique", "Légende", "Analyse"],
        exercises: [
          { question: "À quoi sert une légende ?", answer: "à expliquer les symboles" },
          { question: "Un graphique représente-t-il des données ?", answer: "oui" },
          { question: "Que faut-il lire en premier sur une carte ?", answer: "le titre" }
        ]
      }
    ],
    "Culture générale": [
      {
        title: "Médias et esprit critique",
        lesson: "Tu apprends à vérifier une information, comparer les sources et repérer les informations douteuses.",
        items: ["Média", "Source", "Date", "Auteur", "Fiabilité"],
        exercises: [
          { question: "Pourquoi vérifier une source ?", answer: "pour savoir si elle est fiable" },
          { question: "Faut-il comparer plusieurs sources ?", answer: "oui" },
          { question: "Une date aide-t-elle à vérifier une information ?", answer: "oui" }
        ]
      },
      {
        title: "Monde actuel",
        lesson: "Tu découvres les institutions, les innovations, les enjeux écologiques et sociaux.",
        items: ["Institutions", "Innovation", "Écologie", "Société"],
        exercises: [
          { question: "Le recyclage aide-t-il l’environnement ?", answer: "oui" },
          { question: "Une innovation est-elle une nouveauté utile ?", answer: "oui" },
          { question: "Pourquoi apprendre l’actualité ?", answer: "pour comprendre le monde" }
        ]
      }
    ]
  }
};

const courseDatabase = {
  Primaire: {
    Mathématiques: {
      title: "Fractions, calculs et problèmes",
      lesson: "Dans ce cours, l’élève apprend à comprendre les fractions, poser des additions et résoudre des problèmes simples. Une fraction représente une partie d’un tout : 3/4 signifie que l’on prend 3 parts sur 4 parts égales.",
      objectives: ["Lire une fraction simple", "Comparer deux nombres", "Résoudre un problème court", "Expliquer son raisonnement"],
      method: ["Lire attentivement l’énoncé", "Repérer les nombres importants", "Choisir l’opération", "Écrire une phrase-réponse"],
      example: "Si une pizza est coupée en 4 parts et que Lina mange 3 parts, elle a mangé 3/4 de la pizza.",
      exercise: "Colorie mentalement 3 parts sur 4. Quelle fraction obtiens-tu ?",
      answer: "3/4",
      quiz: ["Que signifie le chiffre du bas dans une fraction ?", "Quelle fraction représente une moitié ?", "Dans 2/5, combien de parts sont prises ?"],
      evaluation: "L’élève doit savoir lire, représenter et comparer des fractions simples.",
    },
    Français: {
      title: "Grammaire, lecture et expression",
      lesson: "L’élève apprend à reconnaître le sujet, le verbe, les noms, les adjectifs et à écrire des phrases correctes.",
      objectives: ["Identifier le sujet", "Trouver le verbe", "Comprendre un texte court", "Écrire une phrase complète"],
      method: ["Lire la phrase", "Chercher l’action", "Demander qui fait l’action", "Relire pour vérifier le sens"],
      example: "Dans ‘La petite fille chante’, le sujet est ‘La petite fille’ et le verbe est ‘chante’.",
      exercise: "Dans la phrase ‘La petite fille chante’, trouve le sujet et le verbe.",
      answer: "Sujet : La petite fille. Verbe : chante.",
      quiz: ["Quel mot indique l’action ?", "Comment trouve-t-on le sujet ?", "Un adjectif sert à quoi ?"],
      evaluation: "L’élève doit repérer les éléments principaux d’une phrase simple.",
    },
    Anglais: {
      title: "Se présenter et parler de soi",
      lesson: "L’élève apprend les phrases de base : Hello, my name is…, I am … years old, I like…",
      objectives: ["Dire son nom", "Dire son âge", "Utiliser I like", "Comprendre une question simple"],
      method: ["Apprendre la phrase modèle", "Changer le prénom", "Répéter à voix haute", "Répondre en phrase complète"],
      example: "Hello, my name is Lina. I am ten years old. I like football.",
      exercise: "Traduis : Bonjour, je m’appelle Lina.",
      answer: "Hello, my name is Lina.",
      quiz: ["Comment dit-on bonjour ?", "Comment dit-on je m’appelle ?", "Que signifie I like ?"],
      evaluation: "L’élève doit savoir utiliser une formule de présentation courte.",
    },
    Sciences: {
      title: "L’eau, la matière et le vivant",
      lesson: "L’eau peut être liquide, solide ou gazeuse selon la température.",
      objectives: ["Distinguer solide, liquide et gaz", "Observer une expérience", "Utiliser le bon vocabulaire", "Classer des exemples"],
      method: ["Observer", "Nommer", "Comparer", "Conclure"],
      example: "Un glaçon est de l’eau solide. Quand il fond, il devient liquide.",
      exercise: "Quel est l’état de l’eau dans un glaçon ?",
      answer: "Solide.",
      quiz: ["Quels sont les trois états de l’eau ?", "Que devient l’eau quand elle chauffe beaucoup ?", "Que devient la glace quand elle fond ?"],
      evaluation: "L’élève doit distinguer solide, liquide et gaz.",
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
      evaluation: "L’élève doit comprendre les éléments de base d’une carte.",
    },
    "Culture générale": {
      title: "Arts, musique et découverte du monde",
      lesson: "L’élève découvre les instruments, les métiers, les pays, les monuments et les grandes inventions.",
      objectives: ["Identifier un instrument", "Classer des objets", "Découvrir des pays", "Développer la curiosité"],
      method: ["Observer", "Comparer", "Nommer", "Mémoriser par exemple"],
      example: "La guitare produit du son grâce à ses cordes : c’est un instrument à cordes.",
      exercise: "La guitare est-elle un instrument à cordes ou à vent ?",
      answer: "Un instrument à cordes.",
      quiz: ["Le piano est-il un instrument ?", "Comment produit-on un son avec une flûte ?", "Pourquoi apprendre la culture générale ?"],
      evaluation: "L’élève doit classer quelques instruments simples.",
    },
  },
  Collège: {
    Mathématiques: {
      title: "Équations, proportionnalité et raisonnement",
      lesson: "L’élève apprend à résoudre une équation du premier degré, reconnaître une situation de proportionnalité et justifier ses calculs.",
      objectives: ["Isoler une inconnue", "Utiliser les opérations inverses", "Vérifier une solution", "Résoudre un problème"],
      method: ["Repérer l’inconnue", "Effectuer la même opération des deux côtés", "Calculer", "Remplacer pour vérifier"],
      example: "x + 5 = 12. On enlève 5 des deux côtés : x = 7.",
      exercise: "Résous : x + 8 = 15.",
      answer: "x = 7",
      quiz: ["Que signifie résoudre une équation ?", "Pourquoi fait-on la même opération des deux côtés ?", "Comment vérifier une solution ?"],
      evaluation: "L’élève doit isoler l’inconnue par opérations inverses.",
    },
    Français: {
      title: "Analyse de texte et expression écrite",
      lesson: "L’élève apprend à analyser un récit : narrateur, personnages, cadre, situation initiale, élément perturbateur et résolution.",
      objectives: ["Identifier le narrateur", "Repérer la structure du récit", "Justifier avec le texte", "Rédiger une réponse organisée"],
      method: ["Lire le texte", "Surligner les indices", "Nommer les étapes", "Rédiger avec une citation courte"],
      example: "L’élément perturbateur est l’événement qui change la situation de départ.",
      exercise: "Dans un conte, quel événement lance souvent l’histoire ?",
      answer: "L’élément perturbateur.",
      quiz: ["Qu’est-ce qu’un narrateur ?", "À quoi sert le cadre ?", "Comment justifier une réponse ?"],
      evaluation: "L’élève doit repérer la structure d’un récit.",
    },
    Anglais: {
      title: "Passé simple, vocabulaire et compréhension",
      lesson: "Le prétérit sert à parler d’actions passées. Les verbes réguliers prennent souvent -ed.",
      objectives: ["Former le prétérit", "Distinguer régulier et irrégulier", "Comprendre une phrase au passé", "Écrire une phrase simple"],
      method: ["Identifier le verbe", "Vérifier s’il est régulier", "Ajouter -ed ou utiliser la forme irrégulière", "Relire la phrase"],
      example: "I play football devient I played football.",
      exercise: "Mets au passé : I play football.",
      answer: "I played football.",
      quiz: ["À quoi sert le prétérit ?", "Comment transforme-t-on play ?", "Pourquoi apprendre les verbes irréguliers ?"],
      evaluation: "L’élève doit transformer une phrase simple au passé.",
    },
    Sciences: {
      title: "Cellule, énergie et démarche scientifique",
      lesson: "La cellule est l’unité de base des êtres vivants.",
      objectives: ["Décrire une cellule", "Comprendre une expérience", "Identifier une hypothèse", "Utiliser le vocabulaire scientifique"],
      method: ["Observer", "Formuler une hypothèse", "Tester", "Conclure"],
      example: "La membrane cellulaire délimite la cellule et la protège.",
      exercise: "Quel élément protège et délimite la cellule ?",
      answer: "La membrane cellulaire.",
      quiz: ["Qu’est-ce qu’une cellule ?", "À quoi sert le noyau ?", "Qu’est-ce qu’une hypothèse ?"],
      evaluation: "L’élève doit connaître les principales parties d’une cellule.",
    },
    "Histoire-Géo": {
      title: "Révolution française, cartes et sociétés",
      lesson: "La Révolution française commence en 1789 et transforme la société française.",
      objectives: ["Retenir des repères", "Expliquer un changement historique", "Lire un document", "Construire une réponse argumentée"],
      method: ["Identifier la date", "Comprendre les causes", "Repérer les conséquences", "Rédiger clairement"],
      example: "1789 marque le début de la Révolution française.",
      exercise: "En quelle année commence la Révolution française ?",
      answer: "1789.",
      quiz: ["Que se passe-t-il en 1789 ?", "Qu’est-ce qu’une monarchie absolue ?", "Pourquoi la Révolution est-elle importante ?"],
      evaluation: "L’élève doit retenir les repères majeurs.",
    },
    "Culture générale": {
      title: "Médias, esprit critique et monde actuel",
      lesson: "L’élève apprend à comprendre les médias, vérifier une source et comparer des informations.",
      objectives: ["Identifier un média", "Vérifier une source", "Comparer deux informations", "Repérer une information douteuse"],
      method: ["Regarder la source", "Vérifier la date", "Comparer avec d’autres sites", "Chercher l’auteur"],
      example: "Une information fiable indique souvent sa source, sa date et son auteur.",
      exercise: "Pourquoi faut-il vérifier la source d’une information ?",
      answer: "Pour savoir si elle est fiable.",
      quiz: ["Qu’est-ce qu’un média ?", "Pourquoi comparer plusieurs sources ?", "Que faire face à une information douteuse ?"],
      evaluation: "L’élève doit adopter une attitude critique face aux informations.",
    },
  },
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
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [exerciseStep, setExerciseStep] = useState(0);

  const course = useMemo(() => courseDatabase[level][subject], [level, subject]);
  const currentChapters = subjectPrograms[level][subject] || [];
  const activeChapter = selectedChapter !== null ? currentChapters[selectedChapter] : null;
  const chapterExercises = activeChapter?.exercises || [];
  const currentExercise = chapterExercises.length > 0 ? chapterExercises[exerciseStep % chapterExercises.length] : null;
  const activeExercise = currentExercise ? currentExercise.question : course.exercise;
  const activeAnswer = currentExercise ? currentExercise.answer : course.answer;
  const selectedSubject = subjects.find((item) => item.name === subject) || subjects[0];

  function handleExerciseValidation() {
    if (userAnswer.toLowerCase().trim() === activeAnswer.toLowerCase().trim()) {
      setExerciseResult("✅ Bonne réponse ! Excellent travail.");
      setScore((prev) => Math.min(prev + 5, 100));
      if (chapterExercises.length > 0) {
        setExerciseStep((prev) => prev + 1);
      }
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
    const { error } = await supabase.auth.signInWithPassword({ email: userEmail, password });
    if (error) {
      alert(error.message);
      return;
    }
    setIsLoggedIn(true);
    setShowLogin(false);
    setAiMessage(`Bienvenue ${userEmail || "élève"} 👋 Ton espace IA est prêt.`);
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email: userEmail, password });
    if (error) {
      alert(error.message);
      return;
    }
    alert("Compte créé. Vérifie ton email si Supabase demande une confirmation.");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,.25),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(20,184,166,.18),transparent_35%)]" />
      <div className="relative z-10">
        <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10"><GraduationCap /></div>
            <div>
              <p className="text-xl font-bold">ÉduNova IA</p>
              <p className="text-xs text-white/60">Soutien scolaire intelligent</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#cours" className="hover:text-white">Cours</a>
            <a href="#exercices" className="hover:text-white">Exercices</a>
            <a href="#evaluation" className="hover:text-white">Évaluation</a>
            <a href="#securite" className="hover:text-white">Sécurité</a>
          </nav>
          <Button onClick={() => setShowLogin(true)} className="rounded-2xl bg-white text-slate-950 hover:bg-white/90 px-5 py-3">
            <Lock /> {isLoggedIn ? "Connecté" : "Connexion"}
          </Button>
        </header>

        <main>
          <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 mb-6">
                <Sparkles /> Cours générés par IA, adaptés au niveau de l’enfant
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[.95] tracking-tight">Le soutien scolaire nouvelle génération.</h1>
              <p className="mt-7 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">Une plateforme haut de gamme pour les élèves du primaire au collège : cours personnalisés, exercices par matière, évaluations intelligentes et suivi des progrès.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button onClick={scrollToCourses} className="rounded-2xl px-7 py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-90 shadow-xl shadow-indigo-500/20">Commencer un cours <ArrowRight /></Button>
                <Button onClick={() => setShowDemo(true)} className="rounded-2xl px-7 py-4 border border-white/15 bg-white/5 text-white hover:bg-white/10">Voir la démo <PlayCircle /></Button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  ["2 niveaux", "Primaire et collège"],
                  ["6 matières", "Programme complet"],
                  ["IA adaptative", "Suivi intelligent"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-white/10 border border-white/10 p-4">
                    <p className="font-bold">{title}</p>
                    <p className="text-xs text-white/55 mt-1">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="rounded-[1.5rem] bg-slate-950/80 border border-white/10 p-5">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-sm text-white/50">Tableau de bord élève</p>
                        <h2 className="text-2xl font-bold">{isLoggedIn ? userEmail || "Élève" : "Lina"}, 5e</h2>
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center"><Brain /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/10 p-4"><p className="text-white/50 text-sm">Progression</p><p className="text-3xl font-black mt-2">{score}%</p></div>
                      <div className="rounded-2xl bg-white/10 p-4"><p className="text-white/50 text-sm">Cours terminés</p><p className="text-3xl font-black mt-2">{completedCourses.length}</p></div>
                    </div>
                    <div className="mt-4 rounded-2xl bg-white p-5 text-slate-950">
                      <p className="font-bold flex items-center gap-3"><Star /> Recommandation IA</p>
                      <p className="text-sm text-slate-600 mt-3">{completedCourses.length === 0 ? "Commence un premier cours, puis valide l’exercice." : `Déjà ${completedCourses.length} cours terminé(s). Continue avec une nouvelle matière.`}</p>
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
                <p className="text-white/60 mt-3 max-w-2xl">Chaque module contient une leçon, des objectifs, une méthode, un exemple guidé, un mini-quiz et un exercice corrigé.</p>
              </div>
              <div className="flex rounded-2xl bg-white/10 p-1 border border-white/10 w-fit">
                {levels.map((item) => (
                  <button key={item} onClick={() => setLevel(item)} className={`px-5 py-3 rounded-xl text-sm font-semibold transition ${level === item ? "bg-white text-slate-950" : "text-white/70"}`}>{item}</button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {subjects.map((item) => {
                const SubjectIcon = item.icon;
                return (
                  <button key={item.name} onClick={() => { setSubject(item.name); setSelectedChapter(null); setExerciseStep(0); setAnswerVisible(false); setExerciseResult(""); setUserAnswer(""); setAiMessage(`Très bon choix 👍 Nous allons travailler ${item.name} en niveau ${level}.`); }} className={`rounded-3xl p-5 text-left border transition ${subject === item.name ? "bg-white text-slate-950 border-white" : "bg-white/10 border-white/10 hover:bg-white/15"}`}>
                    <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}><SubjectIcon /></div>
                    <p className="font-bold text-sm">{item.name}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 rounded-[2rem] bg-white text-slate-950 border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${selectedSubject.color} flex items-center justify-center text-white`}><BookOpen /></div>
                    <div>
                      <p className="text-sm text-slate-500">{level} · {subject}</p>
                      <h3 className="text-2xl font-black">{course.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed text-lg">{course.lesson}</p>

                  {currentChapters.length > 0 && (
                    <div className="mt-6 rounded-3xl bg-slate-950 text-white p-6">
                      <p className="text-indigo-300 font-semibold mb-2">Programme complet</p>
                      <h4 className="text-2xl font-black mb-5">Chapitres disponibles en {subject}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {currentChapters.map((chapter, index) => (
                          <button
                            key={chapter.title}
                            onClick={() => {
                              setSelectedChapter(index);
                              setExerciseStep(0);
                              setUserAnswer("");
                              setExerciseResult("");
                              setAnswerVisible(false);
                              setAiMessage(`Chapitre ouvert : ${chapter.title}. Les exercices changeront avec ta progression.`);
                            }}
                            className={`rounded-2xl border p-5 text-left transition hover:scale-[1.02] ${selectedChapter === index ? "bg-indigo-500/30 border-indigo-300" : "bg-white/10 border-white/10 hover:bg-white/15"}`}
                          >
                            <p className="font-bold mb-3">{chapter.title}</p>
                            <ul className="space-y-2 text-sm text-white/70">
                              {chapter.items.map((item) => <li key={item}>✅ {item}</li>)}
                            </ul>
                            <p className="mt-4 text-xs text-indigo-200 font-semibold">Cliquer pour ouvrir le cours →</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeChapter && (
                    <div className="mt-6 rounded-3xl bg-indigo-50 border border-indigo-100 p-6">
                      <p className="text-sm text-indigo-600 font-semibold">Chapitre sélectionné</p>
                      <h4 className="text-2xl font-black mt-1 mb-3">{activeChapter.title}</h4>
                      <p className="text-slate-700 leading-relaxed">{activeChapter.lesson}</p>
                      <p className="mt-4 text-sm text-indigo-700 font-semibold">Exercice actuel : {chapterExercises.length ? (exerciseStep % chapterExercises.length) + 1 : 1} / {chapterExercises.length || 1}</p>
                    </div>
                  )}

                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="rounded-3xl bg-slate-100 p-5"><p className="font-bold mb-3">Objectifs du cours</p><ul className="space-y-2 text-sm text-slate-600">{course.objectives.map((item) => <li key={item}>✅ {item}</li>)}</ul></div>
                    <div className="rounded-3xl bg-slate-100 p-5"><p className="font-bold mb-3">Méthode</p><ol className="space-y-2 text-sm text-slate-600">{course.method.map((item, index) => <li key={item}>{index + 1}. {item}</li>)}</ol></div>
                  </div>

                  <div className="mt-6 rounded-3xl bg-indigo-50 border border-indigo-100 p-5"><p className="font-bold mb-2">Exemple guidé</p><p className="text-slate-600 text-sm">{course.example}</p></div>

                  <div className="mt-6 rounded-3xl bg-slate-100 p-5">
                    <p className="font-bold mb-3">Mini-quiz du cours</p>
                    <div className="grid md:grid-cols-3 gap-3">{course.quiz.map((item) => <div key={item} className="rounded-2xl bg-white p-4 text-sm text-slate-600 border border-slate-200">{item}</div>)}</div>
                  </div>

                  <div className="mt-6 rounded-3xl bg-slate-100 p-5"><p className="font-bold mb-2 flex items-center gap-2"><Sparkles /> Adaptation IA</p><p className="text-slate-600 text-sm">Le contenu s’ajuste au niveau choisi, au score de l’élève et à ses erreurs fréquentes.</p></div>
                  <Button onClick={markCourseCompleted} className="mt-6 rounded-2xl h-12 px-6 bg-slate-950 hover:bg-slate-800 text-white w-full">✅ Marquer ce cours comme terminé</Button>
                  <p className="mt-3 text-sm text-slate-500">Progression : {completedCourses.includes(`${level}-${subject}`) ? "cours terminé" : "cours en cours"}</p>
                </CardContent>
              </Card>

              <Card id="exercices" className="rounded-[2rem] bg-white/10 border border-white/10 text-white">
                <CardContent className="p-8">
                  <p className="text-indigo-300 font-semibold mb-2">Exercice</p>
                  <h3 className="text-2xl font-black mb-4">À toi de jouer</h3>
                  <p className="text-white/75 leading-relaxed">{activeExercise}</p>
                  <div className="mt-6 space-y-3">
                    <input value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Écris ta réponse..." className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none" />
                    <Button onClick={handleExerciseValidation} className="rounded-2xl bg-indigo-500 hover:bg-indigo-400 w-full text-white h-12">Valider ma réponse</Button>
                    {exerciseResult && <div className="rounded-2xl bg-white/10 p-4 text-sm text-white/80">{exerciseResult}</div>}
                    <Button onClick={() => setAnswerVisible(!answerVisible)} className="rounded-2xl bg-white text-slate-950 hover:bg-white/90 w-full py-2">{answerVisible ? "Masquer la correction" : "Voir la correction"}</Button>
                    {answerVisible && <div className="rounded-2xl bg-emerald-500/15 border border-emerald-400/20 p-4"><p className="font-bold flex items-center gap-2"><CheckCircle2 /> Correction</p><p className="text-sm text-white/75 mt-2">{activeAnswer}</p></div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="evaluation" className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-teal-300 font-semibold">Évaluation adaptative</p>
              <h2 className="text-4xl font-black mt-2 mb-5">Un diagnostic précis pour chaque enfant</h2>
              <p className="text-white/70 text-lg leading-relaxed">La plateforme analyse le niveau, ajuste la difficulté et propose un parcours personnalisé.</p>
            </div>
            <Card className="rounded-[2rem] bg-white text-slate-950 border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6"><div><p className="text-slate-500 text-sm">Score de simulation</p><h3 className="text-3xl font-black">{score}%</h3></div><BarChart3 /></div>
                <input type="range" min="0" max="100" value={score} onChange={(e) => setScore(Number(e.target.value))} className="w-full" />
                <div className="mt-6 rounded-3xl bg-slate-100 p-5"><p className="font-bold mb-2">Analyse IA</p><p className="text-slate-600">{generateAdaptiveFeedback(score, level)}</p></div>
                <p className="mt-5 text-sm text-slate-500">Objectif actuel : {course.evaluation}</p>
              </CardContent>
            </Card>
          </section>

          <section id="securite" className="max-w-7xl mx-auto px-6 py-16">
            <div className="rounded-[2.5rem] bg-white/10 border border-white/10 p-8 md:p-12 grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2"><p className="text-pink-300 font-semibold">Accès sécurisé</p><h2 className="text-4xl font-black mt-2">Espace enfant, parent et enseignant</h2><p className="text-white/70 mt-5 text-lg leading-relaxed">Connexion par email et mot de passe avec Supabase, profils séparés et suivi des progrès.</p></div>
              <div className="rounded-[2rem] bg-slate-950/70 border border-white/10 p-6"><Shield /><p className="font-bold text-xl mt-4">Sécurité premium</p><p className="text-white/60 mt-3 text-sm">Protection des comptes et accès privé.</p></div>
            </div>
          </section>
        </main>

        <footer className="max-w-7xl mx-auto px-6 py-10 text-white/45 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p>© 2026 ÉduNova IA. Plateforme de soutien scolaire.</p><p>Primaire · Collège · Toutes matières · IA adaptative</p>
        </footer>
      </div>

      {showDemo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-3xl rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-7"><div><p className="text-sm text-slate-500">Aperçu interactif</p><h2 className="text-3xl font-black">Démo élève</h2></div><button onClick={() => setShowDemo(false)} className="h-10 w-10 rounded-full bg-slate-100">×</button></div>
            <div className="rounded-3xl bg-slate-950 text-white p-6"><p className="text-sm text-white/50">Exemple de parcours</p><h3 className="text-2xl font-black mt-1">{level} · {subject}</h3><p className="text-white/70 mt-3">{course.lesson}</p></div>
          </motion.div>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-md rounded-[2rem] bg-white text-slate-950 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-7"><div><p className="text-sm text-slate-500">Espace sécurisé</p><h2 className="text-3xl font-black">Connexion</h2></div><button onClick={() => setShowLogin(false)} className="h-10 w-10 rounded-full bg-slate-100">×</button></div>
            <label className="text-sm font-semibold">Email</label>
            <div className="mt-2 mb-4 rounded-2xl bg-slate-100 px-4 py-3 flex items-center gap-3"><Mail /><input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="parent@email.com" className="bg-transparent outline-none w-full" /></div>
            <label className="text-sm font-semibold">Mot de passe</label>
            <div className="mt-2 mb-6 rounded-2xl bg-slate-100 px-4 py-3 flex items-center gap-3"><Lock /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-transparent outline-none w-full" /></div>
            <Button onClick={handleLogin} className="w-full rounded-2xl h-12 bg-slate-950 hover:bg-slate-800 text-white">Accéder au tableau de bord</Button>
            <Button onClick={handleSignup} className="w-full rounded-2xl h-12 mt-3 bg-indigo-500 hover:bg-indigo-400 text-white">Créer un compte</Button>
            <p className="text-xs text-slate-500 mt-4 text-center">Connexion sécurisée avec Supabase.</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
