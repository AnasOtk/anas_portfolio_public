import cvUrl from "../assets/CV Anas Dalal.pdf";
import type {
  ExperienceEntry,
  FaqEntry,
  GardenCat,
  GardenFlower,
  GardenSleepingCat,
  Point,
  Project,
} from "./types";

export const DRAG_THRESHOLD_PX = 5;

// Une section est « vue » quand 15 % d'elle entre dans l'écran
export const REVEAL_VISIBLE_RATIO = 0.15;
export const REVEAL_ROOT_MARGIN = "0px 0px -8% 0px";
export const CANVAS_INITIAL_OFFSET: Point = { x: 24, y: 24 };

export const OWNER_NAME = "Anas Dalal";
export const EMAIL = "anas_dalal@hotmail.com";
export const CV_URL = cvUrl;
export const LINKEDIN_URL = "https://www.linkedin.com/in/anasdalal";


export const HERO_BADGE = "À la recherche d'un poste DevSecOps, AppSec ou SOC";

// Chaque ligne : [mot en gras, mot en léger]
export const HERO_LINES: ReadonlyArray<readonly [string, string]> = [
  ["Je code.", "Je sécurise."],
  ["Je déploie.", "Je surveille."],
];

export const HERO_FACTS = [
  "6 ans d'expérience",
  "Master Bac+5 YNOV",
  "DevSecOps & fullstack",
];

export const PROJECTS_SUBTITLE =
  "Ce que j'ai construit et sécurisé. Faites glisser le canvas dans toutes les directions et cliquez sur une carte pour l'ouvrir.";

export const PROJECTS: Project[] = [
  {
    id: "otterwise",
    title: "Otterwise",
    tag: "Startup Web3",
    summary: "Application blockchain « play-to-earn » sur Solana.",
    details: [
      "Co-fondée avec quatre associés, de l'idée au produit : roadmap, arbitrages techniques, coordination de l'équipe.",
      "Application développée de bout en bout : interface web, API et smart contracts.",
      "Mécanisme sécurisé de distribution du token, avec audit des transactions.",
      "Société fermée après l'effondrement du marché play-to-earn.",
    ],
    stack: ["Rust", "Next.js", "React", "Node.js", "Solana"],
    position: { x: 360, y: 40 },
  },
  {
    id: "pipeline",
    title: "Pipeline CI/CD sécurisé",
    tag: "STIME",
    summary: "GitLab CI avec analyse de qualité et de sécurité du code.",
    details: [
      "Pipeline GitLab CI/CD développé et maintenu pour les applications internes du groupe.",
      "Analyse automatisée de la qualité du code avec SonarQube.",
      "Règles OWASP intégrées aux Quality Gates pour bloquer les vulnérabilités avant la mise en production.",
    ],
    stack: ["GitLab CI", "SonarQube", "OWASP"],
    position: { x: 24, y: 300 },
  },
  {
    id: "vulnerabilites",
    title: "Suivi des vulnérabilités",
    tag: "STIME",
    summary: "Tableau de bord Tenable.io relié à Jira.",
    details: [
      "Tableau de bord de suivi des vulnérabilités sur Tenable.io.",
      "Intégration à Jira pour suivre les remédiations jusqu'à leur clôture.",
    ],
    stack: ["Tenable.io", "Jira"],
    position: { x: 700, y: 330 },
  },
  {
    id: "lab",
    title: "Lab attaque / défense",
    tag: "Projet perso",
    summary: "Environnement d'entraînement côté attaque et côté défense.",
    details: [
      "Laboratoire pour pratiquer la sécurité offensive et la détection.",
    ],
    stack: ["Sécurité offensive", "SOC / SIEM"],
    position: { x: 1040, y: 60 },
  },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: "otterwise",
    role: "Co-fondateur & CEO",
    company: "Otterwise",
    tag: "Startup",
    period: "09/2023 – 10/2026",
    highlights: [
      "Startup Web3 de 5 associés : application blockchain « play-to-earn » sur Solana.",
      "Direction de la société : roadmap produit, priorisation, coordination de l'équipe en méthode agile.",
      "Développement de bout en bout : Next.js / React, Node.js, smart contracts en Rust.",
      "Analyse des risques de sécurité : smart contracts, tokenomics, gouvernance.",
      "Cycle DevSecOps : pipeline CI/CD et contrôles de sécurité automatisés.",
    ],
  },
  {
    id: "stime",
    role: "Analyste conformité applicative & développeur fullstack",
    company: "STIME – Groupe Les Mousquetaires",
    tag: "Alternance",
    period: "09/2020 – 09/2023",
    highlights: [
      "Pipeline GitLab CI/CD avec analyse automatisée de la qualité et de la sécurité du code (SonarQube).",
      "Règles OWASP intégrées aux Quality Gates pour bloquer les vulnérabilités avant la mise en production.",
      "Tableau de bord de suivi des vulnérabilités sur Tenable.io, relié à Jira.",
      "Sécurisation des environnements cloud Azure (Azure AD, Defender).",
      "Accompagnement des équipes DevOps dans l'adoption d'une démarche DevSecOps.",
    ],
  },
  {
    id: "ynov",
    role: "Master Expert informatique et systèmes d'information",
    company: "YNOV Campus",
    tag: "Formation",
    period: "09/2018 – 09/2023",
    highlights: ["Bac+5, parcours cybersécurité, à Nanterre."],
  },
];

