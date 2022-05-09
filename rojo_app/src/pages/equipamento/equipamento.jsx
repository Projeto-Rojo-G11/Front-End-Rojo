import axios from "axios";
import React,{ useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form } from 'react-bootstrap';

import { parseJwt } from "../../services/auth";
// import BarWork  from '../../component_recycling/barwork/BarWork';

import Logo from '../../assets/img/logoRojo2.png';
import Sair from '../../assets/icon/icon-sair.png';
import Grafana from '../../assets/icon/icon-grafana.png';
import DataDog from '../../assets/icon/data.png';
import Zabbix from '../../assets/icon/icon-zabbix.png';
import ho from '../../assets/icon/historico.png';
import la from '../../assets/icon/lista.png';
import ta from '../../assets/icon/topologia.png';
import aa from '../../assets/icon/alerta.png';


import '../../assets/css/barra-esquerda.css';
import '../../assets/css/animation__input.css';
import '../../assets/css/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import './../../component_recycling/barwork/style.css'
import './../../component_recycling/barwork/BarWork.css'


// import '../../assets/css/'
// import './BarWork.css';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import { Settings } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import SearchBar  from '../../component_recycling/SearchBar';



export default function CadastroEquipamento() {

    var navigate = useNavigate();

    
    
    const [isLoading, setIsLoading] = useState(false);
    // const [boolPut, setBoolPut] = useState(false);

    //States Usuario
    const [idUsuario, setIdUsuario] = useState(parseJwt().jti)
    const [nome, setNome] = useState(parseJwt().nome);
    const [cargo, setCargo] = useState(parseJwt().cargo);

    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(null);
    const [numeroDeSerie, setNumeroDeSerie] = useState('');
    const [modelo, setModelo] = useState('');
    const [gateWay, setGateWay] = useState('');
    const [ip, setIp] = useState('');
    const [dns, setDns] = useState('');
    const [porta, setPorta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date())
    const [condicao, setCondicao] = useState('');

    const [tipo, setTipo] = useState(null);
    const [dadoEquipamento, setDadoEquipamento] =useState([]);
    const [dadoTipoEquipamento, setDadoTipoEquipamento] = useState([]);


    const reboot = document.getElementById('btn-reboot');
    const modal_reboot = document.getElementById('reboot');
    const close = document.getElementById('close');
    
    reboot.addEventListener('click', () => {
        modal_reboot.classList.add('show');
    });

    close.addEventListener('click', () => {
        modal_reboot.classList.remove('show')
    }); 

    const buscarTipoEquipamento = () =>
    {
        axios
        .get('http://localhost:5000/api/TipoEquipamento/lista')

        .then(function (response) {
            setDadoTipoEquipamento(response.data)
        })
        .catch((erro)=> console.log(erro))
    }

    const realizarLogout = async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          navigate('/'); 
        } catch (error) {
          console.warn(error);
        }
      };
    
    const cadastroEquipamento = (event) => 
    {
        event.preventDefault();

        let equipamento = {
        idUsuario: idUsuario,
        idTipoEquipamento: parseInt(idTipoEquipamento),
        numeroDeSerie: numeroDeSerie,
        modelo: modelo,
        gateWay: parseInt(gateWay),
        mask: parseInt(ip),
        dns: parseInt(dns),
        porta: parseInt(porta),
        dataEntrada : new Date(data),
        descricao: descricao,
        };

        axios
        .post("http://localhost:5000/api/Equipamento/cadastro-equipamento", equipamento
        )   
        
        .then( function (response){
            setDadoEquipamento(response.data);
        })

        .then( function (resposta) {
            console.log(resposta);
            navigate('/ListaEquipamento')
        })
        
        .catch( function (erro) {
            console.log(erro);
        });
    }


    useEffect(() => (buscarTipoEquipamento()),[])

    return(   
            <div className="container-cadastro-equipamento">
                    
                <div className="sidebar">
                    <div className="s-c">
                        <button id="btn-reboot"><RestartAltIcon/></button>
                        <button id="#configuration"><Settings/></button>
                        <button id="#connection"><PlayCircleIcon/></button>
                        <button id="#extra"><SettingsInputHdmiIcon/></button>
                    </div>
                </div>
                <div id="reboot" className="modal_container">
                    <div id="box-modal">
                            <div className="img-modal"/>
                            <div id="info-modal">
                                <h2>INICIAR REBOOT</h2>
                                <h4>DO EQUIPAMENTO :</h4>
                                <div id="text">
                                    <p>modelo :{}</p>
                                    <p>ip :{}</p>

                                </div>
                                <p>Tem certeza que deseja continuar?</p>
                                <div id="btn">
                                <button className="btn-reboot-s">
                                    <p>sim, estou ciente</p>
                                </button>
                                <button className="btn-reboot-n">
                                    <p>não,cancelar</p>
                                </button>
                            </div>
                        </div>
                        <button id="close"><CloseIcon/></button>
                    </div>
                </div>
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
                                    <Link className= "funcao" to="/Alertas">
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
                        <h2 className="titulo">NOVO EQUIPAMENTO</h2>
                        <div className="search-form">
                        <div className="lupa"/>
                            <SearchBar/>
                        </div>
                    </header>
                
                    

                    <section>
                            
                    <div className="container-info-equipamento">    
                    <div className="container-info-equipamento-h3"><h3>Dados Equipamento</h3></div>
                                        
                
                                                    <form className="form-cadastro-equipamento" onSubmit={(event) => cadastroEquipamento(event)}>
                                                        <div className="dados">
                                                            <div className="box-1">
                                                                <div className="box-1-1">
                                                                    
                                                                    <div className="form__div">
                                                                        <select
                                                                            name="idTipoEquipamento"  
                                                                            value={idTipoEquipamento}   
                                                                            id="form__input_tipoEquipamento"      
                                                                            onChange={(event) => setIdTipoEquipamento(event.target.value)}
                                                                        >
                                                                                {dadoTipoEquipamento.map((event) => {
                                                                                    return (

                                                                                        <option key={event.idTipoEquipamento} value={event.idTipoEquipamento}>{event.equipamento}
                                                                                        </option>
                                                                                    );
                                                                                })}                                 
                                                                                <option value="#">Tipo de Equipamento </option>
                                                                        </select>                        
                                                                        
                                                                    </div>
                                                                    <div className="form__div">                       
                                                                        <input 
                                                                            className="form__input"
                                                                            type="text"
                                                                            name="Modelo"
                                                                            value={modelo}
                                                                            autoComplete='off'
                                                                            placeholder=" "
                                                                            onChange={(event) => setModelo(event.target.value)}
                                                                        /> 
                                                                        <label className="form__label">
                                                                            Modelo
                                                                        </label>
                                                                    </div>
                                                                </div>


                                                                <div className="form__div">                   
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="NumeroSerie"
                                                                        value={numeroDeSerie}
                                                                        placeholder=" "
                                                                        onChange={(event) => setNumeroDeSerie(event.target.value)}
                                                                    />  
                                                                    <label className="form__label">
                                                                        Numero de Série
                                                                    </label>
                                                                </div> 


                                                            </div>
                                                            <div className="divisor">
                                                                <p>Informações para consultas básicas do sistema</p>
                                                                <div className="palito-divisor"/>
                                                            </div>
                                                            <div className="box-2">
                                                                <div className="form__div">                        
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="Gateway"
                                                                        value={gateWay}
                                                                        placeholder=" "
                                                                        onChange={(event) => setGateWay(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        GateWay
                                                                    </label>
                                                                </div>

                                                                <div className="form__div">                        
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="IP"
                                                                        value={ip}
                                                                        placeholder=" "
                                                                        onChange={(event) => setIp(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        Mask
                                                                    </label>
                                                                </div>

                                                                <div className="form__div">                      
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="DNS"
                                                                        value={dns}
                                                                        placeholder=" "
                                                                        onChange={(event) => setDns(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        DNS
                                                                    </label> 
                                                                </div> 

                                                                <div className="form__div">                        
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="Porta"
                                                                        value={porta}
                                                                        placeholder=" "
                                                                        onChange={(event) => setPorta(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        Porta
                                                                    </label>
                                                                </div>

                                                                
                                                                </div>

                                                        </div>
                                                        <div className="container-img">
                                                            <div className="box-img" alt="imagem do perfil"/>

                                                                <div className="form__div">    
                                                                    <textarea rows="6" cols="20" wrap="hard"
                                                                            className="form__input"
                                                                            id="form__input_descricao"
                                                                            type="text"                                                                        value={descricao}
                                                                            placeholder=" "                                                                        
                                                                            onChange={(event) => setDescricao(event.target.value)}
                                                                    />                   
                                        
                                                                    <label className="form__label">
                                                                        Descrição
                                                                    </label>
                                                                </div> 
                                                            
                                        
                                                                <button
                                                                    type="submit"
                                                                    className="btn__login-2"
                                                                    disabled={
                                                                        idTipoEquipamento === '' ||
                                                                        modelo === '' || 
                                                                        numeroDeSerie === '' |
                                                                        gateWay === '' ||
                                                                        dns === ''||
                                                                        ip === ''||
                                                                        porta === '' 
                                                                        ? 'none'
                                                                        : ''
                                                                    }
                                                                >    
                                                                    CADASTRAR
                                                                </button>
                                    
                                                        </div>
                                                    </form>
                                    </div>
                    </section>
        
                </div>
            </div>
        );
    

}
              