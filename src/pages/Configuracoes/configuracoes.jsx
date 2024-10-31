import React, { useState, useEffect } from 'react';
import "../Configuracoes/settings.css";
import Perfil from '../../components/perfil';

const Configuracoes = () => {
  const [user, setUser] = useState({
    name: "Exemplo Usuário",
    email: "exemplo@usuario.com",
    foto: "",
    idioma: "Português",
    moeda: "BRL",
    notificacoes: {
      atualizacoes: true,
      promoções: false,
    },
  });

  const apiUrl = 'https://api-crud-1-sqcl.onrender.com/users';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.length > 0) {
          setUser(data[0]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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

  return (
    <div className="configuracoes">
      <div className="profile-header">
        <img src={user.foto || 'default-profile.png'} alt="Foto de perfil" />
        <h1>Olá, {user.name}!</h1>
      </div>

      <section>
        <h2>Informações Pessoais</h2>
        <label>Nome:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </label>
        <label>Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </label>
        <button className="edit-button">Editar</button>
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
            checked={user.notificacoes?.promoções || false}
            onChange={handleNotificationChange}
          />
          Receber promoções e ofertas
        </label>
      </section>

      <section>
        <h2>Idioma e Moeda</h2>
        <label>Idioma:
          <select name="idioma" value={user.idioma} onChange={handleInputChange}>
            <option value="Português">Português</option>
            <option value="Inglês">Inglês</option>
          </select>
        </label>
        <label>Moeda:
          <select name="moeda" value={user.moeda} onChange={handleInputChange}>
            <option value="BRL">BRL - Real</option>
            <option value="USD">USD - Dólar</option>
          </select>
        </label>
      </section>
    </div>
  );
};

export default Configuracoes;