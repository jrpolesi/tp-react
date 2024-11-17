import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, LoadingButton } from "./MuiWrap";

type ConfirmModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

export function ConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
  title,
  description,
}: ConfirmModalProps) {
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirm() {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <DialogTitle id="confirm-modal-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="confirm-modal-description">
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} size={isMobile ? "small" : "medium"}>
          {t("confirmModal.cancel", "Cancel")}
        </Button>
        <LoadingButton
          onClick={handleConfirm}
          loading={isLoading}
          variant="contained"
          autoFocus
          size={isMobile ? "small" : "medium"}
        >
          {t("confirmModal.confirm", "Confirm")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
