import React from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

function App() {
  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const uploadText = async () => {
    const sig = await encryptionSignature();
    const response = await lighthouse.textUploadEncrypted(
      "This is a testing string",
      "7f431ff1.e8fc8d458b6645348cb20014441117a8",
      sig.publicKey,
      sig.signedMessage
    );
    console.log(response);
  };

  return (
    <div className="App">
      <button onClick={() => uploadText()}> Click here</button>
    </div>
  );
}

export default App;
