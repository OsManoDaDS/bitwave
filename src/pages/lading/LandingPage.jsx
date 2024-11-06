import React, { useEffect, useState, useRef } from 'react';
import "./LandingPage.css";
import api from "../../services/api";

//const CourseCard = ({ title, description, image, rating }) => {
//const CourseCard = ({ title }) => {
const CourseCard = ({ title, description }) => {

    return (
            <div className="course-card">
                <div className="cover">
                    <div className="coverFront">
                        {/*<img src={image} alt={title} />*/}
                        <h1>{title}</h1>
                        
                    </div>
                    <div className="coverBack">
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
    );
};

const LandingPage = () => {
    const [myCourses, setMyCourses] = useState([]); 

    console.log(localStorage.getItem("userId"));

    async function getMyCourses() {
        const myCoursesFromApi = await api.get(`/matriCourse?userId=${localStorage.getItem("userId")}`)
    
        setMyCourses(myCoursesFromApi.data)
        console.log(myCourses)
    }
    
    useEffect(() => {
        getMyCourses()
    }, [])

    /*const courses = [
        {
            title: "GitHub",
            description: "Aprenda a usar o GitHub para versionamento e colaboração em projetos.",
            image: "https://example.com/github-image.jpg",
            rating: 4 // Exemplo de avaliação
        },
        {
            title: "React",
            description: "Domine a biblioteca React para construir interfaces de usuário dinâmicas.",
            image: "https://example.com/react-image.jpg",
            rating: 5 // Exemplo de avaliação
        },
        {
            title: "MongoDB",
            description: "Entenda o MongoDB, um banco de dados NoSQL popular para aplicações modernas.",
            image: "https://example.com/mongodb-image.jpg",
            rating: 4 // Exemplo de avaliação
        },
    ];*/

    return (
        <div className="landing-page">
            <nav className="navbar">
                <h1>BitWave</h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/Login">Login</a></li>
                        <li><a href="/Cadastro">Cadastro</a></li>
                    </ul>
                </nav>
            </nav>
            <div className="courses-section">
                <h2>Cursos Disponíveis</h2>
                <div className="courses">
                    {myCourses.map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.course.name}
                            description={course.course.description}
                            //image={course.image}
                            //rating={course.rating}
                        />
                    ))}
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2024 BitWave. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
