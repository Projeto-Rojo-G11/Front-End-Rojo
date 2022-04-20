import { Link } from "react-router-dom";

import Logo from '../../assets/img/logoRojo.png';

import '../../assets/css/erro.css';

function Erro() {
    return (
      <div className="App">
        <header className='container-header'>
                    <div className="logo-header">
                        <nav>
                            <Link to="/"><img src={Logo}/></Link>
                        </nav>
                    </div>    
                </header>
                <main>

                    <div className="erro-box"/>
                  

                </main>
      </div>
    );
  }
  
  export default Erro;
  