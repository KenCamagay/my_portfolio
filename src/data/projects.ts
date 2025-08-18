export type Project = {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  image?: string;
  repo?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Pharmacy Inventory & Sales (PD LALAS)",
    tag: "Full-stack",
    description:
      "A Laravel-based inventory and sales system with AJAX-powered UI, low-stock alerts, multi-item sales, and responsive dashboard design.",
    tech: ["Laravel", "MySQL", "AJAX", "Bootstrap"],
    image: "/projects/pharmacy.png",
    repo: "https://github.com/KenCamagay/PD_LALAS",
    live: "https://your-live-demo.com" // add if you host it
  },
  {
    title: "MEOWIO (C# Game Project)",
    tag: "Game / C#",
    description:
      "A 2D cat-themed platformer featuring multiple levels, character selection, background music, and power-ups like Super Speed and Super Jump.",
    tech: ["C#, PHP"],
    image: "/projects/meowio.png",
    repo: "https://github.com/hxt-iiixi/MEOWIO-FINAL"
  },
  {
    title: "Ladon Webservice (E-commerce Website)",
    tag: "Full-stack",
    description:
      "A school supplies ordering platform supporting local businesses, with a web app for secure orders and a mobile app for tracking and sales monitoring.",
    tech: ["PHP", "CSS, JS"],
    image: "/projects/ladon.png",
    repo: "https://github.com/Narvaskristian08/ladon-webservice"
  },
  {
    title: "DaguDorms (Booking Website)",
    tag: "Full-stack",
    description:
      "An HCI project website for browsing and booking dormitories in Dagupan, featuring searchable listings, booking flow, maps, and user-centered UI design.",
    tech: [ "CSS", "JavaScript, PHP"],
    image: "/projects/dagudorms.png",
    repo: "https://github.com/devesal/DaguDorms"
  }
];
