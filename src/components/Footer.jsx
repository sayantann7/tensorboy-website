import { FaKaggle, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.kaggle.com/tensorboy", icon: <FaKaggle />, label: "Kaggle" },
  { href: "https://www.linkedin.com/in/tensorboy", icon: <FaLinkedin />, label: "LinkedIn" },
  { href: "https://www.instagram.com/tensorboy", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://github.com/tensorboy", icon: <FaGithub />, label: "GitHub" },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-dark-200 py-8 text-white border-t border-[#ff0c00]/40">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div>
          <span className="font-zentry text-2xl font-bold text-[#ff0c00]">Tensor<span className="text-[#ff0c00] ">Boy</span></span>
          <p className="text-sm text-[#ff0c00]/100 mt-1">©2025. All rights reserved</p>
        </div>

        <div className="flex justify-center gap-6 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff0c00] transition-colors duration-300 ease-in-out hover:text-[#ff0c00] text-xl"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="flex gap-6">
          <a
            href="#privacy"
            className="text-center text-sm text-[#ff0c00]/100 hover:text-[#ff0c00] md:text-right"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            className="text-center text-sm text-[#ff0c00]/100 hover:text-[#ff0c00] md:text-right"
          >
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;