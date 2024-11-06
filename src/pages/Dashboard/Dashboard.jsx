import React, { useEffect, useState, useRef } from 'react';
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
    const [myCourses, setMyCourses] = useState([]); // Novo estado para "Meus cursos"
    //const [matriCourses, setMatriCourses] = useState([]);
    //let courses = []
    //let myCourses = []

    console.log(localStorage.getItem("userId"));

    async function getCourses() {
        const coursesFromApi = await api.get("/courses")

        setCourses(coursesFromApi.data)
        //courses = coursesFromApi.data
        console.log(coursesFromApi.data)
        console.log(courses)

        //createCourseCards()
    }

    async function getMyCourses() {
        const myCoursesFromApi = await api.get(`/matriCourse?userId=${localStorage.getItem("userId")}`)

        setMyCourses(myCoursesFromApi.data)
        console.log(myCourses)
    }

    useEffect(() => {
        getCourses()
        getMyCourses()
    }, [])


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
        // Adiciona o curso ao estado "Meus cursos" se ainda não estiver nele
        try {

            await api.post('/matriCourse', {
                userId: `${localStorage.getItem("userId")}`,
                courseId: selectedCourse.id, // Corrigi o nome para 'password'
            });

            if (!myCourses.some(course => course.name === selectedCourse.name)) {
                setMyCourses([...myCourses, selectedCourse]);
            }

            closeModal(); // Fecha o modal
            setNotification('Curso adicionado a "Meus Cursos". Você já pode acessá-lo!');
            // Remove a notificação após alguns segundos
            setTimeout(() => {
                setNotification('');
            }, 3000);

        } catch (error) {
            setNotification('Falha ao adicionar a "Meus Cursos"');
            setTimeout(() => {
                setNotification('');
            }, 3000);
        }
    };

    /*const courses = [
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
    ];*/

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
                            //title="{course.name}"
                            description="Clique para ver detalhes"
                            onClick={() => openModal(course)}
                            showRating={false} // Não mostrar avaliação nos cursos em destaque
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
                                showRating={true} // Mostrar avaliação nos "Meus Cursos"
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
