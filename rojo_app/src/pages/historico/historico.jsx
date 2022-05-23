import axios from "axios";
import React,{ useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


import { Form } from 'react-bootstrap';
import './historico.css'

import '../../component_recycling/barraLateral/barraLateral.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import SearchBar  from '../../component_recycling/barraPesquisa/SearchBar';


export default function CadastroEquipamento() {

    var navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);
    // const [boolPut, setBoolPut] = useState(false);

    const[listaEquipamento, setListaEquipamento] = useState([]);

    //States Usuario
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');

    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(null);
    const [modelo, setModelo] = useState('');
    const [numeroDeSerie, setNumeroDeSerie] = useState('');
    const [gateWay, setGateWay] = useState('');
    const [ip, setIp] = useState('');
    const [dns, setDns] = useState('');
    const [porta, setPorta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date())
    const [condicao, setCondicao] = useState('');

    const [dadoUsuario, setDadoUsuario] = useState([]);
    const [dadoEquipamento, setDadoEquipamento] =useState([]);
    const [dadoTipoEquipamento, setDadoTipoEquipamento] = useState([]);
    const [dadoModelo, setDadoModelo] =useState([]);

    // //States Imagem Equipamento
    // const [img64, setImg64] = useState('');
    const [arquivo, setArquivo] = useState(null);

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
    
    const cadastroEquipamento = (event) => 
    {
        event.preventDefault();

        let equipamento = {
        idUsuario: 1,
        idTipoEquipamento: parseInt(idTipoEquipamento),
        modelo: modelo,
        numeroSerie: parseInt(numeroDeSerie),
        gateWay: parseInt(gateWay),
        mask: parseInt(ip),
        dns: parseInt(dns),
        porta: parseInt(porta),
        condicao: parseInt(condicao),
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
                
                <BarraLateral/>
                
                <div className="conteudo-equipamento">

                <header>
                    <h2 className="titulo">SEJA BEM VINDO</h2>
                    <div className="search-form">
                        <SearchBar placeholder="Pesquise um modelo " data={listaEquipamento}/>
                        
                    </div>
                </header>
                
                    

                    <section>
                            
                        <div className="container-info-equipamento">    
                            <div className="equipamento-his">
                                <div className="section-1">
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
                                <div id="img-historia"/>                           
                            </div> 
                            <div className="historico">
                                <div className="body-historico">
                                    <p>
                                        Entre as datas
                                    </p>
                                    <div>
                                        <p>00/00/0000</p>
                                        <p>00/00/0000</p>

                                    </div>
                                </div>
                            </div>                       
                        </div>
                    </section>
        
                </div>
            </div>
        );
    

}
