import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login/login";
import Home from "./pages/home/home";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} /> 
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
// Só vai para o Dashboard quando tiver autentificado pelo login