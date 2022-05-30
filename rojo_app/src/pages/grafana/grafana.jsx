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
import './grafana.css';

import { parseJwt } from "../../services/auth";
import { useMemo } from "react";
import SearchBar  from '../../component_recycling/barraPesquisa/SearchBar';

import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import { useRef } from "react";

export default function Grafana() 
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

    const[iframe, setIframe] = useState();
    
    var IframePequeno1
    var IframePequeno2
    var IframePequeno3
    var IframePequeno4

    var IframeMedio1;
    var IframeMedio2;
    var IframeMedio3;
    var IframeMedio4;

    var IframeGrande1;
    var IframeGrande2;
    var IframeGrande3;


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
        .get('http://3.211.143.134:8080/api/Equipamento/listar-meus-equipamentos/' + usuario)
        .then((response ) => {
            // console.log(response.data );
            setListaEquipamento((response.data));
            // setListaEquipamento.toString();
            console.log(listaEquipamento);
        })
        .catch((erro) => console.log(erro));
    }

    useEffect(() => (realizarListagem()), [])   
    
    function newIframe(){
      // const g = document.querySelector('#frame-grande');
      // const m = document.querySelector('#frame-medio');
      // const p = document.querySelector("#frame-pequeno");

      // if(iframe.width >= 250){
      //   g.appendChild(iframe);
      // }
      // if(iframe.width >= 250){
      //   m.appendChild(iframe);
      // }
      // if(iframe.width >= 250){
      //   p.appendChild(iframe);
      // }
      console.log(iframe.width)
    }
    
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
                        
                    <div className="container-info-equipamento grafana">
                      <div id="get--">
                        <p>Incorpore um novo gráfico (IFRAME) pronto de serviços de monitoramento </p>
                        <input type="text" onChange={(event) => setIframe(event.target.value)}/>
                        <button onClick={newIframe}>Enviar</button>
                      </div>
                      <div id="frame-pequeno">

                      </div>
                      <div id="frame-medio">

                      </div>
                      <div id="frame-grande">

                      </div>
                    </div>           
                </section>
    
            </div>
        </div>
    )
}