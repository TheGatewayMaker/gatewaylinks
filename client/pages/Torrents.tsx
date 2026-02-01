import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, ArrowLeft, DownloadCloud } from "lucide-react";
import { updateMetaTags } from "@/lib/meta-tags";

const torrentsCategories = [
  {
    icon: DownloadCloud,
    title: "Torrent Sites",
    count: "23 resources",
    links: [
      { name: "ABC Torrent", url: "https://abctorrents.xyz/" },
      { name: "Appnetica", url: "https://appnetica.com/" },
      { name: "EZTV", url: "https://eztvx.to/" },
      { name: "EZTV (Alt)", url: "https://eztvstatus.org/" },
      { name: "BT4gpr", url: "https://bt4gprx.com/" },
      { name: "ByXatab", url: "https://byxatab.com/" },
      { name: "Cloud Torrent", url: "https://cloudtorrents.com/" },
      { name: "DODI Repacks", url: "https://dodi-repacks.site/" },
      { name: "DODI Repacks (Alt)", url: "https://dodi-repacks.download/" },
      { name: "ElTorr", url: "https://eltorr.com/" },
      { name: "FitGirl Repacks", url: "https://fitgirl-repacks.site/" },
      { name: "Free GOG PC Games", url: "https://freegogpcgames.com/" },
      { name: "KaOsKrew", url: "https://kaoskrew.org/" },
      { name: "Lime Torrent", url: "https://www.limetorrents.lol/" },
      { name: "MSearch", url: "https://msearch.vercel.app/" },
      { name: "RuTor", url: "https://rutor.info/" },
      { name: "Tapochek", url: "https://tapochek.net/" },
      { name: "Torrent Games", url: "https://torrent-games.games/" },
      { name: "Torrent Games (Alt)", url: "https://torrent-games.net/" },
      { name: "Torrent Quest", url: "https://torrentquest.com/" },
      { name: "1337x", url: "https://www.1337x.tw/" },
      { name: "1337x Movies", url: "https://1337x.to/movie-library/1/" },
      { name: "YTS", url: "https://yts.lt/" },
    ],
  },
];

export default function Torrents() {
  useEffect(() => {
    // Update meta tags for SEO
    updateMetaTags({
      title: "Torrent Resources - Gateway Links 2K26 | Torrent Sites",
      description:
        "Access organized torrent resources and links for content sharing. Gateway Links 2K26 curates the best torrent platforms and torrent sites.",
      url: "https://gatewaylinks2k26.com/torrents",
      keywords:
        "torrent links, torrent sites, torrent resources, p2p sharing, torrent platforms, download torrents",
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--bg-primary))] backdrop-blur-[20px] bg-opacity-80">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Page Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="heading-lg text-[hsl(var(--text-primary))] mb-3">
            Torrents Resources
          </h1>
          <p className="text-base sm:text-lg text-[hsl(var(--text-secondary))]">
            Curated collection of torrent sites and platforms
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8 sm:space-y-10">
          {torrentsCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <section
                key={category.title}
                className="group rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg-card))] p-6 sm:p-8 transition-all duration-300 hover:border-[hsl(var(--text-secondary))] hover:shadow-[0_4px_12px_var(--shadow-hover)]"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent
                    size={24}
                    className="text-[hsl(var(--text-secondary))] transition-colors duration-300 group-hover:text-[hsl(var(--text-primary))]"
                  />
                  <h2 className="heading-md text-[hsl(var(--text-primary))]">
                    {category.title}
                  </h2>
                </div>
                <p className="text-sm text-[hsl(var(--text-muted))] mb-6 font-medium">
                  {category.count}
                </p>

                {/* Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-[hsl(var(--text-secondary))] transition-all duration-300 hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--bg-secondary))]"
                    >
                      <span className="text-lg leading-none">•</span>
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary))] mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 pb-8 border-b border-[hsl(var(--border))]">
            <div>
              <h3 className="text-sm font-semibold text-[hsl(var(--text-primary))] mb-4">
                Categories
              </h3>
              <ul className="space-y-2 text-sm text-[hsl(var(--text-secondary))]">
                <li>
                  <Link
                    to="/streaming"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    Streaming
                  </Link>
                </li>
                <li>
                  <Link
                    to="/apps"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    Apps & Softwares
                  </Link>
                </li>
                <li>
                  <Link
                    to="/books"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    Books & Novels
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    AI
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[hsl(var(--text-primary))] mb-4">
                More
              </h3>
              <ul className="space-y-2 text-sm text-[hsl(var(--text-secondary))]">
                <li>
                  <Link
                    to="/games"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    Games
                  </Link>
                </li>
                <li>
                  <Link
                    to="/torrents"
                    className="hover:text-[hsl(var(--accent))] transition-colors font-medium"
                  >
                    Torrents
                  </Link>
                </li>
                <li>
                  <span className="text-[hsl(var(--text-muted))] cursor-not-allowed">
                    Dark Web
                  </span>
                </li>
                <li>
                  <span className="text-[hsl(var(--text-muted))] cursor-not-allowed">
                    Breach & Leaks
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[hsl(var(--text-primary))] mb-4">
                Torrents
              </h3>
              <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
                Access organized torrent resources and curated platform links
                for P2P sharing and content distribution.
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-[hsl(var(--text-muted))]">
              © 2026 Gateway Links 2K26. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
