import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { buscarUsuarioPorId } from '../../services/auth';

import Logo from '../../assets/img/logoRojo2.png';

import '../../assets/css/login.css';


export default function Login() {
    const [emailUsuario, setEmailUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erroMensagem, setErroMensagem] = useState('');

    var navigate = useNavigate();

    const FazerLogin = (event) => {    
        event.preventDefault();

        setErroMensagem(null);

        setIsLoading(true);

        var usuarioLogin = {
            email : emailUsuario,
            senha : senhaUsuario,
        }

        axios({
            method: "post",
            url: "http://localhost:5000/api/Login", 
            data : usuarioLogin,
            headers : { "Content-Type" : "application/json"}
        })
               
            .then( function (response) 
            {

                if (response.status === 200)
                {
                    localStorage.setItem('usuario-login', response.data.token)

                    setIsLoading(false)

                    navigate('/BemVindo')
                    console.log(`login realizado` )  
                }
                else {
                    navigate('/Login');
                    isLoading(false)
                
                 }
            })        
    
            .catch(erro => {
                erro = (' Email ou senha incorretos')
                setErroMensagem(erro)
                setIsLoading(false)
            })
    }


    return (

        <div className="container-login">
            <header className='container-header'>
                <div className="logo-header">
                    <nav>
                        <Link to="/"><img src={Logo} /></Link>
                    </nav>
                </div>
            </header>
            
            <div className='bg-animation-pilula'/>
            <div className="bg-animation-roda" />

            <div className="box-login">
                <div className="box-login-nav">
                    <nav>
                        <Link to="/Login">LOGIN</Link>
                        <Link id="box-login-nav-cadastrar" to="/CadastrarUsuario"> CADASTRAR</Link>
                    </nav>
                </div>

                <div className="box-form-login">

                    <form className="form-login" onSubmit={(event) => FazerLogin(event)}>
                        <div className="box-input-login">
                            <p className="box-input-login-p">Email</p>

                            <input
                                className="input-login"
                                type="email"
                                value={emailUsuario}
                                onChange={(event) => setEmailUsuario(event.target.value)}
                                placeholder="example@email.com"
                            />
                        </div>
                        <div className="box-input-login">
                            <p className="box-input-login-p"    >Senha</p>
                            <input
                                className="input-login input-login-senha"
                                type="password"
                                value={senhaUsuario}
                                onChange={(event) => setSenhaUsuario(event.target.value)}
                                placeholder="*****"
                            />
                        </div>

                        <p style={{ color: 'red' }}> {erroMensagem} </p>

                        <p className="login-recuperar" style={{ color: 'white', fontSize: 12, }} href="/Recuperar-senha">Esqueceu a senha</p>


                        {
                            isLoading === true && (
                                <button
                                    type="submit"
                                    disabled
                                    className="btn-login"
                                    id="btn__login"
                                >
                                    Loading...
                                </button>
                            )
                        }

                        {
                            isLoading === false && (
                                <button
                                    className="btn-login"
                                    id="btn__login"
                                    type="submit"
                                    disabled={
                                        emailUsuario === '' || senhaUsuario === ''
                                            ? 'none'
                                            : ''
                                    }
                                >
                                    LOGIN
                                </button>
                            )
                        }



                    </form>
                </div>

            </div>
        </div>
    )

}



