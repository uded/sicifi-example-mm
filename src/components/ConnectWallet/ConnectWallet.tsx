import { useAccount } from "wagmi";
import { Account } from "./Account";
import { WalletOptions } from "./WalletOptions";

export const ConnectWallet = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
};
