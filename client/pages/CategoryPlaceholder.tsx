import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { updateMetaTags } from "@/lib/meta-tags";

interface CategoryPlaceholderProps {
  title: string;
  isDevelopment?: boolean;
}

export default function CategoryPlaceholder({
  title,
  isDevelopment = false,
}: CategoryPlaceholderProps) {
  useEffect(() => {
    // Update meta tags for SEO based on category
    const categoryDescriptions: { [key: string]: string } = {
      "Apps & Softwares":
        "Find and download essential applications and software tools. Gateway Links 2K26 provides curated links to productivity apps, development software, and utilities.",
      "Books & Novels":
        "Access a vast collection of e-books, novels, and digital reading resources. Discover literature links curated by Gateway Links 2K26.",
      "Artificial Intelligence":
        "Explore cutting-edge AI tools, machine learning resources, and intelligent applications. Gateway Links 2K26 brings the best AI tools in one place.",
      Games:
        "Browse gaming links and resources for all types of games. Gateway Links 2K26 provides comprehensive gaming platform and download site links.",
      Torrents:
        "Access organized torrent resources and links for content sharing. Gateway Links 2K26 curates the best torrent platforms and sites.",
      "Dark Web": "Coming soon to Gateway Links 2K26.",
      "Breach & Leaks": "Coming soon to Gateway Links 2K26.",
    };

    const description =
      categoryDescriptions[title] ||
      `Explore ${title} resources on Gateway Links 2K26`;
    const keywords = `${title.toLowerCase()}, ${title} links, ${title} resources, gateway links 2k26`;

    updateMetaTags({
      title: `${title} - Gateway Links 2K26 | Curated Links`,
      description: description,
      url: `https://gatewaylinks2k26.com/${title.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
      keywords: keywords,
    });
  }, [title]);

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
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="heading-lg text-[hsl(var(--text-primary))]">
              {title}
            </h1>
            {isDevelopment ? (
              <>
                <p className="text-lg sm:text-xl text-[hsl(var(--text-secondary))] max-w-2xl mx-auto">
                  This section is currently under development and undergoing
                  upgrades. Please check back soon for updates!
                </p>
                <div className="inline-block mt-4 px-6 py-3 rounded-lg bg-[hsl(var(--accent))] text-white font-medium">
                  🚀 Coming Soon
                </div>
              </>
            ) : (
              <p className="text-lg sm:text-xl text-[hsl(var(--text-secondary))] max-w-2xl mx-auto">
                This section is currently being populated. Check back soon or
                use the navigation to explore other categories!
              </p>
            )}
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--bg-secondary))] transition-colors duration-200 font-medium"
          >
            <ArrowLeft size={18} />
            Return to Gateway
          </Link>
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
                  <a
                    href="/"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    Streaming
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    Apps & Softwares
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    Books & Novels
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    AI
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[hsl(var(--text-primary))] mb-4">
                More
              </h3>
              <ul className="space-y-2 text-sm text-[hsl(var(--text-secondary))]">
                <li>
                  <a
                    href="/"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    Games
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    Torrents
                  </a>
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
                Gateway Links
              </h3>
              <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
                Your gateway to discover and explore digital resources across
                multiple categories.
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
