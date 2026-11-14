"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type NavItem = { href: string; label: string };

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ nav, email }: { nav: NavItem[]; email: string }) {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Hysteresis (shrink past 104px, expand under 48px) so the header never jitters.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setCondensed((prev) => (prev ? y > 48 : y > 104));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <>
      <header className={`site-header${condensed ? " is-condensed" : ""}`}>
        <div className="container site-header__inner">
          <Link href="/" className="wordmark" aria-current={pathname === "/" ? "page" : undefined}>
            Joel Ibabao
          </Link>
          <nav aria-label="Primary">
            <ul className="nav-desktop">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && <MobileMenu nav={nav} email={email} pathname={pathname} onClose={close} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({
  nav,
  email,
  pathname,
  onClose,
}: {
  nav: NavItem[];
  email: string;
  pathname: string;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      className="menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ opacity: 0, y: reduce ? 0 : -8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: [0.55, 0, 1, 0.45] } }}
    >
      <div className="menu-panel__top">
        <Link href="/" className="wordmark" onClick={onClose}>
          Joel Ibabao
        </Link>
        <button ref={closeRef} type="button" className="menu-toggle" style={{ display: "inline-flex" }} onClick={onClose}>
          Close
        </button>
      </div>
      <nav aria-label="Primary">
        <motion.ul
          className="menu-panel__list"
          initial="hidden"
          animate="shown"
          variants={{ shown: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } }}
        >
          {[{ href: "/", label: "Home" }, ...nav].map((item) => (
            <motion.li
              key={item.href}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 10 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <Link
                href={item.href}
                className="menu-panel__link"
                aria-current={(item.href === "/" ? pathname === "/" : isActive(pathname, item.href)) ? "page" : undefined}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
      <div className="menu-panel__foot">
        <p className="eyebrow">Get in touch</p>
        <a href={`mailto:${email}`} className="arrow-link">
          {email}
        </a>
      </div>
    </motion.div>
  );
}
