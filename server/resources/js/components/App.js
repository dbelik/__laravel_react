import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.css";
import "@shopify/polaris/dist/styles.css";
import "@css/app.css";

import Global from './global/Global.jsx';

if (document.getElementById('root')) {
    ReactDOM.render(<Global />, document.getElementById('root'));
}