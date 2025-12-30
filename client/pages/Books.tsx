import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  ArrowLeft,
  BookOpen,
  Download,
  Image,
  Headphones,
  Code,
  Newspaper,
  Music,
  Search,
  Play,
} from "lucide-react";
import { updateMetaTags } from "@/lib/meta-tags";

const booksCategories = [
  {
    icon: BookOpen,
    title: "Browser Reading",
    count: "3 resources",
    links: [
      {
        name: "NovelBuddy",
        url: "https://novelbuddy.com/",
        description: "Read light novels updated daily from Japan, Korea, and China",
      },
      {
        name: "Project Gutenberg",
        url: "https://www.gutenberg.org/",
        description: "Founded in 1971 with Kindle ebooks and digital reading",
      },
      {
        name: "ReadComicOnline",
        url: "https://readcomiconline.li/",
        description: "Free comic books with quick daily updates",
      },
    ],
  },
  {
    icon: Download,
    title: "Shadow Libraries / Books",
    count: "10 resources",
    links: [
      { name: "Anna's Archive", url: "https://annas-archive.li/" },
      { name: "Anna's Archive (Alt)", url: "https://annas-archive.org/" },
      { name: "Anna's Archive (Alt 2)", url: "https://annas-archive.se/" },
      { name: "Liber3", url: "https://liber3.eth.limo/" },
      { name: "Library Genesis", url: "https://librarygenesis.net/" },
      { name: "Library Genesis (Alt)", url: "https://libgen.li/" },
      { name: "PDFDrive", url: "https://pdfdrive.to/" },
      { name: "PDFDrive (Alt)", url: "https://www.pdfdrive.com/" },
      { name: "Z-Library Access Guide", url: "https://www.reddit.com/r/zlibrary/wiki/index/access/" },
    ],
  },
  {
    icon: Code,
    title: "Courses & Learning",
    count: "5 resources",
    links: [
      { name: "Courses Bag", url: "https://coursesbag.com/" },
      { name: "DownloadFreeCourse", url: "https://downloadfreecourse.com/" },
      { name: "FreeCourseSite", url: "https://freecoursesite.com/" },
      { name: "FreeEducationWeb", url: "https://freeeducationweb.com/" },
      { name: "Online Courses", url: "https://online-courses.club/" },
    ],
  },
  {
    icon: Newspaper,
    title: "Magazines & Documents",
    count: "5 resources",
    links: [
      { name: "DownMagaz", url: "https://downmagaz.net/" },
      { name: "Free Magazines", url: "https://freemagazines.top/" },
      { name: "KuPDF", url: "https://kupdf.net/" },
      { name: "PDF Room", url: "https://pdfroom.com/" },
      { name: "PDFMagazines Club", url: "https://pdfmagazines.club/" },
    ],
  },
  {
    icon: BookOpen,
    title: "Ebooks & Reading",
    count: "8 resources",
    links: [
      { name: "ebook-hunter", url: "https://ebook-hunter.org/" },
      { name: "ForCoder", url: "https://forcoder.net/" },
      { name: "ManyBooks", url: "https://manybooks.net/" },
      { name: "OceanofPDF", url: "https://oceanofpdf.com/" },
      { name: "Open Library", url: "https://openlibrary.org/" },
      { name: "Standard Ebooks", url: "https://standardebooks.org/" },
    ],
  },
  {
    icon: Search,
    title: "Academic / Scientific",
    count: "3 resources",
    links: [
      { name: "Sci-Hub", url: "https://sci-hub.se/" },
      { name: "Sci-Hub (Alt)", url: "https://sci-hub.st/" },
      { name: "Sci-Hub (Alt 2)", url: "https://sci-hub.ru/" },
    ],
  },
  {
    icon: Image,
    title: "Comics / Anime",
    count: "3 resources",
    links: [
      { name: "GetComics", url: "https://getcomics.org/" },
      { name: "Kayoanime", url: "https://kayoanime.com/" },
      { name: "NoobSubs", url: "https://www.noobsubs.com/" },
    ],
  },
  {
    icon: Music,
    title: "Music & Scores",
    count: "1 resources",
    links: [
      { name: "Musopen", url: "https://musopen.org/" },
    ],
  },
  {
    icon: Image,
    title: "Manga (Online Reading)",
    count: "17 resources",
    links: [
      { name: "MangaDex", url: "https://mangadex.org/" },
      { name: "18Kami (NSFW)", url: "https://18kami.com/" },
      { name: "BATO", url: "https://bato.to/" },
      { name: "Comix", url: "https://comix.to/" },
      { name: "Kagane", url: "https://kagane.org/" },
      { name: "Manga Fox", url: "https://fanfox.net/" },
      { name: "MangaBuddy", url: "https://mangabuddy.com/" },
      { name: "MangaFire", url: "https://mangafire.to/" },
      { name: "MangaHub", url: "https://mangahub.io/" },
      { name: "MangaKakalot", url: "https://mangakakalot.gg/" },
      { name: "MangaKatana", url: "https://mangakatana.com/" },
      { name: "MangaPark", url: "https://mangapark.io/" },
      { name: "MangaPark (Alt)", url: "https://mangapark.net/" },
      { name: "MangaPill", url: "https://mangapill.com/" },
      { name: "Mangaread", url: "https://www.mangaread.org/" },
      { name: "Toonily", url: "https://toonily.com/" },
      { name: "WeebCentral", url: "https://weebcentral.com/" },
    ],
  },
  {
    icon: Code,
    title: "Manga Downloaders",
    count: "4 resources",
    links: [
      { name: "Comic-DL (GitHub)", url: "https://github.com/Xonshiz/comic-dl/" },
      { name: "Comics Downloader (GitHub)", url: "https://github.com/Girbons/comics-downloader/" },
      { name: "HakuNeko", url: "https://hakuneko.download/" },
      { name: "HakuNeko (GitHub)", url: "https://github.com/manga-download/hakuneko/" },
    ],
  },
  {
    icon: Search,
    title: "Search Engines (Books)",
    count: "2 resources",
    links: [
      { name: "Rave Book Search", url: "https://ravebooksearch.com/" },
      { name: "Recherche Ebook (French UI)", url: "https://recherche-ebook.fr/" },
    ],
  },
  {
    icon: Headphones,
    title: "Audiobooks (Streaming)",
    count: "14 resources",
    links: [
      { name: "AudioAZ", url: "https://audioaz.com/" },
      { name: "AppAudioBooks", url: "https://appaudiobooks.com/" },
      { name: "Audiobooks For Soul", url: "https://audiobooks4soul.com/home/" },
      { name: "Big AudioBooks", url: "https://bigaudiobooks.com/" },
      { name: "Book Audiobooks", url: "https://bookaudiobooks.com/" },
      { name: "Digitalbook", url: "https://www.digitalbook.io/" },
      { name: "Free Classic AudioBooks", url: "https://www.freeclassicaudiobooks.com/" },
      { name: "FullLengthAudiobooks", url: "https://fulllengthaudiobooks.net/" },
      { name: "GalaxyAudiobooks", url: "https://galaxyaudiobook.com/" },
      { name: "GoldenAudiobook", url: "https://goldenaudiobook.com/" },
      { name: "HD Audio Books", url: "https://hdaudiobooks.com/" },
      { name: "Hot Audiobooks", url: "https://hotaudiobooks.com/" },
      { name: "LibriVox", url: "https://librivox.org/" },
      { name: "Storynory", url: "https://www.storynory.com/" },
    ],
  },
];

