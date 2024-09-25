import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UsuarioAcesso {
  id?: number;
  nome: string;
  login: string;
  senha: string;
}

interface Agente {
  id?: number;
  tipo: string; // Tipo poderia ser uma enumeração, por simplicidade usamos string
  cnpj: string;
  inscricao: string;
  usuariosAcesso: UsuarioAcesso[];
}

const AgenteForm: React.FC = () => {
  const [agentes, setAgentes] = useState<Agente[]>([]);
  const [agente, setAgente] = useState<Agente>({
    tipo: '',
    cnpj: '',
    inscricao: '',
    usuariosAcesso: [{
      nome: '',
      login: '',
      senha: 'senha_padrao', // Definir uma senha padrão
    }],
  });
  const [editando, setEditando] = useState(false);

  const carregarAgentes = async () => {
    const response = await axios.get('http://localhost:8080/api/agentes');
    setAgentes(response.data);
  };

  useEffect(() => {
    carregarAgentes();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAgente({ ...agente, [name]: value });
  };

  const handleUsuarioAcessoChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    const novosUsuariosAcesso = [...agente.usuariosAcesso];
    novosUsuariosAcesso[index] = { ...novosUsuariosAcesso[index], [name]: value };
    setAgente({ ...agente, usuariosAcesso: novosUsuariosAcesso });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editando) {
      await axios.put(`http://localhost:8080/api/agentes/${agente.id}`, agente);
    } else {
      await axios.post('http://localhost:8080/api/agentes', agente);
    }
    setAgente({
      tipo: '',
      cnpj: '',
      inscricao: '',
      usuariosAcesso: [{
        nome: '',
        login: '',
        senha: 'senha_padrao',
      }],
    });
    setEditando(false);
    carregarAgentes();
  };

  const editarAgente = (agenteSelecionado: Agente) => {
    setAgente(agenteSelecionado);
    setEditando(true);
  };

  const excluirAgente = async (id: number | undefined) => {
    if (id) {
      await axios.delete(`http://localhost:8080/api/agentes/${id}`);
      carregarAgentes();
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editando ? 'Editar Agente' : 'Formulário de Agente'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="tipo"
          value={agente.tipo}
          onChange={handleChange}
          placeholder="Tipo"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="cnpj"
          value={agente.cnpj}
          onChange={handleChange}
          placeholder="CNPJ"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="inscricao"
          value={agente.inscricao}
          onChange={handleChange}
          placeholder="Inscrição"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <h3 className="text-xl font-semibold mt-4">Usuário de Acesso</h3>
        {agente.usuariosAcesso.map((usuario, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="nome"
              value={usuario.nome}
              onChange={(e) => handleUsuarioAcessoChange(e, index)}
              placeholder="Nome do Usuário"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="login"
              value={usuario.login}
              onChange={(e) => handleUsuarioAcessoChange(e, index)}
              placeholder="Login do Usuário"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              name="senha"
              value={usuario.senha}
              onChange={(e) => handleUsuarioAcessoChange(e, index)}
              placeholder="Senha do Usuário"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        ))}

        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          {editando ? 'Atualizar' : 'Salvar'}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Lista de Agentes</h2>
      <ul className="mt-4 space-y-2">
        {agentes.map((agente) => (
          <li key={agente.id} className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
            <span>{agente.tipo} - {agente.cnpj}</span>
            <div>
              <button onClick={() => editarAgente(agente)} className="text-blue-500 hover:underline mr-2">Editar</button>
              <button onClick={() => excluirAgente(agente.id)} className="text-red-500 hover:underline">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgenteForm;
