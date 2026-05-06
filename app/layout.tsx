import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "Whalefall",
  description: "A small band website for Whalefall: music, shows, notes, videos, and photos."
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/listen", label: "Listen" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/gallery", label: "Gallery" }
];

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const bandName = settings?.bandName || "Whalefall";

  return (
    <html lang="en">
      <body>
        <div className="mx-auto w-full max-w-2xl px-5 py-8 sm:px-6">
          <header className="mb-8">
            <h1 className="mb-3 text-3xl font-normal leading-tight">
              <Link href="/" className="text-ink no-underline hover:text-ink">
                {bandName}
              </Link>
            </h1>
            <nav aria-label="Main navigation">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 p-0 text-sm">
                {navItems.map((item) => (
                  <li key={item.href} className="list-none">
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          {children}
          <footer className="mt-12 border-t border-line pt-5 text-sm">
            <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2">
              {settings?.guestbookLink ? <a href={settings.guestbookLink}>Guestbook</a> : <Link href="/#guestbook">Guestbook</Link>}
              {settings?.contactEmail ? <a href={`mailto:${settings.contactEmail}`}>Contact</a> : <a href="mailto:hello@whalefall.example">Contact</a>}
            </div>
            <SocialLinks links={settings?.socialLinks} />
            <p className="mt-5 text-faded">© {bandName} {new Date().getFullYear()}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
