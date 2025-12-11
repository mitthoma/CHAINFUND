import React from 'react';
import Header from '../components/Header';

const Layout = (props) => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, transparent, rgb(0, 0, 0)) rgb(0, 0, 0)' }}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
