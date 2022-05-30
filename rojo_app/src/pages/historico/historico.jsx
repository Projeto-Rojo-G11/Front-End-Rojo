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
                                    <div class="col col-1">Id Evento</div>
                                    <div class="col col-2">Id Item</div>
                                    <div class="col col-3">Valor</div>
                                    <div class="col col-4">Status</div>
                                    </li>
                                    {
                                        listaHistoriaZabbix.map((item) => {
                                            return(
                                                <li class="table-row">
                                                <div class="col col-1" data-label="Job Id"></div>
                                                <div class="col col-2" data-label="Customer Name"></div>
                                                <div class="col col-3" data-label="Amount"></div>
                                                <div class="col col-4" data-label="Payment Status"></div>
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
                                    <div class="col col-1">Id Evento</div>
                                    <div class="col col-2">Id Item</div>
                                    <div class="col col-3">Valor</div>
                                    <div class="col col-4">Status</div>
                                    </li>
                                    {
                                        listaHistoriaZabbix.map((item) => {
                                            return(
                                                <li class="table-row">
                                                <div class="col col-1" data-label="Job Id"></div>
                                                <div class="col col-2" data-label="Customer Name"></div>
                                                <div class="col col-3" data-label="Amount"></div>
                                                <div class="col col-4" data-label="Payment Status"></div>
                                                </li>
                                            )
                                        })
                                    }
                                   
                                    
                                </ul>
                                </div>
                        </div>
                    </section>
        
                </div>
            </div>
        );
    

}
