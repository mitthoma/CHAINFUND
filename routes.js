// Route helper for Next.js native routing
// This provides a similar API to next-routes for backwards compatibility

const Link = require('next/link').default;

const routes = {
  Link: Link,
  Router: null, // Will be set when needed
  pushRoute: (route) => {
    if (typeof window !== 'undefined') {
      const Router = require('next/router').default;
      Router.push(route);
    }
  }
};

module.exports = routes;
