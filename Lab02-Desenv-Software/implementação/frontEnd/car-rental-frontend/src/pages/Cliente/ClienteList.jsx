import React, { useState, useEffect } from 'react';
import ClienteService from './ClienteService';

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        ClienteService.getAllClientes().then((res) => {
            setClientes(res.data);
        });
    }, []);

    return (
        <div>
            <h2>Lista de Clientes</h2>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>{cliente.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClienteList;
