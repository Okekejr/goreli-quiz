import { useTokenName } from "@/hooks/tokenInfo";
import { useMounted } from "@/hooks/useMounted";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  startingPage: React.Dispatch<React.SetStateAction<boolean>>;
  questionsPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomePage: FC<Props> = ({ startingPage, questionsPage }) => {
  const { hasMounted } = useMounted();
  const { image } = useTokenName("symbol");
  const { name } = useTokenName("name");

  const handleStart = () => {
    startingPage(false);
    questionsPage(true);
  };

  return hasMounted ? (
    <>
      <Card>
        <>Image: {image}</>
        <CardContent
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            margin: "auto",
            gap: 4,
          }}
        >
          <Typography variant="h5">
            <>{name}</>
          </Typography>
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start Trivia
          </Button>
        </CardContent>
      </Card>
    </>
  ) : (
    ""
  );
};
