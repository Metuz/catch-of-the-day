import React from 'react';
import { render } from 'react-dom';

import './css/style.css';

// import App from './components/App';
// import StorePicker from './components/StorePicker';
import Router from './components/Router';

render(<Router/>, document.querySelector('#main'));
