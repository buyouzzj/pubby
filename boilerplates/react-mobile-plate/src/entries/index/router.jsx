import React from 'react';
import Router, { Route } from '@alipay/react-tiny-router';
import Index from '../../components/index';

export default (
  <Router>
    <Route path="/" component={Index} />
  </Router>
);
