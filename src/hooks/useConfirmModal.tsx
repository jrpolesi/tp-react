import { useState } from "react";
import { ConfirmModal } from "../components";

type ModalSettings = {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  onCancel?: () => void;
};

export function useConfirmModal(settings: ModalSettings) {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    confirmModal: (
      <ConfirmModal
        isOpen={isOpen}
        onCancel={settings.onCancel ?? (() => setIsOpen(false))}
        onConfirm={settings.onConfirm}
        title={settings.title}
        description={settings.description}
      />
    ),
  };
}
