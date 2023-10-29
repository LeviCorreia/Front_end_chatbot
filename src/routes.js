import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './chatBot/Chat';
import LoginScreen from './login/login';
import Cadastro from './cadastro/cadastro';
import Loud from './carregando/loud';
function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/loud" element={<Loud />} />
            </Routes>

        </Router>


    );
}

export default Rotas;