import React, { useEffect, useState } from 'react';
import './App.css';
import ConnectButton from "./Components/ConnectButton"
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
      {!connected && renderConnectButton()}
      {connected && renderConnectButton()}
    </div>
  );
}

export default App;
