// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ContestProvider } from './SocketContent.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ContestProvider>
    <App />
  </ContestProvider>,
)
