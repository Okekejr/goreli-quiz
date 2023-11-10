import { surveyQuestions } from "@/util/survey-sample";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FC, useEffect } from "react";
import { OverviewSection } from "../overview";
import SurveySubmitButton from "@/ui/core/submitButton";
import { QUIZ_TOKEN_ABI, QUIZ_TOKEN_ADDRESS } from "@/config/contract";
import { useTriviaQuestions } from "@/hooks/triviaQuestion";

interface myLoaderProps {
  src: string;
}

export const TriviaQuestions: FC = () => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setShowOverviewButton,
    setUserResponses,
    userResponses,
    setSuccessMessage,
    showOverviewButton,
    successMessage,
  } = useTriviaQuestions();

  const questions = surveyQuestions.questions;
  const currentQuestion = questions[currentQuestionIndex];

  // function to set the 'src' to be used in the nextjs Image component
  const myLoader = ({ src }: myLoaderProps) => {
    return `${src}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      moveToNextQuestion();
    }, currentQuestion.lifetimeSeconds * 1000);

    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // All questions answered, show overview button
      setShowOverviewButton(true);
    }
  };

  const handleAnswerSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAnswer = event.target.value;

    setUserResponses((prevResponses) => {
      return {
        ...prevResponses,
        [currentQuestion.text]: selectedAnswer,
      };
    });

    // Move to the next question
    moveToNextQuestion();
  };

  const handleRestart = () => {
    // Reload the page
    location.reload();
  };

  const showOverview = () => {
    if (Object.keys(userResponses).length === 0) {
      // If no responses, show "Restart" button
      handleRestart();
    } else {
      setSuccessMessage("Survey submitted successfully!");
      setShowOverviewButton(true);
    }
  };

  return (
    <>
      {showOverviewButton ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={8}
        >
          <OverviewSection userResponses={userResponses} />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" width="fit-content" gap={4}>
          <FormControl>
            <Image
              loader={myLoader}
              src={currentQuestion.image}
              alt={currentQuestion.text}
              width={250}
              height={150}
              unoptimized={true}
            />
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ marginTop: 4 }}
            >
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={handleAnswerSelected}
            >
              {currentQuestion.options.map((item, i) => {
                return (
                  <FormControlLabel
                    value={item.text}
                    control={<Radio />}
                    label={item.text}
                    key={i}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Box>
      )}
      {showOverviewButton && (
        <Box display="flex" flexDirection="column" width="fit-content" gap={4}>
          {Object.keys(userResponses).length === 0 ? (
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 4 }}
              onClick={handleRestart}
            >
              Restart
            </Button>
          ) : (
            <Box>
              {successMessage && (
                <Typography variant="h6" color="success" sx={{ marginY: 2 }}>
                  {successMessage}
                </Typography>
              )}
              <SurveySubmitButton
                contractAddress={QUIZ_TOKEN_ADDRESS}
                contractAbi={QUIZ_TOKEN_ABI}
                surveyData={surveyQuestions}
                onSubmissionSuccess={showOverview}
                userResponses={userResponses}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
