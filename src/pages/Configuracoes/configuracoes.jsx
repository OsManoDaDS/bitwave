import React, { useState, useEffect } from 'react';
import "../Configuracoes/settings.css";
import Perfil from '../../components/perfil';

const Configuracoes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // Adicionando o token
  const apiUrl = `https://api-crud-1-sqcl.onrender.com/users/${userId}`;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('Usuário não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`, // Inclua o token na requisição
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data); // Atualiza o estado com os dados do usuário
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Erro ao carregar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiUrl, userId, token]); // Adicionando token às dependências

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setUser({
      ...user,
      notificacoes: {
        ...user.notificacoes,
        [name]: checked,
      },
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, foto: URL.createObjectURL(file) });
  };

  useEffect(() => {
    // Alerta com os dados do localStorage
    const userData = localStorage.getItem('userId') ? `UserId: ${localStorage.getItem('userId')}` : 'Nenhum usuário encontrado.';
    const tokenData = localStorage.getItem('token') ? `Token: ${localStorage.getItem('token')}` : 'Nenhum token encontrado.';
    
    alert(`Dados do LocalStorage:\n${userData}\n${tokenData}`);
  }, [loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="configuracoes">
      <h1>Configurações da Conta</h1>

      <Perfil />

      <section>
        <h2>Informações Pessoais</h2>
        <label>Nome:
          <input
            type="text"
            name="name"
            value={user.name || ''} // Garantir que não seja undefined
            onChange={handleInputChange}
          />
        </label>
        <label>Email:
          <input
            type="email"
            name="email"
            value={user.email || ''} // Garantir que não seja undefined
            onChange={handleInputChange}
          />
        </label>
      </section>

      <section>
        <h2>Foto de Perfil</h2>
        <input type="file" onChange={handlePhotoUpload} />
        {user.foto && <img src={user.foto} alt="Foto de perfil" />}
      </section>

      <section>
        <h2>Preferências de Notificação</h2>
        <label>
          <input
            type="checkbox"
            name="atualizacoes"
            checked={user.notificacoes?.atualizacoes || false}
            onChange={handleNotificationChange}
          />
          Receber atualizações de cursos
        </label>
        <label>
          <input
            type="checkbox"
            name="promocoes"
            checked={user.notificacoes?.promocoes || false}
            onChange={handleNotificationChange}
          />
          Receber promoções e ofertas
        </label>
      </section>

      <section>
        <h2>Idioma e Moeda</h2>
        <label>Idioma:
          <select name="idioma" value={user.idioma || "Português"} onChange={handleInputChange}>
            <option value="Português">Português</option>
            <option value="Inglês">Inglês</option>
          </select>
        </label>
        <label>Moeda:
          <select name="moeda" value={user.moeda || "BRL"} onChange={handleInputChange}>
            <option value="BRL">BRL - Real</option>
            <option value="USD">USD - Dólar</option>
          </select>
        </label>
      </section>
    </div>
  );
};

export default Configuracoes;
