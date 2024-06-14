import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { APIContextProvider } from './store/bungieAPIContext.tsx'
import { CharacterContextProvider } from './store/characterContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <APIContextProvider>
    <CharacterContextProvider>
      <App />
    </CharacterContextProvider>
  </APIContextProvider>,
)
