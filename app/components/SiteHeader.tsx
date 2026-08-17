"use client";

import { useState } from "react";
import { sitePath } from "../lib/site-path";

type SiteHeaderProps = {
  home?: boolean;
};

const navigation = [
  ["普通话 → 粤语", "/bridge"],
  ["情景课程", "/course"],
  ["听力实验室", "/audio"],
  ["复习", "/review"],
] as const;

export function SiteHeader({ home = false }: SiteHeaderProps) {
  const [navOpen, setNavOpen] = useState(false);
  const brandHref = home ? "#top" : sitePath("/");
  const closeNav = () => setNavOpen(false);

  return (
    <header className={`site-header${navOpen ? " nav-open" : ""}`}>
      <a className="brand" href={brandHref} aria-label="粤语鲜活学堂首页" onClick={closeNav}>
        <span className="brand-mark">粵</span>
        <span><strong>粤语鲜活学堂</strong><small>{home ? "给已经会读中文的你" : "Vivid Cantonese"}</small></span>
      </a>
      <nav className="main-nav" id="main-nav-links" aria-label="主要导航">
        {navigation.map(([label, path]) => <a href={sitePath(path)} key={path} onClick={closeNav}>{label}</a>)}
      </nav>
      <button className="nav-toggle" type="button" aria-expanded={navOpen} aria-controls="main-nav-links" onClick={() => setNavOpen((open) => !open)}>
        <span>{navOpen ? "收起" : "导航"}</span><i aria-hidden="true">{navOpen ? "×" : "☰"}</i>
      </button>
    </header>
  );
}
