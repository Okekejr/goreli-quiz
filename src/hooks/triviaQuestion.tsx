import { useState } from "react";

export const useTriviaQuestions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOverviewButton, setShowOverviewButton] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userResponses, setUserResponses] = useState<{ [key: string]: string }>(
    {}
  );

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    showOverviewButton,
    setShowOverviewButton,
    successMessage,
    setSuccessMessage,
    userResponses,
    setUserResponses,
  };
};
