import ReactDOM from 'react-dom/client'
import App from './App.js'
import { APIContextProvider } from './store/bungieAPIContext.js'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <APIContextProvider>
    <App />
  </APIContextProvider>,
)
