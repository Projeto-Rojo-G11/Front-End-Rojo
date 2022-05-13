import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import './zabbix.css';

import '../../component_recycling/barraLateral/barraLateral.css';
import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import { parseJwt } from "../../services/auth";
import { useMemo } from "react";
import SearchBar  from '../../component_recycling/SearchBar';

import '../../pages/zabbix/zabbix.css';
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
                            
                            <div className="head-host">TEMPLATES</div>
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th className="hi">ID</th>
                                        <th className="hv">Nome do host</th>
                                        <th className="hs">Status</th>
                                        <th className="hd">Descrição</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                    {
                                        meusHosts.map( (host) => {
                                            return(
                                                <tr key={host.hostid}>
                                                    <td>{host.host}</td>
                                                    <td>{host.status}</td>
                                                    <td>{host.description}</td>
                                                </tr>
                                            )
                                        } )                                
                                    } 
                                </tbody>
                            </table>            

                         </div>


                        <div className="table-host">
                            
                            <div className="head-host">HOST LISTADOS</div>
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th className="hi">ID</th>
                                        <th className="hv">Nome do host</th>
                                        <th className="hs">Status</th>
                                        <th className="hd">Descrição</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                    {
                                        meusHosts.map( (host) => {
                                            return(
                                                <tr key={host.hostid}>
                                                    <td>{host.host}</td>
                                                    <td>{host.status}</td>
                                                    <td>{host.description}</td>
                                                </tr>
                                            )
                                        } )                                
                                    } 
                                </tbody>
                            </table>            

                         </div>
                    </div>           
                </section>
    
            </div>
        </div>
    );
}