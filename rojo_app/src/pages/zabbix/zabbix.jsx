import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import './zabbix.scss';

import '../../component_recycling/barraLateral/barraLateral.css';
import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import { parseJwt } from "../../services/auth";
import { useMemo } from "react";
import SearchBar  from '../../component_recycling/SearchBar';

import BarraLateral from "../../component_recycling/barraLateral/barraLateral";

export default function BemVindo() 
{
    var navigate = useNavigate();
    
    //States Usuario
    const [nome] = useState(parseJwt().nome);
    const [cargo] = useState(parseJwt().cargo);

    //Lista
    const[listaEquipamento, setListaEquipamento] = useState([]);
    const[busca, setBusca] = useState("");
    const[meusHosts, setMeusHosts] = useState([]);

    function realizarListHost()
    {
        axios.get('./temporario')
        .then((response) => {
            setMeusHosts(response.data);
        })
    }

    useEffect(() => (realizarListHost()),[])

    function realizarListagem (){
        let usuario = parseJwt().jti;
        axios
        .get('http://localhost:5000/api/Equipamento/listar-meus-equipamentos/' + usuario)
        .then((response ) => {
            // console.log(response.data );
            setListaEquipamento((response.data));
            // setListaEquipamento.toString();
            console.log(listaEquipamento);
        })
        .catch((erro) => console.log(erro));
    }

    useEffect(() => (realizarListagem()), [])        
    
    const equipamentoFiltrado = useMemo(() => {
        return listaEquipamento.filter( (equipamento) => equipamento.modelo.toLowerCase().includes(busca.toLowerCase()));        
    },[busca]) 

    return(   
        <div className="container-cadastro-equipamento">
            
            <BarraLateral/>
            
            <div className="conteudo-equipamento">

                <header>
                    <h2 className="titulo">AREA DE TRABALHO</h2>
                    <div className="search-form">
                        <SearchBar placeholder="Pesquise um modelo " data={listaEquipamento}/>
                        
                    </div>
                </header>
            
                

                <section>
                        
                    <div className="container-info-equipamento">   
                         <div className="table-host">
                            
                            <div className="head-host">HOSTS ZABBIX</div>
                            <table>
                                <thead>
                                <tr>
                                    <th>Invoice</th>
                                    <th>Company</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><a href="#">INV__1001</a></td>
                                    <td>Paragon</td>
                                    <td>1/5/2021</td>
                                    <td>
                                    <p class="status status-unpaid">Unpaid</p>
                                    </td>
                                    <td class="amount">$520.18</td>
                                </tr>
                                
                                <tr>
                                    <td><a href="#">INV__1005</a></td>
                                    <td>Highlander</td>
                                    <td>12/18/2020</td>
                                    <td>
                                    <p class="status status-paid">Paid</p>
                                    </td>
                                    <td class="amount">$1152.35</td>
                                </tr>
                                </tbody>
                            </table>

                            <div class="tbl-header">
                              <table className="table-table-2" cellpadding="0" cellspacing="0" border="0">
                                <thead>
                                  <tr>
                                    <th className="th-table-2">Code</th>
                                    <th className="th-table-2">Company</th>
                                    <th className="th-table-2">Price</th>
                                    <th className="th-table-2">Change</th>
                                    <th className="th-table-2">Change %</th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                            <div className="tbl-content">
                              <table className="table-table-2" cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                  <tr>
                                    <td className="td-table-2">AAC</td>
                                    <td className="td-table-2">AUSTRALIAN COMPANY </td>
                                    <td className="td-table-2">$1.38</td>
                                    <td className="td-table-2">+2.01</td>
                                    <td className="td-table-2">-0.36%</td>
                                  </tr>
                             
                                </tbody>
                              </table>
                            </div>           

                         </div>
                    </div>           
                </section>
    
            </div>
        </div>
    );
}