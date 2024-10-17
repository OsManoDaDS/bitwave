import React from 'react';
import '../pages/Dashboard/styles.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Dashboard</h2>
            <ul>
                <li><a href="#overview">Visão Geral</a></li>
                <li><a href="#courses">Cursos</a></li>
                <li><a href="#settings">Configurações</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
