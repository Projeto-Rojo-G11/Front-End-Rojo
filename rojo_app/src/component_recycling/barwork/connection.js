import './style.scss'
import CloseIcon from '@mui/icons-material/Close';

export default function Connection() {

    function EventClose(){
        var modal_connection = document.getElementById('connection')
        modal_connection.classList.remove('show')
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
                            <p>modelo: {}</p>
                            <p>ip: {}</p>
                        </div>
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
                                <button className="btn-reboot-s">
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
