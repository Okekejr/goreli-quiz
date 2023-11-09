import { FC, useMemo, useState } from "react";
import {
  useAccount,
  useDisconnect,
  useBalance,
  useNetwork,
  useEnsAvatar,
  useEnsName,
  useSwitchNetwork,
} from "wagmi";
import { truncateAddress } from "@/util/address";
import { BsChevronRight } from "react-icons/bs";
import { AiOutlinePoweroff } from "react-icons/ai";
import { PopoverContainerContent } from "../layout/popover-container-content";
import {
  Avatar,
  Box,
  Button,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { QUIZ_TOKEN_ADDRESS } from "@/config/contract";

export const Account: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address: address,
  });

  const { data } = useBalance({ address: address, token: QUIZ_TOKEN_ADDRESS });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const trimAddress = truncateAddress(4, address);

  const isNetworkSupported = useMemo(() => {
    return !chain?.unsupported;
  }, [!chain?.unsupported]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        onClick={handlePopoverOpen}
        aria-describedby={id}
        style={{
          borderRadius: "50px",
          border: "2px solid #ccc",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
        sx={{
          "&:hover": {
            borderColor: "black",
            transition: "1s",
          },
        }}
      >
        {ensAvatar ? (
          <Avatar
            src={ensAvatar}
            alt="avatar"
            sx={{
              width: "2rem",
              height: "2rem",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              cursor: "pointer",
            }}
          />
        ) : (
          <Avatar
            sx={{
              background: "linear-gradient(to left, #7928CA, #FF0080)",
              width: "2rem",
              height: "2rem",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              cursor: "pointer",
            }}
          />
        )}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ px: "20px" }}
      >
        {/* Wallet balance */}
        <Box
          sx={{
            border: "0.5px solid #E2E8F0",
            borderRadius: "10px",
            p: "0.5rem",
            mt: "1rem",
            mx: "10px",
            width: "16rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Typography variant="caption" color="#718096" fontWeight="medium">
              Wallet Balance
            </Typography>
            <Tooltip
              title={isNetworkSupported ? "" : "Change your network"}
              placement="top"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  background: "#EDF2F7",
                  p: "0.2rem 0.5rem",
                  borderRadius: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    background: "#E2E8F0",
                  },
                }}
              >
                <>
                  <Typography
                    variant="body2"
                    component="button"
                    border="none"
                    width={isNetworkSupported ? "5rem" : "7rem"}
                    disabled={!switchNetwork || chain?.id === 5}
                    sx={{
                      "&:hover": {
                        background: "#E2E8F0",
                        cursor: isNetworkSupported ? "default" : "pointer",
                      },
                      background: "#EDF2F7",
                    }}
                    onClick={() => switchNetwork?.(5)}
                  >
                    {isNetworkSupported ? trimAddress : "Wrong Network"}
                  </Typography>
                  <Box
                    sx={{
                      background: isNetworkSupported ? "#48BB78" : "#F56565",
                      width: "1rem",
                      height: "1rem",
                      borderRadius: "50%",
                    }}
                  />
                </>
              </Box>
            </Tooltip>
          </Box>
          <Typography variant="body1" fontWeight="bold">
            {parseFloat(data?.formatted || "0").toFixed(4)} ETH
          </Typography>
        </Box>

        {/* Disconnect button */}
        <PopoverContainerContent onClick={() => disconnect()}>
          <Box>
            <AiOutlinePoweroff size={14} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "13rem",
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Disconnect
            </Typography>
            <Box
              sx={{
                color: "gray",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              <BsChevronRight size={14} />
            </Box>
          </Box>
        </PopoverContainerContent>
      </Popover>
    </>
  );
};
