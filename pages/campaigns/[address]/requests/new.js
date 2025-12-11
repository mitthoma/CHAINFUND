import React, { Component } from 'react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import Link from 'next/link';
import Router from 'next/router';
import Layout from '../../../components/Layout';

class RequestNew extends Component {

  state = {
    value: '',
    description: '',
    recipient: '',
    loading: false,
    errorMessage: '',
    success: false
  };

  static async getInitialProps(props){
    const { address } = props.query;

    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();

    const { description, value, recipient } = this.state;

    // Validation
    if (!description || description.trim() === '') {
      this.setState({ errorMessage: 'Please provide a description for this request' });
      return;
    }
    if (!value || parseFloat(value) <= 0) {
      this.setState({ errorMessage: 'Please enter a valid amount' });
      return;
    }
    if (!recipient || !recipient.match(/^0x[a-fA-F0-9]{40}$/)) {
      this.setState({ errorMessage: 'Please enter a valid Ethereum address for the recipient' });
      return;
    }

    this.setState({ loading: true, errorMessage: '', success: false });

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      
      if (!accounts || accounts.length === 0) {
        throw new Error('Please connect your wallet first');
      }

      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({
        from: accounts[0]
      });

      this.setState({ success: true });
      
      setTimeout(() => {
        Router.push(`/campaigns/${this.props.address}/requests`);
      }, 1500);

    } catch (err) {
      this.setState({ 
        errorMessage: err.message || 'Transaction failed. Please try again.',
        loading: false 
      });
      return;
    }

    this.setState({ loading: false })
  };

  render(){
    return(
      <Layout>
        <div className="max-w-2xl mx-auto">
          <Link href={`/campaigns/${this.props.address}/requests`}>
            <button className="mb-6 text-sm" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
              ← Back to Requests
            </button>
          </Link>

          <div className="modern-card p-8">
            <h1 className="text-3xl mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              Create Spending Request
            </h1>
            <p className="mb-8" style={{ color: '#808080', fontSize: '0.875rem' }}>
              Propose a spending request that requires approval from campaign contributors
            </p>

            <form onSubmit={this.onSubmit}>
              <div className="mb-6">
                <label className="block mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                  Description
                </label>
                <p className="mb-3" style={{ color: '#808080', fontSize: '0.75rem' }}>
                  Explain what this spending request is for and why it's needed
                </p>
                <textarea
                  className="modern-input w-full"
                  rows="4"
                  placeholder="e.g., Purchase equipment for product development"
                  value={this.state.description}
                  onChange={event => this.setState({ description: event.target.value })}
                  disabled={this.state.loading}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                  Amount Requested
                </label>
                <p className="mb-3" style={{ color: '#808080', fontSize: '0.75rem' }}>
                  How much ETH do you need for this expense?
                </p>
                <div className="relative">
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    placeholder="0.5"
                    className="modern-input w-full"
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value })}
                    disabled={this.state.loading}
                    style={{ paddingRight: '4rem' }}
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                    ETH
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                  Recipient Address
                </label>
                <p className="mb-3" style={{ color: '#808080', fontSize: '0.75rem' }}>
                  Ethereum address where the funds will be sent if approved
                </p>
                <input
                  type="text"
                  placeholder="0x..."
                  className="modern-input w-full"
                  value={this.state.recipient}
                  onChange={event => this.setState({ recipient: event.target.value })}
                  disabled={this.state.loading}
                  style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                />
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
                    ✓ Request created successfully! Redirecting...
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="glow-button w-full"
                disabled={this.state.loading || this.state.success}
                style={{ opacity: (this.state.loading || this.state.success) ? 0.6 : 1 }}
              >
                {this.state.loading ? 'Creating Request...' : this.state.success ? 'Success!' : 'Create Request'}
              </button>
            </form>

            <div className="mt-8 p-4 rounded-lg" style={{ background: 'rgba(234, 234, 234, 0.05)' }}>
              <h3 className="text-sm mb-3" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                Approval Process
              </h3>
              <ul className="space-y-2" style={{ color: '#808080', fontSize: '0.75rem' }}>
                <li>• Contributors will vote to approve or reject this request</li>
                <li>• Request needs majority approval (>50%) to be finalized</li>
                <li>• Once finalized, funds are automatically sent to the recipient</li>
                <li>• All transactions are transparent and recorded on the blockchain</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

}

export default RequestNew;
