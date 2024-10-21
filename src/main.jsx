import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login/login'
import './index.css'
import Cadastro from './pages/Cadastro'
import Home from './pages/home/home'
import App from './app'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <GoogleOAuthProvider clientId="1074684343107-ja9mjlqjr1ve78i5akhfjbscofb7rl5e.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
