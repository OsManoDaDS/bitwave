import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login/login";
import Home from "./pages/home/home";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/lading/LandingPage";
import Configuracoes from "./pages/Configuracoes/configuracoes";


function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} /> 
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/landing" element={<LandingPage />} /> {/* Adicione esta linha */}
                <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
// Só vai para o Dashboard quando tiver autentificado pelo login