export const FAQ_ITEMS: FaqEntry[] = [
  {
    id: "metier",
    question: "Quelle est ma fonction ?",
    answer:
      "Je fais le lien entre développement et sécurité : pipelines CI/CD, analyse de code, gestion des vulnérabilités, et développement fullstack (React, Node.js, TypeScript, Rust). J'ai sécurisé le cycle de développement chez STIME pendant trois ans, puis conçu une application blockchain de bout en bout avec Otterwise.",
  },
  {
    id: "lieu",
    question: "Où suis-je basé ?",
    answer:
      "À Paris, en France. Français langue maternelle, anglais courant (C1), espagnol avancé.",
  },
  {
    id: "equipes",
    question: "Comment je travaille avec les équipes dev et DevOps ?",
    answer:
      "Au quotidien, en méthode Scrum. Chez STIME, j'ai accompagné les équipes DevOps dans l'adoption d'une démarche DevSecOps, avec des Quality Gates OWASP qui bloquent les vulnérabilités avant la mise en production.",
  },
  {
    id: "stack",
    question: "Quelle est ma stack ?",
    answer:
      "DevSecOps : GitLab CI, GitHub Actions, SonarQube, Snyk, Docker. Développement : React, Next.js, TypeScript, Node.js, Rust, Python, C#. Cloud : Azure et AWS. SOC : Splunk, ELK, Wazuh, Microsoft Sentinel.",
  },
  {
    id: "otterwise",
    question: "Que s'est-il passé avec Otterwise ?",
    answer:
      "Une startup Web3 de cinq associés, active de 2023 à 2026. Nous avons fermé la société après l'effondrement du marché play-to-earn. Trois ans de direction de produit, d'architecture et de sécurité.",
  },
  {
    id: "contact",
    question: "Comment me contacter ?",
    answer:
      "Je recherche un poste DevSecOps, sécurité applicative ou SOC. Écrivez-moi ou appelez-moi, et retrouvez mon CV ci-dessous.",
    links: [
      { label: EMAIL, href: `mailto:${EMAIL}` },
      { label: "Mon CV", href: CV_URL },
    ],
  },
];

export const FAQ_INITIALLY_OPEN_IDS = ["metier", "contact"];

export const GARDEN_TITLE_BEFORE = "Bienvenue dans mon";
export const GARDEN_TITLE_HIGHLIGHT = "jardin";
export const GARDEN_TITLE_AFTER = ", portez un chat en restant cliquer dessus !";

