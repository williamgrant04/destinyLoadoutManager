import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { APIContextProvider } from './store/bungieAPIContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <APIContextProvider>
    <App />
  </APIContextProvider>,
)
