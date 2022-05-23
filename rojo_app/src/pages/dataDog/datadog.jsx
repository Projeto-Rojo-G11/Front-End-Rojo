import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import '../zabbix/zabbix.scss';
import { existsSync } from 'fs';

import '../../component_recycling/barraLateral/barraLateral.css';
import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import { parseJwt } from "../../services/auth";
import { useMemo } from "react";
import SearchBar  from '../../component_recycling/barraPesquisa/SearchBar';
import './datadog.scss';

import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import { useRef } from "react";

export default function Zabbix() 
{
    var navigate = useNavigate();
    
    //States Host
    const [nomeHost, setNomeHost] = useState();
    const [hostGroup, setHostGroup] = useState();
    const [tipo, setTipo] = useState();
    const [main, setMain] =useState();
    const [ip, setIp] = useState();
    const [dns, setDns] = useState();
    const [porta, setPorta] = useState();
    const [template, setTemplate] = useState();

    //States Usuario
    const [nome] = useState(parseJwt().nome);
    const [cargo] = useState(parseJwt().cargo);

    //Lista
    const[listaDispositivo, setListaDispositivo]= useState([{"host":"teste","hostgroup": "teste", "descricao":"teste", "status":"teste", "gravidade":"teste"}]);
    const[listaEquipamento, setListaEquipamento] = useState([]);
    const[listaTemplate, setListaTemplate] = useState([{"templateId":"1","template":"Linux", "key":"1317", "description":"Linux Server"},{"templateId":"1","template":"Linux", "key":"1317", "description":"Linux Server"},{"templateId":"1","template":"Linux", "key":"1317", "description":"Linux Server"}]);
    const[busca, setBusca] = useState("");
    const[listaHost, setListaHost] = useState([]);

    //States Zabbix
    const[login] = useState(false);
    const[usuario, setUsuario] = useState('');
    const[senha, setSenha] = useState('');
    const[server, setServer] = useState('');
    const modalZabbix = document.querySelector('#modalZabbix');
    const fooBarRef = useRef(null);
    
    
    if(login === true){
        modalZabbix.classList.add('.hidden');
     }
    
    // var httpRequest = new XMLHttpRequest();
    // httpRequest.onreadystatechange = function(){};

    // var fs = require('fs') , ini = require('ini');

    
    function logar(){
        // const config = ini.parse(existsSync.readFileSync('../../pages/zabbix/apizabbix/config.ini', {encoding:'utf-8'}));
        // config.zabbix.server = server;
        // config.zabbix.user = usuario;
        // config.zabbix.password = senha;
        // existsSync.writeFileSync('../../connection_py/apizabbix/config.ini', ini.stringify(config));
        console.log("funciona")
        
        // let user = {
        //   user: usuario,
        //   password: senha,
        //   server:server
        // }
        // fetch("/connect", {
        //   'method':'POST',
        //   headers : {'Content-Type': 'application/json'},
        //   body:JSON.stringify(user)
        // })
        // .then((response) => {
        //   if(response != null){
        //     fooBarRef.current.classList.remove('.show');      
        //   }
        // })
        // .then((response) => {
        //   listarHost()
        //   listarTemplate()
        // })
      }

    function novoHost(){
      let host = {
        nomeHost: nomeHost,
        hostGroup: hostGroup,
        tipo: tipo,
        main: main,
        ip: ip,
        dns: dns,
        porta: porta,
        template: template
      }

      fetch("/createHost", {
        'method':'POST',
          headers : {'Content-Type': 'application/json'},
          body:JSON.stringify(host)
      })

      listarHost()
    }

    function listarHost(){
      fetch("/getHost", {
        'method':'GET',
          headers : {'Content-Type': 'application/json'},
      })
      .then((response) =>{
        setListaHost(response)
      })
    }

    function listarTemplate(){
      fetch("/getTemplate", {
        'method':'GET',
          headers : {'Content-Type': 'application/json'},
      })
      .then((response) => {
        setListaTemplate(response)
      })
    }

    function escolhido(event){
      event.preventDefault()

      setTemplate(event);
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

                          <div id="modalDataDog"  ref={fooBarRef}> 
                            <div id="box-">LOGIN DATADOG</div>
                            <div id="box--">
                              <div id="box--1">
                                <div className="ii">
                                  <input
                                      className="input-login b"
                                      type="email"
                                      value={usuario}
                                      onChange={(event) => setUsuario(event.target.value)}
                                      placeholder="USUARIO"
                                  />
                                </div>
                                <div className="ii">
                                    <input
                                        className="input-login input-login-senha b"
                                        type="password"
                                        value={senha}
                                        onChange={(event) => setSenha(event.target.value)}
                                        placeholder="SENHA"
                                    />
                                </div>

                              </div>
                              <div className="ii">
                                <input
                                    className="input-login c"
                                    type="text"
                                    value={server}
                                    onChange={(event) => setServer(event.target.value)}
                                    placeholder="SERVER"
                                />
                              </div>
                              <button id="btn-za" onClick={logar}/>
                              
                            </div>
                          </div>
                           
                          <div className="add-host">
                            <div className="h-add-host"> NOVO HOST</div>
                            <div className="b-add-host">
                              <div id="box-text">
                                <div id="box-t1">
                                  <div id="box-input">
                                    <p>HOST</p>
                                    <input 
                                      type="text"
                                      onChange={(event) => (setNomeHost(event))}
                                    />
                                  
                                  </div>
                                  <div id="box-input">
                                    <p>HOST GROUP</p>
                                    <input 
                                      type="text"
                                      onChange={(event) => (setHostGroup(event))}
                                    />
                                  
                                  </div> 

                                </div>
                                <div id="box-t1">
                                  <div id="box-input">
                                    <p>TIPO</p>
                                    <input 
                                      type="text"
                                      onChange={(event) => (setTipo(event))}
                                    />
                                  
                                  </div>
                                  <div id="box-input">
                                    <p>PORTA</p>
                                    <input 
                                      type="text"
                                      onChange={(event) => (setPorta(event))}
                                    />
                                  
                                  </div> 

                                </div>
                                <div id="box-t1">
                                  <div id="box-input">
                                    <p>MAIN</p>
                                    <input 
                                      type="text"
                                      onChange={(event) => (setMain(event))}
                                    />
                                  
                                  </div>
                                  <div id="box-input">
                                    <p>DNS</p>
                                    <input 
                                      type="text"
                                      onChange={(event) => (setDns(event))}
                                    />
                                  
                                  </div> 

                                </div>
                                <button id="btn-new">ENVIAR</button>
                                
                              </div>
                              <div id="box-template">
                              <p>TEMPLATE</p>
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
                                      {
                                        listaTemplate.map(item => {
                                          return(
                                            <tr>
                                              <td className="td-table-2">{item.templateId}</td>
                                              <td className="td-table-2">{item.template} </td>
                                              <td className="td-table-2">{item.key}</td>
                                              <td className="td-table-2">{item.description}</td>
                                              <td className="td-table-2"><button onClick={(event) => escolhido(event.target.item.templateId)} ></button></td>

                                            </tr>
  
                                          )
                                        })

                                      }

                                    </tbody>
                                  </table>
                                </div>           
                                </div>
                              </div>
                            </div>
                          </div>  


                         <div className="container-host">
                         <div className="h-add-host"> SEUS HOSTS</div>
                            <div className="head-host">HOSTS ZABBIX</div>
                            <table className="table-table-1">
                                <thead className="thead-table-1">
                                <tr>
                                    <th className="th-table-1">HOST</th>
                                    <th className="th-table-1">HOST GROUP</th>
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
                                        <td className="td-table-1"><a href="#">{item.host}</a></td>
                                        <td className="td-table-1">{item.hostgroup}</td>
                                        <td className="td-table-1">{item.descricao}</td>
                                        <td className="td-table-1">
                                        <p class="status status-unpaid">{item.status}</p>
                                        </td>
                                        <td class="td-table-1 amount">{item.gravidade}</td>
                                    </tr>
                                    )
                                  })
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