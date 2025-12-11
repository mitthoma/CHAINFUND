import React, {Component} from 'react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import Link from 'next/link';


class CampaignIndex extends Component {

  static async getInitialProps() {
    try {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      return { campaigns, error: null };
    } catch (error) {
      // If blockchain is not available, return empty campaigns
      return { campaigns: [], error: error.message };
    }
  }

  renderCampaigns() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {this.props.campaigns.map(address => (
          <div key={address} className="modern-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded text-xs" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', fontFamily: 'Tomorrow, sans-serif' }}>
                ✓ Active
              </span>
            </div>
            <p className="text-xs mb-2" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
              Contract Address
            </p>
            <p className="text-xs mb-6 break-all" style={{ color: '#eaeaea', fontFamily: 'monospace', opacity: 0.8 }}>
              {address}
            </p>
            <Link href={`/campaigns/${address}`}>
              <button className="glow-button w-full" style={{ padding: '0.75rem' }}>
                View Campaign →
              </button>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const hasWallet = !this.props.error;
    const hasCampaigns = this.props.campaigns.length > 0;

    return (
      <Layout>
        <div>
          {/* Hero Section */}
          <div className="text-center mb-16 py-12">
            <h1 className="text-5xl md:text-6xl mb-6" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', lineHeight: '1.2' }}>
              Transparent Crowdfunding.
              <br />
              <span style={{ background: 'linear-gradient(to right, #70e6ff, #70ffdb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Democratic Control.
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: '#808080', lineHeight: '1.6' }}>
              ChainFund eliminates trust issues in crowdfunding through blockchain technology.
              Every transaction is transparent. Every spending decision requires community approval.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/campaigns/new">
                <button className="glow-button text-lg" style={{ padding: '1rem 2rem' }}>
                  Launch Campaign
                </button>
              </Link>
              <Link href="/explore">
                <button 
                  className="px-8 py-4 rounded-lg text-lg"
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

          {/* Problem/Solution Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="modern-card p-8">
              <h3 className="text-2xl mb-4" style={{ color: '#ef4444', fontFamily: 'Tomorrow, sans-serif' }}>
                The Problem
              </h3>
              <ul className="space-y-3" style={{ color: '#808080' }}>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>✕</span>
                  <span>Traditional platforms give creators unilateral control over funds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>✕</span>
                  <span>No transparency into how money is actually spent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>✕</span>
                  <span>Contributors must blindly trust campaign managers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>✕</span>
                  <span>High platform fees (5-10%) eat into funding</span>
                </li>
              </ul>
            </div>

            <div className="modern-card p-8">
              <h3 className="text-2xl mb-4" style={{ color: '#22c55e', fontFamily: 'Tomorrow, sans-serif' }}>
                Our Solution
              </h3>
              <ul className="space-y-3" style={{ color: '#808080' }}>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
                  <span>Contributors vote on every spending request</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
                  <span>100% transparent - all transactions on blockchain</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
                  <span>Smart contracts enforce democratic approval</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
                  <span>Only Ethereum gas fees - no platform commission</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl mb-8 text-center" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="modern-card p-6 text-center">
                <div className="text-4xl mb-4">01</div>
                <h4 className="text-xl mb-3" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Create Campaign
                </h4>
                <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                  Deploy your campaign as a smart contract. Set minimum contribution to become a voting member.
                </p>
              </div>
              <div className="modern-card p-6 text-center">
                <div className="text-4xl mb-4">02</div>
                <h4 className="text-xl mb-3" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Get Contributors
                </h4>
                <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                  Share your campaign. Contributors who meet the minimum become voting approvers.
                </p>
              </div>
              <div className="modern-card p-6 text-center">
                <div className="text-4xl mb-4">03</div>
                <h4 className="text-xl mb-3" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Democratic Spending
                </h4>
                <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                  Propose spending requests. Funds only release when majority of contributors approve.
                </p>
              </div>
            </div>
          </div>

          {/* Why Blockchain */}
          <div className="modern-card p-8 mb-16">
            <h2 className="text-3xl mb-6" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              Why Blockchain Technology?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                  Immutable Trust
                </h4>
                <p style={{ color: '#808080' }}>
                  Smart contracts on Ethereum ensure rules can't be changed. Once deployed, the campaign operates exactly as programmed—no backdoors, no exceptions.
                </p>
              </div>
              <div>
                <h4 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                  Complete Transparency
                </h4>
                <p style={{ color: '#808080' }}>
                  Every contribution, every vote, every transaction is permanently recorded on the public blockchain. Anyone can verify exactly how funds are used.
                </p>
              </div>
              <div>
                <h4 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                  No Middleman
                </h4>
                <p style={{ color: '#808080' }}>
                  Direct peer-to-peer transactions. No platform can freeze accounts, change terms, or take excessive fees. You control your funds through code, not trust.
                </p>
              </div>
              <div>
                <h4 className="text-lg mb-3" style={{ color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                  Enforced Democracy
                </h4>
                <p style={{ color: '#808080' }}>
                  Voting isn't optional—it's mandatory. Smart contracts automatically enforce majority approval. No centralized authority can override the community.
                </p>
              </div>
            </div>
          </div>

          {/* Active Campaigns Section */}
          {hasWallet && (
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                    Active Campaigns
                  </h2>
                  <p style={{ color: '#808080' }}>
                    {hasCampaigns ? `${this.props.campaigns.length} live campaign${this.props.campaigns.length === 1 ? '' : 's'}` : 'No campaigns yet'}
                  </p>
                </div>
                <Link href="/campaigns/new">
                  <button className="glow-button">
                    + New Campaign
                  </button>
                </Link>
              </div>
              
              {hasCampaigns ? (
                this.renderCampaigns()
              ) : (
                <div className="modern-card p-12 text-center">
                  <p className="text-xl mb-4" style={{ color: '#eaeaea' }}>
                    Be the first to launch a campaign
                  </p>
                  <p style={{ color: '#808080' }}>
                    Create the inaugural ChainFund campaign and demonstrate the power of transparent, democratic crowdfunding.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Connect Wallet CTA */}
          {!hasWallet && (
            <div className="modern-card p-12 text-center">
              <h3 className="text-2xl mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                Ready to Get Started?
              </h3>
              <p className="mb-6" style={{ color: '#808080' }}>
                Connect your MetaMask wallet to launch campaigns, contribute to projects, and participate in democratic fund governance.
              </p>
              <p className="text-sm" style={{ color: '#808080' }}>
                Click <strong style={{ color: '#eaeaea' }}>"Connect Wallet"</strong> in the header above to begin.
              </p>
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex;
