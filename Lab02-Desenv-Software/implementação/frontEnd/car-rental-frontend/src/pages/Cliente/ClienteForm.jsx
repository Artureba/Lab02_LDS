import React, { useState } from 'react';
import ClienteService from './ClienteService';

const ClienteForm = () => {
    const [cliente, setCliente] = useState({ nome: '', login: '', senha: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ClienteService.createCliente(cliente).then(() => {
            alert('Cliente criado com sucesso!');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input type="text" name="nome" value={cliente.nome} onChange={handleChange} />
            </div>
            <div>
                <label>Login:</label>
                <input type="text" name="login" value={cliente.login} onChange={handleChange} />
            </div>
            <div>
                <label>Senha:</label>
                <input type="password" name="senha" value={cliente.senha} onChange={handleChange} />
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
};

export default ClienteForm;
