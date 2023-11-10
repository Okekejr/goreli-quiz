import { handleButtonColor, handleButtonImage } from "@/util/handle-wallet";

describe("handleButtonColor", () => {
  it("returns the correct color for MetaMask", () => {
    const color = handleButtonColor("MetaMask");
    expect(color).toBe("linear-gradient(to right, #FF5C00, #FFDC24)");
  });

  it("returns the correct color for WalletConnect", () => {
    const color = handleButtonColor("WalletConnect");
    expect(color).toBe("linear-gradient(to right, #8F00FF, #0700FF)");
  });

  it("returns the default color for an unknown wallet", () => {
    const color = handleButtonColor("SomeOtherWallet");
    expect(color).toBe("linear-gradient(to right, #3773F5, #0052FF)");
  });
});

describe("handleButtonImage", () => {
  it("returns the correct image for MetaMask", () => {
    const image = handleButtonImage("MetaMask");
    expect(image).toBe("/metamask.svg");
  });

  it("returns the correct image for WalletConnect", () => {
    const image = handleButtonImage("WalletConnect");
    expect(image).toBe("/walletConnect.svg");
  });

  it("returns the default image for an unknown wallet", () => {
    const image = handleButtonImage("SomeOtherWallet");
    expect(image).toBe("/coinBase.svg");
  });
});
