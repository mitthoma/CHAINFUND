import React, { Component } from 'react';

class Notification extends Component {
  render() {
    const { message, type = 'error', onClose } = this.props;

    if (!message) return null;

    const colors = {
      error: {
        background: 'rgba(255, 0, 0, 0.1)',
        border: '#ff5555',
        text: '#ffaaaa'
      },
      success: {
        background: 'rgba(0, 255, 0, 0.1)',
        border: '#55ff55',
        text: '#aaffaa'
      },
      warning: {
        background: 'rgba(255, 165, 0, 0.1)',
        border: '#ffaa55',
        text: '#ffddaa'
      },
      info: {
        background: 'rgba(0, 136, 255, 0.1)',
        border: '#0088ff',
        text: '#88ccff'
      }
    };

    const style = colors[type] || colors.error;

    return (
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '600px',
          width: '90%',
          background: style.background,
          border: `2px solid ${style.border}`,
          borderRadius: '10px',
          padding: '1rem 1.5rem',
          zIndex: 9999,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 0 20px ${style.border}40`,
          animation: 'slideDown 0.3s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: style.text,
              fontSize: '0.9rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}
          >
            {message}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: style.text,
              fontSize: '1.5rem',
              cursor: 'pointer',
              marginLeft: '1rem',
              padding: '0 0.5rem',
              lineHeight: 1,
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            ×
          </button>
        )}

        <style jsx="true">{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Notification;
