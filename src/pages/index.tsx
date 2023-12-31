import Head from "next/head";
import { Alert, Box, Container, Snackbar } from "@mui/material";
import { Navbar } from "@/ui/navbar";
import { HomePage } from "@/ui/homepage";
import { useAccount, useNetwork } from "wagmi";
import { useMemo, useState } from "react";
import { TriviaQuestions } from "@/ui/components/_pages/questionsPage";

export default function Home() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const isNetworkSupported = useMemo(() => {
    return !chain?.unsupported;
  }, [!chain?.unsupported]);

  const [showStartingPage, setShowStartingPage] = useState(true);
  const [showQuestionsPage, setShowQuestionsPage] = useState(false);

  return (
    <>
      <Head>
        <title>Goerli Quiz</title>
        <meta name="description" content="about web3 stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg">
        <Navbar />
        <Box mt={8}>
          {showStartingPage && (
            <>
              {isConnected && isNetworkSupported ? (
                <HomePage
                  startingPage={setShowStartingPage}
                  questionsPage={setShowQuestionsPage}
                />
              ) : (
                ""
              )}
            </>
          )}

          {showQuestionsPage && <TriviaQuestions />}
        </Box>

        {isConnected && (
          <Snackbar open={chain?.id !== 5}>
            <Alert severity="error" sx={{ width: "100%" }}>
              Wrong network!!! Pls change network automaatically by clicking on
              profile, and clicking the wrong network button.
            </Alert>
          </Snackbar>
        )}
      </Container>
    </>
  );
}
