import './style.scss'
import CloseIcon from '@mui/icons-material/Close';


export default function Reboot(){

    function EventClose(){
        var modal_reboot = document.getElementById('reboot')
        modal_reboot.classList.remove('show')
    }

    return(
            <div id="reboot" className="modal_container">
                <div id="box-modal">
                    <div className="img-modal"/>
                    <div id="info-modal">
                        <h2>INICIAR REBOOT</h2>
                        <h4>DO EQUIPAMENTO</h4>
                        <div id="text">
                            <p>modelo :</p>
                            <p>ip :</p>

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
                    <button id="close" onClick={EventClose}><CloseIcon/></button>
                </div>
            </div> 
    )
}