import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import web3 from '../../ethereum/web3';

class CampaignDetail extends Component {
  state = {
    contributionAmount: '',
    loading: false,
    error: '',
    success: false,
    account: null
  };

  static async getInitialProps(props) {
    const { id } = props.query;
    return { campaignId: id };
  }

  async componentDidMount() {
    // Check for connected wallet
    if (typeof window !== 'undefined' && window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        this.setState({ account: accounts[0] });
      }
    }
  }

  getCampaignData() {
    const campaigns = {
      '1': {
        title: 'Open Source Climate Data Platform',
        description: 'Building a transparent, community-driven platform for climate research data. All code open source, all data accessible to researchers worldwide.',
        fullDescription: `We're creating a revolutionary open-source platform that makes climate research data freely accessible to scientists, policymakers, and concerned citizens worldwide. 

Our mission is to democratize climate science by removing barriers to data access and enabling collaborative research on a global scale.

**What We're Building:**
• Decentralized data storage using IPFS
• Open APIs for easy data integration
• Machine learning tools for climate prediction
• Real-time visualization dashboards
• Mobile apps for citizen science contributions

**Why Blockchain?**
Traditional data platforms are centralized and can be manipulated or restricted. By using blockchain technology and democratic governance, we ensure the data remains open, transparent, and controlled by the community.

**Fund Allocation:**
All spending requests will be voted on by contributors. Proposed uses include:
• Server infrastructure and IPFS nodes
• Development team salaries
• API documentation and developer tools
• Community education and onboarding
• Research partnerships with universities`,
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop',
        goal: '50',
        raised: '32.5',
        contributors: 127,
        daysLeft: 23,
        creator: 'ClimateDAO',
        creatorBio: 'Team of climate scientists and blockchain developers committed to open science',
        tags: ['Open Source', 'Climate', 'Data Science'],
        updates: [
          { date: '2 days ago', title: 'API Documentation Released', content: 'Published comprehensive API docs for beta testers' },
          { date: '5 days ago', title: 'Prototype Demo', content: 'Live demo of the data visualization dashboard at Climate Tech Summit' },
          { date: '12 days ago', title: 'IPFS Integration Complete', content: 'Successfully integrated decentralized storage layer' }
        ],
        backers: [
          { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', amount: '2.5', date: '1 day ago' },
          { address: '0x9f8cCdaFCc39F3c7D6EBf637c9151673CBc36b88', amount: '1.0', date: '3 days ago' },
          { address: '0x1234567890123456789012345678901234567890', amount: '5.0', date: '5 days ago' }
        ]
      },
      '2': {
        title: 'Community Solar Energy Cooperative',
        description: 'Installing solar panels on community buildings. All members vote on installation priorities and share the generated power. Democratic energy for everyone.',
        fullDescription: `Join us in creating the first truly democratic solar energy cooperative. Every contributor gets voting rights on installation priorities, energy distribution, and operational decisions.

**The Vision:**
Transform our community into a model of sustainable, democratically-controlled renewable energy. No corporate middlemen, no profit extraction—just clean energy owned by the people who use it.

**Installation Plan:**
Phase 1: Community center and library (30 kW)
Phase 2: Low-income housing complex (50 kW)
Phase 3: Public schools (40 kW)
Phase 4: Local businesses (60 kW)

**Democratic Governance:**
• Vote on installation priorities
• Approve maintenance expenses
• Decide on energy distribution
• Set membership requirements

**Financial Model:**
Members receive energy credits proportional to their contribution. Excess energy is sold back to the grid, with profits reinvested per community vote.

**Impact:**
• 180 kW total capacity
• 500+ households powered
• 120 tons CO2 offset annually
• $80k+ in community energy savings`,
        category: 'Environment',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&auto=format&fit=crop',
        goal: '100',
        raised: '78.3',
        contributors: 234,
        daysLeft: 12,
        creator: 'SolarCoop',
        creatorBio: 'Community organizers and renewable energy engineers building local power',
        tags: ['Renewable Energy', 'Community', 'Infrastructure'],
        updates: [
          { date: '1 day ago', title: 'Site Survey Completed', content: 'Engineering team completed structural assessments of all Phase 1 buildings' },
          { date: '4 days ago', title: 'Permits Approved', content: 'City council approved all installation permits for Phase 1 and 2' },
          { date: '8 days ago', title: 'Equipment Vendor Selected', content: 'Community voted to work with SunPower for panel procurement' }
        ],
        backers: [
          { address: '0x8Ab3c54dE9876c54E32198765432BCD123456789', amount: '10.0', date: '2 hours ago' },
          { address: '0x234F67Ab89012Cd345678EfGh901234567890123', amount: '3.5', date: '1 day ago' },
          { address: '0x567890AbCdEf1234567890AbCdEf1234567890Ab', amount: '7.2', date: '2 days ago' }
        ]
      },
      '3': {
        title: 'Decentralized Education Platform',
        description: 'Creating free, peer-to-peer educational content for underserved communities. Contributors approve all content and distribution decisions democratically.',
        fullDescription: `Education should be free, accessible, and controlled by communities—not corporations. We're building a decentralized platform where quality educational content is created by and for the people who need it most.

**What Makes Us Different:**
Unlike traditional MOOCs that extract data and charge fees, our platform is:
• Completely free forever
• Ad-free and privacy-respecting
• Community-controlled content curation
• Peer-to-peer knowledge sharing
• Blockchain-verified credentials

**Content Focus:**
• Basic literacy and numeracy
• Digital skills and coding
• Entrepreneurship and business
• Trades and vocational training
• Local language adaptations

**How It Works:**
1. Educators submit course proposals
2. Community votes on content priorities
3. Learners access everything for free
4. Peer review ensures quality
5. Blockchain credentials prove completion

**Democratic Governance:**
Contributors vote on:
• Which courses to fund
• Content quality standards
• Platform feature priorities
• Educator compensation
• Partnership decisions

**Target Communities:**
• Rural areas with limited school access
• Low-income urban neighborhoods
• Refugee populations
• Indigenous communities
• Anyone seeking knowledge`,
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop',
        goal: '25',
        raised: '18.7',
        contributors: 89,
        daysLeft: 31,
        creator: 'EduChain',
        creatorBio: 'Educators and technologists democratizing access to quality education',
        tags: ['Education', 'Web3', 'Social Impact'],
        updates: [
          { date: '3 days ago', title: 'First Course Launch', content: 'Intro to Programming course now live with 500+ enrolled students' },
          { date: '7 days ago', title: 'Partnership Announcement', content: 'Partnered with 3 NGOs to reach underserved communities' },
          { date: '14 days ago', title: 'Platform Beta Live', content: 'Beta platform launched with initial course catalog' }
        ],
        backers: [
          { address: '0xAbCdEf1234567890AbCdEf1234567890AbCdEf12', amount: '1.5', date: '6 hours ago' },
          { address: '0x4567890AbCdEf1234567890AbCdEf1234567890A', amount: '0.8', date: '2 days ago' },
          { address: '0x7890AbCdEf1234567890AbCdEf1234567890AbCd', amount: '2.0', date: '4 days ago' }
        ]
      }
    };

    return campaigns[this.props.campaignId] || null;
  }

  handleContribute = async (e) => {
    e.preventDefault();

    if (!this.state.account) {
      this.setState({ error: 'Please connect your MetaMask wallet first' });
      return;
    }

    if (!this.state.contributionAmount || parseFloat(this.state.contributionAmount) <= 0) {
      this.setState({ error: 'Please enter a valid contribution amount' });
      return;
    }

    this.setState({ loading: true, error: '', success: false });

    try {
      // Simulate blockchain transaction for demo campaigns
      // In production, this would interact with the actual smart contract
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.setState({ 
        success: true, 
        loading: false,
        contributionAmount: ''
      });

      setTimeout(() => {
        this.setState({ success: false });
      }, 3000);

    } catch (err) {
      this.setState({ 
        error: err.message || 'Transaction failed. Please try again.',
        loading: false 
      });
    }
  };

  render() {
    const campaign = this.getCampaignData();
    const { contributionAmount, loading, error, success, account } = this.state;

    if (!campaign) {
      return (
        <Layout>
          <div className="modern-card p-8 text-center">
            <h2 className="text-2xl mb-4" style={{ color: '#ef4444', fontFamily: 'Tomorrow, sans-serif' }}>
              Campaign Not Found
            </h2>
            <Link href="/explore">
              <button className="glow-button">Back to Explore</button>
            </Link>
          </div>
        </Layout>
      );
    }

    const progress = (parseFloat(campaign.raised) / parseFloat(campaign.goal)) * 100;

    return (
      <Layout>
        <div>
          <Link href="/explore">
            <button className="mb-6 text-sm" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
              ← Back to Explore
            </button>
          </Link>

          {/* Hero Image */}
          <div 
            className="h-96 bg-cover bg-center relative rounded-lg overflow-hidden mb-8"
            style={{ backgroundImage: `url(${campaign.image})` }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.9))' }} />
            <div className="absolute bottom-8 left-8">
              <span className="px-3 py-1 rounded text-xs mb-3 inline-block" style={{ background: 'rgba(234, 234, 234, 0.2)', backdropFilter: 'blur(10px)', color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                {campaign.category}
              </span>
              <h1 className="text-4xl md:text-5xl mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                {campaign.title}
              </h1>
              <p style={{ color: '#eaeaea', fontSize: '1.125rem' }}>
                by {campaign.creator}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Progress */}
              <div className="modern-card p-6 mb-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-3xl mb-1" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                      {campaign.raised} ETH
                    </p>
                    <p style={{ color: '#808080' }}>raised of {campaign.goal} ETH goal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl mb-1" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                      {campaign.contributors}
                    </p>
                    <p style={{ color: '#808080' }}>contributors</p>
                  </div>
                </div>

                <div className="w-full h-3 rounded-full mb-4" style={{ background: 'rgba(234, 234, 234, 0.1)' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(progress, 100)}%`,
                      background: 'linear-gradient(to right, #70e6ff, #70ffdb)'
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <span style={{ color: '#22c55e', fontFamily: 'Tomorrow, sans-serif' }}>
                    {Math.round(progress)}% funded
                  </span>
                  <span style={{ color: '#808080' }}>
                    {campaign.daysLeft} days left
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-6">
                {campaign.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded"
                    style={{ background: 'rgba(112, 230, 255, 0.1)', color: '#70e6ff', fontSize: '0.875rem' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="modern-card p-8 mb-6">
                <h2 className="text-2xl mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  About This Campaign
                </h2>
                <div style={{ color: '#808080', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                  {campaign.fullDescription}
                </div>
              </div>

              {/* Updates */}
              <div className="modern-card p-6 mb-6">
                <h3 className="text-xl mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Campaign Updates
                </h3>
                <div className="space-y-4">
                  {campaign.updates.map((update, index) => (
                    <div key={index} className="pb-4" style={{ borderBottom: index < campaign.updates.length - 1 ? '1px solid rgba(234, 234, 234, 0.1)' : 'none' }}>
                      <div className="flex justify-between mb-2">
                        <h4 style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                          {update.title}
                        </h4>
                        <span style={{ color: '#808080', fontSize: '0.875rem' }}>
                          {update.date}
                        </span>
                      </div>
                      <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                        {update.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Backers */}
              <div className="modern-card p-6">
                <h3 className="text-xl mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Recent Contributors
                </h3>
                <div className="space-y-3">
                  {campaign.backers.map((backer, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.03)' }}>
                      <div>
                        <p style={{ color: '#eaeaea', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                          {backer.address.substring(0, 6)}...{backer.address.substring(38)}
                        </p>
                        <p style={{ color: '#808080', fontSize: '0.75rem' }}>
                          {backer.date}
                        </p>
                      </div>
                      <span style={{ color: '#22c55e', fontFamily: 'Tomorrow, sans-serif' }}>
                        {backer.amount} ETH
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Contribute Card */}
              <div className="modern-card p-6 mb-6 sticky top-8">
                <h3 className="text-xl mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Support This Campaign
                </h3>

                {!account ? (
                  <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(112, 230, 255, 0.1)', border: '1px solid rgba(112, 230, 255, 0.3)' }}>
                    <p style={{ color: '#70e6ff', fontSize: '0.875rem' }}>
                      Connect your MetaMask wallet to contribute
                    </p>
                  </div>
                ) : (
                  <form onSubmit={this.handleContribute}>
                    <div className="mb-4">
                      <label className="block mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                        Contribution Amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.001"
                          min="0"
                          placeholder="1.0"
                          className="modern-input w-full"
                          value={contributionAmount}
                          onChange={(e) => this.setState({ contributionAmount: e.target.value })}
                          disabled={loading}
                          style={{ paddingRight: '4rem' }}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                          ETH
                        </span>
                      </div>
                    </div>

                    {error && (
                      <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        <p style={{ color: '#ef4444', fontSize: '0.75rem' }}>{error}</p>
                      </div>
                    )}

                    {success && (
                      <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                        <p style={{ color: '#22c55e', fontSize: '0.75rem', fontFamily: 'Tomorrow, sans-serif' }}>
                          ✓ Contribution successful! (Demo mode)
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="glow-button w-full mb-4"
                      disabled={loading || success}
                      style={{ opacity: (loading || success) ? 0.6 : 1 }}
                    >
                      {loading ? 'Processing...' : success ? 'Success!' : 'Contribute Now'}
                    </button>

                    <p style={{ color: '#808080', fontSize: '0.75rem', textAlign: 'center' }}>
                      Demo mode: No real ETH will be transferred
                    </p>
                  </form>
                )}
              </div>

              {/* Creator Card */}
              <div className="modern-card p-6">
                <h3 className="text-lg mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Campaign Creator
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #70e6ff, #70ffdb)' }}
                  >
                    <span style={{ fontFamily: 'Tomorrow, sans-serif', fontSize: '1rem', color: '#000', fontWeight: 'bold' }}>
                      {campaign.creator.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                      {campaign.creator}
                    </p>
                    <p style={{ color: '#808080', fontSize: '0.75rem' }}>
                      Campaign Manager
                    </p>
                  </div>
                </div>
                <p style={{ color: '#808080', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  {campaign.creatorBio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CampaignDetail;
