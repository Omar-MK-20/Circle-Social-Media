import '@fortawesome/fontawesome-free/css/all.min.css'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider, { AuthContext } from './contexts/AuthContextProvider.jsx'

// Saves the original console.error function so you can still use it later.
const originalError = console.error;
// Overrides the default console.error method with a custom function.
console.error = function (...args) 
{
  if ( typeof args[0] === 'string' && args[0].includes('stopPropagation is now the default behavior')) 
  {
    return;
  }
  originalError.apply(console, args);
};




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
