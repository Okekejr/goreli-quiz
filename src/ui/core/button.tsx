import { Box, BoxProps, Button, ButtonProps } from "@mui/material";
import { FC } from "react";
import { motion } from "framer-motion";

interface Props extends ButtonProps {
  bgGradient: string;
}

export const MyButton: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      component={motion.div}
      whileHover={{
        y: -1,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const WalletButton: React.FC<Props> = ({
  bgGradient,
  children,
  ...props
}) => {
  return (
    <MyButton>
      <Button
        variant="contained"
        sx={{
          width: "80%",
          height: "80%",
          borderRadius: "12px",
          color: "white",
          background: bgGradient,
        }}
        {...props}
      >
        {children}
      </Button>
    </MyButton>
  );
};
