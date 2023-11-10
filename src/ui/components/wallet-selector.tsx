import { Alert, Button, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useConnect } from "wagmi";
import { MyButton, WalletButton } from "../core/button";
import { ModalSelectWallet } from "../core/modal";
import { handleButtonColor, handleButtonImage } from "@/util/handle-wallet";
import Image from "next/image";
import { useWalletSelector } from "@/hooks/wallectSelector";

export const WalletSelector = () => {
  const { connect, connectors, error, isLoading } = useConnect();
  const { setOpen, handleClose, handleOpen, modal, open, onClose } =
    useWalletSelector();

  useEffect(() => {
    !error ? setOpen(false) : setOpen(true);
  }, [error]);

  return (
    <>
      <MyButton>
        <Button
          variant="contained"
          sx={{ width: "100%", borderRadius: "10px", height: "50px" }}
          onClick={handleOpen}
        >
          Connect Wallet
        </Button>
      </MyButton>

      <ModalSelectWallet
        sx={{
          width: 400,
          height: "fit-content",
          margin: "auto",
        }}
        open={modal}
        loading={isLoading}
        handleClose={handleClose}
        modalHeader={"Select a wallet"}
        modalDesc={
          "By connecting your wallet, you agree to our Terms of Service and our Privacy Policy."
        }
      >
        <Stack spacing={2}>
          {connectors.map((connector) => (
            <WalletButton
              bgGradient={handleButtonColor(connector.name)}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {!connector.ready && ""}
              <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize="lg">{connector.name}</Typography>
                <Image
                  alt={connector.name}
                  src={handleButtonImage(connector.name)}
                  width="20"
                  height="20"
                />
              </Stack>
            </WalletButton>
          ))}
        </Stack>
      </ModalSelectWallet>

      <Snackbar open={open} autoHideDuration={10000} onClose={onClose}>
        <Alert severity="error" sx={{ width: "100%" }} onClose={onClose}>
          {error?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
