import React, { Component } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import factory from '../ethereum/factory';

class ExploreCampaigns extends Component {

  state = {
    activeFilter: 'All',
    filteredCampaigns: []
  };

  static async getInitialProps() {
    try {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      return { campaigns, error: null };
    } catch (error) {
      return { campaigns: [], error: error.message };
    }
  }

  componentDidMount() {
    this.setState({ filteredCampaigns: this.getMockCampaigns() });
  }

  handleFilterChange = (category) => {
    this.setState({ activeFilter: category }, () => {
      const allCampaigns = this.getMockCampaigns();
      const filtered = category === 'All' 
        ? allCampaigns 
        : allCampaigns.filter(camp => camp.category === category);
      
      this.setState({ filteredCampaigns: filtered });
    });
  };

  // Mock campaigns for demo purposes
  getMockCampaigns() {
    return [
      {
        id: '1',
        title: 'Open Source Climate Data Platform',
        description: 'Building a transparent, community-driven platform for climate research data. All code open source, all data accessible to researchers worldwide.',
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
        goal: '50',
        raised: '32.5',
        contributors: 127,
        daysLeft: 23,
        creator: 'ClimateDAO',
        address: '0x...',
        tags: ['Open Source', 'Climate', 'Data Science']
      },
      {
        id: '2',
        title: 'Community Solar Energy Cooperative',
        description: 'Installing solar panels on community buildings. All members vote on installation priorities and share the generated power. Democratic energy for everyone.',
        category: 'Environment',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
        goal: '100',
        raised: '78.3',
        contributors: 234,
        daysLeft: 12,
        creator: 'SolarCoop',
        address: '0x...',
        tags: ['Renewable Energy', 'Community', 'Infrastructure']
      },
      {
        id: '3',
        title: 'Decentralized Education Platform',
        description: 'Creating free, peer-to-peer educational content for underserved communities. Contributors approve all content and distribution decisions democratically.',
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
        goal: '25',
        raised: '18.7',
        contributors: 89,
        daysLeft: 31,
        creator: 'EduChain',
        address: '0x...',
        tags: ['Education', 'Web3', 'Social Impact']
      }
    ];
  }

