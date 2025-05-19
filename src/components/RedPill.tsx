import React, { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { FaGithub, FaYoutube, FaArrowRight, FaAngleDown } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Learning path steps data
const learningSteps = [
  {
    id: 1,
    title: "Fundamentals of LLMs",
    description: "Start with understanding what Large Language Models are and how they work at a conceptual level.",
    videoId: "OxCpWw_pJCQ",
    resources: [
      { name: "Hugging Face Course", icon: <SiHuggingface />, url: "https://huggingface.co/learn/nlp-course/chapter1/1" },
      { name: "GitHub Repository", icon: <FaGithub />, url: "https://github.com/huggingface/transformers" },
      { name: "Extended Tutorial", icon: <FaYoutube />, url: "https://www.youtube.com/watch?v=MQnJZuBGmSQ" }
    ]
  },
  {
    id: 2,
    title: "Build Your First LLM",
    description: "Learn to fine-tune pre-trained models for your specific task with minimal resources.",
    videoId: "jkrNMKz9pWU",
    resources: [
      { name: "Model Code", icon: <FaGithub />, url: "https://github.com/huggingface/peft" },
      { name: "Dataset Access", icon: <SiHuggingface />, url: "https://huggingface.co/datasets" },
      { name: "Advanced Techniques", icon: <FaYoutube />, url: "https://www.youtube.com/watch?v=XGyd5Q4UAOs" }
    ]
  },
  {
    id: 3,
    title: "Prompt Engineering",
    description: "Master the art of crafting effective prompts to get the best results from any language model.",
    videoId: "RBnw8XmTPzI",
    resources: [
      { name: "Prompt Guide", icon: <SiHuggingface />, url: "https://huggingface.co/blog/prompt-engineering" },
      { name: "Examples Repo", icon: <FaGithub />, url: "https://github.com/dair-ai/Prompt-Engineering-Guide" },
      { name: "Advanced Course", icon: <FaYoutube />, url: "https://www.youtube.com/watch?v=_ZvnD8f_r9I" }
    ]
  },
  {
    id: 4,
    title: "Building LLM Applications",
    description: "Apply your knowledge to build real-world applications powered by large language models.",
    videoId: "jrkvirrbmwc",
    resources: [
      { name: "Deployment Guide", icon: <FaGithub />, url: "https://github.com/LAION-AI/Open-Assistant" },
      { name: "API Documentation", icon: <SiHuggingface />, url: "https://huggingface.co/docs/api-inference/index" },
      { name: "LLM DevOps", icon: <FaYoutube />, url: "https://www.youtube.com/watch?v=Yhtjd7yGGGA" }
    ]
  }
];

// Types for component props
interface StepCardProps {
  step: {
    id: number;
    title: string;
    description: string;
    videoId: string;
    resources: Array<{
      name: string;
      icon: JSX.Element;
      url: string;
    }>;
  };
  isActive: boolean;
  onToggle: () => void;
}

interface MatrixBackgroundProps {
  containerRef: React.RefObject<HTMLElement>;
  isAnimating: boolean;
}

// Individual card component with toggle button
const StepCard: React.FC<StepCardProps> = ({ step, isActive, onToggle }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const defaultWidth = `${(step.id / learningSteps.length) * 40}%`;

  // Handle animations with useEffect
  React.useEffect(() => {
    if (!cardRef.current || !contentRef.current || !indicatorRef.current) return;

    gsap.killTweensOf([cardRef.current, contentRef.current, indicatorRef.current]);

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
        duration: isActive ? 0.3 : 0.2,
        overwrite: true
      }
    });

    if (isActive) {
      tl.to(cardRef.current, {
        backgroundColor: "rgba(24, 24, 27, 0.95)",
        borderColor: "#ff0c00",
        boxShadow: "0 0 30px -10px rgba(255, 12, 0, 0.3)",
        scale: 1,
      }, 0)
        .to(indicatorRef.current, {
          width: "100%",
          backgroundColor: "#ff0c00",
        }, "<0.05")
        .to(contentRef.current, {
          height: "auto",
          opacity: 1,
        }, "<0.05");
    } else {
      tl.to(contentRef.current, {
        height: 0,
        opacity: 0,
      }, 0)
        .to(indicatorRef.current, {
          width: defaultWidth,
          backgroundColor: "#333333",
        }, "<0.05")
        .to(cardRef.current, {
          backgroundColor: "rgba(24, 24, 27, 0.5)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
          scale: 0.98,
        }, "<0.05");
    }

    if (videoContainerRef.current) {
      const width = videoContainerRef.current.offsetWidth;
      const aspectRatioHeight = width * (9 / 16);
      videoContainerRef.current.style.height = `${aspectRatioHeight}px`;
    }
  }, [isActive, defaultWidth]);

  return (
    <div
      ref={cardRef}
      id={`step-${step.id}`}
      className="transform-gpu relative mb-8 rounded-lg border border-white/10 bg-dark-200/50 p-4 transition-all"
      style={{ willChange: "transform, background-color" }}
    >
      <div className="mb-2 h-1 w-full rounded-full bg-dark-300">
        <div
          ref={indicatorRef}
          className="h-full rounded-full transition-all"
          style={{ width: defaultWidth, backgroundColor: "#333333" }}
        ></div>
      </div>

      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isActive ? "bg-[#ff0c00] text-black" : "bg-dark-300 text-white"
          } text-sm font-bold`}>
          {step.id}
        </div>
        <h3 className="special-font text-base font-bold text-white">
          {step.title}
        </h3>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-dark-300 hover:bg-dark-400 hover:border-[#ff0c00]/50 transition-all"
        >
          <span className="text-xs text-white">{isActive ? 'Collapse' : 'Expand'}</span>
          <div className={`text-[#ff0c00] transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
            <FaAngleDown />
          </div>
        </button>
      </div>

      <div className="mt-1 pl-11 text-xs text-gray-400">
        {step.description}
      </div>

      <div
        ref={contentRef}
        className="overflow-hidden h-0 opacity-0"
        style={{ willChange: "height, opacity" }}
      >
        <div className="pt-4 space-y-3">
          <div
            ref={videoContainerRef}
            className="aspect-video w-full overflow-hidden rounded-lg bg-dark-300/50"
          >
            {isActive && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${step.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {step.resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-full border border-white/10 bg-dark-300 px-3 py-1 text-xs text-white transition-all hover:border-[#ff0c00]/50 hover:text-[#ff0c00]"
                onClick={(e) => e.stopPropagation()}
              >
                {resource.icon}
                <span>{resource.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Optimized Matrix background
const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ containerRef, isAnimating }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const characters = "01";
  const fontSize = 12;

  React.useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
      canvasRef.current.className = 'absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none';
      if (containerRef.current) {
        containerRef.current.appendChild(canvasRef.current);
      }
    }

    const canvas = canvasRef.current;
    if (!containerRef.current || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(containerRef.current);

    const maxDrops = isAnimating ? 0 : 80;
    const columns = Math.floor((containerRef.current.offsetWidth || 1000) / fontSize);
    const rows = Math.ceil((containerRef.current.offsetHeight || 800) / fontSize);

    const drops = new Array(Math.min(columns, maxDrops)).fill(0).map(() =>
      Math.floor(Math.random() * rows * -2)
    );

    let lastRenderTime = 0;
    const renderThrottle = isAnimating ? 100 : 60;

    const draw = (timestamp: number) => {
      if (timestamp - lastRenderTime < renderThrottle) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      lastRenderTime = timestamp;

      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff0c00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] * fontSize >= 0) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          const x = i * (canvas.width / drops.length);
          ctx.fillText(text, x, drops[i] * fontSize);
        }

        const speed = isAnimating ? 0.3 : 0.5 + Math.random() * 0.5;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        } else {
          drops[i] += speed;
        }
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      resizeObserver.disconnect();
      if (containerRef.current && canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, [containerRef, isAnimating]);

  return null;
};

// Main RedPill component
const RedPill: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle toggling of card expansion
  const handleCardToggle = (stepId: number) => {
    setIsAnimating(true);
    setActiveCardId(prev => prev === stepId ? null : stepId);

    // Brief animation flag to reduce matrix animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Show entrance animations for section
  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.killTweensOf(".redpill-intro-element");
    gsap.fromTo(
      ".redpill-intro-element",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      }
    );
  }, []);

  // Next button handler - cycles through steps
  const goToNextStep = useCallback(() => {
    const nextId = activeCardId === null || activeCardId >= learningSteps.length
      ? 1
      : activeCardId + 1;

    handleCardToggle(nextId);
  }, [activeCardId]);

  return (
    <section
      id="redpill"
      ref={sectionRef}
      className="relative w-screen bg-dark-100 pt-16 pb-32 overflow-hidden"
    >
      <div className="absolute top-1/4 -left-20 h-64 w-64 rounded-full bg-[#ff0c00]/5 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-0 h-72 w-80 rounded-full bg-violet-neon/5 blur-[100px]"></div>

      <MatrixBackground containerRef={sectionRef} isAnimating={isAnimating} />

      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <p className="redpill-intro-element font-general text-sm uppercase text-[#ff0c00]">Begin your journey</p>
          <AnimatedTitle
            title="Ta<b>k</b>e the RED PIL<b>L</b>"
            className="redpill-intro-element special-font !text-4xl md:!text-5xl !font-black !leading-[.9] text-[#ff0c00] mb-5"
          />
          <div className="redpill-intro-element mx-auto max-w-xl">
            <p className="text-lg text-[#ff0c00] mb-3">
              Your path from LLM novice to expert
            </p>
            <p className="text-[#ff0c00] text-sm">
              Follow this curated journey through the world of Large Language Models.
              Click on any step to expand its content.
            </p>
          </div>
        </div>

        <div ref={cardsContainerRef} className="mx-auto max-w-2xl mb-16">
          {learningSteps.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              isActive={activeCardId === step.id}
              onToggle={() => handleCardToggle(step.id)}
            />
          ))}

        </div>
      </div>
    </section>
  );
};

export default RedPill;