import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "./supabase";

const Icon = ({ children }) => <span>{children}</span>;
const Button = ({ children, className = "", ...props }) => (
  <button className={`inline-flex items-center justify-center font-semibold transition ${className}`} {...props}>{children}</button>
);
const Card = ({ children, className = "" }) => <div className={className}>{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={className}>{children}</div>;

const levels = ["Primaire", "Collège"];
const subjects = [
  { name: "Mathématiques", icon: "🧮", color: "from-indigo-500 to-violet-500" },
  { name: "Français", icon: "🖊️", color: "from-rose-500 to-pink-500" },
  { name: "Anglais", icon: "🇬🇧", color: "from-sky-500 to-cyan-500" },
  { name: "Sciences", icon: "⚛️", color: "from-emerald-500 to-teal-500" },
  { name: "Histoire-Géo", icon: "🌍", color: "from-amber-500 to-orange-500" },
  { name: "Culture générale", icon: "🎵", color: "from-fuchsia-500 to-purple-500" },
];

const programs = {
  Primaire: {
    Mathématiques: [
      chapter("Nombres et calculs", "Lire les nombres, poser les opérations et résoudre des problèmes simples.", ["Lire les nombres", "Additionner", "Soustraire", "Multiplier", "Résoudre un problème"], [
        ["Calcule : 245 + 138", "383"], ["Calcule : 500 - 125", "375"], ["Calcule : 8 × 7", "56"], ["Calcule : 96 ÷ 12", "8"],
      ]),
      chapter("Fractions et décimaux", "Comprendre les fractions, les parts d’un tout et les nombres décimaux.", ["Lire une fraction", "Comparer", "Décimaux", "Utiliser dans un problème"], [
        ["Quelle fraction représente une moitié ?", "1/2"], ["Dans 3/4, combien de parts sont prises ?", "3"], ["Quelle fraction obtient-on avec 3 parts sur 4 ?", "3/4"], ["0,5 représente quelle fraction simple ?", "1/2"],
      ]),
      chapter("Géométrie et mesures", "Reconnaître les figures, mesurer et calculer des périmètres simples.", ["Figures", "Angles", "Symétrie", "Longueurs"], [
        ["Combien de côtés possède un rectangle ?", "4"], ["Combien d’angles a un triangle ?", "3"], ["Combien de centimètres dans 1 mètre ?", "100"], ["Un carré a-t-il 4 côtés égaux ?", "oui"],
      ]),
    ],
    Français: [
      chapter("Grammaire", "Identifier le sujet, le verbe, le nom, l’adjectif et construire une phrase correcte.", ["Sujet", "Verbe", "Nom", "Adjectif"], [
        ["Dans ‘Le chien court’, quel est le verbe ?", "court"], ["Dans ‘La fille chante’, quel est le sujet ?", "la fille"], ["Dans ‘un grand arbre’, quel est l’adjectif ?", "grand"], ["Dans ‘Les enfants jouent’, quel est le verbe ?", "jouent"],
      ]),
      chapter("Lecture compréhension", "Lire un texte, repérer les informations importantes et répondre avec précision.", ["Lire", "Comprendre", "Repérer", "Justifier"], [
        ["Pourquoi faut-il relire un texte ?", "pour mieux comprendre"], ["Comment répond-on à une question de lecture ?", "avec une phrase"], ["Que cherche-t-on dans un texte ?", "les informations importantes"], ["À quoi sert le titre d’un texte ?", "à présenter le sujet"],
      ]),
    ],
    Anglais: [
      chapter("Se présenter", "Dire son nom, son âge, saluer et parler de ses goûts en anglais.", ["Hello", "My name is", "I am", "I like"], [
        ["Traduis : Bonjour", "hello"], ["Traduis : Je m’appelle Lina", "my name is lina"], ["Que signifie I like ?", "j’aime"], ["Comment dit-on : j’ai dix ans ?", "i am ten years old"],
      ]),
      chapter("Vocabulaire de base", "Apprendre les couleurs, les nombres, les jours et les objets de la classe.", ["Couleurs", "Nombres", "Jours", "Objets"], [
        ["Comment dit-on rouge en anglais ?", "red"], ["Comment dit-on bleu en anglais ?", "blue"], ["Comment dit-on lundi en anglais ?", "monday"], ["Comment dit-on livre en anglais ?", "book"],
      ]),
    ],
    Sciences: [
      chapter("Les états de l’eau", "Comprendre que l’eau peut être solide, liquide ou gazeuse.", ["Solide", "Liquide", "Gaz", "Fusion"], [
        ["Quel est l’état d’un glaçon ?", "solide"], ["Que devient la glace quand elle fond ?", "liquide"], ["La vapeur est-elle un gaz ?", "oui"], ["L’eau du robinet est-elle liquide ?", "oui"],
      ]),
      chapter("Le vivant", "Reconnaître les êtres vivants, leurs besoins et leur croissance.", ["Animaux", "Plantes", "Besoins", "Croissance"], [
        ["Une plante a-t-elle besoin d’eau ?", "oui"], ["Un animal est-il un être vivant ?", "oui"], ["Que permet la lumière aux plantes ?", "grandir"], ["Un caillou est-il vivant ?", "non"],
      ]),
    ],
    "Histoire-Géo": [
      chapter("Lire une carte", "Utiliser une carte, une légende et des symboles pour se repérer.", ["Carte", "Légende", "Symboles", "Repères"], [
        ["À quoi sert la légende d’une carte ?", "à expliquer les symboles"], ["Une carte sert-elle à se repérer ?", "oui"], ["Que représente souvent le bleu sur une carte ?", "l’eau"], ["Que faut-il lire en premier sur une carte ?", "le titre"],
      ]),
      chapter("Se repérer dans le temps", "Comprendre avant, après, les dates et la frise chronologique.", ["Avant", "Après", "Date", "Frise"], [
        ["Sur une frise, que montre une date ?", "un moment"], ["Le passé vient-il avant le présent ?", "oui"], ["Une frise sert-elle à organiser le temps ?", "oui"], ["Aujourd’hui appartient-il au présent ?", "oui"],
      ]),
    ],
    "Culture générale": [
      chapter("Arts et musique", "Découvrir les instruments, les sons et les familles d’instruments.", ["Cordes", "Vent", "Percussions", "Écoute"], [
        ["La guitare est-elle un instrument à cordes ?", "oui"], ["La flûte est-elle un instrument à vent ?", "oui"], ["Le tambour est-il une percussion ?", "oui"], ["Le piano est-il un instrument ?", "oui"],
      ]),
      chapter("Découverte du monde", "Découvrir les pays, monuments, inventions et métiers.", ["Pays", "Monuments", "Inventions", "Métiers"], [
        ["La Tour Eiffel est-elle en France ?", "oui"], ["Un médecin soigne-t-il les personnes ?", "oui"], ["Une invention sert-elle à résoudre un problème ?", "oui"], ["Un monument est-il un lieu important ?", "oui"],
      ]),
    ],
  },
  Collège: {
    Mathématiques: [
      chapter("Calcul numérique", "Priorités opératoires, fractions, nombres relatifs, puissances et calcul littéral.", ["Priorités", "Relatifs", "Puissances", "Expressions"], [
        ["Calcule : 3 + 2 × 5", "13"], ["Calcule : -3 + 8", "5"], ["Calcule : 2²", "4"], ["Calcule : 18 ÷ 3 + 2", "8"],
      ]),
      chapter("Équations", "Résoudre une équation, isoler l’inconnue et vérifier une solution.", ["Inconnue", "Opérations inverses", "Vérifier", "Problèmes"], [
        ["Résous : x + 8 = 15", "x = 7"], ["Résous : x - 4 = 10", "x = 14"], ["Résous : 2x = 10", "x = 5"], ["Résous : x/2 = 6", "x = 12"],
      ]),
      chapter("Proportionnalité", "Tableaux, pourcentages, échelles et problèmes de vitesse.", ["Tableaux", "Pourcentages", "Échelles", "Vitesse"], [
        ["50% de 80 vaut combien ?", "40"], ["10% de 200 vaut combien ?", "20"], ["Si 2 cahiers coûtent 6€, combien coûtent 4 cahiers ?", "12"], ["25% de 100 vaut combien ?", "25"],
      ]),
    ],
    Français: [
      chapter("Analyse de texte", "Identifier le narrateur, les personnages, le cadre et la structure du récit.", ["Narrateur", "Personnages", "Cadre", "Citations"], [
        ["Qui raconte une histoire ?", "le narrateur"], ["Quel élément lance souvent l’histoire ?", "l’élément perturbateur"], ["Pourquoi cite-t-on le texte ?", "pour justifier"], ["Le lieu et l’époque forment quoi ?", "le cadre"],
      ]),
      chapter("Expression écrite", "Organiser ses idées, écrire un paragraphe et améliorer son style.", ["Plan", "Paragraphe", "Connecteurs", "Relecture"], [
        ["À quoi sert un connecteur logique ?", "à relier les idées"], ["Un paragraphe développe-t-il une idée ?", "oui"], ["Pourquoi relire son texte ?", "pour corriger"], ["Quel mot peut introduire une conséquence ?", "donc"],
      ]),
    ],
    Anglais: [
      chapter("Prétérit", "Parler d’actions passées avec verbes réguliers et irréguliers.", ["Past simple", "-ed", "Irréguliers", "Questions"], [
        ["Mets au passé : I play football", "i played football"], ["Quel est le passé de go ?", "went"], ["Que signifie yesterday ?", "hier"], ["Quel est le passé de eat ?", "ate"],
      ]),
      chapter("Compréhension écrite", "Lire un texte anglais, repérer les mots-clés et répondre.", ["Who", "Where", "When", "Why"], [
        ["Que signifie who ?", "qui"], ["Que signifie where ?", "où"], ["Que signifie when ?", "quand"], ["Que signifie why ?", "pourquoi"],
      ]),
    ],
    Sciences: [
      chapter("Cellule et vivant", "Comprendre la cellule, la membrane, le noyau et l’organisation du vivant.", ["Cellule", "Membrane", "Noyau", "Organe"], [
        ["Quel élément délimite la cellule ?", "la membrane"], ["La cellule est-elle l’unité du vivant ?", "oui"], ["Où se trouve l’information génétique ?", "dans le noyau"], ["Un organe est-il composé de cellules ?", "oui"],
      ]),
      chapter("Démarche scientifique", "Observer, formuler une hypothèse, expérimenter et conclure.", ["Observation", "Hypothèse", "Expérience", "Conclusion"], [
        ["Que formule-t-on avant une expérience ?", "une hypothèse"], ["À quoi sert une conclusion ?", "à répondre au problème"], ["Une expérience sert-elle à tester une idée ?", "oui"], ["Quelle étape vient après l’observation ?", "l’hypothèse"],
      ]),
    ],
    "Histoire-Géo": [
      chapter("Révolution française", "Causes, événements et conséquences de la Révolution française.", ["1789", "Monarchie", "Droits", "République"], [
        ["En quelle année commence la Révolution française ?", "1789"], ["Quel régime est remis en cause ?", "la monarchie"], ["La Déclaration affirme-t-elle des droits ?", "oui"], ["Quel événement symbolique a lieu le 14 juillet 1789 ?", "la prise de la bastille"],
      ]),
      chapter("Document géographique", "Analyser une carte, un graphique ou un paysage.", ["Carte", "Graphique", "Légende", "Analyse"], [
        ["À quoi sert une légende ?", "à expliquer les symboles"], ["Un graphique représente-t-il des données ?", "oui"], ["Que faut-il lire en premier sur une carte ?", "le titre"], ["Une carte peut-elle montrer un territoire ?", "oui"],
      ]),
    ],
    "Culture générale": [
      chapter("Médias et esprit critique", "Vérifier une information, comparer les sources et repérer les doutes.", ["Source", "Date", "Auteur", "Fiabilité"], [
        ["Pourquoi vérifier une source ?", "pour savoir si elle est fiable"], ["Faut-il comparer plusieurs sources ?", "oui"], ["Une date aide-t-elle à vérifier une information ?", "oui"], ["Une information sans source est-elle toujours fiable ?", "non"],
      ]),
      chapter("Monde actuel", "Institutions, innovation, écologie et société contemporaine.", ["Institutions", "Innovation", "Écologie", "Société"], [
        ["Le recyclage aide-t-il l’environnement ?", "oui"], ["Une innovation est-elle une nouveauté utile ?", "oui"], ["Pourquoi apprendre l’actualité ?", "pour comprendre le monde"], ["L’écologie concerne-t-elle l’environnement ?", "oui"],
      ]),
    ],
  },
};

function chapter(title, lesson, objectives, exercises) {
  return {
    title,
    lesson,
    objectives,
    method: ["Lire la consigne", "Repérer les informations utiles", "Répondre clairement", "Vérifier la réponse"],
    details: getLessonDetails(title),
    exercises: exercises.map(([question, answer]) => ({ question, answer })),
  };
}

function getLessonDetails(title) {
  const lessons = {
    "Nombres et calculs": {
      definition: "Les nombres servent à compter, mesurer, comparer et résoudre des situations de la vie quotidienne. Les opérations permettent de transformer ces nombres : additionner pour regrouper, soustraire pour enlever, multiplier pour répéter, diviser pour partager.",
      example: "Exemple guidé : pour calculer 245 + 138, on additionne les unités : 5 + 8 = 13, on écrit 3 et on retient 1. Puis les dizaines : 4 + 3 + 1 = 8. Puis les centaines : 2 + 1 = 3. Résultat : 383.",
      mistakes: ["Oublier une retenue", "Confondre addition et multiplication", "Ne pas lire toute la question", "Répondre sans phrase finale"],
      summary: "Pour réussir, il faut lire l’énoncé, choisir la bonne opération, poser le calcul proprement et vérifier le résultat."
    },
    "Fractions et décimaux": {
      definition: "Une fraction représente une partie d’un tout partagé en parts égales. Le nombre du haut indique les parts prises, le nombre du bas indique le nombre total de parts.",
      example: "Exemple guidé : dans 3/4, le 4 signifie que l’objet est partagé en 4 parts égales. Le 3 signifie que l’on prend 3 parts. On lit : trois quarts.",
      mistakes: ["Croire que le nombre du haut est toujours le plus grand", "Comparer les fractions sans regarder le dénominateur", "Oublier que les parts doivent être égales", "Confondre 1/2 et 2/1"],
      summary: "Une fraction devient plus facile à comprendre avec un dessin, un partage ou une situation concrète."
    },
    "Géométrie et mesures": {
      definition: "La géométrie étudie les formes, les longueurs, les angles et les positions. Les mesures permettent de comparer des grandeurs : longueur, masse, durée ou aire.",
      example: "Exemple guidé : un rectangle possède 4 côtés et 4 angles droits. Ses côtés opposés sont de même longueur. Pour calculer son périmètre, on additionne les longueurs de tous les côtés.",
      mistakes: ["Confondre carré et rectangle", "Oublier l’unité de mesure", "Mesurer sans aligner la règle", "Confondre périmètre et aire"],
      summary: "Pour réussir en géométrie, il faut observer la figure, nommer ses propriétés et utiliser les bonnes unités."
    },
    "Grammaire": {
      definition: "La grammaire aide à comprendre comment une phrase est construite. Le sujet indique qui fait l’action, le verbe indique l’action, le nom désigne une personne, un animal ou une chose, et l’adjectif donne une précision.",
      example: "Exemple guidé : dans ‘Le petit chat dort’, le sujet est ‘Le petit chat’, le verbe est ‘dort’, le nom est ‘chat’ et l’adjectif est ‘petit’.",
      mistakes: ["Confondre le sujet et le verbe", "Oublier l’accord", "Répondre avec un mot sans expliquer", "Ne pas relire la phrase"],
      summary: "Pour analyser une phrase, cherche d’abord le verbe, puis demande-toi qui fait l’action."
    },
    "Lecture compréhension": {
      definition: "La lecture compréhension consiste à lire un texte, trouver les informations importantes, comprendre les personnages, les lieux, les actions et répondre clairement aux questions.",
      example: "Exemple guidé : si un texte dit ‘Lina prend son cartable et part à l’école’, on comprend que Lina est un personnage et que l’action se passe probablement le matin.",
      mistakes: ["Répondre sans relire", "Inventer une réponse", "Ne pas chercher les indices", "Oublier de faire une phrase complète"],
      summary: "Une bonne réponse de lecture s’appuie toujours sur le texte."
    },
    "Se présenter": {
      definition: "Se présenter en anglais permet de dire son nom, son âge, ses goûts et de commencer une conversation simple.",
      example: "Exemple guidé : ‘Hello, my name is Lina. I am ten years old. I like football.’ signifie : Bonjour, je m’appelle Lina. J’ai dix ans. J’aime le football.",
      mistakes: ["Oublier le verbe ‘am’", "Mélanger français et anglais", "Mal placer le prénom", "Ne pas mettre de phrase complète"],
      summary: "Pour te présenter, retiens trois structures : Hello, my name is…, I am…, I like…."
    },
    "Vocabulaire de base": {
      definition: "Le vocabulaire de base permet de reconnaître et utiliser les mots courants : couleurs, nombres, jours, objets de la classe et consignes simples.",
      example: "Exemple guidé : red signifie rouge, blue signifie bleu, Monday signifie lundi et book signifie livre.",
      mistakes: ["Confondre les couleurs", "Oublier la majuscule aux jours", "Traduire mot à mot sans contexte", "Ne pas répéter à voix haute"],
      summary: "Le vocabulaire s’apprend mieux avec des images, des répétitions et des phrases courtes."
    },
    "Les états de l’eau": {
      definition: "L’eau peut exister sous trois états : solide, liquide et gazeux. Le changement d’état dépend surtout de la température.",
      example: "Exemple guidé : un glaçon est solide. Quand il chauffe, il fond et devient liquide. Quand l’eau chauffe beaucoup, elle peut devenir vapeur.",
      mistakes: ["Confondre vapeur et fumée", "Dire que la glace n’est pas de l’eau", "Oublier le rôle de la température", "Confondre fondre et évaporer"],
      summary: "Solide, liquide et gaz sont trois états possibles de la même matière."
    },
    "Le vivant": {
      definition: "Un être vivant naît, grandit, se nourrit, respire souvent, se reproduit et finit par mourir. Les plantes et les animaux sont des êtres vivants.",
      example: "Exemple guidé : une plante est vivante car elle grandit, a besoin d’eau, de lumière et peut produire de nouvelles plantes.",
      mistakes: ["Penser qu’une plante n’est pas vivante", "Confondre objet et être vivant", "Oublier les besoins des êtres vivants", "Ne pas justifier"],
      summary: "Pour reconnaître un être vivant, cherche s’il grandit, se nourrit et a des besoins."
    },
    "Lire une carte": {
      definition: "Une carte représente un espace vu de dessus. Elle utilise un titre, une légende, des couleurs et des symboles pour donner des informations.",
      example: "Exemple guidé : si la légende indique qu’un trait bleu représente une rivière, alors chaque trait bleu de la carte correspond à une rivière.",
      mistakes: ["Ne pas lire le titre", "Ignorer la légende", "Confondre symbole et réalité", "Oublier l’orientation"],
      summary: "Pour lire une carte, commence par le titre, puis observe la légende et les symboles."
    },
    "Se repérer dans le temps": {
      definition: "Se repérer dans le temps, c’est comprendre l’ordre des événements avec des mots comme avant, après, passé, présent, futur et avec des dates.",
      example: "Exemple guidé : sur une frise, un événement placé à gauche arrive généralement avant un événement placé plus à droite.",
      mistakes: ["Confondre passé et futur", "Lire une frise dans le mauvais sens", "Oublier les dates", "Ne pas comparer les événements"],
      summary: "Une frise chronologique aide à placer les événements dans le bon ordre."
    },
    "Arts et musique": {
      definition: "Les arts et la musique permettent de découvrir des œuvres, des instruments, des sons et différentes manières de s’exprimer.",
      example: "Exemple guidé : la guitare est un instrument à cordes car le son est produit par les cordes que l’on pince ou gratte.",
      mistakes: ["Confondre les familles d’instruments", "Ne pas écouter les sons", "Classer sans observer", "Oublier le vocabulaire"],
      summary: "Pour reconnaître un instrument, observe comment le son est produit : corde, souffle ou percussion."
    },
    "Découverte du monde": {
      definition: "La découverte du monde aide à connaître les pays, les monuments, les métiers, les inventions et les grands repères culturels.",
      example: "Exemple guidé : la Tour Eiffel est un monument situé en France. Elle fait partie du patrimoine culturel français.",
      mistakes: ["Confondre pays et ville", "Ne pas situer un monument", "Répondre sans exemple", "Oublier de comparer"],
      summary: "La culture générale sert à mieux comprendre le monde et à faire des liens entre les connaissances."
    },
    "Calcul numérique": {
      definition: "Le calcul numérique regroupe les opérations avec nombres entiers, décimaux, relatifs, fractions et puissances. Il faut respecter les priorités opératoires.",
      example: "Exemple guidé : dans 3 + 2 × 5, on commence par la multiplication : 2 × 5 = 10. Puis on ajoute 3. Résultat : 13.",
      mistakes: ["Calculer de gauche à droite sans priorité", "Oublier les parenthèses", "Mal gérer les nombres négatifs", "Confondre carré et double"],
      summary: "La règle essentielle : parenthèses d’abord, puis multiplications/divisions, puis additions/soustractions."
    },
    "Équations": {
      definition: "Une équation est une égalité avec une inconnue. Résoudre une équation, c’est trouver la valeur de cette inconnue.",
      example: "Exemple guidé : x + 8 = 15. Pour isoler x, on enlève 8 des deux côtés. Donc x = 15 - 8 = 7.",
      mistakes: ["Faire une opération d’un seul côté", "Oublier de vérifier la solution", "Confondre x + 8 et 8x", "Changer le signe au mauvais moment"],
      summary: "Pour résoudre une équation, on garde l’égalité équilibrée en faisant la même opération des deux côtés."
    },
    "Proportionnalité": {
      definition: "Deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.",
      example: "Exemple guidé : si 2 cahiers coûtent 6 €, alors 4 cahiers coûtent deux fois plus : 12 €. Le prix est proportionnel au nombre de cahiers.",
      mistakes: ["Additionner au lieu de multiplier", "Ne pas vérifier le coefficient", "Confondre pourcentage et quantité", "Oublier les unités"],
      summary: "Cherche le coefficient multiplicateur ou passe par l’unité pour résoudre un problème de proportionnalité."
    },
    "Analyse de texte": {
      definition: "Analyser un texte consiste à identifier le narrateur, les personnages, le cadre, les actions importantes et le sens général du passage.",
      example: "Exemple guidé : si le texte dit ‘Je marchais seul dans la forêt’, le narrateur parle à la première personne et participe probablement à l’histoire.",
      mistakes: ["Confondre auteur et narrateur", "Ne pas justifier avec le texte", "Oublier le cadre", "Résumé trop vague"],
      summary: "Une bonne analyse s’appuie sur des indices précis du texte."
    },
    "Expression écrite": {
      definition: "L’expression écrite consiste à organiser ses idées pour produire un texte clair, structuré et adapté au sujet.",
      example: "Exemple guidé : un paragraphe commence par une idée principale, puis on ajoute une explication et un exemple.",
      mistakes: ["Écrire sans plan", "Oublier la ponctuation", "Répéter les mêmes mots", "Ne pas relire"],
      summary: "Un bon texte est organisé, clair, ponctué et relu."
    },
    "Prétérit": {
      definition: "Le prétérit sert à parler d’une action passée et terminée. Les verbes réguliers prennent souvent -ed, mais certains verbes sont irréguliers.",
      example: "Exemple guidé : I play football devient I played football. Mais go devient went, car c’est un verbe irrégulier.",
      mistakes: ["Oublier -ed", "Utiliser le présent au lieu du passé", "Confondre verbes réguliers et irréguliers", "Oublier did dans les questions"],
      summary: "Pour le prétérit, apprends les verbes irréguliers et repère les marqueurs du passé comme yesterday."
    },
    "Compréhension écrite": {
      definition: "La compréhension écrite en anglais consiste à lire un texte, repérer les mots connus, comprendre le contexte et répondre aux questions.",
      example: "Exemple guidé : who signifie qui, where signifie où, when signifie quand et why signifie pourquoi. Ces mots aident à comprendre la question.",
      mistakes: ["Traduire chaque mot séparément", "Ignorer le contexte", "Confondre who et where", "Répondre en français si l’anglais est demandé"],
      summary: "Commence par chercher les mots-clés, puis utilise le contexte pour comprendre le sens global."
    },
    "Cellule et vivant": {
      definition: "La cellule est l’unité de base des êtres vivants. Elle peut contenir une membrane, un cytoplasme et parfois un noyau contenant l’information génétique.",
      example: "Exemple guidé : la membrane délimite la cellule, le cytoplasme remplit l’intérieur et le noyau contient l’information génétique.",
      mistakes: ["Confondre cellule et organe", "Oublier la membrane", "Dire que seuls les animaux ont des cellules", "Ne pas utiliser le vocabulaire scientifique"],
      summary: "Tous les êtres vivants sont constitués de cellules."
    },
    "Démarche scientifique": {
      definition: "La démarche scientifique permet de répondre à une question en observant, en formulant une hypothèse, en expérimentant puis en concluant.",
      example: "Exemple guidé : si une plante jaunit, on peut faire l’hypothèse qu’elle manque de lumière, puis tester cette idée en changeant son exposition.",
      mistakes: ["Confondre hypothèse et conclusion", "Ne pas observer", "Changer plusieurs paramètres à la fois", "Conclure sans résultat"],
      summary: "Une expérience fiable teste une idée à la fois et se termine par une conclusion."
    },
    "Révolution française": {
      definition: "La Révolution française commence en 1789. Elle remet en cause la monarchie absolue et affirme de nouveaux principes comme la liberté, l’égalité et les droits des citoyens.",
      example: "Exemple guidé : la prise de la Bastille le 14 juillet 1789 devient un symbole de la contestation du pouvoir royal.",
      mistakes: ["Oublier la date de 1789", "Confondre monarchie et république", "Ne pas expliquer les causes", "Citer un événement sans conséquence"],
      summary: "La Révolution française transforme profondément la société et la politique en France."
    },
    "Document géographique": {
      definition: "Un document géographique peut être une carte, un graphique, une photographie ou un texte qui aide à comprendre un territoire.",
      example: "Exemple guidé : pour lire une carte, on commence par le titre, puis la légende, les couleurs, les symboles et l’échelle.",
      mistakes: ["Ne pas lire la légende", "Oublier le titre", "Décrire sans analyser", "Confondre carte et graphique"],
      summary: "Un document géographique se lit avec méthode : identifier, décrire, expliquer."
    },
    "Médias et esprit critique": {
      definition: "L’esprit critique consiste à vérifier une information avant de la croire ou de la partager. Il faut regarder la source, la date, l’auteur et comparer plusieurs sources.",
      example: "Exemple guidé : une information publiée sans auteur, sans date et sans source doit être vérifiée avant d’être considérée fiable.",
      mistakes: ["Croire une information sans source", "Partager trop vite", "Ne pas vérifier la date", "Confondre opinion et fait"],
      summary: "Une information fiable peut être vérifiée et comparée avec d’autres sources."
    },
    "Monde actuel": {
      definition: "Comprendre le monde actuel, c’est connaître les institutions, les innovations, les enjeux écologiques et sociaux qui influencent la vie quotidienne.",
      example: "Exemple guidé : le recyclage est une action écologique qui permet de limiter les déchets et de réutiliser certaines matières.",
      mistakes: ["Confondre innovation et invention", "Oublier les enjeux écologiques", "Répondre sans exemple", "Ne pas faire de lien avec l’actualité"],
      summary: "La culture du monde actuel aide à mieux comprendre les débats, les choix collectifs et les changements de société."
    }
  };

  return lessons[title] || {
    definition: "Ce chapitre introduit les notions importantes à connaître, avec une méthode simple et des exercices progressifs.",
    example: "Exemple guidé : lis la consigne, repère les mots importants, applique la méthode, puis vérifie ta réponse.",
    mistakes: ["Répondre trop vite", "Ne pas relire la consigne", "Oublier de justifier", "Ne pas corriger ses erreurs"],
    summary: "L’objectif est de comprendre la notion, s’entraîner progressivement et gagner en autonomie."
  };
}

function normalizeAnswerummary: "Le vocabulaire s’apprend mieux avec des images, des répétitions et des phrases courtes."
    },
    "Les états de l’eau": {
      definition: "L’eau peut exister sous trois états : solide, liquide et gazeux. Le changement d’état dépend surtout de la température.",
      example: "Exemple guidé : un glaçon est solide. Quand il chauffe, il fond et devient liquide. Quand l’eau chauffe beaucoup, elle peut devenir vapeur.",
      mistakes: ["Confondre vapeur et fumée", "Dire que la glace n’est pas de l’eau", "Oublier le rôle de la température", "Confondre fondre et évaporer"],
      summary: "Solide, liquide et gaz sont trois états possibles de la même matière."
    },
    "Le vivant": {
      definition: "Un être vivant naît, grandit, se nourrit, respire souvent, se reproduit et finit par mourir. Les plantes et les animaux sont des êtres vivants.",
      example: "Exemple guidé : une plante est vivante car elle grandit, a besoin d’eau, de lumière et peut produire de nouvelles plantes.",
      mistakes: ["Penser qu’une plante n’est pas vivante", "Confondre objet et être vivant", "Oublier les besoins des êtres vivants", "Ne pas justifier"],
      summary: "Pour reconnaître un être vivant, cherche s’il grandit, se nourrit et a des besoins."
    },
    "Lire une carte": {
      definition: "Une carte représente un espace vu de dessus. Elle utilise un titre, une légende, des couleurs et des symboles pour donner des informations.",
      example: "Exemple guidé : si la légende indique qu’un trait bleu représente une rivière, alors chaque trait bleu de la carte correspond à une rivière.",
      mistakes: ["Ne pas lire le titre", "Ignorer la légende", "Confondre symbole et réalité", "Oublier l’orientation"],
      summary: "Pour lire une carte, commence par le titre, puis observe la légende et les symboles."
    },
    "Se repérer dans le temps": {
      definition: "Se repérer dans le temps, c’est comprendre l’ordre des événements avec des mots comme avant, après, passé, présent, futur et avec des dates.",
      example: "Exemple guidé : sur une frise, un événement placé à gauche arrive généralement avant un événement placé plus à droite.",
      mistakes: ["Confondre passé et futur", "Lire une frise dans le mauvais sens", "Oublier les dates", "Ne pas comparer les événements"],
      summary: "Une frise chronologique aide à placer les événements dans le bon ordre."
    },
    "Arts et musique": {
      definition: "Les arts et la musique permettent de découvrir des œuvres, des instruments, des sons et différentes manières de s’exprimer.",
      example: "Exemple guidé : la guitare est un instrument à cordes car le son est produit par les cordes que l’on pince ou gratte.",
      mistakes: ["Confondre les familles d’instruments", "Ne pas écouter les sons", "Classer sans observer", "Oublier le vocabulaire"],
      summary: "Pour reconnaître un instrument, observe comment le son est produit : corde, souffle ou percussion."
    },
    "Découverte du monde": {
      definition: "La découverte du monde aide à connaître les pays, les monuments, les métiers, les inventions et les grands repères culturels.",
      example: "Exemple guidé : la Tour Eiffel est un monument situé en France. Elle fait partie du patrimoine culturel français.",
      mistakes: ["Confondre pays et ville", "Ne pas situer un monument", "Répondre sans exemple", "Oublier de comparer"],
      summary: "La culture générale sert à mieux comprendre le monde et à faire des liens entre les connaissances."
    },
    "Calcul numérique": {
      definition: "Le calcul numérique regroupe les opérations avec nombres entiers, décimaux, relatifs, fractions et puissances. Il faut respecter les priorités opératoires.",
      example: "Exemple guidé : dans 3 + 2 × 5, on commence par la multiplication : 2 × 5 = 10. Puis on ajoute 3. Résultat : 13.",
      mistakes: ["Calculer de gauche à droite sans priorité", "Oublier les parenthèses", "Mal gérer les nombres négatifs", "Confondre carré et double"],
      summary: "La règle essentielle : parenthèses d’abord, puis multiplications/divisions, puis additions/soustractions."
    },
    "Équations": {
      definition: "Une équation est une égalité avec une inconnue. Résoudre une équation, c’est trouver la valeur de cette inconnue.",
      example: "Exemple guidé : x + 8 = 15. Pour isoler x, on enlève 8 des deux côtés. Donc x = 15 - 8 = 7.",
      mistakes: ["Faire une opération d’un seul côté", "Oublier de vérifier la solution", "Confondre x + 8 et 8x", "Changer le signe au mauvais moment"],
      summary: "Pour résoudre une équation, on garde l’égalité équilibrée en faisant la même opération des deux côtés."
    },
    "Proportionnalité": {
      definition: "Deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.",
      example: "Exemple guidé : si 2 cahiers coûtent 6 €, alors 4 cahiers coûtent deux fois plus : 12 €. Le prix est proportionnel au nombre de cahiers.",
      mistakes: ["Additionner au lieu de multiplier", "Ne pas vérifier le coefficient", "Confondre pourcentage et quantité", "Oublier les unités"],
      summary: "Cherche le coefficient multiplicateur ou passe par l’unité pour résoudre un problème de proportionnalité."
    },
    "Analyse de texte": {
      definition: "Analyser un texte consiste à identifier le narrateur, les personnages, le cadre, les actions importantes et le sens général du passage.",
      example: "Exemple guidé : si le texte dit ‘Je marchais seul dans la forêt’, le narrateur parle à la première personne et participe probablement à l’histoire.",
      mistakes: ["Confondre auteur et narrateur", "Ne pas justifier avec le texte", "Oublier le cadre", "Résumé trop vague"],
      summary: "Une bonne analyse s’appuie sur des indices précis du texte."
    },
    "Expression écrite": {
      definition: "L’expression écrite consiste à organiser ses idées pour produire un texte clair, structuré et adapté au sujet.",
      example: "Exemple guidé : un paragraphe commence par une idée principale, puis on ajoute une explication et un exemple.",
      mistakes: ["Écrire sans plan", "Oublier la ponctuation", "Répéter les mêmes mots", "Ne pas relire"],
      summary: "Un bon texte est organisé, clair, ponctué et relu."
    },
    "Prétérit": {
      definition: "Le prétérit sert à parler d’une action passée et terminée. Les verbes réguliers prennent souvent -ed, mais certains verbes sont irréguliers.",
      example: "Exemple guidé : I play football devient I played football. Mais go devient went, car c’est un verbe irrégulier.",
      mistakes: ["Oublier -ed", "Utiliser le présent au lieu du passé", "Confondre verbes réguliers et irréguliers", "Oublier did dans les questions"],
      summary: "Pour le prétérit, apprends les verbes irréguliers et repère les marqueurs du passé comme yesterday."
    },
    "Compréhension écrite": {
      definition: "La compréhension écrite en anglais consiste à lire un texte, repérer les mots connus, comprendre le contexte et répondre aux questions.",
      example: "Exemple guidé : who signifie qui, where signifie où, when signifie quand et why signifie pourquoi. Ces mots aident à comprendre la question.",
      mistakes: ["Traduire chaque mot séparément", "Ignorer le contexte", "Confondre who et where", "Répondre en français si l’anglais est demandé"],
      summary: "Commence par chercher les mots-clés, puis utilise le contexte pour comprendre le sens global."
    },
    "Cellule et vivant": {
      definition: "La cellule est l’unité de base des êtres vivants. Elle peut contenir une membrane, un cytoplasme et parfois un noyau contenant l’information génétique.",
      example: "Exemple guidé : la membrane délimite la cellule, le cytoplasme remplit l’intérieur et le noyau contient l’information génétique.",
      mistakes: ["Confondre cellule et organe", "Oublier la membrane", "Dire que seuls les animaux ont des cellules", "Ne pas utiliser le vocabulaire scientifique"],
      summary: "Tous les êtres vivants sont constitués de cellules."
    },
    "Démarche scientifique": {
      definition: "La démarche scientifique permet de répondre à une question en observant, en formulant une hypothèse, en expérimentant puis en concluant.",
      example: "Exemple guidé : si une plante jaunit, on peut faire l’hypothèse qu’elle manque de lumière, puis tester cette idée en changeant son exposition.",
      mistakes: ["Confondre hypothèse et conclusion", "Ne pas observer", "Changer plusieurs paramètres à la fois", "Conclure sans résultat"],
      summary: "Une expérience fiable teste une idée à la fois et se termine par une conclusion."
    },
    "Révolution française": {
      definition: "La Révolution française commence en 1789. Elle remet en cause la monarchie absolue et affirme de nouveaux principes comme la liberté, l’égalité et les droits des citoyens.",
      example: "Exemple guidé : la prise de la Bastille le 14 juillet 1789 devient un symbole de la contestation du pouvoir royal.",
      mistakes: ["Oublier la date de 1789", "Confondre monarchie et république", "Ne pas expliquer les causes", "Citer un événement sans conséquence"],
      summary: "La Révolution française transforme profondément la société et la politique en France."
    },
    "Document géographique": {
      definition: "Un document géographique peut être une carte, un graphique, une photographie ou un texte qui aide à comprendre un territoire.",
      example: "Exemple guidé : pour lire une carte, on commence par le titre, puis la légende, les couleurs, les symboles et l’échelle.",
      mistakes: ["Ne pas lire la légende", "Oublier le titre", "Décrire sans analyser", "Confondre carte et graphique"],
      summary: "Un document géographique se lit avec méthode : identifier, décrire, expliquer."
    },
    "Médias et esprit critique": {
      definition: "L’esprit critique consiste à vérifier une information avant de la croire ou de la partager. Il faut regarder la source, la date, l’auteur et comparer plusieurs sources.",
      example: "Exemple guidé : une information publiée sans auteur, sans date et sans source doit être vérifiée avant d’être considérée fiable.",
      mistakes: ["Croire une information sans source", "Partager trop vite", "Ne pas vérifier la date", "Confondre opinion et fait"],
      summary: "Une information fiable peut être vérifiée et comparée avec d’autres sources."
    },
    "Monde actuel": {
      definition: "Comprendre le monde actuel, c’est connaître les institutions, les innovations, les enjeux écologiques et sociaux qui influencent la vie quotidienne.",
      example: "Exemple guidé : le recyclage est une action écologique qui permet de limiter les déchets et de réutiliser certaines matières.",
      mistakes: ["Confondre innovation et invention", "Oublier les enjeux écologiques", "Répondre sans exemple", "Ne pas faire de lien avec l’actualité"],
      summary: "La culture du monde actuel aide à mieux comprendre les débats, les choix collectifs et les changements de société."
    }
  };

  return lessons[title] || {
    definition: "Ce chapitre introduit les notions importantes à connaître, avec une méthode simple et des exercices progressifs.",
    example: "Exemple guidé : lis la consigne, repère les mots importants, applique la méthode, puis vérifie ta réponse.",
    mistakes: ["Répondre trop vite", "Ne pas relire la consigne", "Oublier de justifier", "Ne pas corriger ses erreurs"],
    summary: "L’objectif est de comprendre la notion, s’entraîner progressivement et gagner en autonomie."
  };
}

function normalizeAnswer(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.!?]/g, "");
}

function makeSessionSeed(email = "") {
  const base = `${email}-${Date.now()}-${Math.random()}`;
  let total = 0;
  for (let i = 0; i < base.length; i++) total += base.charCodeAt(i);
  return total;
}

function feedback(score, level) {
  if (score >= 85) return `${level} : excellent niveau. Passe à des exercices plus complexes.`;
  if (score >= 60) return `${level} : niveau solid
