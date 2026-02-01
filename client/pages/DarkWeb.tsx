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
    setShowPasscodeModal(false);
    setShowWarningModal(true);
  };

  const handleWarningConfirm = () => {
    setShowWarningModal(false);
  };

  if (token) {
    return <div style={{ padding: "20px" }}>Dark Web Content</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1a1a1a" }}>
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
