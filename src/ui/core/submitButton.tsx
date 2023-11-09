import { useContractWrite } from "wagmi";
import { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { surveyQuestions } from "@/util/survey-sample";

interface SurveySubmitButtonProps {
  contractAddress: `0x${string}` | undefined;
  contractAbi: any;
  surveyData: { questions: { text: string; options: { text: string }[] }[] };
  onSubmissionSuccess: () => void;
  userResponses: { [key: string]: string };
}

const SurveySubmitButton: React.FC<SurveySubmitButtonProps> = ({
  contractAddress,
  contractAbi,
  onSubmissionSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  const { write, isSuccess, error } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "submit",
  });

  useEffect(() => {
    if (isSuccess) {
      // Handle success, e.g., show a success message
      onSubmissionSuccess();
    }
  }, [isSuccess, onSubmissionSuccess]);

  useEffect(() => {
    !error ? setOpen(false) : setOpen(true);
  }, [error]);

  const submitSurvey = async () => {
    // Generate a unique identifier for the survey submission
    const surveySubmissionId = generateUniqueIdentifier();

    const questionsTexts = surveyQuestions.questions.map(
      (question) => question.text
    );
    const uniqueCodes = generateUniqueIdentifiers(questionsTexts);

    // Call the contract function with the surveySubmissionId and answers
    write({
      args: [surveySubmissionId, uniqueCodes],
    });
  };

  const handleRestart = () => {
    // Reload the page
    location.reload();
  };

  // Function to generate a random uint256 identifier
  const generateUniqueIdentifier = () => {
    const maxValue = BigInt(
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    ); // 2^256 - 1
    const randomValue = BigInt(
      Math.floor(Number.MAX_SAFE_INTEGER * Math.random())
    );
    const combinedValue = (randomValue % (maxValue - BigInt(1))) + BigInt(1);

    return combinedValue.toString();
  };

  const generateUniqueIdentifiers = (texts: string[]) => {
    const maxValue = BigInt(
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    ); // 2^256 - 1

    const uniqueIdentifiers = texts.map((text) => {
      const randomValue = BigInt(
        Math.floor(Number.MAX_SAFE_INTEGER * Math.random())
      );
      const combinedValue = (randomValue % (maxValue - BigInt(1))) + BigInt(1);

      return BigInt(combinedValue);
    });

    return uniqueIdentifiers;
  };

  return (
    <>
      {!error ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 4, marginBottom: 4 }}
          onClick={submitSurvey}
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 4, marginBottom: 4 }}
          onClick={handleRestart}
        >
          Reset
        </Button>
      )}

      <Snackbar open={open} autoHideDuration={10000} onClose={onClose}>
        <Alert severity="error" sx={{ width: "100%" }} onClose={onClose}>
          {error?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SurveySubmitButton;
