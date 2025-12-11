import React, { Component } from 'react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Router from 'next/router';
import Link from 'next/link';


class CampaignNew extends Component {

  state = {
    minimumContribution: '',
    minimumInEth: '',
    errorMessage: '',
    loading: false,
    success: false
  }

  onEthChange = (value) => {
    if (value === '') {
      this.setState({ minimumInEth: '', minimumContribution: '' });
      return;
    }
    const ethValue = parseFloat(value);
    if (!isNaN(ethValue) && ethValue >= 0) {
      const weiValue = web3.utils.toWei(value, 'ether');
      this.setState({ minimumInEth: value, minimumContribution: weiValue });
    }
  };

  onSubmit = async (event) => {
    event.preventDefault();

    if (!this.state.minimumContribution || parseFloat(this.state.minimumInEth) <= 0) {
      this.setState({ errorMessage: 'Please enter a valid minimum contribution amount' });
      return;
    }

    this.setState({ loading: true, errorMessage: '', success: false });

    try {
      const accounts = await web3.eth.getAccounts();
      
      if (!accounts || accounts.length === 0) {
        throw new Error('Please connect your wallet first');
      }

      await factory.methods.createCampaign(this.state.minimumContribution).send({
        from: accounts[0],
      });

      this.setState({ success: true });
      
      setTimeout(() => {
        Router.push('/');
      }, 1500);

    } catch (err) {
      console.error(err);
      this.setState({ 
        errorMessage: err.message || 'Transaction failed. Please try again.',
        loading: false 
      });
      return;
    }

    this.setState({ loading: false });
  };

render() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Link href="/">
          <button className="mb-6 text-sm" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
            ← Back to Campaigns
          </button>
        </Link>

        <div className="modern-card p-8">
          <h1 className="text-3xl mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
            Create New Campaign
          </h1>
          <p className="mb-8" style={{ color: '#808080', fontSize: '0.875rem' }}>
            Launch a transparent, blockchain-powered crowdfunding campaign with democratic fund control
          </p>

          <form onSubmit={this.onSubmit}>
            <div className="mb-6">
              <label className="block mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                Minimum Contribution Amount
              </label>
              <p className="mb-3" style={{ color: '#808080', fontSize: '0.75rem' }}>
                Set the minimum amount contributors must pledge to become voting members of your campaign
              </p>
              <div className="relative">
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  placeholder="0.01"
                  className="modern-input w-full"
                  value={this.state.minimumInEth}
                  onChange={(e) => this.onEthChange(e.target.value)}
                  disabled={this.state.loading}
                  style={{ paddingRight: '4rem' }}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                  ETH
                </span>
              </div>
              {this.state.minimumContribution && (
                <p className="mt-2" style={{ color: '#808080', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  = {this.state.minimumContribution} wei
                </p>
              )}
            </div>

            {this.state.errorMessage && (
              <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                  {this.state.errorMessage}
                </p>
              </div>
            )}

            {this.state.success && (
              <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                <p style={{ color: '#22c55e', fontSize: '0.875rem', fontFamily: 'Tomorrow, sans-serif' }}>
                  ✓ Campaign created successfully! Redirecting...
                </p>
              </div>
            )}

            <button
              type="submit"
              className="glow-button w-full"
              disabled={this.state.loading || this.state.success}
              style={{ opacity: (this.state.loading || this.state.success) ? 0.6 : 1 }}
            >
              {this.state.loading ? 'Creating Campaign...' : this.state.success ? 'Success!' : 'Create Campaign'}
            </button>
          </form>

          <div className="mt-8 p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
            <h3 className="text-sm mb-3" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              How It Works
            </h3>
            <ul className="space-y-2" style={{ color: '#808080', fontSize: '0.75rem' }}>
              <li>• Your campaign will be deployed as a smart contract on the blockchain</li>
              <li>• Contributors who meet the minimum become voting approvers</li>
              <li>• You can create spending requests that require approver votes</li>
              <li>• Funds are only released when majority approves your request</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

};

export default CampaignNew;
