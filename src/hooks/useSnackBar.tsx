import { useState } from "react";
import { Alert, SnackBar } from "../components";

type SnackBarMessage = {
  content: string;
  severity: "success" | "error" | "warning" | "info";
};

export function useSnackBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<SnackBarMessage>({
    content: "",
    severity: "info",
  });

  function close() {
    setMessage({ content: "", severity: "info" });
    setIsOpen(false);
  }

  function open(msg: SnackBarMessage) {
    setMessage(msg);
    setIsOpen(true);
  }

  return {
    isOpen,
    open,
    close,
    snackBar: (
      <SnackBar open={isOpen} autoHideDuration={5000} onClose={close}>
        <Alert onClose={close} severity={message.severity} variant="filled">
          {message.content}
        </Alert>
      </SnackBar>
    ),
  };
}
