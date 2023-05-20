import React, { useReducer, useCallback, useEffect } from "react";
import { reducer, actions, initialState } from "./state";
import EthContext from "./EthContext";
// import { getContract } from "viem";
// import { wagmiAbi } from "./abi";
// import { publicClient } from "./client";
import {
  useAccount,
  useConnect,
  useNetwork,
  useWalletClient,
  usePublicClient,
} from "wagmi";
// import { ChainID } from "../../Utils/utils";
import { ethers } from "ethers";
import { getContract } from "wagmi/actions";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const provider = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const initContract = useCallback(async () => {
    if (isConnected) {
      const [
        loadingArtifactsOK,
        simpleStorageArtifact,
        simpleStorage2Artifact,
      ] = await loadArtifacts();

      let simpleStorageAddress;
      let simpleStorage2Address;
      let simpleStorageDeployedBlock;
      let simpleStorage2DeployedBlock;
      let currentBlock;

      if (loadingArtifactsOK) {
        simpleStorageAddress =
          simpleStorageArtifact.networks[chain?.id].address;
        simpleStorageDeployedBlock =
          simpleStorageArtifact.networks[chain?.id].blockNumber;

        simpleStorage2Address =
          simpleStorage2Artifact.networks[chain?.id].address;
        simpleStorage2DeployedBlock =
          simpleStorage2Artifact.networks[chain?.id].blockNumber;

        try {
          currentBlock = await provider.getBlockNumber();
          console.log(currentBlock);
        } catch (err) {
          console.log(err.message);
        }
      }

      console.log("Simple Storage address: " + simpleStorageAddress);

      const simpleStorageContract = getContract({
        address: simpleStorageAddress,
        abi: simpleStorageArtifact.abi,
        provider,
      });

      // simpleStorageContract = new ethers.Contract(
      //   simpleStorageAddress,
      //   simpleStorageArtifact.abi,
      //   walletClient
      // );

      let smartContractValue = await simpleStorageContract.read.retrieve();
      console.log("value:" + smartContractValue);

      // const ctract = new ethers.Contract(
      //   simpleStorageAddress,
      //   simpleStorageArtifact.abi,
      //   signer
      // );

      const ctract = getContract({
        address: simpleStorageAddress,
        abi: simpleStorageArtifact.abi,
        provider,
        walletClient,
      });

      console.log("signer:" + walletClient);

      let transaction = await ctract.write.store({ args: [6] });
      await transaction.wait();

      console.log("hop");
      let smartContractValue2 = await simpleStorageContract.read.retrieve();
      console.log("value:" + smartContractValue2);

      dispatch({
        type: actions.init,
        data: {
          simpleStorageAddress,
          simpleStorage2Address,
          simpleStorageDeployedBlock,
          simpleStorage2DeployedBlock,
          currentBlock,
        },
      });
    }
  }, [isConnected, address, chain]);

  const loadArtifacts = async () => {
    console.log("Loading artifacts");
    let loadingArtifactsOK = false;
    let simpleStorageArtifact;
    let simpleStorage2Artifact;

    try {
      simpleStorageArtifact = require("../../../contracts/SimpleStorage.json");
      simpleStorage2Artifact = require("../../../contracts/SimpleStorage2.json");

      // Check if the contract is deployed on the current chain
      // exception if not
      simpleStorageArtifact.networks[chain?.id].address;
      simpleStorage2Artifact.networks[chain?.id].address;

      loadingArtifactsOK = true;
      console.log("Successfully loaded artifacts");
    } catch (error) {
      console.log("Error when loading artifacts");
      console.log(error.message);
    }

    return [loadingArtifactsOK, simpleStorageArtifact, simpleStorage2Artifact];
  };

  useEffect(() => {
    console.log("Loading provider");
    console.log("User connected: " + isConnected);

    console.log(provider);

    if (isConnected) {
      console.log("Current user address: " + address);
      console.log("Current chain ID: " + chain?.id);
      initContract();
    }
  }, [initContract]);

  const connectWallet = async () => {
    console.log("Try to connect wallet");
    console.log("Current account connected: " + address);

    // TODO: manage other connectors
    await connect({ connector: connectors[0] });

    initContract();
  };

  return (
    <EthContext.Provider
      value={{
        state,
        connectWallet,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
