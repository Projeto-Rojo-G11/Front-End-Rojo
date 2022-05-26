import './style.css'
import CloseIcon from '@mui/icons-material/Close';


export default function Configuration(){

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
                    {/* <button id="close" onClick={EventClose}><CloseIcon/></button> */}
                    
                </div>
                <div id='b-configuration'>
                    INFORME OS NOVOS DADOS
                </div>
                <div id='m-configuration'></div>
            </div>
        </div> 
    )
}