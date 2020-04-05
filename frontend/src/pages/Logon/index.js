import React, { useState } from 'react';
//objeto de link do conceiro SPA para carregar a página 
import { Link, useHistory } from 'react-router-dom';
//icone
import { FiLogIn } from 'react-icons/fi'

//api
import api from '../../services/api';

import './style.css';

import herosImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon(){
    const [id, setId] = useState('');

    //enviar o usuario para dentro do sistema
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            //salvar o id no localStora para ficar disponível em toda a aplicação
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch(err){
            alert('Falha ao logar. ID não encontrado!');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Heroes" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={ e => setId(e.target.value)}
                    />
                    <button type="submit" className="button" >Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" /> Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={herosImg} alt="Heroes" />
        </div>
    );
}