import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AllProvider } from './context/Allcontext.jsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <HelmetProvider>
    <BrowserRouter>
      <AllProvider>
        <App />
      </AllProvider>
    </BrowserRouter>
  </HelmetProvider>
  // </StrictMode>,
)
