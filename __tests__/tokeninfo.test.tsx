// Mocking the 'wagmi' library
jest.mock("wagmi", () => ({
  useContractRead: jest.fn(),
}));

import { useTokenName } from "@/hooks/tokenInfo";
import { render, waitFor } from "@testing-library/react";

describe("useTokenName", () => {
  it("should return the token name", async () => {
    // Mock the useContractRead response
    const mockData = "Mocked Token Name";
    const mockUseContractRead = jest.fn().mockReturnValue({ data: mockData });
    require("wagmi").useContractRead = mockUseContractRead;

    // Render a component that uses the hook
    let result;
    render(
      <TestComponent
        callback={() => {
          result = useTokenName("name");
        }}
      />
    );

    // Wait for the asynchronous operation to complete
    await waitFor(() => {});

    // Assert that the hook returns the correct data
    expect(result).toEqual({ name: mockData });
  });

  it("should return the token image", async () => {
    // Mock the useContractRead response
    const mockData = "Mocked Token Image";
    const mockUseContractRead = jest.fn().mockReturnValue({ data: mockData });
    require("wagmi").useContractRead = mockUseContractRead;

    let result;
    render(
      <TestComponent
        callback={() => {
          result = useTokenName("image");
        }}
      />
    );

    await waitFor(() => {});

    expect(result).toEqual({ image: mockData });
  });
});

interface TestComponentProps {
  callback: () => void;
}

const TestComponent: React.FC<TestComponentProps> = ({ callback }) => {
  callback();
  return null;
};
