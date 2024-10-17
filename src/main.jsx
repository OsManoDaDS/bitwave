import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/Login/login'
import './index.css'
import Cadastro from './pages/Cadastro'
import Home from './pages/home/home'
import App from './app'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
