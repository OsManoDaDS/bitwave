import React, { useState } from 'react';
import Sidebar from '../../components/SideBar';
import DashboardCard from '../../components/DashboardCard';
import './styles.css';

const Dashboard = () => {
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [notification, setNotification] = useState('');

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

    const handleEnrollment = () => {
        // Simula a adição do curso a "Meus cursos"
        closeModal(); // Fecha o modal
        setNotification('Curso adicionado a "Meus cursos". Você já pode acessá-lo!');
        
        // Remove a notificação após alguns segundos
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    const courses = [
        {
            title: "Desenvolvimento de Sistemas",
            description: "Aprenda a projetar e implementar sistemas complexos, utilizando as melhores práticas de engenharia de software e tecnologias modernas.",
            duration: "7 horas",
            professor: "Dr. João Silva"
        },
        {
            title: "Ciência de Dados",
            description: "Domine a análise de grandes volumes de dados e transforme informações em decisões estratégicas, utilizando as mais avançadas técnicas de machine learning.",
            duration: "6 horas",
            professor: "Prof. Maria Costa"
        },
        {
            title: "Git / GitHub",
            description: "Entenda o fluxo completo de controle de versão e como colaborar eficientemente em projetos com Git e GitHub.",
            duration: "4 horas",
            professor: "Prof. Pedro Portales"
        }
    ];


    return (
        <div className="dashboard">
            <Sidebar isMinimized={isSidebarMinimized} toggleSidebar={toggleSidebar} />
            <div className={`dashboard-content ${isSidebarMinimized ? 'minimized' : ''}`}>
                <h1>Bem-vindo ao Painel do Aluno</h1>

                <h2>Cursos em Destaque</h2>
                <div className="cards-container">
                    {courses.map((course, index) => (
                        <DashboardCard
                            key={index}
                            title={course.title}
                            description="Clique aqui para saber mais"
                            onClick={() => openModal(course)}
                        />
                    ))}
                </div>

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
                                <p><strong>Descrição:</strong> {selectedCourse.description}</p>
                            </>
                        )}
                        <button onClick={handleEnrollment}>Inscreva-se</button>
                    </div>
                </div>
            )}

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
