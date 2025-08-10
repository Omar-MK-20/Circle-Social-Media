import '@fortawesome/fontawesome-free/css/all.min.css'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider, { AuthContext } from './contexts/AuthContextProvider.jsx'






createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthContextProvider>
    <HeroUIProvider>
      <ToastProvider placement='bottom-center' />
      <App />
    </HeroUIProvider>
  </AuthContextProvider>
  // </StrictMode>
)
