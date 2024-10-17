import React from 'react';
import Sidebar from '../../components/SideBar';
import DashboardCard from '../../components/DashboardCard';
import './styles.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Bem-vindo ao Painel</h1>
                <div className="cards-container">
                    <DashboardCard title="Cursos" description="Gerencie seus cursos." />
                    <DashboardCard title="Estatísticas" description="Veja as estatísticas de seus cursos." />
                    <DashboardCard title="Configurações" description="Ajuste suas preferências." />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
