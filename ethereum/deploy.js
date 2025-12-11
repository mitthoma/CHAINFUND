require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const deploy = async () => {
  // Check for required environment variables
  if (!process.env.MNEMONIC_PHRASE) {
    console.error('\n❌ ERROR: MNEMONIC_PHRASE not found in .env file');
    console.error('\nPlease add your MetaMask mnemonic to .env:');
    console.error('MNEMONIC_PHRASE=word1 word2 word3 ... word12');
    console.error('\n⚠️  This is safe - .env is in .gitignore and won\'t be committed!\n');
    process.exit(1);
  }

  if (!process.env.WEB3_PROVIDER_URL) {
    console.error('\n❌ ERROR: WEB3_PROVIDER_URL not found in .env file');
    console.error('\nPlease add your Sepolia endpoint to .env:');
    console.error('WEB3_PROVIDER_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID\n');
    process.exit(1);
  }

  console.log('\n🚀 Starting deployment to Sepolia testnet...\n');

  // Create provider using environment variables
  const provider = new HDWalletProvider({
    mnemonic: {
      phrase: process.env.MNEMONIC_PHRASE
    },
    providerOrUrl: process.env.WEB3_PROVIDER_URL
  });

  const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);
  
  // Check account balance
  const balance = await web3.eth.getBalance(accounts[0]);
  const balanceEth = web3.utils.fromWei(balance, 'ether');
  console.log(`Account balance: ${balanceEth} ETH`);
  
  if (parseFloat(balanceEth) < 0.01) {
    console.error('\n❌ ERROR: Insufficient balance!');
    console.error('\nYou need Sepolia testnet ETH to deploy.');
    console.error('Get some from: https://sepoliafaucet.com/\n');
    process.exit(1);
  }

  console.log('\n⏳ Deploying contract... (this may take 30-60 seconds)\n');

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
    })
    .on('transactionHash', (hash) => {
      console.log(`📝 Transaction hash: ${hash}`);
      console.log(`🔗 Track on Etherscan: https://sepolia.etherscan.io/tx/${hash}`);
      console.log('⏳ Waiting for confirmation...\n');
    });

  const deployedAddress = result.options.address;

  console.log("\n========================================");
  console.log("✅ SUCCESS! Factory deployed to Sepolia!");
  console.log("========================================");
  console.log("\n📍 Contract Address:", deployedAddress);
  console.log("\n🔗 View on Etherscan:");
  console.log(`https://sepolia.etherscan.io/address/${deployedAddress}`);
  
  console.log("\n📝 NEXT STEPS:");
  console.log("1. Update .env file:");
  console.log(`   FACTORY_ADDRESS=${deployedAddress}`);
  console.log("\n2. Update ethereum/factory.js line 11:");
  console.log(`   '${deployedAddress}'`);
  console.log("\n3. Test locally: npm run dev");
  console.log("\n4. Add to Vercel environment variables:");
  console.log(`   FACTORY_ADDRESS=${deployedAddress}`);
  console.log("========================================\n");
  
  // Close the provider connection
  if (provider && provider.engine) {
    provider.engine.stop();
  }
};

deploy().catch(err => {
  console.error('\n❌ Deployment failed!\n');
  console.error('Error:', err.message || err);
  
  if (err.message && err.message.includes('insufficient funds')) {
    console.error('\n💡 Solution: Get Sepolia testnet ETH from https://sepoliafaucet.com/\n');
  } else if (err.message && err.message.includes('nonce')) {
    console.error('\n💡 Solution: Try resetting your MetaMask account or wait a few minutes\n');
  } else {
    console.error('\n💡 Check that:');
    console.error('  1. Your mnemonic is correct');
    console.error('  2. You have Sepolia ETH in your account');
    console.error('  3. Your Infura endpoint is working\n');
  }
  
  process.exit(1);
});

// Previous deployment: 0x6981498a2E7cE97c119cf490660B70df96d3568C on Rinkeby (deprecated)
// Note: Rinkeby testnet is deprecated. Use Sepolia or Goerli instead.
