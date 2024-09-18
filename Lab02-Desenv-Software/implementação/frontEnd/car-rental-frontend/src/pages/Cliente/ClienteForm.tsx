import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Cliente {
  id?: number;
  nome: string;
  login: string;
  senha: string;
  rg: string;
  cpf: string;
  endereco: string;
  profissao: string;
  empresa: string;
  salarios: string[];
}

const ClienteForm: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    login: '',
    senha: '',
    rg: '',
    cpf: '',
    endereco: '',
    profissao: '',
    empresa: '',
    salarios: ['', '', ''], // Salários dos últimos 3 meses
  });
  const [editando, setEditando] = useState(false);

  const carregarClientes = async () => {
    const response = await axios.get('http://localhost:8080/api/clientes');
    setClientes(response.data);
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSalarioChange = (index: number, value: string) => {
    const newSalarios = [...cliente.salarios];
    newSalarios[index] = value;
    setCliente({ ...cliente, salarios: newSalarios });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editando) {
      await axios.put(`http://localhost:8080/api/clientes/${cliente.id}`, cliente);
    } else {
      await axios.post('http://localhost:8080/api/clientes', cliente);
    }
    setCliente({
      nome: '',
      login: '',
      senha: '',
      rg: '',
      cpf: '',
      endereco: '',
      profissao: '',
      empresa: '',
      salarios: ['', '', ''],
    });
    setEditando(false);
    carregarClientes();
  };

  const editarCliente = (clienteSelecionado: Cliente) => {
    setCliente(clienteSelecionado);
    setEditando(true);
  };

  const excluirCliente = async (id: number | undefined) => {
    if (id) {
      await axios.delete(`http://localhost:8080/api/clientes/${id}`);
      carregarClientes();
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editando ? 'Editar Cliente' : 'Formulário de Cliente'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="login"
          value={cliente.login}
          onChange={handleChange}
          placeholder="Login"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          name="senha"
          value={cliente.senha}
          onChange={handleChange}
          placeholder="Senha"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="rg"
          value={cliente.rg}
          onChange={handleChange}
          placeholder="RG"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
          placeholder="CPF"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="endereco"
          value={cliente.endereco}
          onChange={handleChange}
          placeholder="Endereço"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="profissao"
          value={cliente.profissao}
          onChange={handleChange}
          placeholder="Profissão"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="empresa"
          value={cliente.empresa}
          onChange={handleChange}
          placeholder="Empresa"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        
        {cliente.salarios.map((salario, index) => (
          <input
            key={index}
            type="text"
            value={salario}
            onChange={(e) => handleSalarioChange(index, e.target.value)}
            placeholder={`Salário ${index + 1}`}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        ))}

        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          {editando ? 'Atualizar' : 'Salvar'}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Lista de Clientes</h2>
      <ul className="mt-4 space-y-2">
        {clientes.map((cliente) => (
          <li key={cliente.id} className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
            <span>{cliente.nome} - {cliente.cpf}</span>
            <div>
              <button onClick={() => editarCliente(cliente)} className="text-blue-500 hover:underline mr-2">Editar</button>
              <button onClick={() => excluirCliente(cliente.id)} className="text-red-500 hover:underline">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteForm;