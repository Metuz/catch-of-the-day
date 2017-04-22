import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/' component={StorePicker} />
        <Match pattern='/store/:storeId' component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

export default Router;
