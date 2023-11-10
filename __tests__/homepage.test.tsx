import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HomePage } from "@/ui/homepage";

// Mock the custom hooks
jest.mock("../src/hooks/tokenInfo", () => ({
  useTokenName: jest.fn(),
}));
jest.mock("../src/hooks/useMounted", () => ({
  useMounted: jest.fn(() => ({ hasMounted: true })),
}));

describe("HomePage", () => {
  it("renders the HomePage with token information and starts trivia on button click", () => {
    // Mock the token information
    require("../src/hooks/tokenInfo").useTokenName = jest.fn(() => ({
      name: "Mocked Name",
      image: "Mocked Image",
    }));

    const startingPageMock = jest.fn();
    const questionsPageMock = jest.fn();

    render(
      <HomePage
        startingPage={startingPageMock}
        questionsPage={questionsPageMock}
      />
    );

    // Check if the token information is displayed
    expect(screen.getByText("Image: Mocked Image")).toBeInTheDocument();
    expect(screen.getByText("Mocked Name")).toBeInTheDocument();

    // Click the "Start Trivia" button
    fireEvent.click(screen.getByText("Start Trivia"));

    // Check if the startingPage and questionsPage functions are called with the correct arguments
    expect(startingPageMock).toHaveBeenCalledWith(false);
    expect(questionsPageMock).toHaveBeenCalledWith(true);
  });
});
