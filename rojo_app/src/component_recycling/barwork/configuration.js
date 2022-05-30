import './style.scss'
import CloseIcon from '@mui/icons-material/Close';
import { setPriority } from 'os';
import { useState } from 'react';


export default function Configuration(){

    const[device_type, setDevice_type] = useState();
    const[ip, setIp] = useState();
    const[user, setUser] = useState();
    const[senha, setSenha] = useState();
    const[porta, setPorta] = useState();
    

    function EventClose(){
        var modal_configuration = document.getElementById('configuration')
        modal_configuration.classList.remove('show')
    }

    return(
        <div id="configuration" className="modal_container">
            <div id="box-modal" className='co'>
                <div id='h-configuration'>
                    <div id='h--c'>
                        <h3>CONFIGURAMENTO</h3>
                        <h5>DO EQUIPAMENTO</h5>
                    </div>
                    <button id="close" onClick={EventClose}><CloseIcon/></button>
                    
                </div>
                <div id='b-configuration'>
                    INFORME OS NOVOS DADOS DO SWITCH
                </div>
                <div id='box-alter-device'>
                    <div>
                        <input type="text" placeholder='Usuario' onChange={(event) => setUser(event.target.value)}/>
                        <input type="text" placeholder='Senha' onChange={(event) => setSenha(event.target.value)}/>
                    </div>
                    <div>
                        <input type="text" placeholder='IP' onChange={(event) => setIp(event.target.value)}/>
                        <input type="text" placeholder='Porta' onChange={(event) => setPorta(event.target.value)}/>
                    </div>
                    <div>
                        <input type="text" placeholder='Tipo Disposiivo' onChange={(event) => setDevice_type(event.target.value)}/>
                    </div>
                    <button id='btn--'>ALTERAR</button>
                </div>
            </div>
        </div> 
    )
}