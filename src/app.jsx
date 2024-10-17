import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login/login";
import Home from "./pages/home/home";
import Dashboard from "./pages/Dashboard/dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} /> 
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/DashBoard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
