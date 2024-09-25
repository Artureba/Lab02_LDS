import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Usuario {
  id?: number;
  login: string;
  senha: string;
}

const UsuarioForm: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuario, setUsuario] = useState<Usuario>({ login: '', senha: '' });
  const [editando, setEditando] = useState(false);

  // const carregarUsuarios = async () => {
  //   const response = await axios.get('http://localhost:8080/api/usuarios');
  //   setUsuarios(response.data);
  // };

  // useEffect(() => {
  //   carregarUsuarios();
  // }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editando) {
      await axios.put(`http://localhost:8080/api/usuarios/${usuario.id}`, usuario);
    } else {
      await axios.post('http://localhost:8080/api/usuarios', usuario);
    }
    setUsuario({ login: '', senha: '' });
    setEditando(false);
    // carregarUsuarios();
  };

  const editarUsuario = (usuarioSelecionado: Usuario) => {
    setUsuario(usuarioSelecionado);
    setEditando(true);
  };

  const excluirUsuario = async (id: number | undefined) => {
    if (id) {
      await axios.delete(`http://localhost:8080/api/usuarios/${id}`);
      // carregarUsuarios();
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editando ? 'Editar Usuário' : 'Formulário de Usuário'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="login"
          value={usuario.login}
          onChange={handleChange}
          placeholder="Login"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          name="senha"
          value={usuario.senha}
          onChange={handleChange}
          placeholder="Senha"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          {editando ? 'Atualizar' : 'Salvar'}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Lista de Usuários</h2>
      <ul className="mt-4 space-y-2">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
            <span>{usuario.login}</span>
            <div>
              <button onClick={() => editarUsuario(usuario)} className="text-blue-500 hover:underline mr-2">Editar</button>
              <button onClick={() => excluirUsuario(usuario.id)} className="text-red-500 hover:underline">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuarioForm;