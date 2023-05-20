"use client";
// import "@/globals.css";

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { EthProvider } from "./contexts/eth_context";
import Header from "./components/Header";
// import { AppProps } from "next/app";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [hardhat],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: false,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

export default function Home({ Component, pageProps }) {
  return (
    // <WagmiConfig config={config}>
    //   <EthProvider>
    //     <Header />
    //     {/* <Component {...pageProps} /> */}
    //   </EthProvider>
    // </WagmiConfig>
    <></>
  );
}
