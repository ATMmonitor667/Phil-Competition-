// All copy here is draft for Joel's approval (blueprint §13 release gate).
export const site = {
  name: "Joel Ibabao",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Joel Ibabao — Ethics, Writing & Public Life",
  description: "Writing and initiatives concerning ethics, philosophy and public life.",
  // Placeholder until Joel confirms his preferred public address.
  email: "joel@example.com",
  footerLine: "Writing and initiatives on ethics, philosophy and public life.",

  hero: {
    eyebrow: "Ethics / Philosophy / Public life",
    lines: ["Questions worth asking.", "Ideas worth exploring."],
    intro:
      "Joel Ibabao is a Princeton undergraduate studying political science and economics, with interests in applied ethics and moral philosophy.",
    cta: "Explore selected work",
  },

  statement: {
    lines: ["Some of the most important questions", "cannot be settled by facts alone."],
    support:
      "That conviction runs through Joel’s work — in print, in conversation, and alongside students learning to reason through hard cases together.",
  },

  selectedWork: {
    label: "01 / Selected work",
    heading: "Writing, dialogue and institutions.",
  },

  aboutTeaser: {
    heading: "A little about Joel",
    paragraphs: [
      "Joel is a Princeton undergraduate studying political science and economics. He is interested in applied ethics and moral philosophy, and in how careful moral reasoning can find its way into public life.",
      "Outside the classroom he works with students through Ethics Bowl and college admissions guidance.",
    ],
  },

  invitation: {
    label: "Conversation / Contact",
    lines: ["Let’s continue", "the conversation."],
    text: "For inquiries about writing, ethics, events, or educational opportunities.",
  },

  about: {
    intro:
      "Joel Ibabao is an undergraduate at Princeton University, where he studies political science and economics.",
    sections: [
      {
        heading: "Interests",
        paragraphs: [
          "His interests lie in applied ethics and moral philosophy — in the questions that remain open after the facts are in, and in how careful moral reasoning can be brought into public life.",
        ],
      },
      {
        heading: "Work and leadership",
        paragraphs: [
          "At Princeton, Joel founded the Princeton Undergraduate Society of Ethics, which brings students together to discuss ethical questions and public problems, and he serves as its president.",
          "He also oversees Telos, Princeton’s undergraduate ethics magazine, which is advised by faculty in philosophy.",
        ],
      },
      {
        heading: "Teaching and mentoring",
        paragraphs: [
          "Joel coaches high-school students in Ethics Bowl and contributes to collegiate Ethics Bowl work, including hosting events. He also offers guidance to students navigating college admissions.",
        ],
      },
    ],
    experiences: [
      { name: "Princeton Undergraduate Society of Ethics", role: "Founder and president" },
      { name: "Telos", role: "Oversees Princeton’s undergraduate ethics magazine" },
      { name: "Ethics Bowl", role: "High-school coach; collegiate Ethics Bowl work and event hosting" },
      { name: "College admissions", role: "Guidance for prospective students" },
    ],
  },

  contact: {
    intro: "For inquiries about writing, ethics, events, or educational opportunities.",
    privacy:
      "Email goes directly to Joel. This site does not collect, store or track anything you send.",
  },
};
