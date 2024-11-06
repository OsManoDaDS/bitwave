import React from 'react';
import { useNavigate } from 'react-router-dom'; // Adicione a importação
import '../pages/Dashboard/styles.css';

const Sidebar = ({ isMinimized, toggleSidebar }) => {
    const navigate = useNavigate(); // Use o hook useNavigate

    const handleNavigation = (path) => {
        navigate(path);
        toggleSidebar(); // Fecha a sidebar após a navegação
    };

    const botãoLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login';
    };

    return (
        <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
            <div className="sidebar-header" onClick={toggleSidebar}>
                {isMinimized ? <span className="material-icons">menu</span> : <h2>BitWave</h2>}
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <span className="material-icons">{isMinimized ? 'arrow_forward' : 'arrow_back'}</span>
            </button>
            <ul>
                <li onClick={() => handleNavigation('/dashboard')} className="sidebar-item">
                    {isMinimized ? <span className="material-icons">visibility</span> : 'Visão Geral'}
                </li>
                <li onClick={() => handleNavigation('/meus-cursos')} className="sidebar-item">
                    {isMinimized ? <span className="material-icons">menu_book</span> : 'Meus Cursos'}
                </li>
                <li onClick={() => handleNavigation('/configuracoes')} className="sidebar-item">
                    {isMinimized ? <span className="material-icons">settings</span> : 'Configurações'}
                </li>
                <li onClick={() => handleNavigation('/perfil')} className="sidebar-item">
                    {isMinimized ? <span className="material-icons">person</span> : 'Perfil'}
                </li>
                <li onClick={botãoLogout} className="sidebar-item">
                    {isMinimized ? <span className="material-icons">exit_to_app</span> : 'Sair'}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
