import { Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  userResponses: { [key: string]: string };
}

export const OverviewSection: FC<Props> = ({ userResponses }) => {
  return (
    <>
      <Typography variant="h4">Overview</Typography>
      {Object.entries(userResponses).length === 0
        ? "you didnt select an option"
        : Object.entries(userResponses).map(([question, answer], index) => (
            <div key={index}>
              <Typography variant="h6">{question}</Typography>
              <Typography>{`Selected Answer: ${answer}`}</Typography>
            </div>
          ))}
    </>
  );
};
