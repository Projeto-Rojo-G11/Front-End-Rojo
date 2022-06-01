import './style.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axios from 'axios';

export default function Connection(props) {
    const [porta, setPorta] = useState("123");
    const [ip, setIp] = useState("123");
    const [user, setUser] = useState("1231");
    const [password, setPassword] = useState("123");
    const [modelo, setModelo] = useState("123");
    const [lista, setLista] = useState('123');

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
    var teste = {
        teste: "teste"
    }

    function connectDevice(){
        fetch("http://127.0.0.1:8000/teste", {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(teste),
          })
        .then((response) =>{
            if(response.status === 200){
                console.log("deu certo")

            }
            // localStorage.setItem('status-device' + {modelo}, response.data);

            // EventClose()
            console.log(response)
        })
        .catch((erro)=>console.log(erro))


        // let obj_json = {
        //     "username": "user",
        //     // "password": password,
        //     // "port": porta,
        //     // "ip": ip,
        //     // "modelo": modelo,
        //     // "command_list": lista
        // }
        

        // fetch("http://127.0.0.1:8000/send_commands/", {
        //     method:"POST",
        //     headers:{
        //         'Content-type': 'application/json'
        //     },
        //     dataType:"JSON",
        //     body: JSON.stringify(obj_json),
        //   })
        // .then((response) =>{
        //     // localStorage.setItem('status-device' + {modelo}, response.data);

        //     // EventClose()
        //     console.log(response)
        // })
        // .catch((erro)=>console.log(erro))
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
                                    <input type="text" placeholder='Modelo' onChange={(event)=> setModelo(event.target.value)}/>
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
