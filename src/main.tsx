import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/* CSS */
import './index.css'
import 'antd/dist/antd.css'
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/mention/lib/plugin.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
