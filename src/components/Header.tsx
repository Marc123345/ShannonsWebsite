import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

/**
 * FULL LUSION NAV CLONE
 * Exported as Header (named export) — matches App.tsx import.
 */

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { path: "/work", label: "Work" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" }
  ];

  // shrink on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // dot animation
  useEffect(() => {
    if (!buttonRef.current) return;

    const dots = buttonRef.current.querySelectorAll(".header-dot");
    if (!dots.length) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(dots[0], { y: -4, duration: 0.5 }, 0);
    tl.to(dots[1], { y: 4, duration: 0.5 }, 0);

    return () => tl.kill();
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled ? "backdrop-blur-xl scale-[0.96] opacity-95" : "scale-100 opacity-100"}
        `}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-8">
          <div className="
            w-full h-[4.2rem]
            rounded-full overflow-hidden relative flex items-center justify-between px-8
            bg-white/10 backdrop-blur-2xl border border-white/20
          ">
            <Link to="/" className="flex items-center">
              <img
                src="https://ik.imagekit.io/qcvroy8xpd/unnamed%20(1).png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative font-medium text-sm uppercase tracking-widest transition-all
                      ${active ? "text-black" : "text-neutral-700 hover:text-black"}
                    `}
                  >
                    {item.label}
                    <span
                      className={`
                        absolute left-0 -bottom-1 h-[2px] bg-black transition-all
                        ${active ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Menu Button */}
            <button
              ref={buttonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                relative flex items-center gap-3 px-6 py-2 rounded-full
                bg-white/90 border border-black/10 uppercase tracking-widest text-xs font-semibold
                transition-all hover:bg-white
              "
            >
              <span className={`${menuOpen ? "opacity-0" : "opacity-100"} transition-opacity`}>
                Menu
              </span>

              <span className={`${menuOpen ? "opacity-100" : "opacity-0"} absolute transition-opacity`}>
                Close
              </span>

              <div className="flex gap-1 ml-6">
                <span className="header-dot w-1.5 h-1.5 bg-black rounded-full block"></span>
                <span className="header-dot w-1.5 h-1.5 bg-black rounded-full block"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MENU */}
      <div
        className={`
          fixed inset-0 bg-white z-40 transition-all duration-700
          ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
      >
        <div className="h-full flex items-center justify-center">
          <nav className="flex flex-col items-center gap-10">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="text-5xl md:text-6xl font-semibold uppercase tracking-tight text-neutral-900 hover:text-black transition-all"
                style={{ transitionDelay: menuOpen ? `${index * 80}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
