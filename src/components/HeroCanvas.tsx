import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------
   ICON CONFIG
--------------------------------------------------------- */
const icons = [
  { src: "https://ik.imagekit.io/qcvroy8xpd/03_X.svg", alt: "X", xPct: 15, yPct: 20, size: 140, depth: 1.5 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/02_Instagram.svg", alt: "Instagram", xPct: 75, yPct: 25, size: 150, depth: 1.1 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/04_LinkedIn.svg", alt: "LinkedIn", xPct: 28, yPct: 55, size: 140, depth: 0.9 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/05_Youtube.svg", alt: "YouTube", xPct: 70, yPct: 65, size: 155, depth: 1.0 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/17_Google.svg", alt: "Google", xPct: 50, yPct: 15, size: 145, depth: 1.3 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/07_Reddit.svg", alt: "Reddit", xPct: 85, yPct: 50, size: 135, depth: 1.2 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/06_WhatsApp.png", alt: "WhatsApp", xPct: 10, yPct: 65, size: 140, depth: 0.95 },
  { src: "https://ik.imagekit.io/qcvroy8xpd/11_TikTok.svg", alt: "TikTok", xPct: 45, yPct: 75, size: 130, depth: 1.1 },
];

/* ---------------------------------------------------------
   HERO CANVAS COMPONENT
--------------------------------------------------------- */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const basePositions = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Compute base positions */
  const computeBase = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    icons.forEach((icon, i) => {
      basePositions.current[i] = {
        x: (icon.xPct / 100) * rect.width,
        y: (icon.yPct / 100) * rect.height,
      };
    });
  };

  useEffect(() => {
    computeBase();
    window.addEventListener("resize", computeBase);
    return () => window.removeEventListener("resize", computeBase);
  }, []);

  /* Track Mouse */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* Smooth animation loop (REPLACES heavy GSAP loops) */
  useEffect(() => {
    let t = 0;

    const animate = () => {
      t += 0.01;

      iconsRef.current.forEach((el, i) => {
        if (!el) return;
        const { x, y } = basePositions.current[i] || { x: 0, y: 0 };
        const icon = icons[i];

        // Floating noise motion
        const floatX = Math.sin(t + i) * 15 * icon.depth;
        const floatY = Math.cos(t + i * 1.3) * 15 * icon.depth;

        // Mouse Repulsion
        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 200;
        let repelX = 0,
          repelY = 0;

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          repelX = (dx / dist) * force * 80;
          repelY = (dy / dist) * force * 80;
        }

        // Parallax
        const parallaxX = (mouse.current.x / window.innerWidth) * 30 * icon.depth;
        const parallaxY = (mouse.current.y / window.innerHeight) * 30 * icon.depth;

        // Final smooth position
        el.style.transform = `
          translate(
            ${x + floatX + repelX + parallaxX}px,
            ${y + floatY + repelY + parallaxY}px
          ) 
          rotate(${(t * 20) % 360}deg)
        `;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">

      {/* CANVAS */}
      <div
        ref={canvasRef}
        className="relative w-full overflow-hidden bg-neutral-950 mb-10"
        style={{
          maxWidth: "1400px",
          height: isMobile ? "420px" : "600px",
          borderRadius: "32px",
        }}
      >
        {icons.map((icon, i) => (
          <div
            key={i}
            ref={(el) => (iconsRef.current[i] = el)}
            className="absolute will-change-transform pointer-events-none"
            style={{
              width: isMobile ? icon.size * 0.65 : icon.size,
              height: isMobile ? icon.size * 0.65 : icon.size,
            }}
          >
            <img
              src={icon.src}
              alt={icon.alt}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* CTA BELOW CANVAS */}
      <button
        onClick={() => setShowVideo(true)}
        className="
          px-10 py-4 rounded-full 
          bg-white/10 border border-white/20 
          text-white font-semibold tracking-wide uppercase
          hover:bg-white/20 transition-all duration-300
        "
      >
        Hear Our Story
      </button>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[9999]">
          <div className="relative w-[90%] max-w-[900px] rounded-2xl overflow-hidden shadow-xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold"
            >
              ✕
            </button>

            <video
              src="https://ik.imagekit.io/yourvideo.mp4"
              controls
              autoPlay
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
