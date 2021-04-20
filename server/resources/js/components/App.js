import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.css";
import "@shopify/polaris/dist/styles.css";
import "@css/app.css";

import ProductForm from './forms/Product.jsx';

if (document.getElementById('root')) {
    ReactDOM.render(<ProductForm />, document.getElementById('root'));
}
