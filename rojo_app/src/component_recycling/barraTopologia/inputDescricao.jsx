import { useState } from 'react';

import './barraTopologia.css';
import ImgEditar from '../../assets/img/editar.png';

export default function InputDescricao(){

    const [titulo, setTitulo] = useState();

    function charCount(){

        var element=document.getElementById('textarea').value.length;
        document.getElementById('textarea_count').innerHTML=element+"/100 (Max Character 100).";
    }
    
    return(
        <div className='container-acc'>
            <div className='accordion'>
                <div className='accordion-item' id='question'>
                    <a className='accordion-link' href='#question'>
                        {/* <input type='text' onChange={(event)=> setTitulo(event)}/> */}
                        <p>mostrar</p>
                    </a>
                    <div className='answer'>
                        {/* <div classnameName="textarea_style">
                            <textarea classnameName="textarea" id="textarea" onKeyUp={charCount} name="textarea_description" rows="3" cols="37" maxLength="100" minLength="3" placeholder="Write your description here..."></textarea>
                        </div>  */}
                        <p>asdfasdssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                    </div>
                </div>
                <div className='accordion-item' id='question'>
                    <a className='accordion-link' href='#question'>
                        {/* <input type='text' onChange={(event)=> setTitulo(event)}/> */}
                        <p>mostrar</p>
                    </a>
                    <div className='answer'>
                        {/* <div classnameName="textarea_style">
                            <textarea classnameName="textarea" id="textarea" onKeyUp={charCount} name="textarea_description" rows="3" cols="37" maxLength="100" minLength="3" placeholder="Write your description here..."></textarea>
                        </div>  */}
                        <p>asdfasdssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                    </div>
                </div>
            </div>
        </div>
    ) 

}