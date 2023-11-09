import { Stack, Typography } from "@mui/material";
import React from "react";
import { WalletSelector } from "./components/wallet-selector";
import { useAccount } from "wagmi";
import { Account } from "./components/account";
import { useMounted } from "@/hooks/useMounted";

export const Navbar = () => {
  const { isConnected } = useAccount();
  const { hasMounted } = useMounted();

  return hasMounted ? (
    <Stack
      justifyContent="space-between"
      direction="row"
      alignContent="center"
      py={4}
    >
      <Typography variant="h4" component="h1">
        Goerli Quiz
      </Typography>
      {isConnected ? <Account /> : <WalletSelector />}
    </Stack>
  ) : null;
};
