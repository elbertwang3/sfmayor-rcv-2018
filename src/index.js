import React from 'react';
import ReactDOM from 'react-dom';
import 'css/index.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';
import "font-awesome/css/font-awesome.css";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
