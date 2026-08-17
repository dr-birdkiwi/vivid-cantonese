"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteBasePath, sitePath } from "../lib/site-path";

type SiteHeaderProps = {
  home?: boolean;
};

const navigation = [
  ["普通话 → 粤语", "/bridge"],
  ["情景课程", "/course"],
  ["听力实验室", "/audio"],
  ["复习", "/review"],
  ["香港口语库", "/culture"],
] as const;

export function SiteHeader({ home = false }: SiteHeaderProps) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  const brandHref = home ? "#top" : sitePath("/");
  const closeNav = () => setNavOpen(false);

  return (
    <header className={`site-header${navOpen ? " nav-open" : ""}`}>
      <a className="brand" href={brandHref} aria-label="粤语鲜活学堂首页" onClick={closeNav}>
        <span className="brand-mark">粵</span>
        <span><strong>粤语鲜活学堂</strong><small>给已经会读中文的你</small></span>
      </a>
      <nav className="main-nav" id="main-nav-links" aria-label="主要导航">
        {navigation.map(([label, path]) => {
          const target = sitePath(path);
          const currentPath = siteBasePath && pathname.startsWith(siteBasePath) ? pathname.slice(siteBasePath.length) || "/" : pathname;
          const active = currentPath === path || currentPath.startsWith(`${path}/`) || pathname === target || pathname.endsWith(path) || pathname.includes(`${path}/`);
          return <a className={active ? "active" : undefined} href={target} key={path} onClick={closeNav} aria-current={active ? "page" : undefined}>{label}</a>;
        })}
      </nav>
      <button className="nav-toggle" type="button" aria-expanded={navOpen} aria-controls="main-nav-links" onClick={() => setNavOpen((open) => !open)}>
        <span>{navOpen ? "收起" : "导航"}</span><i aria-hidden="true">{navOpen ? "×" : "☰"}</i>
      </button>
    </header>
  );
}
