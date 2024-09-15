import React, { useState } from 'react';
import { enumStatus, enumTipo } from '../utils/enums/Enum.tsx'; // Importe os enums

interface Pedido {
  status: enumStatus;
  nDocumento: string;
  duracao: string;
  tipo: enumTipo;
  proponente: string;
  contratante: string;
  objetoContrato: string[];
  valorTotal: number;
  rendimentos: string[];
  comprarVeiculoFinal: boolean;
}

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
}

const RequestForm: React.FC = () => {
  const [pedido, setPedido] = useState<Pedido>({
    status: enumStatus.PENDENTE,
    nDocumento: '',
    duracao: "12 Meses",
    tipo: enumTipo.ALUGUEL,
    proponente: 'Cliente A',
    contratante: 'Agente B',
    objetoContrato: [],  // Simulação de consulta a veículos
    valorTotal: 0,
    rendimentos: [],
    comprarVeiculoFinal: false
  });

  // Array de durações como string
  const duracaoContrato = ["12 Meses", "24 Meses", "36 Meses", "48 Meses"];
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [assurance, setAssurance] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPedido({ ...pedido, status: event.target.value as enumStatus });
  };

  const handleDuracaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPedido({ ...pedido, duracao: event.target.value, valorTotal: 700 * Number(event.target.value.split(' ')[0]) });
  };

  const handleToggleCompra = () => {
    setPedido({ ...pedido, comprarVeiculoFinal: !pedido.comprarVeiculoFinal });
  };

  const handleToggleAssurance = (event: React.ChangeEvent<HTMLInputElement>) => {
    const duracaoContrato = Number(pedido.duracao.split(' ')[0]);
    let valorTotal        = (duracaoContrato * 700);
    
    if(event.target.value === 'Sim') {
      valorTotal += (duracaoContrato * 350);
    }
  
    setPedido({ ...pedido, valorTotal: valorTotal });
  };

  // useState(() => {
  //   fetch('https://localhost:8080/vehicles', { method: 'GET' , headers: { 'Authorization ': `Bearer  ${token}` } })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setVehicles([ ...vehicles, data]);
  //     });
    
  // });

  const handleVehicleChange = (event: React.ChangeEvent<HTMLSelectElement>)  => {
    
    const veiculo = vehicles.find((vehicle) => vehicle.id === Number(event.target.value));

    gerarCodigoDocumento(pedido.tipo, veiculo?.brand || '');

    setPedido({ ...pedido, objetoContrato: [veiculo?.id.toString() ?? ''] });
  }

  return (
    <div className="p-4 bg-[#F8F8F8]">
      <h2 className="text-xl font-bold mb-4">Formulário de Pedido</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Status:</label>
        <select
          value={pedido.status}
          onChange={handleStatusChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        >
          {Object.values(enumStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

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

      <div className="mb-4">
        <label className="block text-gray-700">Valor Total: R${pedido.valorTotal}</label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Deseja comprar o veículo ao final do contrato?</label>

        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            value="" 
            className="sr-only peer" 
            checked={pedido.comprarVeiculoFinal} 
            onChange={handleToggleCompra}
          />
          <div className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${pedido.comprarVeiculoFinal ? 'bg-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : 'bg-red-500 peer-checked:bg-blue-600'}`}>
          </div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {pedido.comprarVeiculoFinal ? 'Sim' : 'Não'}
          </span>
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contratar seguro?</label>

        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            value="" 
            className="sr-only peer" 
            onChange={handleToggleAssurance}
          />
          <div className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${pedido.comprarVeiculoFinal ? 'bg-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : 'bg-red-500 peer-checked:bg-blue-600'}`}>
          </div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {('Sim' ? true : false) ? 'Sim' : 'Não'}
          </span>
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Veículo: </label>
        <div className="grid grid-cols-2 gap-4">
          <select  
          value={pedido.objetoContrato}
          onChange={handleVehicleChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md">
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const gerarCodigoDocumento = (tipo: enumTipo, placa: string): string => {
  const data = new Date();
  const mesAno = `${data.getMonth() + 1}-${data.getFullYear()}`;
  return `${mesAno}[${tipo}][${placa}]`;
};

export default RequestForm;
