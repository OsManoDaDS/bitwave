import React, { useState } from 'react';
import Sidebar from '../../components/SideBar';
import DashboardCard from '../../components/DashboardCard';
import StatisticsChart from '../../components/StatisticsChart';
import './styles.css';

const Dashboard = () => {
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarMinimized(!isSidebarMinimized);
    };

    const openModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const courses = [
        {
            title: "Desenvolvimento de Sistemas",
            description: "Crie sistemas robustos.",
            duration: "40 horas",
            professor: "Dr. João Silva",
            content: "Arquitetura, Design Patterns, Metodologias Ágeis",
            certificate: "Sim"
        },
        {
            title: "Ciência de Dados",
            description: "Transforme dados em insights.",
            duration: "60 horas",
            professor: "Prof. Maria Costa",
            content: "Python, R, Machine Learning",
            certificate: "Sim"
        },
        {
            title: "Git/GitHub",
            description: "Controle de versões eficiente.",
            duration: "20 horas",
            professor: "Eng. Pedro Sousa",
            content: "Git básico, Branches, Pull Requests",
            certificate: "Sim"
        }
    ];

    return (
        <div className="dashboard">
            <Sidebar isMinimized={isSidebarMinimized} toggleSidebar={toggleSidebar} />
            <div className={`dashboard-content ${isSidebarMinimized ? 'minimized' : ''}`}>
                <h1>Bem-vindo ao Painel do Aluno</h1>

                <h2>Cursos Disponíveis</h2>
                <div className="cards-container">
                    {courses.map((course, index) => (
                        <DashboardCard
                            key={index}
                            title={course.title}
                            description={course.description}
                            onClick={() => openModal(course)}
                        />
                    ))}
                </div>

                <h2>Estatísticas dos Cursos</h2>
                <StatisticsChart />

                <h2>Outros Recursos</h2>
                <div className="cards-container">
                    <DashboardCard title="Estatísticas" description="Veja as estatísticas de seus cursos." />
                    <DashboardCard title="Configurações" description="Ajuste suas preferências." />
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="modal-close" onClick={closeModal}>&times;</span>
                        {selectedCourse && (
                            <>
                                <h3>{selectedCourse.title}</h3>
                                <p><strong>Duração:</strong> {selectedCourse.duration}</p>
                                <p><strong>Professor:</strong> {selectedCourse.professor}</p>
                                <p><strong>O que você aprenderá:</strong> {selectedCourse.content}</p>
                                <p><strong>Certificado:</strong> {selectedCourse.certificate}</p>
                            </>
                        )}
                        <button onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
