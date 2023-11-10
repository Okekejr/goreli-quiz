import { useTriviaQuestions } from "@/hooks/triviaQuestion";
import { act, renderHook } from "@testing-library/react";

describe("useTriviaQuestions", () => {
  it("should initialize state variables correctly", () => {
    const { result } = renderHook(() => useTriviaQuestions());

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.showOverviewButton).toBe(false);
    expect(result.current.successMessage).toBe(null);
    expect(result.current.userResponses).toEqual({});
  });

  it("should update currentQuestionIndex", () => {
    const { result } = renderHook(() => useTriviaQuestions());

    act(() => {
      result.current.setCurrentQuestionIndex(1);
    });

    expect(result.current.currentQuestionIndex).toBe(1);
  });

  it("should update showOverviewButton", () => {
    const { result } = renderHook(() => useTriviaQuestions());

    act(() => {
      result.current.setShowOverviewButton(true);
    });

    expect(result.current.showOverviewButton).toBe(true);
  });

  it("should update successMessage", () => {
    const { result } = renderHook(() => useTriviaQuestions());

    act(() => {
      result.current.setSuccessMessage("Congratulations!");
    });

    expect(result.current.successMessage).toBe("Congratulations!");
  });

  it("should update userResponses", () => {
    const { result } = renderHook(() => useTriviaQuestions());

    act(() => {
      result.current.setUserResponses({ question1: "answer1" });
    });

    expect(result.current.userResponses).toEqual({ question1: "answer1" });
  });
});
