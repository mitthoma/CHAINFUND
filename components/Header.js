import React, { Component } from 'react';
import Link from 'next/link';

class Header extends Component {
  state = {
    account: null,
    connecting: false
  };

  async componentDidMount() {
    // Check if already connected
    if (typeof window !== 'undefined' && window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        this.setState({ account: accounts[0] });
      }
    }
  }

  connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        this.setState({ connecting: true });
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({ account: accounts[0], connecting: false });
        // Reload the page to fetch campaigns
        window.location.reload();
      } catch (error) {
        console.error('Error connecting wallet:', error);
        this.setState({ connecting: false });
        alert('Failed to connect wallet. Please try again.');
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to use this app.');
    }
  };

  render() {
    const { account, connecting } = this.state;
    
    return (
      <nav className="w-full border-b border-gray-200" style={{ borderColor: '#eaeaea', background: 'rgba(26, 26, 26, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold" style={{ fontFamily: 'Tomorrow, sans-serif', color: '#eaeaea', textDecoration: 'none' }}>
              CHAINFUND
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/explore" className="hover:text-white transition-colors" style={{ color: '#eaeaea', textDecoration: 'none', fontFamily: 'Tomorrow, sans-serif' }}>
                EXPLORE
              </Link>

              <Link href="/guide" className="hover:text-white transition-colors" style={{ color: '#eaeaea', textDecoration: 'none', fontFamily: 'Tomorrow, sans-serif' }}>
                GUIDE
              </Link>

              <Link href="/campaigns/new" className="hover:text-white transition-colors" style={{ color: '#eaeaea', textDecoration: 'none', fontFamily: 'Tomorrow, sans-serif' }}>
                CREATE
              </Link>

              {account ? (
                <span className="px-4 py-2 rounded-lg" style={{ color: '#eaeaea', border: '1px solid #eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.875rem' }}>
                  {account.substring(0, 6)}...{account.substring(38)}
                </span>
              ) : (
                <button
                  className="glow-button"
                  onClick={this.connectWallet}
                  disabled={connecting}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