export const GARDEN_FLOWERS: GardenFlower[] = [
  { id: 1, kind: "daisy", color: "white", height: 120 },
  { id: 2, kind: "tulip", color: "pink", height: 150 },
  { id: 3, kind: "pompom", color: "blue", height: 135 },
  { id: 4, kind: "clover", color: "yellow", height: 125 },
  { id: 5, kind: "tulip", color: "blue", height: 140 },
  { id: 6, kind: "daisy", color: "yellow", height: 118 },
  { id: 7, kind: "pompom", color: "pink", height: 150 },
  { id: 8, kind: "clover", color: "green", height: 128 },
  { id: 9, kind: "tulip", color: "yellow", height: 145 },
  { id: 10, kind: "daisy", color: "blue", height: 112 },
  { id: 11, kind: "pompom", color: "white", height: 138 },
  { id: 12, kind: "clover", color: "pink", height: 122 },
  { id: 13, kind: "tulip", color: "white", height: 148 },
  { id: 14, kind: "daisy", color: "green", height: 126 },
];

// Taille du dessin des chats (unités du viewBox) et facteur d'agrandissement
export const CAT_SCALE = 1.3;
export const CAT_VIEWBOX_WIDTH = 80;
export const CAT_VIEWBOX_HEIGHT = 50;
export const SLEEPING_CAT_VIEWBOX_HEIGHT = 40;
export const CAT_WIDTH_PX = CAT_VIEWBOX_WIDTH * CAT_SCALE;
export const CAT_TURN_MIN_DELAY_MS = 3000;
export const CAT_TURN_MAX_DELAY_MS = 20000;
export const CAT_POUNCE_MIN_DELAY_MS = 4000;
export const CAT_POUNCE_MAX_DELAY_MS = 12000;
// Chaque bond tire sa hauteur entre un minimum et 3/4 de la hauteur de la
// section. Sa durée croît avec la racine de la hauteur : un bond de référence
// (38 * CAT_SCALE px) dure CAT_POUNCE_DURATION_MS.
export const CAT_POUNCE_MIN_HEIGHT_PX = 20 * CAT_SCALE;
export const CAT_POUNCE_MAX_HEIGHT_RATIO = 3 / 4;
export const CAT_POUNCE_REFERENCE_HEIGHT_PX = 38 * CAT_SCALE;
export const CAT_POUNCE_DURATION_MS = 550;
export const CAT_POUNCE_SPEED_PX_PER_S = 260;
// Point de saisie (la nuque) dans le viewBox du chat, orienté vers la droite.
// À garder synchronisé avec transform-origin de .cat__pose dans Cat.css.
export const CAT_NAPE_X_PX = 52;
export const CAT_NAPE_Y_PX = 12;
export const CAT_CARRY_FOLLOW_RATE = 22;
export const CAT_GRAVITY_PX_PER_S2 = 2200;
export const CAT_MAX_THROW_SPEED_PX_PER_S = 500;
export const CAT_THROW_TURN_MIN_SPEED_PX_PER_S = 60;
export const CAT_AIR_DRAG_PER_S = 2;
export const CAT_LANDING_DURATION_MS = 280;

export const GARDEN_CATS: GardenCat[] = [
  {
    id: 1,
    coat: "orange",
    direction: "right",
    speedPxPerSecond: 38,
    startPositionPercent: 12,
  },
  {
    id: 2,
    coat: "gray",
    direction: "left",
    speedPxPerSecond: 28,
    startPositionPercent: 30,
  },
  {
    id: 3,
    coat: "white-spotted",
    direction: "right",
    speedPxPerSecond: 22,
    startPositionPercent: 62,
  },
  {
    id: 4,
    coat: "black",
    direction: "left",
    speedPxPerSecond: 32,
    startPositionPercent: 85,
  },
];

export const GARDEN_SLEEPING_CAT: GardenSleepingCat = {
  coat: "orange",
  positionPercent: 42,
};

export const FLOWER_VIEWBOX_WIDTH = 60;
export const FLOWER_HEAD_HEIGHT = 44;
