import { FC } from "react";
import { Stack, StackProps } from "@mui/material";

export const PopoverContainerContent: FC<StackProps> = ({
  children,
  ...props
}) => {
  return (
    <Stack
      component="button"
      border="none"
      alignItems="center"
      display="flex"
      justifyContent="space-between"
      direction="row"
      mx="auto"
      my="10px"
      width="15rem"
      borderRadius={16}
      sx={{
        "&:hover": {
          backgroundColor: "gray.50",
          cursor: "pointer",
        },
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};
