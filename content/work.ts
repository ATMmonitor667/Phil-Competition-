import type { WorkEntry } from "@/lib/content";

// Facts come only from the supplied biography. Leave unknown fields undefined
// (period, cover, externalUrl, activities, reflection) — they are hidden, never faked.
export const work: WorkEntry[] = [
  {
    slug: "telos",
    title: "Telos",
    type: "publication",
    category: "Publication / Editorial",
    role: "Oversees the magazine",
    organization: "Princeton University",
    summary:
      "Telos is Princeton’s undergraduate ethics magazine, advised by faculty in the philosophy department. Joel oversees the publication, which gives students a place to think through moral questions carefully and in writing — and to share that thinking with readers beyond the seminar room.",
    framing: "An undergraduate magazine for careful writing about ethics.",
    linkLabel: "Explore Telos",
    context: [
      "Much of the most serious thinking about ethics happens in seminars and papers that few people outside a classroom ever read. A student magazine offers a different venue: shorter, more public, and written for a reader who is curious rather than specialist.",
      "Telos is Princeton’s undergraduate ethics magazine. It is advised by faculty in the philosophy department, which keeps the work anchored in the discipline while leaving room for students to write in their own voices.",
    ],
    contribution: [
      "Joel oversees Telos, guiding the magazine’s editorial work alongside its student contributors and faculty advisers.",
    ],
    sortOrder: 1,
  },
  {
    slug: "princeton-undergraduate-society-of-ethics",
    title: "Princeton Undergraduate Society of Ethics",
    titleLines: ["Princeton Undergraduate", "Society of Ethics"],
    type: "initiative",
    category: "Organization / Leadership",
    role: "Founder and president",
    organization: "Princeton University",
    summary:
      "Joel founded the Princeton Undergraduate Society of Ethics and serves as its president. The society brings students together to discuss ethical questions and public problems — conversations that are easier to begin than to finish, and better for being held in good company.",
    framing: "A student community for discussing ethical questions and public problems.",
    linkLabel: "Explore initiative",
    context: [
      "Undergraduates meet ethical questions everywhere — in economics and politics courses, in the news, in decisions about their own lives — but rarely in a setting designed for sustained, open discussion among peers.",
      "The Princeton Undergraduate Society of Ethics was founded to create that setting: a place where students from any discipline can examine hard questions together, with curiosity and without the pressure to score points.",
    ],
    contribution: [
      "Joel founded the society and serves as its president, shaping its direction and bringing students together around ethical questions and public problems.",
    ],
    sortOrder: 2,
  },
  {
    slug: "ethics-bowl",
    title: "Ethics Bowl",
    type: "education",
    category: "Education / Competition",
    role: "Coach and collegiate contributor",
    summary:
      "Ethics Bowl asks students to reason through real moral cases in front of judges, rewarding careful thinking and respectful engagement over rhetorical victory. Joel coaches high-school students in the format and contributes to collegiate Ethics Bowl work, including hosting events.",
    framing: "Helping students reason through moral cases together.",
    linkLabel: "Read more",
    context: [
      "Ethics Bowl is a competition built around discussion rather than debate. Teams receive a set of cases in advance — dilemmas drawn from public life, technology, medicine and everyday experience — and present their analysis to a panel of judges.",
      "Teams are not assigned opposing sides. They are judged on the clarity and depth of their reasoning, on how well they answer questions, and on how thoughtfully they engage with the other team’s view. Agreement is allowed; carelessness is not.",
    ],
    contribution: [
      "Joel coaches high-school students preparing for Ethics Bowl, helping them work through cases, build arguments and respond to challenges with care.",
      "At the collegiate level, he contributes to Ethics Bowl work, including the hosting of events.",
    ],
    sortOrder: 3,
  },
];
