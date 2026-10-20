const EMAIL = "mrumairrana1@gmail.com";

const config = {
  title: "Umair Rana | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Umair, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Discover my latest work, including Coding Ducks, The Booking Desk, Ghostchat, and more. Let's build something amazing together!",
    short:
      "Discover the portfolio of Umair, a full-stack developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Umair",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "Coding Ducks",
    "The Booking Desk",
    "Ghostchat",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Framer Motion",
  ],
  author: "Umair Rana",
  email: EMAIL,
  site: "http://localhost:3000",

  // for github stars button
  githubUsername: "mrumairrana",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/nothotchaddi",
    linkedin: "https://www.linkedin.com/in/mrumairrana/",
    instagram: "https://www.instagram.com/mrumairrana/",
    facebook: "https://www.facebook.com/mrumairrana",
    github: "https://github.com/mrumairrana",
    tiktok: "https://tiktok.com/@mrumairrana",
    whatsapp: "https://wa.me/923094093333",

    get email() {
      return `mailto:${EMAIL}`;
    },
  },
};
export { config };
