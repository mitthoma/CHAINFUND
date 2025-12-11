import React, { Component } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

class GuidePage extends Component {
  state = {
    activeTab: 'getting-started'
  };

  setTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <Layout>
        <div>
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              How to Use ChainFund
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#808080' }}>
              Complete guide to creating campaigns, contributing funds, and participating in democratic governance
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'getting-started', label: 'Getting Started' },
              { id: 'metamask', label: 'MetaMask Setup' },
              { id: 'create-campaign', label: 'Create Campaign' },
              { id: 'contribute', label: 'How to Contribute' },
              { id: 'voting', label: 'Voting & Requests' },
              { id: 'faq', label: 'FAQ' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => this.setTab(tab.id)}
                className="px-6 py-3 rounded-lg whitespace-nowrap transition-all duration-300"
                style={{
                  background: activeTab === tab.id ? 'rgba(234, 234, 234, 0.1)' : 'transparent',
                  border: activeTab === tab.id ? '2px solid #eaeaea' : '2px solid rgba(234, 234, 234, 0.2)',
                  color: activeTab === tab.id ? '#eaeaea' : '#808080',
                  fontFamily: 'Tomorrow, sans-serif',
                  fontSize: '0.875rem',
                  transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="max-w-4xl mx-auto">
            
            {/* Getting Started */}
            {activeTab === 'getting-started' && (
              <div className="modern-card p-8">
                <h2 className="text-3xl mb-6" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Welcome to ChainFund! 🚀
                </h2>
                
                <div className="mb-8">
                  <h3 className="text-xl mb-4" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                    What You'll Need:
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">💰</span>
                      <div>
                        <h4 className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          MetaMask Wallet
                        </h4>
                        <p style={{ color: '#808080' }}>
                          A browser extension that stores your cryptocurrency and lets you interact with blockchain apps.
                        </p>
                        <a 
                          href="https://metamask.io/download/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm"
                          style={{ color: '#70e6ff' }}
                        >
                          Download MetaMask →
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="text-2xl">⛽</span>
                      <div>
                        <h4 className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          Test ETH (Free!)
                        </h4>
                        <p style={{ color: '#808080' }}>
                          Sepolia testnet ETH for testing. It's free and has no real value - perfect for learning!
                        </p>
                        <a 
                          href="https://sepoliafaucet.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm"
                          style={{ color: '#70e6ff' }}
                        >
                          Get Free Test ETH →
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="text-2xl">⏱️</span>
                      <div>
                        <h4 className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          5 Minutes
                        </h4>
                        <p style={{ color: '#808080' }}>
                          That's all it takes to set up and start using ChainFund!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg mb-8" style={{ background: 'rgba(112, 230, 255, 0.1)', border: '1px solid rgba(112, 230, 255, 0.3)' }}>
                  <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                    🎯 Quick Start Path
                  </h3>
                  <ol className="space-y-2" style={{ color: '#eaeaea', paddingLeft: '1.5rem' }}>
                    <li><strong>Step 1:</strong> Install MetaMask browser extension</li>
                    <li><strong>Step 2:</strong> Add Sepolia testnet to MetaMask</li>
                    <li><strong>Step 3:</strong> Get free test ETH from faucet</li>
                    <li><strong>Step 4:</strong> Connect wallet to ChainFund</li>
                    <li><strong>Step 5:</strong> Create a campaign or contribute to existing ones!</li>
                  </ol>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => this.setTab('metamask')}
                    className="glow-button"
                  >
                    Next: MetaMask Setup →
                  </button>
                  <Link href="/explore">
                    <button
                      className="px-6 py-3 rounded-lg"
                      style={{
                        background: 'transparent',
                        border: '2px solid #eaeaea',
                        color: '#eaeaea',
                        fontFamily: 'Tomorrow, sans-serif'
                      }}
                    >
                      Explore Campaigns
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* MetaMask Setup */}
            {activeTab === 'metamask' && (
              <div className="modern-card p-8">
                <h2 className="text-3xl mb-6" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  MetaMask Setup Guide
                </h2>

                <div className="space-y-8">
                  {/* Step 1 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#70e6ff', color: '#000', fontFamily: 'Tomorrow, sans-serif', fontWeight: 'bold' }}>
                        1
                      </span>
                      <h3 className="text-xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                        Install MetaMask
                      </h3>
                    </div>
                    <div className="ml-11">
                      <p className="mb-3" style={{ color: '#808080' }}>
                        Go to <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" style={{ color: '#70e6ff' }}>metamask.io/download</a> and install the browser extension for Chrome, Firefox, or Brave.
                      </p>
                      <p style={{ color: '#808080' }}>
                        Follow the setup wizard to create a new wallet. <strong style={{ color: '#ef4444' }}>IMPORTANT:</strong> Write down your secret recovery phrase and store it safely offline!
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#70e6ff', color: '#000', fontFamily: 'Tomorrow, sans-serif', fontWeight: 'bold' }}>
                        2
                      </span>
                      <h3 className="text-xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                        Add Sepolia Testnet
                      </h3>
                    </div>
                    <div className="ml-11">
                      <p className="mb-3" style={{ color: '#808080' }}>
                        Click the network dropdown at the top of MetaMask (it probably says "Ethereum Mainnet")
                      </p>
                      <p className="mb-3" style={{ color: '#808080' }}>
                        Click "Add Network" → "Add a network manually"
                      </p>
                      <div className="p-4 rounded-lg mb-3" style={{ background: 'rgba(234, 234, 234, 0.05)', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        <p style={{ color: '#808080' }}><strong style={{ color: '#eaeaea' }}>Network Name:</strong> Sepolia</p>
                        <p style={{ color: '#808080' }}><strong style={{ color: '#eaeaea' }}>RPC URL:</strong> https://sepolia.infura.io/v3/...</p>
                        <p style={{ color: '#808080' }}><strong style={{ color: '#eaeaea' }}>Chain ID:</strong> 11155111</p>
                        <p style={{ color: '#808080' }}><strong style={{ color: '#eaeaea' }}>Currency Symbol:</strong> ETH</p>
                      </div>
                      <p style={{ color: '#808080' }}>
                        Click "Save" and switch to the Sepolia network.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#70e6ff', color: '#000', fontFamily: 'Tomorrow, sans-serif', fontWeight: 'bold' }}>
                        3
                      </span>
                      <h3 className="text-xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                        Get Free Test ETH
                      </h3>
                    </div>
                    <div className="ml-11">
                      <p className="mb-3" style={{ color: '#808080' }}>
                        Visit a Sepolia faucet to get free test ETH (usually 0.5 ETH):
                      </p>
                      <ul className="space-y-2 mb-3" style={{ paddingLeft: '1.5rem' }}>
                        <li>
                          <a href="https://sepoliafaucet.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#70e6ff' }}>
                            Alchemy Sepolia Faucet
                          </a>
                        </li>
                        <li>
                          <a href="https://faucet.quicknode.com/ethereum/sepolia" target="_blank" rel="noopener noreferrer" style={{ color: '#70e6ff' }}>
                            QuickNode Faucet
                          </a>
                        </li>
                      </ul>
                      <p style={{ color: '#808080' }}>
                        Copy your wallet address from MetaMask and paste it into the faucet. Test ETH will arrive in 10-30 seconds!
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#22c55e', color: '#000', fontFamily: 'Tomorrow, sans-serif', fontWeight: 'bold' }}>
                        ✓
                      </span>
                      <h3 className="text-xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                        You're Ready!
                      </h3>
                    </div>
                    <div className="ml-11">
                      <p style={{ color: '#808080' }}>
                        Click "Connect Wallet" in the ChainFund header to link your MetaMask wallet and start using the platform!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => this.setTab('create-campaign')}
                    className="glow-button"
                  >
                    Next: Create Campaign →
                  </button>
                </div>
              </div>
            )}

            {/* Create Campaign */}
            {activeTab === 'create-campaign' && (
              <div className="modern-card p-8">
                <h2 className="text-3xl mb-6" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  How to Create a Campaign
                </h2>

                <div className="mb-8">
                  <p className="mb-4" style={{ color: '#808080', fontSize: '1.125rem' }}>
                    As a campaign creator, you deploy a smart contract that manages funds democratically. Contributors become voting members who approve all spending decisions.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Step 1: Click "Create Campaign"
                    </h3>
                    <p style={{ color: '#808080' }}>
                      Navigate to the Create Campaign page from the header or home page.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Step 2: Set Minimum Contribution
                    </h3>
                    <p className="mb-3" style={{ color: '#808080' }}>
                      Enter the minimum amount (in ETH) that contributors must pledge to become voting members. This ensures serious backers.
                    </p>
                    <p style={{ color: '#808080', fontSize: '0.875rem', fontStyle: 'italic' }}>
                      Example: 0.01 ETH minimum means only people who contribute at least 0.01 ETH can vote on spending requests.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Step 3: Deploy Your Campaign
                    </h3>
                    <p className="mb-3" style={{ color: '#808080' }}>
                      Click "Create Campaign" and approve the transaction in MetaMask.
                    </p>
                    <p className="mb-3" style={{ color: '#808080' }}>
                      This deploys a new smart contract to the blockchain with you as the campaign manager. Cost: ~$0.50 in test ETH.
                    </p>
                    <p style={{ color: '#22c55e', fontSize: '0.875rem' }}>
                      ✓ Your campaign now has a unique blockchain address that you can share!
                    </p>
                  </div>

                  <div className="p-6 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Step 4: Share Your Campaign
                    </h3>
                    <p style={{ color: '#808080' }}>
                      Copy your campaign URL and share it on social media, email, or messaging apps. Anyone can view and contribute!
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  <h3 className="text-lg mb-3" style={{ color: '#22c55e', fontFamily: 'Tomorrow, sans-serif' }}>
                    What You Can Do as Campaign Manager:
                  </h3>
                  <ul className="space-y-2" style={{ color: '#eaeaea', paddingLeft: '1.5rem' }}>
                    <li>✓ Create spending requests for specific expenses</li>
                    <li>✓ Finalize approved requests (Greater than 50% votes)</li>
                    <li>✓ View all contributors and their voting status</li>
                    <li>✗ Cannot withdraw funds without approval</li>
                    <li>✗ Cannot change campaign rules after deployment</li>
                  </ul>
                </div>

                <div className="flex gap-4 mt-8">
                  <Link href="/campaigns/new">
                    <button className="glow-button">
                      Create Your Campaign
                    </button>
                  </Link>
                  <button
                    onClick={() => this.setTab('voting')}
                    className="px-6 py-3 rounded-lg"
                    style={{
                      background: 'transparent',
                      border: '2px solid #eaeaea',
                      color: '#eaeaea',
                      fontFamily: 'Tomorrow, sans-serif'
                    }}
                  >
                    Next: Voting Guide →
                  </button>
                </div>
              </div>
            )}

            {/* Contribute */}
            {activeTab === 'contribute' && (
              <div className="modern-card p-8">
                <h2 className="text-3xl mb-6" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  How to Contribute
                </h2>

                <div className="mb-8">
                  <p className="mb-4" style={{ color: '#808080', fontSize: '1.125rem' }}>
                    Contributing to a campaign gives you voting rights on how funds are spent. You become part of the democratic governance system.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Step 1: Find a Campaign
                    </h3>
                    <p style={{ color: '#808080' }}>
                      Browse campaigns on the Explore page or visit a direct campaign link shared by the creator.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Step 2: Review Campaign Details
                    </h3>
                    <p style={{ color: '#808080' }}>
                      Read the campaign description, check the funding goal, view recent updates, and see other contributors.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Step 3: Enter Contribution Amount
                    </h3>
                    <p className="mb-3" style={{ color: '#808080' }}>
                      In the "Support This Campaign" card, enter the amount of ETH you want to contribute.
                    </p>
                    <p style={{ color: '#808080', fontSize: '0.875rem', fontStyle: 'italic' }}>
                      Must meet the minimum contribution to become a voting approver!
                    </p>
                  </div>

                  <div className="p-6 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Step 4: Approve Transaction
                    </h3>
                    <p className="mb-3" style={{ color: '#808080' }}>
                      Click "Contribute Now" and approve the transaction in MetaMask.
                    </p>
                    <p style={{ color: '#22c55e' }}>
                      ✓ Your contribution is recorded on the blockchain and you're now a voting member!
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-lg" style={{ background: 'rgba(112, 230, 255, 0.1)', border: '1px solid rgba(112, 230, 255, 0.3)' }}>
                  <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                    What Happens After You Contribute:
                  </h3>
                  <ul className="space-y-2" style={{ color: '#eaeaea', paddingLeft: '1.5rem' }}>
                    <li>✓ Your ETH is securely held in the campaign's smart contract</li>
                    <li>✓ You can vote on all spending requests</li>
                    <li>✓ Your wallet address appears in the contributors list</li>
                    <li>✓ You help the campaign reach its funding goal</li>
                    <li>✓ Funds can only be released through democratic approval</li>
                  </ul>
                </div>

                <div className="flex gap-4 mt-8">
                  <Link href="/explore">
                    <button className="glow-button">
                      Explore Campaigns
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Voting */}
            {activeTab === 'voting' && (
              <div className="modern-card p-8">
                <h2 className="text-3xl mb-6" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Voting & Spending Requests
                </h2>

                <div className="mb-8">
                  <p className="mb-4" style={{ color: '#808080', fontSize: '1.125rem' }}>
                    This is what makes ChainFund different: Every spending decision requires democratic approval from contributors.
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl mb-4" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      For Campaign Managers: Creating Requests
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                        <p className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          1. Navigate to your campaign
                        </p>
                        <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                          Click "View Spending Requests" button
                        </p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                        <p className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          2. Click "+ New Request"
                        </p>
                        <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                          Opens the request creation form
                        </p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                        <p className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          3. Fill in request details:
                        </p>
                        <ul style={{ color: '#808080', fontSize: '0.875rem', paddingLeft: '1.5rem' }}>
                          <li><strong>Description:</strong> What you're buying/paying for</li>
                          <li><strong>Amount:</strong> How much ETH you need</li>
                          <li><strong>Recipient:</strong> Where the funds should go</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                        <p className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          4. Submit and wait for votes
                        </p>
                        <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                          Contributors will now vote to approve or reject your request
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl mb-4" style={{ color: '#22c55e', fontFamily: 'Tomorrow, sans-serif' }}>
                      For Contributors: Voting on Requests
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                        <p className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          1. View pending requests
                        </p>
                        <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                          Go to campaign → "View Spending Requests"
                        </p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                        <p className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          2. Review each request carefully
                        </p>
                        <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                          Check description, amount, and recipient address
                        </p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                        <p className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          3. Click "Approve" if you support it
                        </p>
                        <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                          MetaMask will pop up → Confirm transaction
                        </p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
                        <p className="mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          4. Your vote is recorded!
                        </p>
                        <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                          Once &gt;50% approve, the manager can finalize and funds transfer automatically
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <h3 className="text-lg mb-3" style={{ color: '#ef4444', fontFamily: 'Tomorrow, sans-serif' }}>
                    Important Rules:
                  </h3>
                  <ul className="space-y-2" style={{ color: '#eaeaea', fontSize: '0.875rem', paddingLeft: '1.5rem' }}>
                    <li>✓ Only contributors who met the minimum can vote</li>
                    <li>✓ Each contributor gets ONE vote per request (not weighted by contribution amount)</li>
                    <li>✓ Votes are permanent and cannot be changed</li>
                    <li>✓ Request needs &gt;50% approval to be finalized</li>
                    <li>✓ Once finalized, funds transfer automatically</li>
                    <li>✓ All actions are permanently recorded on blockchain</li>
                  </ul>
                </div>
              </div>
            )}

            {/* FAQ */}
            {activeTab === 'faq' && (
              <div className="modern-card p-8">
                <h2 className="text-3xl mb-6" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  <div className="pb-6" style={{ borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Is my money safe?
                    </h3>
                    <p style={{ color: '#808080' }}>
                      Yes! Your funds are held in a smart contract on the Ethereum blockchain. The campaign manager cannot withdraw funds without majority approval from contributors. All code is open-source and verified.
                    </p>
                  </div>

                  <div className="pb-6" style={{ borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      What if I don't agree with a spending request?
                    </h3>
                    <p style={{ color: '#808080' }}>
                      Simply don't vote to approve it. If &gt;50% of contributors don't approve, the request cannot be finalized and no funds are released.
                    </p>
                  </div>

                  <div className="pb-6" style={{ borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Can I get my money back?
                    </h3>
                    <p style={{ color: '#808080' }}>
                      No, contributions are non-refundable. This is intentional—it ensures campaign managers can plan with confidence. However, funds can only be withdrawn through democratic approval, protecting your investment.
                    </p>
                  </div>

                  <div className="pb-6" style={{ borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      What are gas fees?
                    </h3>
                    <p style={{ color: '#808080' }}>
                      Gas fees are small transaction costs paid to Ethereum miners for processing your transaction. On Sepolia testnet, these are free. On mainnet, they typically cost $5-20 per transaction depending on network congestion.
                    </p>
                  </div>

                  <div className="pb-6" style={{ borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      Is this using real money?
                    </h3>
                    <p style={{ color: '#808080' }}>
                      Currently, ChainFund uses the Sepolia testnet where ETH has no real value. This lets you test all features without financial risk. For a mainnet deployment with real money, the platform would need additional security audits.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                      How is this different from Kickstarter?
                    </h3>
                    <p style={{ color: '#808080' }}>
                      Traditional platforms give creators unilateral control over funds. ChainFund uses smart contracts to enforce democratic governance—every spending decision requires community approval. It's trustless, transparent, and truly community-controlled.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default GuidePage;
