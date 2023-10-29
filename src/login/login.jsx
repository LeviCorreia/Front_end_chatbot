import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import axios from 'axios';


function LoginScreen() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState()
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Username:', email);
        console.log('Password:', senha);

        try {
            const response = await axios.post('http://localhost:5000/authController',
                JSON.stringify({ email, senha }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }

            );
            console.log(response.data);
            setUser(true)
            console.log(user)
            const token = response.data.token
            
            localStorage.setItem('authenticated', 'true')
            localStorage.setItem("token", `${token}`);
            localStorage.setItem('user', JSON.stringify(response.data.usuario))
            localStorage.setItem('outroId',response.data.usuario.idUser)
            console.log(`${token}`)
            console.log(localStorage.getItem('authenticated'))
            // console.log(response.data.usuario.id)
            navigate("/")
        } catch (error) {
            if (!error?.response) {
                setError("Erro ao acessar o servidor");
            } else if (error.response.status == 401) {
                setError("Usuário ou senha inválida")
            }
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setError('');
        localStorage.removeItem("token")
        localStorage.setItem("authenticated", 'false')
        localStorage.removeItem("user")
        localStorage.removeItem('outroId')
        navigate("/loud")
    };

    return (

        <div className="login-container">
            <div className='login-border'>
                <div className="login-form">
                    {!user? (
                        <div>
                            <h2 className='title'>Login</h2>
                            <p className='subtitle'>Seja bem-vindo ao ChatBot</p>
                            <form onSubmit={handleSubmit}>
                                <div className="input-container">
                                    <input className="input"
                                        type="text"
                                        id="username"
                                        value={email}
                                        placeholder='Digite seu email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-container">
                                    <input className='input'
                                        type="password"
                                        id="password"
                                        value={senha}
                                        placeholder='Digite sua senha'
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                </div>
                                <div className='button-container'>
                                    <button className="custom-button" type="submit">Entrar</button>
                                </div>

                                <div>
                                    <p className='subtitle'>Não tem conta? <Link to="/cadastro">Faça o cadastro</Link></p>
                                    <p className='subtitle'>{error}</p>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <p className='subtitle'>Seja bem-vindo a ChatBot</p>
                            <h2>{user.nome}</h2>
                            <div className='button-container'>
                                <button className="custom-button" type="submit" onClick={(e) => handleLogout(e)}>Logout</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
