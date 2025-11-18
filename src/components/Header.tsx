import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

/**
 * FULL LUSION NAV CLONE
 * Exported as Header (named export) — matches App.tsx import.
 */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/work", label: "Work" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" }
  ];

  // shrink on scroll with throttling
  useEffect(() => {
    let timeoutId: number | null = null;
    const handleScroll = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          setScrolled(window.scrollY > 40);
          timeoutId = null;
        }, 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);


  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled ? "backdrop-blur-xl md:scale-[0.96] opacity-95" : "scale-100 opacity-100"}
        `}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6">
          <div className="
            w-full h-16
            rounded-full overflow-hidden relative flex items-center justify-between px-8
            bg-white/90 backdrop-blur-xl border border-neutral-200 shadow-sm
          ">
            <Link to="/" className="flex items-center">
              <img
                src="https://ik.imagekit.io/qcvroy8xpd/image%201%20(5).png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative font-medium text-sm transition-all
                      ${active ? "text-black" : "text-neutral-600 hover:text-black"}
                    `}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Contact Button */}
            <Link
              to="/contact"
              className="
                hidden lg:block
                px-6 py-2.5 rounded-full
                bg-black text-white text-sm font-medium
                transition-all hover:bg-neutral-800
              "
            >
              Contact
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-28 right-6 left-6 bg-white rounded-3xl shadow-2xl border border-neutral-200 p-6">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      px-4 py-3 rounded-xl text-base font-medium
                      ${active ? "bg-neutral-100 text-black" : "text-neutral-600"}
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="
                  mt-2 px-4 py-3 rounded-xl text-center
                  bg-black text-white text-base font-medium
                "
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
