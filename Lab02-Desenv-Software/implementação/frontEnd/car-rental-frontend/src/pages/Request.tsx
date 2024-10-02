import React, { useState } from 'react';
import { enumStatus, enumTipo } from '../utils/enums/Enum.tsx';

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
  proprietario: string;
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
    proponente: '',
    contratante: '',
    objetoContrato: [],
    valorTotal: 0,
    rendimentos: ['', '', ''],
    comprarVeiculoFinal: false,
    proprietario: ''
  });

  const [solicitarNovoVeiculo, setSolicitarNovoVeiculo] = useState<boolean>(false);
  const duracaoContrato = ["12 Meses", "24 Meses", "36 Meses", "48 Meses"];
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [assurance, setAssurance] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  
const handleSubmit = async () => {
  if(pedido.tipo === enumTipo.CREDITO){
    if(pedido.rendimentos[0] === '' || pedido.rendimentos[1] === '' || pedido.rendimentos[2] === ''){
      alert('Preencha todos os campos de rendimentos');
      return;
    }

    if(pedido.valorTotal === 0){
      alert('Preencha o valor solicitado');
      return;
    }

    const response = await fetch('http://localhost:8080/loapi/contratos/credito', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          //'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pedido)
    });

    const data = await response.json();
    if (response.ok) {
      alert('Pedido enviado com sucesso!');
    } else {
      alert(`Erro: ${data.message}`);
    }
  }else if(pedido.tipo === enumTipo.ALUGUEL){
    
    if(pedido.objetoContrato.length === 0){
      alert('Selecione um veículo');
      return;
    }

    if(pedido.comprarVeiculoFinal){
      const response = await fetch('http://localhost:8080/loapi/contratos/compra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(pedido)
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Pedido enviado com sucesso!');
      } else {
        alert(`Erro: ${data.message}`);
      }

      setPedido({ ...pedido, proprietario: "Teste" });
    }

    const response = await fetch('http://localhost:8080/loapi/contratos/locacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          //'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pedido)
    });

    const data = await response.json();
    if (response.ok) {
      alert('Pedido enviado com sucesso!');
    } else {
      alert(`Erro: ${data.message}`);
    }
  }   
};

  
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPedido({ ...pedido, status: event.target.value as enumStatus });
  };

  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPedido({ ...pedido, tipo: event.target.value as enumTipo });
  };

  const handleDuracaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const duracaoMeses = Number(event.target.value.split(' ')[0]);
    const valorTotal = 700 * duracaoMeses;
    setPedido({ ...pedido, duracao: event.target.value, valorTotal });
  };

  const handleToggleCompra = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPedido({ ...pedido, comprarVeiculoFinal: event.target.checked });
  };

  const handleToggleAssurance = (event: React.ChangeEvent<HTMLInputElement>) => {
    const duracaoMeses = Number(pedido.duracao.split(' ')[0]);
    let valorTotal = duracaoMeses * 700;

    if (event.target.checked) {
      valorTotal += duracaoMeses * 350;
    }

    setAssurance(event.target.checked);
    setPedido({ ...pedido, valorTotal: valorTotal });
  };

  const handleSolicitarNovoVeiculoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolicitarNovoVeiculo(event.target.checked);
  };

  const handleVehicleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const veiculo = vehicles.find((vehicle) => vehicle.id === Number(event.target.value));
    gerarCodigoDocumento(pedido.tipo, veiculo?.brand || '');
    setPedido({ ...pedido, objetoContrato: [veiculo?.id.toString() ?? ''] });
  };

  const handleRendimentoChange = (index: number, value: string) => {
    const newRendimentos = [...pedido.rendimentos];
    newRendimentos[index] = value;
    setPedido({ ...pedido, rendimentos: newRendimentos });
  };

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
        <label className="block text-gray-700">Tipo do contrato:</label>
        <select
          value={pedido.tipo}
          onChange={handleTipoChange}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        >
          {Object.values(enumTipo).map((tipo) => (
            tipo !== enumTipo.COMPRA && tipo !== enumTipo.SEGURO && (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            )
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

      {pedido.tipo === enumTipo.ALUGUEL && (
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
              <div className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${solicitarNovoVeiculo ? 'bg-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : 'bg-red-500 peer-checked:bg-blue-600'}`}>
              </div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {solicitarNovoVeiculo ? 'Sim' : 'Não'}
              </span>
            </label>
          </div>

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
                    className="sr-only peer" 
                    checked={assurance}
                    onChange={handleToggleAssurance}
                  />
                  <div className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${assurance ? 'bg-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : 'bg-red-500 peer-checked:bg-blue-600'}`}>
                  </div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {assurance ? 'Sim' : 'Não'}
                  </span>
                </label>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Veículo: </label>
            <div className="grid grid-cols-2 gap-4">
              <select  
                value={pedido.objetoContrato}
                onChange={handleVehicleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              >
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      {pedido.tipo === enumTipo.CREDITO && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Rendimentos:</label>
            {[0, 1, 2].map((index) => (
              <input
                key={index}
                type="text"
                value={pedido.rendimentos[index]}
                onChange={(e) => handleRendimentoChange(index, e.target.value)}
                placeholder={`Rendimento ${index + 1}`}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Valor Solicitado:</label>
            <input
              type="text"
              value={pedido.valorTotal}
              onChange={(e) => setPedido({ ...pedido, valorTotal: parseFloat(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>



        </>
      )}
          <button 
            onClick={handleSubmit} 
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Enviar Pedido
          </button>
    </div>
  );
};

const gerarCodigoDocumento = (tipo: enumTipo, placa: string): string => {
  const data = new Date();
  const mesAno = `${data.getMonth() + 1}-${data.getFullYear()}`;
  return `${mesAno}[${tipo}][${placa}]`;
};

export default RequestForm;