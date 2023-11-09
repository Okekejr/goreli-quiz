import {
  Box,
  Button,
  CircularProgress,
  Modal,
  ModalProps,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface ModalT extends ModalProps {
  handleClose: () => void;
  open: boolean;
  children: JSX.Element;
  modalHeader: string;
  modalDesc: string;
  loading?: boolean;
}

interface ModalSignMessage extends ModalT {
  isCloseable?: boolean;
}

export const ModalSelectWallet: FC<ModalT> = ({
  handleClose,
  open,
  children,
  modalHeader,
  modalDesc,
  loading,
  ...props
}) => {
  return (
    <Modal open={open} onClose={handleClose} {...props}>
      <Box
        sx={{
          width: 400,
          height: "fit-content",
          margin: "auto",
          color: "black",
          textAlign: "center",
          backgroundColor: "white",
          borderRadius: "15px",
        }}
        pb={8}
      >
        <Typography
          id="modal-modal-title"
          variant="h4"
          fontWeight="bold"
          component="h1"
          pt={4}
        >
          {modalHeader}
        </Typography>
        <Typography id="modal-modal-description" sx={{ py: 2, px: 6 }}>
          {modalDesc}
        </Typography>
        <Box pb={4}>{children}</Box>
        {loading && <CircularProgress />}
      </Box>
    </Modal>
  );
};

export const ModalSignMessage: FC<ModalSignMessage> = ({
  style,
  handleClose,
  open,
  children,
  modalHeader,
  modalDesc,
  isCloseable,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {isCloseable && <Button onClick={handleClose}>x</Button>}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalHeader}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalDesc}
        </Typography>
        <Box pt={2}>{children}</Box>
      </Box>
    </Modal>
  );
};
