const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const deploy = async () => {
  // Connect to local Ganache
  const web3 = new Web3("http://127.0.0.1:8545");
  
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  // For Web3 v4, use the ABI and bytecode directly
  const contract = new web3.eth.Contract(JSON.parse(compiledFactory.interface));
  
  const result = await contract
    .deploy({ 
      data: '0x' + compiledFactory.bytecode,
      arguments: [] 
    })
    .send({ 
      gas: "3000000", 
      from: accounts[0] 
    });

  console.log("\n========================================");
  console.log("✅ Factory Contract deployed!");
  console.log("========================================");
  console.log("Address:", result.options.address);
  console.log("\nUpdate this address in:");
  console.log("1. ethereum/factory.js");
  console.log("2. .env (FACTORY_ADDRESS)");
  console.log("========================================\n");
  
  process.exit(0);
};

deploy().catch(err => {
  console.error("Deployment failed:", err);
  process.exit(1);
});
