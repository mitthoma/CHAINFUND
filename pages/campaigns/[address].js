import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import Link from 'next/link';

class CampaignShow extends Component {

  static async getInitialProps(props) {
    try {
      const campaign = Campaign(props.query.address);
      const summary = await campaign.methods.getSummary().call();

      return {
        address: props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
        error: null
      };
    } catch (error) {
      return {
        address: props.query.address,
        error: error.message
      };
    }
  }

  renderStats() {
    const {
      balance,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="modern-card p-4">
          <p className="text-xs mb-1" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
            Balance
          </p>
          <p className="text-2xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
            {web3.utils.fromWei(balance, 'ether')}
          </p>
          <p className="text-xs mt-1" style={{ color: '#808080' }}>ETH</p>
        </div>

        <div className="modern-card p-4">
          <p className="text-xs mb-1" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
            Contributors
          </p>
          <p className="text-2xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
            {approversCount}
          </p>
          <p className="text-xs mt-1" style={{ color: '#808080' }}>Voting Members</p>
        </div>

        <div className="modern-card p-4">
          <p className="text-xs mb-1" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
            Requests
          </p>
          <p className="text-2xl" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
            {requestsCount}
          </p>
          <p className="text-xs mt-1" style={{ color: '#808080' }}>Spending Proposals</p>
        </div>

        <div className="modern-card p-4">
          <p className="text-xs mb-1" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
            Minimum
          </p>
          <p className="text-lg" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
            {web3.utils.fromWei(minimumContribution, 'ether')}
          </p>
          <p className="text-xs mt-1" style={{ color: '#808080' }}>ETH to Join</p>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.error) {
      return (
        <Layout>
          <div className="modern-card p-8 text-center">
            <h2 className="text-2xl mb-4" style={{ color: '#ef4444', fontFamily: 'Tomorrow, sans-serif' }}>
              Campaign Not Found
            </h2>
            <p className="mb-6" style={{ color: '#808080' }}>
              {this.props.error}
            </p>
            <Link href="/">
              <button className="glow-button">
                Back to Campaigns
              </button>
            </Link>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div>
          <Link href="/">
            <button className="mb-6 text-sm" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
              ← Back to Campaigns
            </button>
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              Campaign Details
            </h1>
            <p className="text-xs break-all" style={{ color: '#808080', fontFamily: 'monospace' }}>
              {this.props.address}
            </p>
          </div>

          {this.renderStats()}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="modern-card p-6">
                <h3 className="text-xl mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                  Campaign Manager
                </h3>
                <p className="text-xs mb-2" style={{ color: '#808080' }}>
                  This address created the campaign and can propose spending requests
                </p>
                <p className="text-sm break-all p-3 rounded-lg" style={{ color: '#eaeaea', fontFamily: 'monospace', background: 'rgba(234, 234, 234, 0.05)' }}>
                  {this.props.manager}
                </p>
              </div>

              <div className="mt-6">
                <Link href={`/campaigns/${this.props.address}/requests`}>
                  <button className="glow-button w-full lg:w-auto">
                    View Spending Requests
                  </button>
                </Link>
              </div>
            </div>

            <div>
              <ContributeForm address={this.props.address}/>
            </div>
          </div>

          <div className="modern-card p-6">
            <h3 className="text-lg mb-3" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              How This Works
            </h3>
            <ul className="space-y-2" style={{ color: '#808080', fontSize: '0.875rem' }}>
              <li>• Contribute to become a voting member with control over fund allocation</li>
              <li>• Campaign manager proposes spending requests for specific needs</li>
              <li>• Voting members approve or reject each spending request</li>
              <li>• Funds are only released when a majority of members approve</li>
              <li>• Full transparency - all transactions recorded on the blockchain</li>
            </ul>
          </div>
        </div>
      </Layout>
    );
  };
};

export default CampaignShow;
