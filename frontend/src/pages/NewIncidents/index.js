import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

//import css
import './style.css';

import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function NewIncidents(){
    //pegar dados guardado no localstorage
    const ongId = localStorage.getItem('ongId');

    //enviar após o cadastro para a página inicial
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const data = {
        title,
        description,
        value,
    };

    async function handleNewIncidents(e){
        e.preventDefault();

    try{
        await api.post('incidents', data, {
            headers: {
                Authorization: ongId
            }
        });

        history.push('/profile');
    }catch(err){
        alert("Erro ao cadastrar novo caso, tente novamente.");
    }

    }

    return (
        <div className="new-incidents-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the hero" />

                <h1>Cadastrar no caso</h1>
                <p>Descreva o caso detalhadamente para encontrar umm herói para resolver isso.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041" /> Voltar para home
                </Link>
            </section>
            
            <form onSubmit={handleNewIncidents}>
                <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />

                <button onClick={handleNewIncidents} className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}