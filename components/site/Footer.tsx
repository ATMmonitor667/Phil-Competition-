"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/lib/content";

export function Footer({ nav, email }: { nav: NavItem[]; email: string }) {
  if (usePathname() === "/") return null;

  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <p className="site-footer__name">Joel Ibabao</p>
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
          <p>Set in Crimson Pro.</p>
        </div>
      </div>
    </footer>
  );
}
