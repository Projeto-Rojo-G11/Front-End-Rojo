import axios from "axios";
import React,{ useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Form } from 'react-bootstrap';
import InputControl from '../../additional/components/InputControl';
import { parseJwt } from "../../services/auth";

import Grafana from '../../assets/icon/icon-grafana.png';
import DataDog from '../../assets/icon/data.png';
import Zabbix from '../../assets/icon/icon-zabbix.png';
import Filtro from '../../assets/icon/icon-filtro.png';
import Editar from '../../assets/icon/icon-editar.png';
import Ferramenta from '../../assets/icon/icon-ferramenta.png';

import Logo from '../../assets/img/logoRojo.png';
import Sair from '../../assets/icon/icon-sair.png';
import Linq from '../../assets/icon/icon-link.png';

import ho from '../../assets/icon/historico.png';
import la from '../../assets/icon/lista.png';
import ta from '../../assets/icon/topologia.png';
import aa from '../../assets/icon/alerta.png';

import '../../assets/css/barra-esquerda.css';
import '../../assets/css/bem-vindo.css';
import '../../assets/css/animation__input.css';
import '../../assets/css/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import '../../assets/css/listaEquipamento.css';


export default function ListaEquipamento (){
    var navigate = useNavigate();

    //States Usuario
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');

    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(0);
    const [modelo, setModelo] = useState(0);
    const [numeroSerie, setNumeroSerie] = useState(0);

    //Listas
    const [listEq, setListEq] = useState([]);

    //States status
    const [statusOn, setStatusOn] = useState(false)

    const [isLoading, setIsLoading] = useState('');
    const [ listaEquipamento, setListaEquipamento ] = useState([])



    function buscarMeusEquipamentos(){
        axios('http://localhost:5000/api/Equipamento/listar-meus-equipamentos', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 200) {
                setListEq( response.data );
            }
        })
        .catch( erro => console.log(erro) );
    };
    
    useEffect( buscarMeusEquipamentos, [] );

    function listaTipoequipamento(){
        axios.get('http://localhost:5000/api/Usuario/',{})

        .then(resposta => resposta.status === 201)
    }
    
    const realizarLogout = async () => {
        try {
          await AsyncStorage.removeItem('userToken');
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
            <div className="conteudo-equipamento">

                <header>
                    <h2 className="titulo">SEUS EQUIPAMENTOS</h2>
                    <div className="search-form">
                        <div className="lupa"/>
                        <Form>
                        <InputControl
                            name="country"
                            label=" "
                            placeholder="Procure por um equipamento"
                        />
                    
                        </Form>
                    </div>
                </header>
            
                

                <section>
                        
                    <div className="container-info-equipamento">  
                    {
                        
                     
                            <div className="box-lista">
                                <div className="box-head-lista">
                                    <div><p>#{listEq.idEquipamento} </p></div>
                                </div>
                                <div className="box-body-lista">
                                        <div className="ob1-info">
                                            <div className="ob1-info-input">
                                                    <div className="form__div">                       
                                                                        <div
                                                                            className="-lista"
                                                                        >
                                                                            {idTipoEquipamento}
                                                                        </div>
                                                                        <label className="label">
                                                                            Tipo Equipamento
                                                                        </label>
                                                    </div>
                                                    <div className="form__div">                       
                                                                        <div 
                                                                            className="-lista"
                                                                        >
                                                                            {modelo}
                                                                        </div>
                                                                        <label className="label">
                                                                            Modelo
                                                                        </label>
                                                    </div>
                                            </div>
                                            <div className="ob1-info-input-2">
                                                    <div className="form__div">                       
                                                                        <div 
                                                                            className="-lista"
                                                                        >{numeroSerie}</div> 
                                                                        <label className="label">
                                                                            Numero de Serie
                                                                        </label>
                                                                        
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="ob2-status">
                                            <div className="status">

                                                STATUS 
                                                <div>
                                                    {
                                                    statusOn === true && (
                                                        <div className="on-off">
                                                            <div className="circle1"/>
                                                            <p>Ligado</p>
                                                        </div>
                                                    )}
                                                    {
                                                    statusOn === false && (
                                                        <div className="on-off">
                                                            <div className="circle2"/>
                                                            <p>Desligado</p>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                            <div>
                                                ALERTAS
                                                <div className="box-alerta">
                                                    <div className="alerta">
                                                        <div className="alerta1"/>
                                                        <p>0</p>
                                                        </div>
                                            
                                            
                                                    <div className="alerta">
                                                        <div className="alerta2"/>
                                                        <p>0</p>
                                                    </div>
                                                    </div>               
                                                </div> 
                                        </div>
                                        <div className="ob3-img"/>
                                </div>
                            </div>
                         
                    }  
                    </div>
                </section>
    
            </div>
        </div>
    );
}