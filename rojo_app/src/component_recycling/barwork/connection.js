import './style.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function Connection(props) {
    const {porta, setPorta} = useState("")
    const {ip, setIp} = useState("")
    const {user, SetUser} = useState("")
    const {password, setPassword} = useState("")
    const {modelo, setModelo} = useState("")

    function EventClose(){
        var modal_connection = document.getElementById('connection')
        modal_connection.classList.remove('show')
    }


    function connectDevice(){

        let data = {
            user = user,
            password = password,
            ip = ip,
            modelo = modelo,
            porta = porta
        }
        

        fetch("/send_commands/", {
            'method':'POST',
            headers : {'Content-Type': 'application/json'},
            body:JSON.stringify(data)
          })
        .then((response) =>{
        if (response.status === 200)
        {
            localStorage.setItem('status-device' + {data.idEquipamento}, response.data);

            EventClose;
        }
        })
    }

    return(
        <div id="connection" className="modal_container">
                <div id="box-modal" className='co'>
                    <div id='h-connection'>
                        <input type="text" onChange={(event)=> setUser(event.target.value)}>
                        <input type="text" onChange={(event)=> setPassword(event.target.value)}>
                        <input type="text" onChange={(event)=> setModelo(event.target.value)}>
                        <input type="text" onChange={(event)=> setIp(event.target.value)}>
                        <input type="text" onChange={(event)=> setPorta(event.target.value)}>
                        {/* <div id='h--1'>
                            <h2>CONEXAO</h2>
                            <h4>DO EQUIPAMENTO</h4>
                        </div>
                        <div id='h--2'>
                            <p>modelo: {}</p>
                            <p>ip: {}</p>
                        </div> */}
                    </div>
                    <div id="b-connection">
                        <div id='b-global'>
                            <div>
                                <p id='h'>informe os dados</p>
                                <div id='i--'>
                                    <p>usuario :</p>
                                    <input/>
                                </div>
                                <div id='i--'>
                                    <p>senha    :</p>
                                    <input type='password' />
                                </div>
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
