import { Web3 } from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  // Don't automatically request accounts here - let the UI handle it
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  // For local development, default to Ganache on localhost:8545
  const provider = new Web3.providers.HttpProvider(
    process.env.WEB3_PROVIDER_URL || "http://127.0.0.1:8545"
  );
  web3 = new Web3(provider);
}

export default web3;
