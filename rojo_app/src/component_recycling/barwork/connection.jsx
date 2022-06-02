import './style.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axios from 'axios';

export default function Connection(props) {
    const [porta, setPorta] = useState("");
    const [ip, setIp] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [lista, setLista] = useState('');

    function EventClose(){
        var modal_connection = document.getElementById('connection');
        modal_connection.classList.remove('show')
    };

    // var lineReader = require('line-reader');

    // lineReader.eachLine(lista, 
    //     function(line, last) {
    //         lista.push(line);
    //         if(line){
    //             return false; // stop reading
    //         }
    // });
    let data = {"lista":"lista"}; 
    function teste(){
        let data ={
            "lista": lista,
            "ip": ip,
            "port": porta,
            "password": password,
            "username": user
        }
        axios.post("http://localhost:8085/teste", data)
        .then((response) => {
            if(response.status === 200){
                console.log(response.status)
                console.log(response.data)
            }
        })
        .catch((erro)=>console.log(erro))
    }
    

    // function connectDevice(){
    //     data = {
    //         ip: ip,
    //         port: porta,
    //         username: user,
    //         password: password,
    //         command_list: lista,
    //     }

    //     axios.post('http://localhost:8085/send_commands', data)
    //     .then((resposta) => {
    //         console.log(resposta)
    //         if (resposta.status === 200) {
    //             console.log('sucesso');
    //         }
    //     })
    //     .catch((erro) => {
    //         console.log(erro);
    //     });
    // }

    return(
        <div id="connection" className="modal_container">
                <div id="box-modal" className='co'>
                    <div id='h-connection'>
                        

                        <div id='h--1'>
                            <h2>CONEXAO</h2>
                            <h4>DO EQUIPAMENTO</h4>
                        </div>
                        <div id='h--2'>
                            <button onClick={teste}>CONECTAR</button>
                            <div id="close" onClick={EventClose}><CloseIcon/></div>

                        </div>
                    </div>
                    <div id="b-connection">
                        <div id='b-global'>
                            <div>
                    
                                <p id='h'>informe os dados</p>
                                <div id='i--'>
                                    <input type="text" placeholder='Usuario' onChange={(event)=> setUser(event.target.value)}/>
                                    <input type="text" placeholder='Senha' onChange={(event)=> setPassword(event.target.value)}/>
                                </div>
                                <div id='i--'>
                                    <input type="text" placeholder='IP' onChange={(event)=> setIp(event.target.value)}/>
                                    <input type="text" placeholder='Porta' onChange={(event)=> setPorta(event.target.value)}/>
                                </div>
                                <textarea placeholder='Insira o script de conexao com o dispositivo' onChange={(event) => setLista(event.target.value)} rows="10" cols="20"wrap="hard"/>
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div> 
    )
}
