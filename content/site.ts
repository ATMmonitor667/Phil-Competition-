export const site = {
  name: "Joel Ibabao",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Joel Ibabao — Ethics, Writing & Tutoring",
  description:
    "Joel Ibabao is a Princeton University undergraduate studying political science and economics, with interests in applied ethics and moral philosophy.",
  email: "ji7445@princeton.edu",

  hero: {
    eyebrow: "Ethics / Philosophy / Public life",
    lines: ["Questions worth asking.", "Ideas worth exploring."],
    intro:
      "Joel Ibabao is a Princeton University undergraduate studying political science and economics, with interests in applied ethics and moral philosophy.",
    cta: "Explore selected work",
  },

  about: [
    "Joel Ibabao is a Princeton University undergraduate studying political science and economics, with interests in applied ethics and moral philosophy. He coaches high school students for Ethics Bowl competitions and offers college admissions essay editing.",
    "At Townsend Harris High School, Joel founded and captained the Ethics Bowl team. In 2021, he and his teammates won the school’s first NYC Regional Ethics Bowl championship and qualified for the national competition. The following year, they advanced to the regional playoff finals and finished second. He scored 1590 on the SAT and earned admission to all eight Ivy League schools.",
    "Joel chose to attend Princeton, where he founded the Princeton Undergraduate Society of Ethics, which he now serves as president of. The Society encompasses Princeton’s collegiate Ethics Bowl and Ethics Olympiad teams, its ethics magazine, Telos, and the New Jersey Regional High School Ethics Bowl.",
    "As captain of Princeton’s collegiate Ethics Bowl and Ethics Olympiad teams, he organized weekly practices and arranged scrimmages with Harvard and Yale. In October 2025, he captained Princeton’s team to a fifth-place finish in the international AAPAE Tertiary Ethics Olympiad. In November 2026, he and his Princeton teammates placed second out of 18 teams in the Intercollegiate Ethics Bowl online regional championship, qualifying for the Intercollegiate Ethics Bowl National Championship. The team will compete in Pittsburgh, Pennsylvania, on March 6 and 7, 2027, at the Wyndham Grand Pittsburgh Downtown.",
    "As editor in chief of Telos, he oversees its editorial direction, creative work, and publication. The magazine’s faculty advisers include Peter Singer, Lara Buchak, Sarah McGrath, and Gideon Rosen.",
    "Joel organized the inaugural New Jersey Regional High School Ethics Bowl at Princeton in January 2026. The competition brought together more than 150 students from over 20 schools across New Jersey and New York City. As the organizer, Joel secured funding from Princeton’s Department of Philosophy and the Marc Sanders Foundation, coordinated outreach to participating schools, recruited judges, and oversaw tournament preparations.",
  ],

  contact: {
    intro: "For inquiries about writing, essay editing, or tutoring.",
    privacy: "Email goes directly to Joel. This site does not collect, store or track anything you send.",
  },
};

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  /** Paragraphs. `[About page](/about)`-style links are supported. */
  body: string[];
  invitation: string;
  cta: string;
  emailSubject: string;
  emailBody: string;
};

export const services: Service[] = [
  {
    slug: "college-essay-editing",
    title: "College Essay Editing",
    eyebrow: "Personal statements / Supplements",
    description:
      "Personal statement and supplemental essay editing from Joel Ibabao, who scored 1590 on the SAT and was admitted to all eight Ivy League schools.",
    body: [
      "I scored 1590 on the SAT and was admitted to all eight Ivy League schools. I help students write personal statements and supplemental essays. If you’re starting from scratch, we’ll talk through a few possible stories and see which one gives you the most to say. If you have a draft, I’ll point out where I wanted more detail, where I got lost, and which details stayed with me. We can work on the essay's shape or get down to individual sentences. The goal is a clearer, more specific essay that still sounds like you.",
    ],
    invitation:
      "Tell me what you’re working on and when it’s due. I’ll reply with my availability, rates, and how we might work together.",
    cta: "Ask about essay editing",
    emailSubject: "College essay editing inquiry",
    emailBody: "Hi Joel,\n\nWhat I’m working on:\n\nWhen it’s due:\n\n",
  },
  {
    slug: "ethics-bowl-tutoring",
    title: "Ethics Bowl Tutoring",
    eyebrow: "Middle school / High school",
    description:
      "Ethics Bowl coaching for middle and high school students from Joel Ibabao, an Ethics Bowl regional champion and organizer.",
    body: [
      "I coach middle school and high school students preparing for Ethics Bowl. We’ll read cases together, work out what’s at stake, and build an argument you’d actually stand behind. I’ll ask the kinds of questions judges and other teams might pose, so you can practice thinking through objections out loud. We can spend a session on a difficult case or run a mock round and talk through where your reasoning could be clearer. You can read more about my Ethics Bowl experience on my [About page](/about), where I'm listed as both a regional qualifier and organizer.",
    ],
    invitation:
      "Tell me what you’re preparing for and what you’d like to work on. I’ll reply with my availability, rates, and what a session could cover.",
    cta: "Ask about tutoring",
    emailSubject: "Ethics Bowl tutoring inquiry",
    emailBody: "Hi Joel,\n\nWhat I’m preparing for:\n\nWhat I’d like to work on:\n\n",
  },
  {
    slug: "math-tutoring",
    title: "Math Tutoring",
    eyebrow: "Algebra / Geometry / Precalculus / Calculus",
    description:
      "Individualized online math tutoring for middle and high school students in Algebra I, Geometry, Algebra II, Precalculus, and AP Calculus AB/BC.",
    body: [
      "I offer individualized online tutoring for middle and high school students in Algebra I, Geometry, Algebra II, Precalculus, and AP Calculus AB/BC, focusing on building first principles understanding, confidence, and achieving higher grades and stronger test scores.",
      "I earned an 800 on SAT Math, a 5 on AP Calculus BC, a perfect score on the Algebra I Regents, and a 99 on the Geometry Regents. I also received a Certificate of Excellence in Mathematics at Townsend Harris High School.",
    ],
    invitation:
      "Tell me what you’re preparing for and what you’d like to work on. I’ll reply with my availability, rates, and what a session could cover.",
    cta: "Ask about tutoring",
    emailSubject: "Math tutoring inquiry",
    emailBody: "Hi Joel,\n\nCourse or test:\n\nWhat I’d like to work on:\n\n",
  },
];

export function getService(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
}

export function mailto(subject: string, body = "") {
  const q = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${site.email}?${q}`;
}
