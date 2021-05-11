const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

// //edit the below function to your endpoint and mnemonic to deploy
// //smart contract again
// const provider = new HDWalletProvider(
//   // remember to change this to your own phrase!
//   // remember to change this to your own endpoint!
// );
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();



//deployed to 0x6981498a2E7cE97c119cf490660B70df96d3568C on Rinkeby
