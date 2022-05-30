import axios from "axios";
import React,{ useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import z from '../../assets/img/unnamed.png';
import d from '../../assets/img/unnamed (1).png';

import { Form } from 'react-bootstrap';
import './historico.scss'

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
    const[listaHistoriaZabbix, setListaHistoriaZabbix] = useState([{}])

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
                    <h2 className="titulo">HISTÓRICO DOS DISPOSITIVOS</h2>
                    <div className="search-form">
                        <SearchBar placeholder="Pesquise um modelo " data={listaEquipamento}/>
                        
                    </div>
                </header>
                
                    

                    <section>
                            
                        <div className="container-info-equipamento">    
                            <div class="container-hist">
                                <h2>HISTÓRIA<small>do ZABBIX<img src={z} alt="icone zabbix"/></small></h2>
                                <ul class="responsive-table">
                                    <li class="table-header">
                                    <div class="col col-1">Job Id</div>
                                    <div class="col col-2">Customer Name</div>
                                    <div class="col col-3">Amount Due</div>
                                    <div class="col col-4">Payment Status</div>
                                    </li>
                                    {
                                        listaHistoriaZabbix.map((item) => {
                                            return(
                                                <li class="table-row">
                                                <div class="col col-1" data-label="Job Id">42235</div>
                                                <div class="col col-2" data-label="Customer Name">John Doe</div>
                                                <div class="col col-3" data-label="Amount">$350</div>
                                                <div class="col col-4" data-label="Payment Status">Pending</div>
                                                </li>
                                            )
                                        })
                                    }
                    
                                </ul>
                            </div>
                            <div class="container-hist">
                                <h2>HISTÓRIA<small>do DATADOG <img src={d} alt="icone datadog"/></small></h2>
                                <ul class="responsive-table">
                                    <li class="table-header">
                                    <div class="col col-1">Job Id</div>
                                    <div class="col col-2">Customer Name</div>
                                    <div class="col col-3">Amount Due</div>
                                    <div class="col col-4">Payment Status</div>
                                    </li>
                                    <li class="table-row">
                                    <div class="col col-1" data-label="Job Id">42235</div>
                                    <div class="col col-2" data-label="Customer Name">John Doe</div>
                                    <div class="col col-3" data-label="Amount">$350</div>
                                    <div class="col col-4" data-label="Payment Status">Pending</div>
                                    </li>
                                    <li class="table-row">
                                    <div class="col col-1" data-label="Job Id">42442</div>
                                    <div class="col col-2" data-label="Customer Name">Jennifer Smith</div>
                                    <div class="col col-3" data-label="Amount">$220</div>
                                    <div class="col col-4" data-label="Payment Status">Pending</div>
                                    </li>
                                    <li class="table-row">
                                    <div class="col col-1" data-label="Job Id">42257</div>
                                    <div class="col col-2" data-label="Customer Name">John Smith</div>
                                    <div class="col col-3" data-label="Amount">$341</div>
                                    <div class="col col-4" data-label="Payment Status">Pending</div>
                                    </li>
                                    <li class="table-row">
                                    <div class="col col-1" data-label="Job Id">42311</div>
                                    <div class="col col-2" data-label="Customer Name">John Carpenter</div>
                                    <div class="col col-3" data-label="Amount">$115</div>
                                    <div class="col col-4" data-label="Payment Status">Pending</div>
                                    </li>
                                </ul>
                                </div>
                        </div>
                    </section>
        
                </div>
            </div>
        );
    

}
