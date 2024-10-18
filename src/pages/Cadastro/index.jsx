import React, { useState } from 'react';
import './style.css';
import googleLogo from '../Cadastro/googleLogo.png';

function Cadastro() {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleCheckboxChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('Por favor, aceite os termos antes de se cadastrar.');
      return;
    }

    console.log('Cadastro realizado com sucesso!');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>BitWave</h1>
      </nav>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className='row mt-3'>
            <h1>Cadastro de Usuário</h1>
          </div>
          <input name="Nome" type="text" placeholder="Nome" required />
          <input name="Email" type="email" placeholder="Email" required />
          <input name="Senha" type="password" placeholder="Senha" required />

          <div className="terms">
            <div className='row mt-3'>
              <div className='col-2 mt-4'>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={acceptTerms}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className='col-9'>
                <label htmlFor="terms">
                  Ao se inscrever, você concorda com nossos <a href="#">Termos de Uso</a> e com a <a href="#">Política de Privacidade</a>.
                </label>
              </div>
            </div>
          </div>
          <button type="submit">Cadastrar</button>

          <button type="button" class="buttongoogle">
            Continuar com o Google
            <img src={googleLogo} alt="Google Logo" style={{ width: '20px', marginLeft: '8px' }} />
          </button>


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

export default Cadastro;