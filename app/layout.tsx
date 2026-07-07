import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "Whalefall",
  description:
    "A small band website for Whalefall: music, shows, notes, videos, and photos."
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/listen", label: "Listen" },
  { href: "/lyrics", label: "Lyrics" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/gallery", label: "Gallery" },
  { href: "/merch", label: "Merch" }
];

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const bandName = settings?.bandName || "Whalefall";
  const contactEmail = settings?.contactEmail || "hello@whalefall.example";

  return (
    <html lang="en">
      <body>
        <div className="site-wrapper">
          <header className="site-header">
            <h1>
              <Link href="/">{bandName}</Link>
            </h1>
          </header>
          <nav className="site-nav" aria-label="Main navigation">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {children}

          <footer className="site-footer">
            <ul className="footer-links">
              {settings?.guestbookLink ? (
                <li>
                  <a href={settings.guestbookLink}>Guestbook</a>
                </li>
              ) : (
                <li>
                  <Link href="/#guestbook">Guestbook</Link>
                </li>
              )}
              <li>
                <a href={`mailto:${contactEmail}`}>Contact</a>
              </li>
            </ul>
            <SocialLinks links={settings?.socialLinks} />
            <p style={{ marginTop: 10 }}>
              © {bandName} {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
