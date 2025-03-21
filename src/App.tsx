import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useEffect, useState } from "react";
import { ConnectWallet } from "./components/ConnectWallet/ConnectWallet";
import { useAccount } from "wagmi";
import { useSignMessage } from "wagmi";

function App() {
  const [value, setValue] = useState("");
  const [signature, setSignature] = useState("");
  const { address } = useAccount();
  const { signMessage } = useSignMessage({
    mutation: {
      onSuccess(data) {
        setSignature(data);
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignature("");
    setValue(e.target.value);
  };

  useEffect(() => {
    if (address) {
      setValue("");
      setSignature("");
    }
  }, [address]);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="w-full flex justify-end">
        <ConnectWallet />
      </div>
      {!address && (
        <p className="w-full mt-80 flex items-center justify-center font-bold text-3xl">
          Please connect Wallet
        </p>
      )}
      {address && (
        <div className="w-full mt-80 flex flex-col gap-6 items-center justify-center">
          <p className="w-full font-bold text-3xl text-center">
            Wallet connected
          </p>
          <p className="w-full mt-2 text-center font-bold text-3xl">
            {address}
          </p>
          <Input
            value={value}
            onChange={handleChange}
            className="w-96"
            placeholder="Message to sign"
          />
          <Button
            onClick={() => signMessage({ message: value })}
            className="mt-10 w-40"
            disabled={!value}
          >
            Sign Message
          </Button>
          {signature && (
            <p className="w-full mt-2 text-center font-bold text-xs">
              {signature}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
