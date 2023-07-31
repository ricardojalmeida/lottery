import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const contractABI = [/*Contract ABI Goes Here*/];
const contractAddress = "0xB5364e95BAC807F262744Dedd87BBF5b70504855"; 

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        await provider.request({ method: 'eth_requestAccounts' });

        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();

        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
      } else {
        console.log("Please install MetaMask!");
      }
    };

    init();
  }, []);

  const sendPayment = async () => {
    const tx = await contract.sendPayment({ value: ethers.utils.parseEther("0.2") });
    await tx.wait();
    alert("Payment sent successfully!");
  };

  const getUsers = async () => {
    const users = await contract.getUsers();
    setUsers(users);
  };

  return (
    <div>
      <h1>Payment Contract Interface</h1>
      <button onClick={sendPayment}>Send Payment</button>
      <button onClick={getUsers}>Get Users</button>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
