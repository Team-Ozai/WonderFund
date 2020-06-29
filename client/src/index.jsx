import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Muli:300,400,700', 'sans-serif']
  }
});

ReactDOM.render(<App/>, document.getElementById('campaign'))