import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{ useEffect, useState} from "react";

import { Form } from 'react-bootstrap';
import InputControl from '../../additional/components/InputControl.js';


import Filtro from '../../assets/icon/icon-filtro.png';
import Editar from '../../assets/icon/icon-editar.png';
import Ferramenta from '../../assets/icon/icon-ferramenta.png';

import Logo from '../../assets/img/logoRojo.png';
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



export default function Equipamento(){
    
    const [isLoading, setIsLoading] = useState(false);
    const [condicaoAtualizar, setCondicaoAtualizar] = useState(false);


    //States Usuario
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');

    //States Equipamento
    const [idEquipamento, setIdEquipamento] = useState(0);
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(0);
    const [modelo, setModelo] = useState(0);
    const [numeroSerie, setNumeroSerie] = useState(0);
    const [gateWay, setGateWay] = useState(0);
    const [ip, setIp] = useState(0);
    const [dns, setDns] = useState(0);
    const [porta, setPorta] = useState(0);
    const [img64, setImg64] = useState(0);
    const [arquivo, setArquivo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [condicao, setCondicao] =useState('');
    const [atualizar, setAtualizar]= useState(false);
    const [alterarCondicaoAtualizar, setAlterarCondicaoAtualizar] = useState(false)
    
    //Listas 
    const [dadoTipoEquipamento, setDadoTipoEquipamento] = useState([]);

    // const [listaEquipamento, setListaEquipamento] = useState([]);  
    
    var navigate = useNavigate();

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
        
        axios.get('http://localhost:5000/api/Usuario/', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then((resposta) => {
            if(resposta.status === 200){
                navigate('/Equipamento')
            }
                
            }
        )
        .catch(erro => console.log(erro))

    }

    function buscarImagemUsuario (event) 
    {
        event.preventDefault();

        axios
        .get(`http://localhost:5000/api/Usuario/bd/`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then((resposta => {
                setImg64(resposta.data)

        }))
    }

    function atualizarEquipamento(event)
    {
        event.preventDefault();

        let equipamento = {
            Modelo : modelo,
            NumeroSerie : numeroSerie,
            GateWay : gateWay,
            Mask : ip,
            Dns : dns,
            Porta : porta,
            Condicao : condicao,
            Descricao : descricao,

        }

        axios.put('http://localhost:5000/api/Equipamento' + idEquipamento, {equipamento})
        .then((resposta) => {
            if(resposta.status === 201)
            {
                return console.log('Atualização realizada')
            }
        })
        .catch(erro => console.log(erro))
    }

    const atualizaState = (event) => {
        setArquivo( event.target.files[0]
        )
    }

    const buscarTipoEquipamento = () =>
    {
        axios
        .get('http://localhost:5000/api/TipoEquipamento/lista')

        .then(function (response) {
            setDadoTipoEquipamento(response.data)
        })
        .catch((erro)=> console.log(erro))
    }

    useEffect(() => (buscarTipoEquipamento()),[])
    
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
                    <h2 className="titulo"> EQUIPAMENTO</h2>
                    <div className="search-form">
                        <Form>
                        <InputControl
                            name="country"
                            label="Enter Country"
                            placeholder="Procure por um equipamento"
                        />
                    
                        </Form>
                    </div>
                </header>
            
                

                <section>
                        
                <div className="container-info-equipamento">    
                <div className="container-info-equipamento-h3"><h3>Dados {setModelo}</h3></div>
                                    
            
                                                <form className="form-cadastro-equipamento" onSubmit={(event) => atualizarEquipamento(event)}>
                                                    <div className="dados">
                                                        <div className="box-1">
                                                            <div className="box-1-1">
                                                                
                                                                <div className="form__div">
                                                                    <select
                                                                        name="idTipoEquipamento"  
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                        value={idTipoEquipamento}   
                                                                        id="form__input_tipoEquipamento"      
                                                                        onChange={(event) => setIdTipoEquipamento(event.target.value)}>
                                                                            {dadoTipoEquipamento.map((event) => {
                                                                                return (

                                                                                    <option key={event.idTipoEquipamento} value={event.idTipoEquipamento}>{event.equipamento}
                                                                                    </option>
                                                                                );
                                                                            })}                                 
                                                                            <option  value="#">Tipo de Equipamento </option>
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
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
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
                                                                    value={numeroSerie}
                                                                    placeholder=" "
                                                                    onChange={(event) => setNumeroSerie(event.target.value)}
                                                                    disabled = {condicaoAtualizar === true ? 'none' : ''}
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
                                                                    disabled = {condicaoAtualizar === true ? 'none' : ''}
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
                                                                    disabled = {condicaoAtualizar === true ? 'none' : ''}
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
                                                                    disabled = {condicaoAtualizar === true ? 'none' : ''}
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
                                                                    onChange={(event) => setDescricao(event.target.value)}
                                                                    disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                />
                                                                <label className="form__label">
                                                                    Porta
                                                                </label>
                                                            </div>

                                                            
                                                            </div>

                                                    </div>
                                                    <div className="container-img">
                                                        <div className="box-img" alt="imagem do perfil"/>

                                                        <input 
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => atualizaState(e)}
                                                        />
                                                       
                                                        {/* <button onClick={upload()}>Enviar</button>   */}

                                                            <div className="form__div">    
                                                                <textarea rows="6" cols="20" wrap="hard"
                                                                        className="form__input"
                                                                        id="form__input_descricao"
                                                                        type="text"                                                                        value={descricao}
                                                                        placeholder=" "
                                                                        onChange={(event) => setDescricao(event.target.value)}
                                                                        disabled = {condicaoAtualizar === true ? 'none' : ''}
                                                                />                   
                                                             
                                                                <label className="form__label">
                                                                    Descrição
                                                                </label>
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
                                                                    CADASTRAR
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                </form>
                                </div>
                </section>
    
            </div>
        </div>
    );
    

}
                   