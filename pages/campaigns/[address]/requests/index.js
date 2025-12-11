import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(

      Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call()
      })

    );

    return { address, requests, requestCount, approversCount };
  }

  renderRows(){
    return this.props.requests.map((request, index) => {
      return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
              />
    });
  }

  render() {
    return(
      <Layout>
        <div>
          <Link href={`/campaigns/${this.props.address}`}>
            <button className="mb-6 text-sm" style={{ color: '#808080', fontFamily: 'Tomorrow, sans-serif' }}>
              ← Back to Campaign
            </button>
          </Link>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl mb-2" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
                Spending Requests
              </h1>
              <p style={{ color: '#808080', fontSize: '0.875rem' }}>
                {this.props.requestCount} {this.props.requestCount === '1' ? 'request' : 'requests'} found
              </p>
            </div>
            <Link href={`/campaigns/${this.props.address}/requests/new`}>
              <button className="glow-button">
                + New Request
              </button>
            </Link>
          </div>

          {this.props.requestCount === '0' ? (
            <div className="modern-card p-8 text-center">
              <p style={{ color: '#808080' }}>No spending requests yet. Create the first one!</p>
            </div>
          ) : (
            <div className="modern-card overflow-hidden">
              <table className="w-full">
                <thead style={{ background: 'rgba(26, 26, 26, 0.9)' }}>
                  <tr>
                    <th className="p-4 text-left" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.75rem' }}>ID</th>
                    <th className="p-4 text-left" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.75rem' }}>Description</th>
                    <th className="p-4 text-left" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.75rem' }}>Amount</th>
                    <th className="p-4 text-left" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.75rem' }}>Recipient</th>
                    <th className="p-4 text-left" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.75rem' }}>Approvals</th>
                    <th className="p-4 text-left" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif', fontSize: '0.75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderRows()}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>
    );
  };

}

export default RequestIndex;
