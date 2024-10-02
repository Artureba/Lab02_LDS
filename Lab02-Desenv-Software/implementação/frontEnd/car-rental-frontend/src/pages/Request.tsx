import React, { useState } from 'react';
import { StatusDocumento, TipoContrato } from '../utils/enums/Enum.tsx';

// DTO de Pedido
interface Pedido {
  status: StatusDocumento;          // Status do documento
  nDocumento: string;               // Número do documento
  duracao: string;                  // Duração do contrato
  tipo: TipoContrato;                // Tipo do contrato
  proponente: string;               // Proponente do contrato
  contratante: string;              // Contratante do contrato
  objetoContrato: string[];         // Veículo(s) objeto do contrato
  valorTotal: number;               // Valor total do contrato
  rendimentos: string[];            // Rendimentos do proponente
  comprarVeiculoFinal: boolean;     // Indica se o veículo será comprado ao final do contrato
}

// Interface para os veículos
interface Vehicle {
  id: number;                       // ID do veículo
  name: string;                     // Nome do veículo
  brand: string;                    // Marca do veículo
  model: string;                    // Modelo do veículo
  year: number;                     // Ano do veículo
  price: number;                    // Preço do veículo
}

// Componente do formulário de pedido
const RequestForm: React.FC = () => {
  // Estado do pedido
  const [pedido, setPedido] = useState<Pedido>({
    status: StatusDocumento.PENDENTE,   // Status inicial
    nDocumento: '',                       // Número do documento inicial
    duracao: "12 Meses",                 // Duração inicial
    tipo: TipoContrato.ALUGUEL,           // Tipo de contrato inicial
    proponente: 'Cliente A',             // Proponente inicial
    contratante: 'Agente B',              // Contratante inicial
    objetoContrato: [],                   // Veículos objeto do contrato inicial
    valorTotal: 0,                       // Valor total inicial
    rendimentos: ['', '', ''],           // Inicializa com três campos de rendimentos vazios
    comprarVeiculoFinal: false            // Indica que não irá comprar o veículo inicialmente
  });

  const [solicitarNovoVeiculo, setSolicitarNovoVeiculo] = useState<boolean>(false); // Estado para solicitar novo veículo
  const duracaoContrato = ["12 Meses", "24 Meses", "36 Meses", "48 Meses"]; // Opções de duração do contrato
  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // Estado para lista de veículos
  const [assurance, setAssurance] = useState<boolean>(false); // Estado para seguro
  const token = localStorage.getItem('token'); // Token do local storage

  // Função para alterar o status
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPedido({ ...pedido, status: event.target.value as StatusDocumento });
  };

  // Função para alterar o tipo de contrato
  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPedido({ ...pedido, tipo: event.target.value as TipoContrato });
  };

  // Função para alterar a duração do contrato
  const handleDuracaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const duracaoMeses = Number(event.target.value.split(' ')[0]);
    const valorTotal = 700 * duracaoMeses; // Cálculo do valor total baseado na duração
    setPedido({ ...pedido, duracao: event.target.value, valorTotal });
  };

  // Função para alternar a compra do veículo ao final do contrato
  const handleToggleCompra = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPedido({ ...pedido, comprarVeiculoFinal: event.target.checked });
  };

  // Função para alternar a contratação de seguro
  const handleToggleAssurance = (event: React.ChangeEvent<HTMLInputElement>) => {
    const duracaoMeses = Number(pedido.duracao.split(' ')[0]);
    let valorTotal = duracaoMeses * 700;

    if (event.target.checked) {
      valorTotal += duracaoMeses * 350; // Adiciona valor do seguro ao valor total
    }

    setAssurance(event.target.checked);
    setPedido({ ...pedido, valorTotal });
  };

  // Função para alterar a solicitação de novo veículo
  const handleSolicitarNovoVeiculoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolicitarNovoVeiculo(event.target.checked);
  };

  // Função para alterar o veículo selecionado
  const handleVehicleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const veiculo = vehicles.find((vehicle) => vehicle.id === Number(event.target.value));
    gerarCodigoDocumento(pedido.tipo, veiculo?.brand || ''); // Gera código do documento com a marca do veículo
    setPedido({ ...pedido, objetoContrato: [veiculo?.id.toString() ?? ''] }); // Atualiza objeto do contrato
  };

  // Função para alterar os rendimentos
  const handleRendimentoChange = (index: number, value: string) => {
    const newRendimentos = [...pedido.rendimentos];
    newRendimentos[index] = value;
    setPedido({ ...pedido, rendimentos: newRendimentos });
  };

  // Função para gerar o código do documento
  const gerarCodigoDocumento = (tipo: TipoContrato, placa: string) => {
    const codigo = `${tipo}-${placa}`; // Formato do código
    setPedido((prev) => ({ ...prev, nDocumento: codigo })); // Atualiza número do documento
  };

  // Renderização do formulário
  return (
    <div className="p-4 bg-[#F8F8F8]">
      <h2 className="text-xl font-bold mb-4">Formulário de Pedido</h2>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-gray-700">Status:</label>
        <select
          value={pedido.status}
          onChange={handleStatusChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        >
          {Object.values(StatusDocumento).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Tipo de contrato */}
      <div className="mb-4">
        <label className="block text-gray-700">Tipo do contrato:</label>
        <select
          value={pedido.tipo}
          onChange={handleTipoChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        >
          {Object.values(TipoContrato).map((tipo) => (
            tipo !== TipoContrato.COMPRA && tipo !== TipoContrato.SEGURO && (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            )
          ))}
        </select>
      </div>

      {/* Duração */}
      <div className="mb-4">
        <label className="block text-gray-700">Duração:</label>
        <select
          value={pedido.duracao}
          onChange={handleDuracaoChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        >
          {duracaoContrato.map((duracao) => (
            <option key={duracao} value={duracao}>
              {duracao}
            </option>
          ))}
        </select>
      </div>

      {/* Valor Total */}
      <div className="mb-4">
        <label className="block text-gray-700">Valor Total: R${pedido.valorTotal}</label>
      </div>

      {/* Solicitar novo veículo */}
      {pedido.tipo === TipoContrato.ALUGUEL && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Solicitar novo veículo?</label>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={solicitarNovoVeiculo} 
                onChange={handleSolicitarNovoVeiculoChange}
              />
              <div className={`relative w-11 h-6 rounded-full peer ${solicitarNovoVeiculo ? 'bg-green-500' : 'bg-red-500'}`}>
              </div>
              <span className="ms-3 text-sm font-medium text-gray-900">
                {solicitarNovoVeiculo ? 'Sim' : 'Não'}
              </span>
            </label>
          </div>

          {/* Comprar veículo ao final */}
          {solicitarNovoVeiculo && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Deseja comprar o veículo ao final do contrato?</label>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={pedido.comprarVeiculoFinal} 
                    onChange={handleToggleCompra}
                  />
                  <div className={`relative w-11 h-6 rounded-full peer ${pedido.comprarVeiculoFinal ? 'bg-green-500' : 'bg-red-500'}`}>
                  </div>
                  <span className="ms-3 text-sm font-medium text-gray-900">
                    {pedido.comprarVeiculoFinal ? 'Sim' : 'Não'}
                  </span>
                </label>
              </div>

              {/* Seguro */}
              <div className="mb-4">
                <label className="block text-gray-700">Deseja contratar um seguro?</label>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={assurance} 
                    onChange={handleToggleAssurance}
                  />
                  <div className={`relative w-11 h-6 rounded-full peer ${assurance ? 'bg-green-500' : 'bg-red-500'}`}>
                  </div>
                  <span className="ms-3 text-sm font-medium text-gray-900">
                    {assurance ? 'Sim' : 'Não'}
                  </span>
                </label>
              </div>
            </>
          )}
        </>
      )}

      {/* Proponente */}
      <div className="mb-4">
        <label className="block text-gray-700">Proponente:</label>
        <input
          type="text"
          value={pedido.proponente}
          onChange={(e) => setPedido({ ...pedido, proponente: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Contratante */}
      <div className="mb-4">
        <label className="block text-gray-700">Contratante:</label>
        <input
          type="text"
          value={pedido.contratante}
          onChange={(e) => setPedido({ ...pedido, contratante: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Rendimentos */}
      <div className="mb-4">
        <label className="block text-gray-700">Rendimentos:</label>
        {pedido.rendimentos.map((rendimento, index) => (
          <input
            key={index}
            type="text"
            value={rendimento}
            onChange={(e) => handleRendimentoChange(index, e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md mb-2"
            placeholder={`Rendimento ${index + 1}`}
          />
        ))}
      </div>

      {/* Botão para criar pedido */}
      <button
        type="submit"
        onClick={() => console.log(pedido)} // Substituir por função de envio real
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Criar Pedido
      </button>
    </div>
  );
};

export default RequestForm;