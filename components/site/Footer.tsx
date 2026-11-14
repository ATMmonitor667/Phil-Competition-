"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

export function Footer({ nav, email, line }: { nav: NavItem[]; email: string; line: string }) {
  const dark = usePathname() === "/";
  const year = new Date().getFullYear();

  return (
    <footer className={`site-footer${dark ? " on-dark" : ""}`}>
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__name">Joel Ibabao</p>
            <p className="site-footer__line">{line}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="site-footer__links">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${email}`} className="nav-link">
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="site-footer__bottom meta">
          <p>© {year} Joel Ibabao</p>
          <p>Set in Newsreader and Inter.</p>
        </div>
      </div>
    </footer>
  );
}
