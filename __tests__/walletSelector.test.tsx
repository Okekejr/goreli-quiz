import { useWalletSelector } from "@/hooks/wallectSelector";
import { act, renderHook } from "@testing-library/react";

describe("useWalletSelector", () => {
  it("should initialize state variables correctly", () => {
    const { result } = renderHook(() => useWalletSelector());

    expect(result.current.open).toBe(false);
    expect(result.current.modal).toBe(false);
  });

  it("should update open state variable", () => {
    const { result } = renderHook(() => useWalletSelector());

    act(() => {
      result.current.setOpen(true);
    });

    expect(result.current.open).toBe(true);
  });

  it("should update modal state variable", () => {
    const { result } = renderHook(() => useWalletSelector());

    act(() => {
      result.current.setModal(true);
    });

    expect(result.current.modal).toBe(true);
  });

  it("should handle opening and closing modal", () => {
    const { result } = renderHook(() => useWalletSelector());

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.modal).toBe(true);

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.modal).toBe(false);
  });

  it("should handle closing", () => {
    const { result } = renderHook(() => useWalletSelector());

    act(() => {
      result.current.onClose();
    });

    expect(result.current.open).toBe(false);
  });
});
