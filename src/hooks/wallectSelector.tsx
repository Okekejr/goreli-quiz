import { useState } from "react";

export const useWalletSelector = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  const onClose = () => setOpen(false);

  return { open, setOpen, modal, setModal, handleOpen, handleClose, onClose };
};
