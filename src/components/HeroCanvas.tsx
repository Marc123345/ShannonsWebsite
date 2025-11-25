import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FloatingIcon {
  src: string;
  alt: string;
  xPct: number; // initial left %
  yPct: number; // initial top %
  size: number;
  depth: number; // parallax strength
  rotation: number;
  zIndex: number;
}

const icons: FloatingIcon[] = [
  {
    src: "https://ik.imagekit.io/qcvroy8xpd/03_X.svg",
    alt: "X",
    xPct: 22,
    yPct: 25,
    size: 150,
    depth: 1.5,
    rotation: -12,
    zIndex: 3,
  },
  {
    src: "https://ik.imagekit.io/qcvroy8xpd/02_Instagram.svg",
    alt: "Instagram",
    xPct: 68,
    yPct: 30,
    size: 160,
    depth: 1.1,
    rotation: 18,
    zIndex: 5,
  },
  {
    src: "https://ik.imagekit.io/qcvroy8xpd/04_LinkedIn.svg",
    alt: "LinkedIn",
    xPct: 33,
    yPct: 64,
    size: 150,
    depth: 0.9,
    rotation: 8,
    zIndex: 4,
  },
  {
    src: "https://ik.imagekit.io/qcvroy8xpd/05_Youtube.svg",
    alt: "YouTube",
    xPct: 72,
    yPct: 70,
    size: 165,
    depth: 1.0,
    rotation: -6,
    zIndex: 2,
  },
];

export function HeroCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const basePositions = useRef<{ x: number; y: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  // calculate base positions
  const computeBasePositions = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    icons.forEach((icon, i) => {
      const x = (icon.xPct / 100) * rect.width;
      const y = (icon.yPct / 100) * rect.height;
      basePositions.current[i] = { x, y };
    });
  };

  // init positions after render
  useEffect(() => {
    setTimeout(() => {
      computeBasePositions();

      iconsRef.current.forEach((el, i) => {
        if (!el) return;
        const base = basePositions.current[i];
        const icon = icons[i];

        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          x: base.x,
          y: base.y,
          rotation: icon.rotation,
        });

        // idle float
        gsap.to(el, {
          y: base.y + (Math.random() > 0.5 ? 20 : -20),
          duration: 4 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          modifiers: {
            y: gsap.utils.unitize((v) =>
              parseFloat(v)
            ), // ensure px stays px
          },
        });

        // rotation
        gsap.to(el, {
          rotation: `+=${Math.random() > 0.5 ? 360 : -360}`,
          duration: 22 + Math.random() * 10,
          ease: "none",
          repeat: -1,
        });
      });
    }, 50);
  }, []);

  // mouse interaction (repulsion + parallax)
  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const repelDistance = 200;
      const repelPower = 140;

      iconsRef.current.forEach((el, i) => {
        if (!el) return;

        const base = basePositions.current[i];
        const icon = icons[i];

        const dx = base.x - mx;
        const dy = base.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // mouse is exactly on top of icon (avoid divide by zero)
        if (dist === 0) return;

        let targetX = base.x;
        let targetY = base.y;

        // REPULSION FORCE
        if (dist < repelDistance) {
          const force = (repelDistance - dist) / repelDistance;
          const angleX = dx / dist;
          const angleY = dy / dist;

          targetX += angleX * repelPower * force;
          targetY += angleY * repelPower * force;
        }

        // PARALLAX
        const parallaxX = ((mx - rect.width / 2) / rect.width) * 50 * icon.depth;
        const parallaxY = ((my - rect.height / 2) / rect.height) * 50 * icon.depth;

        gsap.to(el, {
          x: targetX + parallaxX,
          y: targetY + parallaxY,
          duration: 0.35,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isMobile]);

  // recalc on resize
  useEffect(() => {
    const onResize = () => {
      computeBasePositions();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      ref={canvasRef}
      className="relative w-full overflow-hidden bg-neutral-950"
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
          className="absolute"
          style={{
            width: isMobile ? icon.size * 0.65 : icon.size,
            height: isMobile ? icon.size * 0.65 : icon.size,
            zIndex: icon.zIndex,
            willChange: "transform",
          }}
        >
          <img
            src={icon.src}
            alt={icon.alt}
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
