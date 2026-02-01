import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { updateMetaTags } from "@/lib/meta-tags";
import { PasscodeModal } from "@/components/PasscodeModal";
import { WarningModal } from "@/components/WarningModal";

export default function DarkWeb() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [hasConfirmedWarning, setHasConfirmedWarning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  // Check if token is stored in sessionStorage
  useEffect(() => {
    const storedToken = sessionStorage.getItem("darkweb_token");
    if (storedToken) {
      verifyTokenWithServer(storedToken);
    } else {
      setIsVerifying(false);
      setShowPasscodeModal(true);
    }
  }, []);

  // Verify token validity with server
  const verifyTokenWithServer = async (tokenToVerify: string) => {
    try {
      const response = await fetch(
        `/api/darkweb/verify-token?token=${encodeURIComponent(tokenToVerify)}`
      );
      if (response.ok) {
        setToken(tokenToVerify);
        setShowPasscodeModal(false);
        setHasConfirmedWarning(true);
        setIsVerifying(false);
      } else {
        // Token is invalid or expired
        sessionStorage.removeItem("darkweb_token");
        setIsVerifying(false);
        setShowPasscodeModal(true);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      sessionStorage.removeItem("darkweb_token");
      setIsVerifying(false);
      setShowPasscodeModal(true);
    }
  };

  // Token validation check every 30 seconds
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      verifyTokenWithServer(token);
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [token]);

  // Handle successful passcode entry
  const handlePasscodeSuccess = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem("darkweb_token", newToken);
    setShowPasscodeModal(false);
    setShowWarningModal(true);
  };

  // Handle warning modal confirmation
  const handleWarningConfirm = () => {
    setShowWarningModal(false);
    setHasConfirmedWarning(true);
  };

  // Update meta tags on mount
  useEffect(() => {
    updateMetaTags({
      title: "Dark Web - Gateway Links 2K26",
      description:
        "Gateway Links 2K26 Dark Web Resources. Access restricted content with proper authentication.",
      url: "https://gatewaylinks2k26.com/darkweb",
      keywords: "dark web, deep web, darknet, anonymous browsing",
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  // Show loading state while verifying
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--bg-primary))]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--accent))]"></div>
          <p className="mt-4 text-[hsl(var(--text-secondary))]">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  // If user has access and confirmed warning, show content
  if (token && hasConfirmedWarning) {
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
              Dark Web Resources
            </h1>
            <p className="text-base sm:text-lg text-[hsl(var(--text-secondary))]">
              Curated collection of dark web resources and onion sites
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--bg-card))] p-6 sm:p-8">
            <p className="text-[hsl(var(--text-secondary))]">
              Dark Web content will be displayed here. This page requires proper
              authentication to access.
            </p>
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
                      className="hover:text-[hsl(var(--accent))] transition-colors font-medium"
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
                      className="hover:text-[hsl(var(--accent))] transition-colors"
                    >
                      Torrents
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/darkweb"
                      className="hover:text-[hsl(var(--accent))] transition-colors"
                    >
                      Dark Web
                    </Link>
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
                  Dark Web
                </h3>
                <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
                  Access restricted resources with proper authentication and
                  caution.
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

  // Show modals if no valid token/access
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--bg-primary))]">
      <PasscodeModal
        isOpen={showPasscodeModal}
        onClose={() => navigate("/")}
        onSuccess={handlePasscodeSuccess}
      />
      <WarningModal
        isOpen={showWarningModal}
        onConfirm={handleWarningConfirm}
      />
    </div>
  );
}
