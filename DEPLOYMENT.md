# ChainFund Production Deployment Guide

## Architecture Overview

**Frontend (Vercel):**
- Next.js app hosted on Vercel
- Static/serverless - no backend needed
- Connects to Ethereum blockchain via Web3

**Smart Contracts (Ethereum Network):**
- Deployed to Sepolia Testnet (for demo) OR Mainnet (for real money)
- Immutable, decentralized
- Users interact through MetaMask

## Deployment Options

### Option 1: Sepolia Testnet (RECOMMENDED for Demo)
**Best for:** Public demo, testing, showcasing the app
**Cost:** FREE (testnet ETH is free from faucets)
**Users need:** MetaMask + Free Sepolia ETH from faucet

### Option 2: Ethereum Mainnet
**Best for:** Real production with real money
**Cost:** Real ETH for gas fees
**Users need:** MetaMask + Real ETH

## Step-by-Step: Deploy to Vercel + Sepolia

### Phase 1: Deploy Smart Contracts to Sepolia

**1. Get Sepolia Testnet Setup:**
- Create account on [Infura](https://infura.io) or [Alchemy](https://alchemy.com)
- Create a new project
- Copy your Sepolia endpoint URL
- Example: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`

**2. Get Sepolia Test ETH:**
- Add Sepolia network to MetaMask
- Go to a Sepolia faucet:
  - https://sepoliafaucet.com/
  - https://faucet.quicknode.com/ethereum/sepolia
- Request free test ETH (usually 0.5 ETH)

**3. Get Your Wallet Mnemonic:**
- MetaMask → Settings → Security & Privacy → Reveal Secret Recovery Phrase
- **⚠️ NEVER share this or commit to git!**

**4. Update .env for Deployment:**
```bash
WEB3_PROVIDER_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
MNEMONIC_PHRASE=your twelve word mnemonic phrase here
```

**5. Update ethereum/deploy.js:**
Uncomment and configure the provider:
```javascript
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: process.env.MNEMONIC_PHRASE
  },
  providerOrUrl: process.env.WEB3_PROVIDER_URL
});
const web3 = new Web3(provider);
```

Comment out the error check that prevents deployment.

**6. Deploy Factory Contract:**
```bash
npm run compile  # Compile contracts first
npm run deploy   # Deploy to Sepolia
```

**7. Update Factory Address:**
Copy the deployed address from console and update:
- `ethereum/factory.js` → Update the contract address
- `.env` → Update FACTORY_ADDRESS

**8. Test Locally First:**
```bash
npm run dev
```
Connect MetaMask to Sepolia and test creating a campaign.

### Phase 2: Deploy Frontend to Vercel

**1. Push to GitHub:**
```bash
git add .
git commit -m "Production ready for Sepolia testnet"
git push origin main
```

**2. Connect to Vercel:**
- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your GitHub repository
- Configure:
  - Framework: Next.js (auto-detected)
  - Build Command: `npm run build`
  - Output Directory: `.next`

**3. Add Environment Variables in Vercel:**
- In Vercel dashboard → Settings → Environment Variables
- Add:
  ```
  WEB3_PROVIDER_URL = https://sepolia.infura.io/v3/YOUR_PROJECT_ID
  FACTORY_ADDRESS = 0xYourDeployedFactoryAddress
  ```

**4. Deploy:**
- Click "Deploy"
- Wait ~2 minutes
- Your app is live!

## How Users Interact (Production)

### For Campaign Creators:

**1. Setup (One-time):**
- Install MetaMask browser extension
- Add Sepolia network to MetaMask:
  - Network Name: Sepolia
  - RPC URL: https://sepolia.infura.io/v3/[public endpoint]
  - Chain ID: 11155111
  - Currency: ETH
- Get free Sepolia ETH from faucet (link provided on site)

**2. Create Campaign:**
- Visit your-app.vercel.app
- Click "Connect Wallet" → Approve in MetaMask
- Click "Create Campaign"
- Set minimum contribution
- Click "Create Campaign" → MetaMask pops up
- Approve transaction (costs ~$0.50 in testnet ETH)
- Campaign is deployed! Share the URL with contributors

**3. Create Spending Requests:**
- Go to your campaign
- Click "View Spending Requests" → "New Request"
- Fill in description, amount, recipient address
- Submit → MetaMask pops up → Approve
- Request is now live and awaiting votes

**4. Finalize Approved Requests:**
- Once >50% of contributors approve
- Click "Finalize" button
- MetaMask pops up → Approve
- Funds automatically transfer to recipient!

### For Contributors:

**1. Setup (One-time):**
- Install MetaMask
- Add Sepolia network
- Get free Sepolia ETH from faucet

**2. Contribute:**
- Visit campaign URL (shared by creator)
- Click "Connect Wallet" → Approve in MetaMask
- Enter contribution amount
- Click "Contribute" → MetaMask pops up
- Approve transaction
- You're now a voting member!

**3. Vote on Requests:**
- Go to campaign → "View Spending Requests"
- Review each request
- Click "Approve" → MetaMask pops up → Confirm
- Your vote is recorded on blockchain

## Testnet vs Mainnet: What Changes?

### Sepolia Testnet (Demo):
- **ETH is FREE** from faucets
- Users can test without risk
- Perfect for showcasing the app
- Transactions are real but worthless
- Network: Sepolia (Chain ID: 11155111)

### Ethereum Mainnet (Production):
- **ETH is REAL MONEY**
- Users pay real gas fees (~$5-50 per transaction)
- Campaign funds are real
- High security requirements
- Network: Ethereum Mainnet (Chain ID: 1)
- **Requires professional audit before deploying**

## Cost Breakdown

### Testnet (Sepolia):
- Deploy Factory: ~0.1 testnet ETH (FREE from faucet)
- Create Campaign: ~0.01 testnet ETH per campaign (FREE)
- Contribute: ~0.005 testnet ETH per contribution (FREE)
- Create Request: ~0.008 testnet ETH per request (FREE)
- Vote: ~0.003 testnet ETH per vote (FREE)
- Finalize: ~0.01 testnet ETH (FREE)

### Mainnet (Real):
- Deploy Factory: $200-400 (one-time)
- Create Campaign: $20-40 per campaign
- Contribute: $10-20 per contribution
- Create Request: $15-30 per request
- Vote: $5-15 per vote
- Finalize: $20-40

*Costs vary based on gas prices*

## Recommended Approach

**For Public Demo/MVP:**
1. Deploy to Sepolia testnet
2. Add prominent "Demo Mode" banner
3. Provide easy faucet links for users
4. Showcase full functionality with zero financial risk

**For Production Launch:**
1. Get professional smart contract audit
2. Test extensively on testnet
3. Deploy to mainnet
4. Start with small amounts
5. Build trust gradually

## Security Checklist

Before mainnet deployment:
- [ ] Professional smart contract audit
- [ ] Extensive testnet testing (min 100 transactions)
- [ ] Bug bounty program
- [ ] Insurance/emergency pause mechanism
- [ ] Legal review (securities compliance)
- [ ] Terms of service and disclaimers
- [ ] Multi-sig for admin functions
- [ ] Gradual rollout plan

## Support Resources

**For Users:**
- MetaMask Guide: https://metamask.io/faqs/
- Sepolia Faucet: https://sepoliafaucet.com/
- Ethereum Gas Tracker: https://etherscan.io/gastracker

**For Developers:**
- Infura Docs: https://docs.infura.io/
- Web3.js Docs: https://docs.web3js.org/
- Solidity Docs: https://docs.soliditylang.org/
