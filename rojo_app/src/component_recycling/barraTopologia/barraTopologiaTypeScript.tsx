import './barraTopologia.css';
import { useRef, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';

//@ts-ignore
import edit from '../../assets/img/editar.png';
//@ts-ignore
import save from '../../assets/img/save.png';

export default function BarraTopologia(){

    const[descricao, setDescricao] = useState('');
    const[conditional, setConditional] = useState(false);

    const [image, setImage] = useState<File>();
    const [base64, setBase64] = useState();
    const [preview, setPreview] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>();
    const [imgDisable, setImgDisable] = useState(false);
        
    
    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
        };
        reader.readAsDataURL(image);
        } else {
          setPreview(null);
        }

        const formData = new FormData();
        formData.append(
          'arquivo', //chave, nome do arquivo que será enviado.
          image, // valor, arquivo físico
        );
    
        axios
          .post('http://localhost:5000/api/perfils/imagem/bd', formData, {})
          .catch((erro) => console.log(erro))
          .then(function(){setImgDisable(true)})
    }, [image]);
    
    function searchImg(){
        axios.get('http://localhost:5000/api/Topologia/imagem-topologia/bd')
        .then((response) => {
            if(response.status === 200){
                setBase64(response.data);
            }
        })
        .catch((erro) => console.log(erro))
    }

    function updateDescription()
    {
        axios.put('http://localhost:5000/api/Topologia/atualizar',)
    }

    function createDescription(){
        axios.post('http://localhost:5000/api/Topologia/cadastro-descricaoTopologia')
    }

    function newSection(){
        const container = document.querySelector("#container-input-clone ");
        const section = document.querySelector("#box-input-d");
        container.appendChild(section.cloneNode(true));
     }

    return (
        <div className="container-barratopologia">
            <form id='form-topologia'>
                {preview ? (
                <img
                    src={preview}
                    style={{ objectFit: "cover" }}
                    onClick={() => {
                    setImage(null);
                    }}
                />
                ) : (
                <button
                    onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                    }}
                >
                    <div id='add-img'/>
                </button>
                )}
                <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                accept="image/*"
                onChange={(event) => {
                    const file = event.target.files[0];
                    if (file && file.type.substr(0, 5) === "image") {
                    setImage(file);
                    } else {
                    setImage(null);
                    }
                }}
                />
            </form>

            <div id='container-descricao-topologia'>
                <div id='container-input-clone'>
                    <div id='box-input-d'>

                        <input type="text" value='Adicione um comentario' onChange={(event) => setDescricao(event.target.value)}/>
                        {
                            conditional === true && (
                                <button id='btn-up' onClick={updateDescription}><img src={edit} alt="icone editar" /></button>
                            )
                        }
                        {
                            conditional === false && (
                                <button id='btn-save' onClick={createDescription}><img src={save} alt="icone salvar" /></button>
                            )
                        }
                    </div>

                </div>
                <button id="novosectionbtn" onClick={newSection}>+</button>
            </div>
        </div>
    )
                        
}