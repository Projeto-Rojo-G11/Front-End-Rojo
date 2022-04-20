import axios from "axios";
import React,{ useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { parseJwt } from "../../services/auth";

// import Filtro from '../../assets/icon/icon-filtro.png';
// import Editar from '../../assets/icon/icon-editar.png';
// import Ferramenta from '../../assets/icon/icon-ferramenta.png';

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


export default function CadastroEquipamento() {


    var navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);
    const [condicaoAtualizar, setCondicaoAtualizar] = useState(false);
    const [boolPut, setBoolPut] = useState(false);

    //States Usuario
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');

    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(0);
    const [modelo, setModelo] = useState(0);
    const [numeroSerie, setNumeroSerie] = useState(0);
    const [gateWay, setGateWay] = useState(0);
    const [ip, setIp] = useState(0);
    const [dns, setDns] = useState(0);
    const [porta, setPorta] = useState(0);
    const [img64, setImg64] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date())
    const [condicao, setCondicao] = useState('');

    const [dadoUsuario, setDadoUsuario] = useState([]);
    const [dadoEquipamento, setDadoEquipamento] =useState([]);
    const [dadoTipoEquipamento, setDadoTipoEquipamento] = useState([]);
    const [dadoModelo, setDadoModelo] =useState([]);


    const buscarTipoEquipamento = () =>
    {
        axios
        .get('http://localhost:5000/api/TipoEquipamento/lista')

        .then(function (response) {
            setDadoTipoEquipamento(response.data)
        })
        .catch((erro)=> console.log(erro))
    }

    const buscarTipoModelo = () =>
    {
        axios
        .get('http://localhost:5000/api/TipoEquipamento/lista')

        .then(function (response) {
            setDadoModelo(response.data)
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

    function buscarUsuarioPorId(event)
    {
        event.preventDefault();
        
        axios
        .get('http://localhost:5000/api/Usuario/', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then((resposta) =>
            {
                setDadoUsuario(resposta.data);
                console.log(dadoUsuario);
            }
        )
        .catch(erro => console.log(erro))

    }
    function cadastrarEquipamento (event) 
    {
        event.preventDefault();

        var formData = new FormData();

        const target = document.getElementById('arquivo');
        const file = target.files[0]
        formData.append(`arquivo`, file, file.name);
        
        formData.append('id', 0);
        formData.append(`img64`, img64)
        formData.append( `Modelo`, modelo);
        formData.append('NumeroSerie', numeroSerie);
        formData.append('GateWay', gateWay);
        formData.append('Mask', ip);
        formData.append('Dns', dns);
        formData.append('Porta', porta);
        formData.append('Condicao', condicao);
        formData.append('Descricao', descricao);
        formData.append('Data', data);


        axios({
            method: "post",
            url: "http://localhost:5000/api/Equipamento",
            data: formData,
            parseJwt,
            headers: {"Content-Type" : "multipart/form-data" },
        })
        .then( function (resposta){
            setDadoEquipamento(resposta.data)
        })

        .then( function (resposta) {
            console.log(resposta);
            navigate('/Equipamento/'+ dadoEquipamento.IdEquipamento)
        })
        
        .catch( function (resposta) {
            console.log(resposta);
        });
    }

    
    
    useEffect(() => (buscarTipoEquipamento()),[])
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
                        <h2 className="todo-titulo">Cadastrar Equipamento</h2>
                    </header>
                
                    

                    <section>
                            
                    <div className="container-info-equipamento">
                                        
                                        <div className="con-equi-info">
                                            {/* <div className="head-equi-info">
                                                <p>Dados {this.state.Modelo}</p>
                                            </div> */}
                                            <div className="container-box-info-dados-2">

                                                <div className="container-info-dados">

                                                    <form encType="multipart/form-data">
                                                        <div className="dados">
                                                            <div className="info-1">
                                                                <div>

                                                                    <p>
                                                                        Tipo Equipamento
                                                                    </p>
                                                                    <select
                                                                        name="idTipoEquipamento"  
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                        value={idTipoEquipamento}   
                                                                        className="input"      
                                                                        onChange={(event) => setIdTipoEquipamento(event.target.value)}>
                                                                         <option value="#">Escolha</option>
                                    {dadoTipoEquipamento.map((event) => {
                                        return (

                                            <option key={event.idTipoEquipamento} value={event.idTipoEquipamento}>{event.equipamento}
                                            </option>
                                        );
                                    })}                                 
                                                                    </select>                        
                                                                    
                                                                </div>


                                                                <div>

                                                                    <p>
                                                                        Modelo
                                                                        </p>                         
                                                                    <input
                                                                        className="input"
                                                                        type="text"
                                                                        name="Modelo"
                                                                        value={modelo}
                                                                        placeholder="Modelo"
                                                                        onChange={(event) => setModelo(event.target.value)}
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                    /> 
                                                                </div>

                                                                <div>

                                                                    <p>
                                                                        GateWay
                                                                        </p>                         
                                                                    <input
                                                                        className="input"
                                                                        type="text"
                                                                        name="Gateway"
                                                                        value={gateWay}
                                                                        placeholder="GateWay"
                                                                        onChange={(event) => setGateWay(event.target.value)}
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                    /> 
                                                                </div>

                                                                <div>

                                                                    <p>
                                                                        Mask
                                                                        </p>                         
                                                                    <input
                                                                        className="input"
                                                                        type="text"
                                                                        name="IP"
                                                                        value={ip}
                                                                        placeholder="IP"
                                                                        onChange={(event) => setIp(event.target.value)}
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                    /> 
                                                                </div>

                                                                <div>

                                                                    <p>
                                                                        Descricao
                                                                        </p>                         
                                                                    <input
                                                                        className="input"
                                                                        type="text"
                                                                        name="descricao"
                                                                        value={descricao}
                                                                        placeholder="Descrição"
                                                                        onChange={(event) => setDescricao(event.target.value)}
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                    /> 
                                                                </div> 
                                                            </div>
                                                            <div className="info-2">

                                                                <div>

                                                                    <p>
                                                                        DNS
                                                                        </p>                         
                                                                    <input
                                                                        className="input"
                                                                        type="text"
                                                                        name="DNS"
                                                                        value={dns}
                                                                        placeholder="Modelo"
                                                                        onChange={(event) => setDns(event.target.value)}
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                    /> 
                                                                </div> 

                                                                <div>

                                                                    <p>
                                                                        Porta
                                                                        </p>                         
                                                                    <input
                                                                        className="input"
                                                                        type="text"
                                                                        name="Porta"
                                                                        value={porta}
                                                                        placeholder="Porta"
                                                                        onChange={(event) => setDescricao(event.target.value)}
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                    /> 
                                                                </div>

                                                                <div>

                                                                    <p>
                                                                        Numero de Série
                                                                    </p>                         
                                                                    <input
                                                                        className="input"
                                                                        type="text"
                                                                        name="NumeroSerie"
                                                                        value={numeroSerie}
                                                                        placeholder="Numero de Série"
                                                                        onChange={(event) => setNumeroSerie(event.target.value)}
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                    /> 
                                                                </div> 
                                                                
                                                                {
                                                                    isLoading === true && (

                                                                        <button
                                                                        type="submit"
                                                                        disabled
                                                                        className="btn__login"
                                                                        id="btn__login"
                                                                        >
                                                                        Loading...
                                                                        </button>
                                                                )

                                                                }
                                                                {
                                                                    isLoading === false &&(
                                                                        <button
                                                                            type="submit"
                                                                            className="btn__login-2"
                                                                            disabled={
                                                                                idTipoEquipamento === '' || 
                                                                                modelo === '' || 
                                                                                numeroSerie === '' |
                                                                                gateWay === '' ||
                                                                                dns === ''||
                                                                                ip === ''||
                                                                                porta === '' 
                                                                                ? 'none'
                                                                                : ''
                                                                            }
                                                                        >    
                                                                            Cadastrar
                                                                        </button>
                                                                    )
                                                                }
                                                                </div>

                                                        </div>
                                                        <div className="container-img">
                                                            <div className="box-img" />

                                                            <input 
                                                            type="file"
                                                            accept="image/png, image/jpeg"
                                                            onChange={(e) => setImg64(e)}
                                                            />
                                                                                                              
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                    </section>
        
                </div>
            </div>
        );
    

}
