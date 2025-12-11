import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {

  onApprove = async () => {

    const accounts = await web3.eth.getAccounts();

    const campaign = Campaign(this.props.address);
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });

  };

  onFinalize = async () => {

    const accounts = await web3.eth.getAccounts();

    const campaign = Campaign(this.props.address);
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });

  };

  render(){
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    const isComplete = request.complete;

    const rowStyle = {
      borderBottom: '1px solid rgba(234, 234, 234, 0.1)',
      background: isComplete ? 'rgba(34, 197, 94, 0.05)' : readyToFinalize ? 'rgba(234, 234, 234, 0.03)' : 'transparent',
      opacity: isComplete ? 0.6 : 1
    };

    return(
      <tr style={rowStyle}>
        <td className="p-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
          #{id}
        </td>
        <td className="p-4" style={{ color: '#eaeaea' }}>
          {request.description}
        </td>
        <td className="p-4" style={{ color: '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
          {web3.utils.fromWei(request.value, 'ether')} ETH
        </td>
        <td className="p-4" style={{ color: '#808080', fontSize: '0.75rem', fontFamily: 'monospace' }}>
          {request.recipient.substring(0, 6)}...{request.recipient.substring(38)}
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <span style={{ color: readyToFinalize ? '#22c55e' : '#eaeaea', fontFamily: 'Tomorrow, sans-serif' }}>
              {request.approvalCount}/{approversCount}
            </span>
            {readyToFinalize && !isComplete && (
              <span style={{ color: '#22c55e', fontSize: '0.75rem' }}>✓ Ready</span>
            )}
            {isComplete && (
              <span style={{ color: '#22c55e', fontSize: '0.75rem' }}>✓ Complete</span>
            )}
          </div>
        </td>
        <td className="p-4">
          <div className="flex gap-2">
            {!isComplete && (
              <>
                <button
                  onClick={this.onApprove}
                  className="px-3 py-1 rounded text-sm"
                  style={{ 
                    background: 'rgba(234, 234, 234, 0.1)', 
                    border: '1px solid #eaeaea', 
                    color: '#eaeaea',
                    fontFamily: 'Tomorrow, sans-serif',
                    fontSize: '0.75rem'
                  }}
                >
                  Approve
                </button>
                {readyToFinalize && (
                  <button
                    onClick={this.onFinalize}
                    className="px-3 py-1 rounded text-sm"
                    style={{ 
                      background: '#22c55e', 
                      border: 'none', 
                      color: '#000',
                      fontFamily: 'Tomorrow, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Finalize
                  </button>
                )}
              </>
            )}
          </div>
        </td>
      </tr>
    )
  }
}

export default RequestRow;
