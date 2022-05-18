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
    
    //States Host
    const [nomeHost, setNomeHost] = useState();
    const [hostGroup, setHostGroup] = useState();
    const [tipo, setTipo] = useState();
    const [main, setmain] =useState();
    const [ip, setIp] = useState();
    const [dns, setDns] = useState();
    const [porta, serPorta] = useState();

    //States Usuario
    const [nome] = useState(parseJwt().nome);
    const [cargo] = useState(parseJwt().cargo);

    //Lista
    const[listaDispositivo, setListaDispositivo]= useState([]);
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

    function novoHost(){
      host = {
        nomeHost: nomeHost,
        hostGroup: hostGroup,
        tipo: tipo,
        main: main,
        ip: ip,
        dns: dns,
        porta: porta,
      }

      new file(host, "temporario.json");
      
    }


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
                          <div className="add-host">
                            <div className="h-add-host"> NOVO TEMPLATE</div>
                            <div className="b-add-host"> 
                              <div id="box-input">
                                <p>NOME DO HOST</p>
                                <input 
                                  type="text"
                                  onChange={(event) => (set)}
                                />
                              </div>
                            </div>
                          </div>  
                         <div className="container-host">
                            
                            <div className="head-host">HOSTS ZABBIX</div>
                            <table className="table-table-1">
                                <thead className="thead-table-1">
                                <tr>
                                    <th className="th-table-1">ID HOST</th>
                                    <th className="th-table-1">HOST</th>
                                    <th className="th-table-1">DESCRIÇÃO</th>
                                    <th className="th-table-1">STATUS</th>
                                    <th className="th-table-1">GRAVIDADE</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                  listaDispositivo.map((item) => {
                                    return(
                                      <tr>
                                        <td className="td-table-1\\\\"><a href="#">{item.hostid}</a></td>
                                        <td className="td-table-1">Paragon</td>
                                        <td className="td-table-1">1/5/2021</td>
                                        <td className="td-table-1">
                                        <p class="status status-unpaid">Unpaid</p>
                                        </td>
                                        <td class="td-table-1 amount">$520.18</td>
                                    </tr>
                                    )
                                  })
                                }
                            
                                </tbody>
                            </table>
                            </div>
                            <div className="container-template">

                              <div class="tbl-header">
                                <table className="table-table-2" cellpadding="0" cellspacing="0" border="0">
                                  <thead>
                                    <tr>
                                      <th className="th-table-2">ID TEMPLATE</th>
                                      <th className="th-table-2">TEMPLATE</th>
                                      <th className="th-table-2">CHAVE</th>
                                      <th className="th-table-2">DESCRICAO</th>
                                      <th className="th-table-2"></th>
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
                                      <td className="td-table-2">-0.36%</td>
                                      <td className="td-table-2"><input type="select" ></input></td>

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