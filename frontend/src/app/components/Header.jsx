"use client";
import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Stack, Typography } from "@mui/material";
import { AccountBalanceWallet } from "@mui/icons-material";
import useEth from "../contexts/eth_context/useEth";
import { Pages, ToShortAddress } from "../utils/utils";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Header({}) {
  const { isConnected, address } = useAccount();

  const { connectWallet } = useEth();

  const [connectedWallet, setConnectedWallet] = useState("");

  useEffect(() => {
    if (isConnected) {
      setConnectedWallet(ToShortAddress(address));
    } else {
      setConnectedWallet("Connect wallet");
    }
  }, [isConnected, address]);

  const handleWalletClick = async () => {
    await connectWallet();
  };

  return (
    <Box sx={{ flexGrow: 1 }} height="100">
      <AppBar position="static" height="500">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Box component="div" sx={{ width: "200px" }}>
                {/* <img
                  src="https://nodeguardians.io/assets/logo-white.svg"
                  sx={{ maxWidth: "100%" }}
                  alt="logo"
                  color="black"
                /> */}
              </Box>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              spacing={4}
              width="100%"
              marginLeft="100px"
            >
              <Link href="/Get">
                <Typography sx={{ fontSize: "14px" }}>Get</Typography>
              </Link>
              <Link href="/Set">Set</Link>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              onClick={handleWalletClick}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                width="100px"
                justifyContent="flex-end"
                textAlign="end"
                marginRight="10px"
                sx={{ fontSize: "14px" }}
              >
                {connectedWallet}
              </Typography>

              <AccountBalanceWallet className="icon" />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
