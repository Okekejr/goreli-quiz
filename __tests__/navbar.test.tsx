import React from "react";
import { render, screen } from "@testing-library/react";
import { Navbar } from "../src/ui/navbar";

// Mock the 'wagmi' module
jest.mock("wagmi", () => ({
  useAccount: jest.fn(() => ({ isConnected: false })),
}));
jest.mock("../src/hooks/useMounted", () => ({
  useMounted: jest.fn(() => ({ hasMounted: true })),
}));
jest.mock("../src/ui/components/wallet-selector", () => ({
  WalletSelector: jest.fn(() => <div>WalletSelector</div>),
}));
jest.mock("../src/ui/components/account", () => ({
  Account: jest.fn(() => <div>Account</div>),
}));

describe("Navbar", () => {
  it("renders the Navbar with WalletSelector when not connected", () => {
    render(<Navbar />);
    expect(screen.getByText("Goerli Quiz")).toBeInTheDocument();
    expect(screen.getByText("WalletSelector")).toBeInTheDocument();
    expect(screen.queryByText("Account")).not.toBeInTheDocument();
  });

  it("renders the Navbar with Account when connected", () => {
    jest.mock("wagmi", () => ({
      useAccount: jest.fn(() => ({ isConnected: true })),
    }));
    render(<Navbar />);
    expect(screen.getByText("Goerli Quiz")).toBeInTheDocument();
  });
});
