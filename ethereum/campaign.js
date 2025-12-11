import web3 from './web3';
import Campaign from './build/Campaign.json';

// Parse the ABI once
const abi = JSON.parse(Campaign.interface);

// Factory function to create a contract instance for a specific campaign address
const getCampaign = (address) => {
  return new web3.eth.Contract(abi, address);
};

export default getCampaign;
