import { PasscodeModal } from "@/components/PasscodeModal";
import { WarningModal } from "@/components/WarningModal";

export default function DarkWeb() {
  const handlePasscodeClose = () => {
    console.log("Passcode modal closed");
  };

  const handlePasscodeSuccess = (token: string) => {
    console.log("Passcode success:", token);
  };

  const handleWarningConfirm = () => {
    console.log("Warning confirmed");
  };

  return (
    <div style={{ padding: "20px", background: "#1a1a1a", color: "#fff", minHeight: "100vh" }}>
      <h1>Dark Web Page</h1>
      <p>This is a test page with modals.</p>
      
      <PasscodeModal
        isOpen={true}
        onClose={handlePasscodeClose}
        onSuccess={handlePasscodeSuccess}
      />
      <WarningModal
        isOpen={false}
        onConfirm={handleWarningConfirm}
      />
    </div>
  );
}
