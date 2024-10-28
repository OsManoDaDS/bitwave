import { useState, useRef } from 'react';
import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import api from '../../services/api.js';

function Login() {

  const inputEmail = useRef();
  const inputSenha = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  async function fazerlogin() {
    try {
      const response = await api.post('/login', {
        email: inputEmail.current.value,
        senha: inputSenha.current.value,
      });
      const { token } = response.data;

      // Armazena o token no localStorage
      localStorage.setItem('token', token);

      // Atualiza o estado de autenticação
      setIsAuthenticated(true);

    } catch (error) {
      setErrorMessage('Login falhou. Verifique suas credenciais.'); // Define a mensagem de erro
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>BitWave</h1>
      </nav>
      <div className="container">
        <form>
          <h1>Login</h1>
          <input name="Email" type="email" placeholder="Email" required />
          <input name="Senha" type="password" placeholder="Senha" required />

          <button type="button" onClick={fazerlogin}>Logar</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p></p>

          <GoogleLogin
            onSuccess={credentialResponse => {
              const decoded = jwtDecode(credentialResponse?.credential);
              console.log(decoded);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />

          <div className="signup-link">
            <p>Não tem uma conta? <Link to='/cadastro'>Registre-se</Link></p>
          </div>
        </form>

      </div>
      <footer className="footer">
        <div className='row mt-3'>
          <p>© 2024 BitWave. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
