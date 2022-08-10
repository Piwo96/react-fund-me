import React, { useEffect, useState } from 'react';
import './App.css';
import ConnectButton from "./Components/ConnectButton"
import FundForm from "./Components/FundForm";
import BalanceItem from "./Components/BalanceItem";
import WithdrawButton from "./Components/WithdrawButton";
import { checkConnectionState } from "./Helper/utils";


function App() {
  const [connected, setConnectionState] = useState<any | null>(null);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [])

  const checkIfWalletIsConnected = async () => {
      const connState = await checkConnectionState();
      console.log(connState);
      setConnectionState(connState);
  }

  const renderConnectButton = () => {
    return (
      <ConnectButton className="connect-button" name="Connect" connected={connected} />
    )
  }

  return (
    <div> 
      <header>Fund Me App</header>
      {!connected && renderConnectButton()}
      {connected && renderConnectButton()}
      <FundForm />
      <BalanceItem />
      <WithdrawButton />
    </div>
  );
}

export default App;
