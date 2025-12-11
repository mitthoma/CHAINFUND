import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

// Parse the interface (ABI) from the compiled contract
const abi = JSON.parse(CampaignFactory.interface);

// Create contract instance with the factory address
// Note: Update this address after deploying to your network
const instance = new web3.eth.Contract(
  abi,
  '0x515932CB3f256abD40130cdbb914d001eB8e52D7'
);

export default instance;
