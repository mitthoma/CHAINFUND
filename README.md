# ChainFund 🚀

> Decentralized crowdfunding platform built on Ethereum, bringing transparency and democratic control to campaign fundraising.

## 🎯 What is ChainFund?

ChainFund reimagines crowdfunding by leveraging blockchain technology to solve the trust problem inherent in traditional platforms. Unlike Kickstarter or GoFundMe where campaign creators have unilateral control over funds, ChainFund implements a **democratic spending approval system** where contributors vote on how their money is used.

### Why ChainFund?

Traditional crowdfunding platforms suffer from several critical issues:
- **Lack of transparency**: Contributors have no visibility into how funds are spent
- **Centralized control**: Campaign creators can misuse funds without accountability
- **Trust dependency**: Backers must blindly trust that creators will deliver
- **High fees**: Platforms take significant cuts (5-10%)

ChainFund solves these problems by:
- ✅ **Full transparency**: All transactions are recorded on the blockchain
- ✅ **Democratic governance**: Contributors approve each spending request
- ✅ **Smart contract enforcement**: Money can only be released through majority approval
- ✅ **Low fees**: Only Ethereum gas fees, no platform commission
- ✅ **Immutable records**: Campaign history cannot be altered or hidden

## 🔧 How It Works

### Campaign Creation
1. Creator deploys a new campaign contract with a minimum contribution amount
2. Campaign is added to the public registry via the factory contract
3. Contributors can discover and back campaigns through the web interface

### Contributing
- Contributors send ETH to the campaign contract
- Minimum contribution threshold ensures serious backers
- Each contributor becomes an "approver" with voting rights

### Spending Requests
1. Campaign manager creates spending requests specifying:
   - Description of the expense
   - Amount needed (in wei)
   - Recipient address
2. Request is broadcast to all approvers

### Democratic Approval
- Approvers vote on each spending request
- Request requires **>50% approval** to be finalized
- Only then can funds be transferred to the recipient
- Prevents misuse of campaign funds

### Smart Contract Architecture

```
CampaignFactory
├── Creates and tracks all campaigns
└── Maintains registry of deployed campaigns

Campaign (per fundraiser)
├── Manages contributions
├── Tracks approvers
├── Creates spending requests
├── Enforces voting rules
└── Executes approved transfers
```

## 🏗️ Tech Stack

### Frontend
- **Next.js 13** - React framework with SSR and routing
- **React 18** - UI component library
- **Semantic UI React** - Component styling
- **Web3.js v4** - Ethereum blockchain interaction

### Smart Contracts
- **Solidity 0.4.17** - Smart contract language
- **Solc** - Solidity compiler

### Blockchain
- **Ethereum** - Decentralized blockchain platform
- **MetaMask** - Browser wallet for transactions
- **Infura/Alchemy** - Ethereum node providers

### Development Tools
- **Node.js 20** - JavaScript runtime
- **Ganache** - Local blockchain for testing
- **Mocha** - Testing framework
- **@truffle/hdwallet-provider** - Wallet management

## 📦 Installation & Setup

### Prerequisites
- Node.js 20+ and npm 10+
- MetaMask browser extension
- Infura or Alchemy account (for deployment)
- Test ETH from a faucet (for Sepolia testnet)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd CHAINFUND

# Use Node 20 (if using nvm)
nvm use

# Install dependencies
npm install
```

### Step 2: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your configuration
# - WEB3_PROVIDER_URL: Your Infura/Alchemy endpoint
# - MNEMONIC_PHRASE: Your wallet mnemonic (for deployment only)
```

### Step 3: Compile Smart Contracts

```bash
npm run compile
```

This generates contract ABIs and bytecode in `ethereum/build/`.

### Step 4: Deploy Factory Contract (Optional)

If you want to deploy your own factory contract:

```bash
# Edit ethereum/deploy.js and uncomment the provider configuration
# Add your mnemonic and Infura/Alchemy endpoint

npm run deploy

# Copy the deployed contract address
# Update the address in ethereum/factory.js
```

### Step 5: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

