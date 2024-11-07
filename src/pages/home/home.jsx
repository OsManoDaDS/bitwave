import React from 'react';
import { Link } from 'react-router-dom';
import './styleshome.css';


const CourseCard = ({ title, description, image }) => {
    return (
        <div className="course-card">
            <div className="cover">
                <div className="coverFront">
                    <div>
                        <h5>{title}</h5>
                        <img src={image} alt={title} />
                    </div>
                </div>
                <div className="coverBack">
                    <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px' }}>
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <Link to="/Login">
                            <button className="sh_btn">Inscreva-se</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Home() {
    return (
        <div className="home">
            <header className="navbar">
                <h1>BitWave</h1>
                <nav>
                    <ul>
                        <li><a href="#home">Início</a></li>
                        <li><a href="#courses">Nossos Cursos</a></li>
                        <li><a href="mailto:contatobitwavecursos@gmail.com">Contato</a></li>
                    </ul>
                </nav>
                <Link to="/Login">
                    <button className="get-started-btn">Começar</button>
                </Link>
            </header>
            <main id="content">
                <section id="home" className="hero-section">
                    <div className="intro">
                        <h1>Bem-vindo ao BitWave</h1>
                        <hr />
                        <h2>Seu portal para aprendizado e crescimento!</h2>
                    </div>
                </section>
                <section className="courses-section" id="courses">
                    <h2>Nossos Cursos em Destaque</h2>
                    <div className="courses">
                        <CourseCard
                            title="Introdução ao Node + React"
                            description="Aprenda os fundamentos do desenvolvimento full-stack com Node e React. 
                             Este curso aborda desde o setup inicial até a criação de APIs e interfaces interativas. 
                            Com práticas modernas e foco em desenvolvimento ágil, você adquirirá habilidades essenciais para construir 
                              aplicações web dinâmicas e escaláveis."
                            image="img2.svg"
                        />
                        <CourseCard
                            title="Git/GitHub: Controle de Versão e Colaboração"
                            description="Domine o fluxo de trabalho colaborativo e o controle de versões.
                            Aprenda a usar Git para controlar versões de projetos de software e GitHub para colaborar em equipe. 
                            Desde o básico de commit e branch até o uso avançado de pull requests e gestão de repositórios, 
                            você estará preparado para trabalhar de forma eficiente em qualquer ambiente de desenvolvimento."
                            image="img3.svg"
                        />
                    </div>
                </section>
            </main>
            <footer className="footer">
                <div className='row mt-3'>
                    <p>© 2024 BitWave. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
