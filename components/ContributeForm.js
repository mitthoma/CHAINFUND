import React, { Component } from 'react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {

  state = {
    value: '',
    errorMessage: '',
    loading: false,
    success: false
  };

  onSubmit = async event => {
    event.preventDefault();

    if (!this.state.value || parseFloat(this.state.value) <= 0) {
      this.setState({ errorMessage: 'Please enter a valid contribution amount' });
      return;
    }

    const campaign = Campaign(this.props.address);

    this.setState({
      loading: true,
      errorMessage: '',
      success: false
    });

    try {
      const accounts = await web3.eth.getAccounts();
      
      if (!accounts || accounts.length === 0) {
        throw new Error('Please connect your wallet first');
      }

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      this.setState({ success: true, value: '' });
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err) {
      this.setState({
        errorMessage: err.message || 'Transaction failed. Please try again.',
        loading: false
      });
      return;
    }

    this.setState({
      loading: false
    });

  };

  render() {
    return (
      <div className="modern-card p-6">
        <h3 className="text-xl mb-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
          Contribute to Campaign
        </h3>
        <p className="mb-6" style={{ color: '#808080', fontSize: '0.875rem' }}>
          Support this campaign and gain voting rights on fund allocation
        </p>

        <form onSubmit={this.onSubmit}>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
              Contribution Amount
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.001"
                min="0"
                placeholder="0.1"
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

          {this.state.errorMessage && (
            <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <p style={{ color: '#ef4444', fontSize: '0.75rem' }}>
                {this.state.errorMessage}
              </p>
            </div>
          )}

          {this.state.success && (
            <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <p style={{ color: '#22c55e', fontSize: '0.75rem', fontFamily: 'Tomorrow, sans-serif' }}>
                ✓ Contribution successful!
              </p>
            </div>
          )}

          <button
            type="submit"
            className="glow-button w-full"
            disabled={this.state.loading || this.state.success}
            style={{ opacity: (this.state.loading || this.state.success) ? 0.6 : 1, padding: '0.75rem' }}
          >
            {this.state.loading ? 'Processing...' : this.state.success ? 'Success!' : 'Contribute Now'}
          </button>
        </form>
      </div>
    )
  }
}

export default ContributeForm;
