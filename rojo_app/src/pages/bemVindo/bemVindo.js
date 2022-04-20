import React,{  useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { parseJwt } from "../../services/auth";

import Filtro from '../../assets/icon/icon-filtro.png';
import Editar from '../../assets/icon/icon-editar.png';
import Ferramenta from '../../assets/icon/icon-ferramenta.png';

import Logo from '../../assets/img/logoRojo.png';
import Sair from '../../assets/icon/icon-sair.png';
import Linq from '../../assets/icon/icon-link.png';
import Grafana from '../../assets/icon/icon-grafana.png';
import Graylog from '../../assets/icon/icon-graylog.png';
import Zabbix from '../../assets/icon/icon-zabbix.png';
import ho from '../../assets/icon/historico.png';
import la from '../../assets/icon/lista.png';
import ta from '../../assets/icon/topologia.png';
import aa from '../../assets/icon/alerta.png';

import '../../assets/css/barra-esquerda.css';
import '../../assets/css/equipamento.css';

export default function BemVindo() 
{

    var navigate = useNavigate();
    
    //States Usuario
    const [nome, setNome] = useState(parseJwt.nome);
    const [cargo, setCargo] = useState(parseJwt.cargo);
    const [ex, setEx] = useState(parseJwt.role);
    
    const realizarLogout = async () => {
        try {
          await AsyncStorage.removeItem('usuario-login');
          console.log(cargo)
          navigate('/'); 
          
        } catch (error) {
          console.warn(error);
        }
      };

    // useEffect(()=> (buscarUsuarioPorId),[])

    return(   
        <div className="container-equipamento">
                <div>
                    <div className="container-barra-esquerda">
                        <div className="barra-superior">
                            <nav  className="Logo">
                                <Link to="/"><img src={Logo} alt="Logo da Rojo"/></Link>
                            </nav>
                            <div className="box-container-link">
                                <nav className="funcao-superior">

                                    <Link className= "cadastro" to="/CadastrarEquipamento">
                                        <p className="cadastro-texto">
                                        Cadastro Equipamento

                                        </p>
                                    <div className="cadastro-box-anime">
                                        <div className="palito"></div>
                                        
                                    </div>
                                    </Link>
                                    <Link className= "funcao" to="/Listar Equipamento">
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
                                    <Link className= "funcao" to="/Alertas">
                                        <img src={aa} alt="Icone de topologia"/>
                                        <p>Alerta</p>
                                    </Link>


                                </nav>
                                <div className="funcao-inferior">

                                    <Link className="container-link" to="/grafana">
                                        <div className="btn-link">
                                            <img src={Grafana} alt="Logo do Grafana"></img>
                                        </div>
                                        <p>Grafana</p>
                                        <img src={Linq} alt="Logo da Grafana"/>
                                    </Link>

                                    <Link className="container-link" to="/graylog">
                                        <div className="btn-link">
                                            <img src={Graylog} alt="Logo do Graylog"></img>
                                        </div>
                                        <p>Graylog</p>
                                        <img src={Linq} alt="Logo do Graylog"/>
                                    </Link>

                                    <Link className="container-link" to="/zabbix">
                                        <div className="btn-link">
                                            <img src={Zabbix} alt="Logo do Zabbix"></img>
                                        </div>
                                        <p>Zabbix</p>
                                        <img src={Linq} alt="Logo do Zabbix"/>
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
                                            <p
                                            className="perfil-nome">{nome}</p>
                                                            
                                            <p
                                            className="perfil-cargo">
                                                {cargo}
                                            </p>
                                            
                                        </div>
                                        <div>

                                            <button
                                                onClick={realizarLogout}
                                            >
                                                <img src={Sair} alt="icone sair"/>
                                            </button>
                                        </div>
                            </div>
                    </div>

                </div>
            </div>
            <div className="conteudo-equipamento">
            <header>
                        <h2 className="todo-titulo">Bem Vindo {ex}</h2>
                    </header>
                
            <section>
                        <div className="container-direita">
                            <div className="barra-direita">
                                <div className="button">

                                    <button>
                                        <img src={Editar} alt="icone filtro"/>
                                    </button>

                                    <button
                                        
                                    >
                                    <img src={Filtro} alt="icone editar"/>
                                
                                    </button>

                                    <button>
                                        <img src={Ferramenta} alt="Icone ferramenta"/>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </section>

                <section>
                        
                <div className="container-info-equipamento">
                                    
                                    <div className="con-equi-info">
                                        {/* <div className="head-equi-info">
                                            <p>Dados {this.state.Modelo}</p>
                                        </div> */}
                                        <div className="container-box-info-dados-3">
                                            <p>Inicie cadastrando um novo equipamento da sua infraestrutura</p>
                                            
                                        </div>

                                    </div>
                                </div>
                </section>
    
            </div>
        </div>
    
    );
}