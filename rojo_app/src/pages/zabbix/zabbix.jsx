import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import './zabbix.scss';
import * as fs from 'fs';

import '../../component_recycling/barraLateral/barraLateral.css';
import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import { parseJwt } from "../../services/auth";
import { useMemo } from "react";
import SearchBar  from '../../component_recycling/SearchBar';

import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import { useRef } from "react";

export default function Zabbix() 
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

    //States Zabbix
    const[login] = useState(false);
    const[usuario, setUsuario] = useState('');
    const[senha, setSenha] = useState('');
    const[server, setServer] = useState('');
    const modalZabbix = document.querySelector('#modalZabbix');
    const fooBarRef = useRef(null);
    
    
    if(login === false){
        modalZabbix.classList.add('.show');
     }

    
     
    
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){};

    var fs = require('fs');
    var ini = require('ini');

    const config = ini.parse(fs.readFileSync('../../connection_py/apizabbix/config.ini', {encoding:'utf-8'}));

    function logar(){
      config.zabbix.server = server;
      config.zabbix.user = usuario;
      config.zabbix.password = senha;
      // fs.readFileSync('../../connection_py/apizabbix/config.ini', ini.stringify(config));

      fetch("/connect")
      .then((response) => {
        if(response != null){
          fooBarRef.current.classList.remove('.show');      
        }
    })
    }

    function realizarListHost()
    {
        axios.get('./temporario')
        .then((response) => {
            setMeusHosts(response.data);
        })
    }

    useEffect(() => (realizarListHost()),[])

    // function novoHost(){
    //   host = {
    //     nomeHost: nomeHost,
    //     hostGroup: hostGroup,
    //     tipo: tipo,
    //     main: main,
    //     ip: ip,
    //     dns: dns,
    //     porta: porta,
    //   }

    //   new file(host, "temporario.json");
      
    // }


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
                          <div className="modalZabbix"  ref={fooBarRef}> 
                            <div className="box-input-login">
                              <p className="box-input-login-p">Usuario</p>
                              <input
                                  className="input-login"
                                  type="email"
                                  value={usuario}
                                  onChange={(event) => setUsuario(event.target.value)}
                                  placeholder="example@email.com"
                              />
                            </div>
                            <div className="box-input-login">
                                <p className="box-input-login-p">Senha</p>
                                <input
                                    className="input-login input-login-senha"
                                    type="password"
                                    value={senha}
                                    onChange={(event) => setSenha(event.target.value)}
                                    placeholder="*****"
                                />
                            </div>
                            <div className="box-input-login">
                              <p className="box-input-login-p">Usuario</p>
                              <input
                                  className="input-login"
                                  type="text"
                                  value={server}
                                  onChange={(event) => setServer(event.target.value)}
                                  placeholder="000.000.00"
                              />
                            </div>
                          </div>
                           
                          <div className="add-host">
                            <div className="h-add-host"> NOVO TEMPLATE</div>
                            <div className="b-add-host"> 
                              <div id="box-input">
                                <p>NOME DO HOST</p>
                                <input 
                                  type="text"
                                  onChange={(event) => (setNomeHost(event))}
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