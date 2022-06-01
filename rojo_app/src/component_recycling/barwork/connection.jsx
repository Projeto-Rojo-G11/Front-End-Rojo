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
    var teste =  {"valor":"teste"};    

    function connectDevice(){

        axios.post('http://127.0.0.1:5000/send_commands', {
            ip: ip,
            port: porta,
            username: user,
            password: password,
            command_list: lista,
        }
        )
        .then((resposta) => {
            console.log(resposta)
            if (resposta.status === 200) {
                console.log('sucesso');
            }
        })
        .catch((erro) => {
            console.log(erro);
        });
    }

    return(
        <div id="connection" className="modal_container">
                <div id="box-modal" className='co'>
                    <div id='h-connection'>
                        

                        <div id='h--1'>
                            <h2>CONEXAO</h2>
                            <h4>DO EQUIPAMENTO</h4>
                        </div>
                        <div id='h--2'>
                            <button>CONECTAR</button>
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
                            <p id='p'>Tem certeza que deseja continuar?</p>
                            <div id="btn">
                                <button className="btn-reboot-s" onClick={connectDevice}>
                                    <p>sim, estou ciente</p>
                                </button>
                                <button onClick={EventClose} className="btn-reboot-n">
                                    <p>não,cancelar</p>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div> 
    )
}
