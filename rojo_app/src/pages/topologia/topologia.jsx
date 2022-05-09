import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form } from 'react-bootstrap';
import axios from 'axios';

import Grafana from '../../assets/icon/icon-grafana.png';
import DataDog from '../../assets/icon/data.png';
import Zabbix from '../../assets/icon/icon-zabbix.png';
import Logo from '../../assets/img/logoRojo2.png';
import Sair from '../../assets/icon/icon-sair.png';
import ho from '../../assets/icon/historico.png';
import la from '../../assets/icon/lista.png';
import ta from '../../assets/icon/topologia.png';
import aa from '../../assets/icon/alerta.png';

import '../../assets/css/barra-esquerda.css';
import '../../assets/css/bem-vindo.css';
import '../../assets/css/animation__input.css';
import '../../assets/css/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import { parseJwt } from "../../services/auth";


export default function BemVindo() 
{
    var navigate = useNavigate();
    
    //States Usuario
    const [usuario, setUsuario] = useState([]);
    const [nome, setNome] = useState("");
    const [cargo, setCargo] = useState("");
    
    const buscarUsuario = () =>
    {
        axios
        .get('http://100.26.2.205/api/usuario/token')

        .then(function (response) {
            console.log('resposta' + response.data);
            setUsuario(response.data)
        })
        .catch((erro) => console.log(erro))
    }

    useEffect(() => (buscarUsuario()),[])

    const atualizarValores = () => 
    {
        setNome(usuario.slice(-2));
        setCargo(usuario.slice(-3));
        console.log("deu certo", usuario)  
    }       
        
    useEffect(() => (atualizarValores()),[])


    const realizarLogout = async () => {
        try {
          await AsyncStorage.removeItem('usuario-login');
          console.log(cargo)
          navigate('/'); 
          
        } catch (error) {
          console.warn(error);
        }
      };


    return(   
        <div className="container-cadastro-equipamento">
            
                <div className="container-barra-esquerda">
                    <div className="barra-superior">
                        <nav  className="Logo">
                            <Link to="/"><img src={Logo} alt="Logo da Rojo"/></Link>
                        </nav>
                        <div className= "cadastro">
                            <Link to="/CadastrarEquipamento">
                                <p className="cadastro-texto">
                                    CADASTRAR EQUIPAMENTO

                                </p>
                                <div className="cadastro-box-anime"/>         
                            </Link>

                        </div>
                        <div className="box-container-link">
                            <nav className="funcao-superior">
                                <p className="fp">GESTAO DE INFRAESTRUTURA</p>
                                <Link className= "funcao" to="/ListaEquipamento">
                                    <img src={la} alt="Icone de listagem"/>
                                    <p>Listar Equipamentos</p>
                                </Link>
                                <Link className= "funcao" to="/Historico">
                                    <img src={ho} alt="Icone de histórico"/>
                                    <p>Histórico</p>
                                </Link>
                                <Link className= "funcao" to="/Topologia">
                                    <img src={ta} alt="Icone de topologia"/>
                                    <p>Topologia</p>
                                </Link>
                                <Link className= "funcao" to="/Alerta">
                                    <img src={aa} alt="Icone de topologia"/>
                                    <p>Alerta</p>
                                </Link>


                            </nav>
                            <div className="funcao-inferior">
                                <p className="fp">SERVICOS DE MONITORAMENTO</p>
                                <Link className="container-link" to="/grafana">
                                    <div className="btn-link">
                                        <img src={Grafana} alt="Logo do Grafana"></img>
                                    </div>
                                    <p>GRAFANA</p>
                                </Link>

                                <Link className="container-link" to="/graylog">
                                    <div className="btn-link">
                                        <img src={DataDog} alt="Logo da DataDog"></img>
                                    </div>
                                    <p>DATADOG</p>
                                </Link>

                                <Link className="container-link" to="/zabbix">
                                    <div className="btn-link">
                                        <img src={Zabbix} alt="Logo do Zabbix"></img>
                                    </div>
                                    <p>ZABBIX </p>
                                </Link>
                            </div>

                        </div>
                        <div className="btn-container-mode">
                                <p> MODO ESCURO</p>
                                <button className="btn-mode">
                                    <div className="btn-mode-interruptor">
                                        <div className="btn-mode-bola">
                                        </div>
                                    </div>
                                </button>
                        </div>



                    </div>
                    <div className="barra-inferior">
                            <div className="container-perfil">
                                    <div
                                        className="perfil-imagem"
                                        
                                    />
                                    <div className="perfil-texto">
                                        <p className="perfil-nome">
                                            {nome}
                                        </p>                                                           
                                        <p className="perfil-cargo">
                                            {cargo}
                                        </p>
                                        
                                    </div>
                                    <div className="perfil-logout">

                                        <button
                                            onClick={realizarLogout}
                                        >
                                            <img src={Sair} alt="icone sair"/>
                                        </button>
                                    </div>
                            </div>
                    </div>

            
                </div>
            <div className="conteudo-equipamento">

                <header>
                    <h2 className="titulo">SEJA BEM VINDO</h2>
                    <div className="search-form">
                        <div className="lupa"/>
                        <Form>
                        <input
                            name="country"
                            label=" "
                            placeholder="Procure por um equipamento"
                        />
                     
                        </Form>
                    </div>
                </header>
            
                

                <section>
                        
                <div className="container-info-equipamento">    
                                    
                    <div className="bem-vindo">INICIE CADASTRANDO UM NOVO EQUIPAMENTO DA SUA INFRAESTRUTURA</div>
                                
                                                
                </div>
                </section>
    
            </div>
        </div>
    );
}