import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MountTester from './mount-tester'

ReactDOM.render(
  <App cat={5}/>,
  document.getElementById('root')
);
// cat={5} - to provide number type, for string just use ""
