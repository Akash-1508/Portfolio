export const SITE_CONFIG = {
  logoText: "Akash",
  logoImage: "",

  authorName: "Akash Gaurav",
  authorRole: "Full Stack Developer",
  /** Line under the main hero heading */
  heroSubheading: "Full Stack Developer | React Specialist | Scalable UI Architect",
  authorDescription:
    "I build high-performance, scalable web applications with modern UI/UX and clean architecture. Passionate about creating smooth, interactive, and user-focused digital experiences.",

  contactEmail: "akashgaurav140@gmail.com",
  contactPhone: "6280484227",
  contactLocation: "Himachal Pradesh, India",

  contactApiUrl:
    import.meta.env.VITE_CONTACT_API_URL ||
    (import.meta.env.VITE_BACKEND_URL
      ? `${String(import.meta.env.VITE_BACKEND_URL).replace(/\/$/, "")}/api/contact`
      : "/api/contact"),

  socialLinks: {
    github: "https://github.com/Akash-1508",
    linkedin: "https://linkedin.com/in/",
    twitter: "",
  },
};

/** Navbar only — keep short; Education & Certifications stay on the page below Experience. */
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const HERO_TYPING_PHRASES = [
  "scalable web applications.",
  "CRM-grade dashboards.",
  "clean React architecture.",
  "smooth user experiences.",
];

/** Main about copy (paragraphs) */
export const ABOUT_PARAGRAPHS = [
  "I am a Full Stack Developer with hands-on experience in building responsive and scalable web applications using React.js, Node.js, and modern frontend technologies. I specialize in creating modular, reusable UI components and optimizing performance for seamless user experiences.",
  "I have worked on real-world projects like CRM systems where I handled frontend architecture, API integrations, and performance optimization. I enjoy solving complex problems, writing clean code, and continuously learning new technologies.",
  "My goal is to build impactful digital products that are not only functional but also visually engaging and user-friendly.",
];

export const ABOUT_STATS = [
  { k: "Focus", v: "Full stack & React" },
  { k: "Stack", v: "React · Node · MongoDB" },
  { k: "Strength", v: "Modular UI & APIs" },
  { k: "Goal", v: "Impactful products" },
];

export const PROJECTS = [
  {
    title: "CRM System Dashboard",
    description:
      "Developed a scalable CRM system with modular UI components, improving performance and maintainability. Implemented features like student management, course management, attendance tracking, and file handling.",
    image: "/assets/images/focalyt.jpeg",
    tags: ["React.js", "Node.js", "MongoDB", "REST APIs"],
    highlights: [
      "Modular UI architecture",
      "REST API integration",
      "File upload & document management",
      "Performance optimization",
    ],
    links: {
      live: "https://focalyt.com/",
      code: "https://github.com/Akash-1508",
    },
  },
  {
    title: "Innobotics",
    description:
      "Built a responsive web application with modern UI design and smooth user interactions, focusing on clean layout and performance optimization.",
    image: "/assets/images/innobotics.png",
    tags: ["HTML", "Responsive UI", "Performance"],
    highlights: ["Modern UI", "Smooth interactions", "Clean layout"],
    links: {
      live: "https://www.innobotics.in/",
      code: "https://github.com/Akash-1508",
    },
  },
  {
    title: "IT Tech",
    description:
      "Designed and developed user-friendly interfaces with reusable components and responsive layouts using React and Tailwind CSS.",
    image: "https://picsum.photos/seed/it-consulting/800/480",
    tags: ["React", "Tailwind CSS", "Components"],
    highlights: ["Reusable components", "Responsive layouts"],
    links: {
      live: "https://it-tech-three.vercel.app/",
      code: "https://github.com/Akash-1508",
    },
  },
  {
    title: "Dairy Farm System",
    description:
      "Built a mobile app for dairy farm owners to maintain day-to-day expenses and operational records with a simple, structured workflow.",
    image: "https://picsum.photos/seed/dairy-farm/800/480",
    tags: ["React Native", "UI", "Backend integration"],
    highlights: ["Structured UI", "Operations management"],
    links: {
      live: "#projects",
      code: "https://github.com/Akash-1508",
    },
  },
];

export const SKILLS = [
  {
    group: "Frontend",
    items: [
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
      { name: "JavaScript (ES6+)", icon: "javascript" },
      { name: "React.js", icon: "widgets" },
      { name: "Tailwind CSS", icon: "palette" },
      { name: "Material UI", icon: "dashboard" },
      { name: "Bootstrap", icon: "grid_view" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", icon: "dns" },
      { name: "Express.js", icon: "bolt" },
      { name: "REST APIs", icon: "hub" },
    ],
  },
  {
    group: "Database",
    items: [
      { name: "MongoDB", icon: "storage" },
      { name: "MySQL", icon: "table_chart" },
    ],
  },
  {
    group: "Tools & Platforms",
    items: [
      { name: "Git & GitHub", icon: "deployed_code" },
      { name: "Postman", icon: "send" },
      { name: "VS Code", icon: "code" },
    ],
  },
  {
    group: "Testing & Others",
    items: [
      { name: "Cypress (Basics)", icon: "science" },
      { name: "REST API Testing", icon: "experiment" },
      { name: "SDLC", icon: "account_tree" },
      { name: "Responsive Design", icon: "smartphone" },
    ],
  },
];

export const EXPERIENCE = [
  {
    title: "Lead Frontend Developer",
    company: "Focalyt Skill Dev, Zirakpur (Punjab)",
    period: "Nov 2024 – Present",
    description:
      "Led frontend development for a complete CRM system using React.js. Built scalable and reusable UI components while ensuring high performance and clean architecture.",
    achievements: [
      "Developed modular UI components",
      "Integrated REST APIs for dynamic data",
      "Implemented AWS S3 for file handling",
      "Improved application performance and scalability",
      "Collaborated with backend team for seamless integration",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Eracom, Zirakpur (Punjab)",
    period: "Feb 2024 – Oct 2024",
    description:
      "Developed responsive frontend interfaces using modern technologies and collaborated with the design team to deliver user-friendly applications.",
    achievements: [
      "Built responsive UI layouts",
      "Created reusable components",
      "Improved page performance and load speed",
      "Ensured mobile-first design",
    ],
  },
];

export const EDUCATION = [
  {
    title: "B.Sc Computer Science",
    period: "Aug 2019 – Oct 2022",
    institution: "",
  },
  {
    title: "Senior Secondary (12th)",
    period: "2018 – 2019",
    institution: "",
  },
  {
    title: "Secondary (10th)",
    period: "2015 – 2016",
    institution: "",
  },
];

export const CERTIFICATIONS = [
  "Diploma in Full Stack Software Engineering (2022)",
  "Diploma in Computer Application (DCA) (2022)",
  "Graduated Add-On Program (HPKVN) (2022)",
];
