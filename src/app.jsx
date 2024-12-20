import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login/login";
import Home from "./pages/home/home";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/lading/LandingPage";
import Configuracoes from "./pages/Configuracoes/configuracoes";
import GitGitHub from "./pages/Git-GitHub";
import IntroducaoNode from "./pages/introducaonode";
import IntroducaoNode2 from "./pages/introducaonode/part2";

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/meus-cursos" element={<LandingPage />} /> {/* Adicione esta linha */}
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/git-github" element={<GitGitHub />} />
                <Route path="/introducaonode" element={<IntroducaoNode />} />
                <Route path="/introducaonode2" element={<IntroducaoNode2 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
// Só vai para o Dashboard quando tiver autentificado pelo login