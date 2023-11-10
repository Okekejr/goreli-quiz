import React from "react";
import { render, screen } from "@testing-library/react";
import { OverviewSection } from "@/ui/components/overview";

describe("OverviewSection", () => {
  it("renders the OverviewSection with user responses", () => {
    const userResponses = {
      question1: "answer1",
      question2: "answer2",
    };

    render(<OverviewSection userResponses={userResponses} />);

    // Check if the "Overview" heading is rendered
    expect(screen.getByText("Overview")).toBeInTheDocument();

    // Check if each question and selected answer is rendered
    Object.entries(userResponses).forEach(([question, answer]) => {
      expect(screen.getByText(question)).toBeInTheDocument();
      expect(
        screen.getByText(`Selected Answer: ${answer}`)
      ).toBeInTheDocument();
    });
  });

  it("renders a message when user responses are empty", () => {
    const userResponses = {};

    render(<OverviewSection userResponses={userResponses} />);

    // Check if the "Overview" heading is rendered
    expect(screen.getByText("Overview")).toBeInTheDocument();

    // Check if the message for no selected options is rendered
    expect(screen.getByText("you didnt select an option")).toBeInTheDocument();
  });
});
