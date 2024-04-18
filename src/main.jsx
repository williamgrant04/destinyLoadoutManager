import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { APIContextProvider } from './store/bungieAPIContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <APIContextProvider>
    <App />
  </APIContextProvider>,
)