  renderMockCampaigns() {
    const { filteredCampaigns } = this.state;

    return filteredCampaigns.map((campaign, index) => {
      const progress = (parseFloat(campaign.raised) / parseFloat(campaign.goal)) * 100;
      
      return (
        <div 
          key={campaign.id} 
          className="modern-card overflow-hidden hover:scale-[1.02] transition-all duration-300"
          style={{
            animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
          }}
        >
          <div 
            className="h-48 bg-cover bg-center relative"
            style={{ 
              backgroundImage: `url(${campaign.image})`,
              backgroundSize: 'cover'
            }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' }} />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 rounded text-xs" style={{ background: 'rgba(234, 234, 234, 0.2)', backdropFilter: 'blur(10px)', color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                {campaign.category}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              {campaign.title}
            </h3>
            <p className="mb-4 line-clamp-2" style={{ color: '#808080', fontSize: '0.875rem' }}>
              {campaign.description}
            </p>

            <div className="flex items-center gap-2 mb-4">
              {campaign.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 rounded text-xs"
                  style={{ background: 'rgba(112, 230, 255, 0.1)', color: '#70e6ff' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                  {campaign.raised} ETH
                </span>
                <span style={{ color: '#808080', fontSize: '0.875rem' }}>
                  of {campaign.goal} ETH goal
                </span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: 'rgba(234, 234, 234, 0.1)' }}>
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(progress, 100)}%`,
                    background: 'linear-gradient(to right, #70e6ff, #70ffdb)'
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
              <div>
                <p style={{ color: '#808080', fontSize: '0.75rem' }}>Contributors</p>
                <p style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                  {campaign.contributors}
                </p>
              </div>
              <div>
                <p style={{ color: '#808080', fontSize: '0.75rem' }}>Funded</p>
                <p style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                  {Math.round(progress)}%
                </p>
              </div>
              <div>
                <p style={{ color: '#808080', fontSize: '0.75rem' }}>Days Left</p>
                <p style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                  {campaign.daysLeft}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #70e6ff, #70ffdb)' }}
                >
                  <span style={{ fontFamily: 'Tomorrow, sans-serif', fontSize: '0.75rem', color: '#000' }}>
                    {campaign.creator.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <span style={{ color: '#eaeaea', fontSize: '0.875rem' }}>
                  {campaign.creator}
                </span>
              </div>
              <Link href={`/campaign/${campaign.id}`}>
                <button 
                  className="px-4 py-2 rounded-lg text-sm"
                  style={{ 
                    background: 'rgba(234, 234, 234, 0.1)', 
                    border: '1px solid #eaeaea',
                    color: '#eaeaea',
                    fontFamily: 'Tomorrow, sans-serif'
                  }}
                >
                  View Campaign →
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  renderRealCampaigns() {
    return this.props.campaigns.map(address => (
      <div key={address} className="modern-card p-6 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded text-xs" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', fontFamily: 'Tomorrow, sans-serif' }}>
            ✓ Live on Chain
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
    ));
  }

  render() {
    const hasRealCampaigns = this.props.campaigns.length > 0;
    const { activeFilter, filteredCampaigns } = this.state;

    return (
      <Layout>
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        <div>
          <div className="mb-12">
            <h1 className="text-4xl mb-3" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              Explore Campaigns
            </h1>
            <p style={{ color: '#808080', fontSize: '1.125rem' }}>
              Discover transparent, community-governed crowdfunding projects
            </p>
          </div>

          {/* Filter/Category Pills */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {['All', 'Technology', 'Environment', 'Education', 'Social Impact', 'Infrastructure'].map(category => (
              <button
                key={category}
                onClick={() => this.handleFilterChange(category)}
                className="px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300"
                style={{
                  background: category === activeFilter ? 'rgba(234, 234, 234, 0.1)' : 'transparent',
                  border: category === activeFilter ? '1px solid #eaeaea' : '1px solid rgba(234, 234, 234, 0.2)',
                  color: category === activeFilter ? '#eaeaea' : '#808080',
                  fontFamily: 'Tomorrow, sans-serif',
                  fontSize: '0.875rem',
                  transform: category === activeFilter ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="modern-card p-4">
              <p className="text-xs mb-1" style={{ color: '#808080' }}>Showing</p>
              <p className="text-2xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                {filteredCampaigns.length}
              </p>
            </div>
            <div className="modern-card p-4">
              <p className="text-xs mb-1" style={{ color: '#808080' }}>Total Funded</p>
              <p className="text-2xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                129.5 ETH
              </p>
            </div>
            <div className="modern-card p-4">
              <p className="text-xs mb-1" style={{ color: '#808080' }}>Contributors</p>
              <p className="text-2xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                450
              </p>
            </div>
            <div className="modern-card p-4">
              <p className="text-xs mb-1" style={{ color: '#808080' }}>Success Rate</p>
              <p className="text-2xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                87%
              </p>
            </div>
          </div>

          {/* Example Campaigns Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                Featured Campaigns
              </h2>
              <span className="px-3 py-1 rounded text-xs" style={{ background: 'rgba(112, 230, 255, 0.1)', color: '#70e6ff', fontFamily: 'Tomorrow, sans-serif' }}>
                Demo Examples
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {this.renderMockCampaigns()}
            </div>
          </div>

          {/* Real Campaigns Section */}
          {hasRealCampaigns && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Live on Blockchain
                </h2>
                <span className="px-3 py-1 rounded text-xs" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', fontFamily: 'Tomorrow, sans-serif' }}>
                  {this.props.campaigns.length} Active
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {this.renderRealCampaigns()}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="modern-card p-12 text-center mt-12">
            <h3 className="text-2xl mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              Ready to Launch Your Campaign?
            </h3>
            <p className="mb-6 max-w-2xl mx-auto" style={{ color: '#808080' }}>
              Join the future of transparent crowdfunding. Deploy your campaign as a smart contract and let your community control the funds democratically.
            </p>
            <Link href="/campaigns/new">
              <button className="glow-button text-lg" style={{ padding: '1rem 2rem' }}>
                Create Campaign
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ExploreCampaigns;