**Note:** If you encounter dependency warnings during installation, they're expected due to legacy blockchain packages. The application will function correctly.

## 🚀 Usage Guide

### For Campaign Creators

1. **Connect MetaMask** - Click "Connect Wallet" in the navigation
2. **Create Campaign** - Click "Create Campaign" button
3. **Set Minimum** - Enter minimum contribution in wei
4. **Deploy** - Approve transaction in MetaMask
5. **Share** - Share your campaign address with contributors

### Creating Spending Requests

1. Navigate to your campaign
2. Click "View Requests" → "Add Request"
3. Fill in:
   - Description of expense
   - Amount needed (wei)
   - Recipient Ethereum address
4. Submit and wait for approver votes

### For Contributors

1. **Browse Campaigns** - View all active campaigns on homepage
2. **Contribute** - Enter amount and approve transaction
3. **Vote on Requests** - Review and approve/reject spending requests
4. **Track Progress** - Monitor campaign balance and request status

## 🧪 Testing

```bash
# Run smart contract tests
npm test

# Run on local Ganache blockchain
npx ganache
```

Test files are located in the `test/` directory.

## 📁 Project Structure

```
CHAINFUND/
├── components/          # React components
│   ├── ContributeForm.js
│   ├── Header.js
│   ├── Layout.js
│   └── RequestRow.js
├── ethereum/           # Blockchain integration
│   ├── contracts/      # Solidity contracts
│   │   └── Campaign.sol
│   ├── build/          # Compiled contracts
│   ├── campaign.js     # Campaign contract instance
│   ├── factory.js      # Factory contract instance
│   ├── web3.js         # Web3 configuration
│   ├── compile.js      # Contract compiler
│   └── deploy.js       # Deployment script
├── pages/              # Next.js pages (routes)
│   ├── campaigns/
│   │   ├── new.js      # Create campaign
│   │   ├── show.js     # Campaign details
│   │   └── requests/   # Request management
│   └── index.js        # Homepage
├── test/               # Contract tests
├── routes.js           # Route configuration
├── server.js           # Custom Next.js server
├── next.config.js      # Next.js configuration
└── package.json        # Dependencies
```

## 🔐 Security Considerations

- **Never commit** `.env` files or private keys to version control
- **Test thoroughly** on testnets before mainnet deployment
- **Audit contracts** before handling significant funds
- **Use hardware wallets** for production deployments
- **Keep dependencies updated** to patch security vulnerabilities

## 🌐 Deployment

### Deploy to Vercel/Netlify

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deploy Smart Contracts to Mainnet

⚠️ **WARNING**: Deploying to mainnet costs real ETH. Test extensively on testnets first.

1. Update `ethereum/deploy.js` with mainnet provider
2. Ensure wallet has sufficient ETH for gas
3. Run `npm run deploy`
4. Update factory address in `ethereum/factory.js`
5. Commit and deploy frontend

## 🐛 Common Issues

### "User rejected transaction"
- Ensure MetaMask is unlocked
- Check that you have sufficient ETH for gas

### "Invalid address"
- Verify contract addresses in `factory.js`
- Ensure contracts are deployed to the correct network

### "Cannot read property 'call' of undefined"
- Check that contracts are compiled (`npm run compile`)
- Verify Web3 provider is configured correctly

### Build errors with Next.js 14
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🔗 Resources

- [Ethereum Documentation](https://ethereum.org/developers)
- [Solidity Docs](https://docs.soliditylang.org)
- [Web3.js Documentation](https://docs.web3js.org)
- [Next.js Documentation](https://nextjs.org/docs)
- [MetaMask Documentation](https://docs.metamask.io)

## 💡 Future Enhancements

- [ ] Campaign categories and search
- [ ] Campaign deadline/goal tracking
- [ ] Multi-signature wallet support
- [ ] IPFS integration for campaign media
- [ ] Email notifications for request updates
- [ ] Mobile app (React Native)
- [ ] Layer 2 integration (lower gas fees)
- [ ] DAO governance for platform decisions

---

Built with ❤️ on Ethereum
