import { useState, useRef } from 'react';
import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api.js';

function Login() {

  const inputEmail = useRef()
  const inputSenha = useRef()
  const [errorMessage, setErrorMessage] = useState('')

  async function fazerlogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('/login', {
        email: inputEmail.current.value,
        senha: inputSenha.current.value,
      });
      const { token } = response.data;

      localStorage.setItem('token', token);
      setErrorMessage('');

      window.location.href = '/Dashboard';
    } catch (error) {
      setErrorMessage('Login falhou. Verifique suas credenciais.');
    }
  };

  // POSSÍVEL CÓDIGO
  // const fazerlogin = async (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     setMessage("Email e senha são obrigatórios.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('/login', { email, password });
  //     const { token, msg } = response.data;

  //     setMessage(msg);
      
  //     if (token) {
  //       localStorage.setItem('token', token);
  //     }
  //   } catch (error) {
  //     setMessage(error.response?.data?.msg || "Erro ao realizar login.");
  //   }
  // };

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

          <button type="submit" onClick={fazerlogin}>Logar</button>
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
