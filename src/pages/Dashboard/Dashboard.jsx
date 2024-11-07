import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import Sidebar from '../../components/Sidebar.jsx';
import DashboardCard from '../../components/DashboardCard.jsx';
import './styles.css';
import api from '../../services/api.js';

const Dashboard = () => {
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [notification, setNotification] = useState('');
    const [courses, setCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const navigate = useNavigate(); // Inicializa o navigate

    useEffect(() => {
        getCourses();
        getMyCourses();
    }, []);

    async function getCourses() {
        try {
            const coursesFromApi = await api.get("/courses");
            setCourses(coursesFromApi.data);
        } catch (error) {
            console.error("Erro ao carregar cursos:", error);
        }
    }

    async function getMyCourses() {
        try {
            const myCoursesFromApi = await api.get(`/matriCourse?userId=${localStorage.getItem("userId")}`);
            setMyCourses(myCoursesFromApi.data);
        } catch (error) {
            console.error("Erro ao carregar meus cursos:", error);
        }
    }

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

    async function handleEnrollment() {
        try {
            await api.post('/matriCourse', {
                userId: `${localStorage.getItem("userId")}`,
                courseId: selectedCourse.id,
            });

            if (!myCourses.some(course => course.name === selectedCourse.name)) {
                setMyCourses([...myCourses, selectedCourse]);
            }

            closeModal();
            setNotification('Curso adicionado a "Meus Cursos". Você já pode acessá-lo!');
            
            setTimeout(() => {
                setNotification('');
            }, 3000);

            // Redireciona o usuário para a página "meus-cursos"
            navigate("/meus-cursos");

        } catch (error) {
            setNotification('Falha ao adicionar a "Meus Cursos"');
            setTimeout(() => {
                setNotification('');
            }, 3000);
        }
    }

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
                            title={course.name}
                            description="Clique para ver detalhes"
                            onClick={() => openModal(course)}
                            showRating={false}
                        />
                    ))}
                </div>

                <h2>Meus Cursos</h2>
                <div className="cards-container">
                    {myCourses.length > 0 ? (
                        myCourses.map((course, index) => (
                            <DashboardCard
                                key={index}
                                title={course.course.name}
                                description="Clique para ver detalhes"
                                showRating={true}
                            />
                        ))
                    ) : (
                        <p>Você ainda não está inscrito em nenhum curso.</p>
                    )}
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
                                <h3>{selectedCourse.name}</h3>
                                <br />
                                <p><strong>Duração:</strong> {selectedCourse.duration} horas</p>
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
