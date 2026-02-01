import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasscodeModal } from "@/components/PasscodeModal";
import { WarningModal } from "@/components/WarningModal";

export default function DarkWeb() {
  const navigate = useNavigate();
  const [showPasscodeModal, setShowPasscodeModal] = useState(true);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handlePasscodeSuccess = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem("darkweb_token", newToken);
    setShowPasscodeModal(false);
    setShowWarningModal(true);
  };

  const handleWarningConfirm = () => {
    setShowWarningModal(false);
  };

  if (token) {
    return (
      <div style={{ padding: "20px", background: "#1a1a1a", color: "#fff", minHeight: "100vh" }}>
        <h1>Dark Web Resources</h1>
        <p>You have accessed the Dark Web section.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
