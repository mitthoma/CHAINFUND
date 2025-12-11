# ChainFund - Complete Setup & Testing Guide

## ✅ Current Status

**ChainFund is now fully functional with REAL blockchain transactions!**

- ✅ Ganache running on localhost:8545
- ✅ Factory contract deployed: `0xd77aD6cc9D9e943Eb9b4Bc7b8576084008Fa5462`
- ✅ Smart contracts compiled
- ✅ Web3 configured for local development
- ✅ All UI pages themed and working

## 🔄 End-to-End Workflow

### 1. **Prerequisites Running**
- [x] Ganache on port 8545 (currently running)
- [x] Next.js dev server on port 3000 (currently running)
- [x] MetaMask browser extension installed

### 2. **Connect MetaMask to Local Ganache**

**Step A: Add Ganache Network to MetaMask**
1. Open MetaMask
2. Click network dropdown (top)
3. Click "Add Network" → "Add a network manually"
4. Enter:
   - **Network Name**: Ganache Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 1337
   - **Currency Symbol**: ETH
5. Click "Save"

**Step B: Import a Ganache Account**
1. Copy a private key from Ganache (see below)
2. MetaMask → Click account icon → "Import Account"
3. Paste private key
4. You now have 100 ETH to test with!

**Available Ganache Accounts:**
```
Account 0: 0x95D3A6d5Bf7592131339F9389e8001Dd67A5DFD9
Private Key: 0x62c300e9f78f9e5120db733a62561fe490055733522378ca7fa0740c6450ca96

Account 1: 0xc846cac537a441Be5e176ABF53C6FaD9ad7F94ff
Private Key: 0xb79549efb292b021be7afd46b5d70084934b99dd43bcc560ee20b24d76f0017e
```

### 3. **Create a Real Campaign** 

1. Go to http://localhost:3000
2. Click "Launch Campaign" or "CREATE" in nav
3. Fill in minimum contribution (e.g., 0.01 ETH)
4. Click "Create Campaign"
5. **MetaMask will pop up** - approve the transaction
6. Wait for confirmation (~2 seconds on Ganache)
7. You'll be redirected to home page with your new campaign!

### 4. **Contribute to a Campaign**

1. Go to home page or Explore
2. Click "View Campaign" on any real campaign
3. Scroll to "Contribute to Campaign" card
4. Enter amount (e.g., 1 ETH)
5. Click "Contribute Now"
6. **MetaMask pops up** - approve transaction
7. Success! You're now an approver with voting rights

### 5. **Create a Spending Request** (As Campaign Creator)

1. Navigate to your campaign
2. Click "View Spending Requests"
3. Click "+ New Request"
4. Fill in:
   - **Description**: What the money is for
   - **Amount**: ETH needed
   - **Recipient**: Ethereum address to receive funds
5. Click "Create Request"
6. **MetaMask pops up** - approve transaction
7. Request is now live and awaiting votes!

### 6. **Approve & Finalize Requests** (As Contributor)

**Approve:**
1. Go to campaign → "View Spending Requests"
2. Click "Approve" on any request
3. **MetaMask pops up** - approve transaction
4. Your vote is recorded on-chain

**Finalize:**
1. Once >50% of contributors approve
2. "Finalize" button becomes active (green)
3. Campaign manager clicks "Finalize"
4. **MetaMask pops up** - approve transaction
5. Funds are automatically sent to recipient!

## 🔍 What's REAL vs DEMO

### Real Blockchain Features (Working Now):
- ✅ Create campaigns → Deploys actual smart contracts
- ✅ Contribute ETH → Real transactions on Ganache
- ✅ Create spending requests → Stored on blockchain
- ✅ Vote on requests → Democratic approval system
- ✅ Finalize requests → Automatic fund transfer
- ✅ All transactions require MetaMask approval
- ✅ Real gas fees (paid in test ETH)

### Demo Features (For UI showcase):
- 📊 3 example campaigns on /explore page (mock data)
- 📊 Example campaign detail pages at /campaign/1, /campaign/2, /campaign/3
- 📊 Stats on explore page (aggregated demo data)

**Real campaigns** use URLs like: `/campaigns/0xABC123...`
**Demo campaigns** use URLs like: `/campaign/1`

## 🛠️ Troubleshooting

### "Transaction Failed" or "Insufficient Funds"
- Make sure you imported a Ganache account with 100 ETH
- Check MetaMask is connected to "Ganache Local" network

### "Contract not found"
- Ganache may have restarted (it resets on restart)
- Re-deploy: `node ethereum/deploy-local.js`
- Update factory.js and .env with new address

### "User rejected transaction"
- You clicked "Reject" in MetaMask
- Try the action again and click "Confirm"

### Page shows "Connect Wallet"
- MetaMask not connected
- Click "Connect Wallet" in header
- Or go to MetaMask → Connected Sites → Connect this site

## 🚀 Deploy to Testnet (Optional)

To use on Sepolia testnet instead of local Ganache:

1. Get Sepolia test ETH from a faucet
2. Sign up for Infura/Alchemy and get API key
3. Update `.env`:
   ```
   WEB3_PROVIDER_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
   ```
4. Deploy factory: Update `ethereum/deploy.js` with your mnemonic
5. Run: `npm run deploy`
6. Update factory.js with deployed address

## 📝 Current App Features

✅ **Home Page** - Product landing with value prop
✅ **Explore Page** - Browse campaigns with filters
✅ **Create Campaign** - Deploy smart contract
✅ **Campaign Details** - View stats, contribute, see activity
✅ **Spending Requests** - Create, vote, finalize
✅ **Democratic Approval** - Majority vote required
✅ **MetaMask Integration** - Real wallet connection
✅ **Responsive Design** - Works on all devices
✅ **Modern Theme** - Consistent with your other projects

## 🎯 Next Steps

1. **Test the full flow** - Create campaign → Contribute → Create request → Approve → Finalize
2. **Try with multiple accounts** - Import 2-3 Ganache accounts to test voting
3. **Check Ganache** - Watch transactions appear in real-time
4. **Explore the UI** - All pages are themed and functional

**The app is production-ready for local testing!** 🚀
