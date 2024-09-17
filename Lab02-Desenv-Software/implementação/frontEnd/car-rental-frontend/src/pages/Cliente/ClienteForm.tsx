import React, { useState } from 'react';

interface Cliente {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSalarioChange = (index: number, value: string) => {
    const newSalarios = [...cliente.salarios];
    newSalarios[index] = value;
    setCliente({ ...cliente, salarios: newSalarios });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui você poderia fazer a requisição para o backend
    console.log(cliente);
  };

  return (
    <div className="p-4 bg-[#F8F8F8]">
      <h2 className="text-xl font-bold mb-4">Formulário de Cliente</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nome:</label>
          <input
            type="text"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Nome"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Login:</label>
          <input
            type="text"
            name="login"
            value={cliente.login}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Login"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Senha:</label>
          <input
            type="password"
            name="senha"
            value={cliente.senha}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Senha"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">RG:</label>
          <input
            type="text"
            name="rg"
            value={cliente.rg}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="RG"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">CPF:</label>
          <input
            type="text"
            name="cpf"
            value={cliente.cpf}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="CPF"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={cliente.endereco}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Endereço"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Profissão:</label>
          <input
            type="text"
            name="profissao"
            value={cliente.profissao}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Profissão"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Empresa:</label>
          <input
            type="text"
            name="empresa"
            value={cliente.empresa}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Empresa"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Salários dos últimos 3 meses:</label>
          {cliente.salarios.map((salario, index) => (
            <input
              key={index}
              type="text"
              value={salario}
              onChange={(e) => handleSalarioChange(index, e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              placeholder={`Salário ${index + 1}`}
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default ClienteForm;