export default function Books() {
  useEffect(() => {
    // Update meta tags for SEO
    updateMetaTags({
      title:
        "Books & Novels Download - Gateway Links 2K25 | Free Reading Resources",
      description:
        "Access a vast collection of e-books, novels, manga, and audiobooks. Gateway Links 2K25 provides curated links to digital reading resources and book download sites.",
      url: "https://gatewaylinks2k25.com/books",
      keywords:
        "e-books, novels, digital books, manga, audiobooks, reading resources, book downloads, literature links",
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
            Books & Novels
          </h1>
          <p className="text-base sm:text-lg text-[hsl(var(--text-secondary))]">
            Curated collection of reading platforms and download sites
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8 sm:space-y-10">
          {booksCategories.map((category) => {
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1 px-3 py-3 rounded-md text-sm font-medium text-[hsl(var(--text-secondary))] transition-all duration-300 hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--bg-secondary))]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">•</span>
                        <span>{link.name}</span>
                      </div>
                      {link.description && (
                        <span className="text-xs text-[hsl(var(--text-muted))]">
                          {link.description}
                        </span>
                      )}
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
                    className="hover:text-[hsl(var(--accent))] transition-colors font-medium"
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
                    className="hover:text-[hsl(var(--accent))] transition-colors"
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
                Books & Novels
              </h3>
              <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
                Access the most extensive collection of reading resources
                including e-books, novels, manga, and audiobooks.
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-[hsl(var(--text-muted))]">
              © 2025 Gateway Links 2K25. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
