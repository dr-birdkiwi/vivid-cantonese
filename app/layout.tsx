import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://vivid-cantonese.cxm170.chatgpt.site";

export const metadata: Metadata = {
  title: "粤语鲜活学堂｜给已经会读中文的你",
  description: "为普通话使用者设计的香港粤语学习站：普通话转换桥、真实生活场景、粤拼和口语练习。",
  metadataBase: new URL(siteUrl),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: "粤语鲜活学堂｜给已经会读中文的你",
    description: "普通话 → 自然粤语：真实场景、粤拼和口语练习。",
    images: [{ url: `${siteUrl}/og.png`, width: 1536, height: 1024, alt: "粤语鲜活学堂" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "粤语鲜活学堂｜给已经会读中文的你",
    description: "普通话 → 自然粤语：真实场景、粤拼和口语练习。",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
