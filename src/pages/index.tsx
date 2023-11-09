import Head from "next/head";
import { Container, Typography } from "@mui/material";
import { Navbar } from "@/ui/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Goerli Quiz</title>
        <meta name="description" content="about web3 stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg">
        <Navbar />
      </Container>
    </>
  );
}
