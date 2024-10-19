import React from 'react';
import '../pages/Dashboard/styles.css';

const Sidebar = ({ isMinimized, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
            <div className="sidebar-header" onClick={toggleSidebar}>
                {isMinimized ? <span className="material-icons">menu</span> : <h2>BitWave</h2>}
            </div>
            {!isMinimized && (
                <button className="toggle-button" onClick={toggleSidebar}>
                    <span className="material-icons">arrow_back</span>
                </button>
            )}
            <ul>
                <li><a href="#overview">{isMinimized ? <span className="material-icons">visibility</span> : 'Visão Geral'}</a></li>
                <li><a href="#courses">{isMinimized ? <span className="material-icons">menu_book</span> : 'Meus Cursos'}</a></li>
                <li><a href="#settings">{isMinimized ? <span className="material-icons">settings</span> : 'Configurações'}</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
