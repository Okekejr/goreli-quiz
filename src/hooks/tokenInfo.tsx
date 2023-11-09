import { QUIZ_TOKEN_ABI, QUIZ_TOKEN_ADDRESS } from "@/config/contract";
import { useContractRead } from "wagmi";

export const useTokenName = (name: string) => {
  const { data } = useContractRead({
    address: QUIZ_TOKEN_ADDRESS,
    abi: QUIZ_TOKEN_ABI,
    functionName: name,
  });

  if (name === "name") {
    return { name: data };
  } else {
    return { image: data };
  }
};
