// import React, { useState } from 'react';
// import { StatusDocumento, TipoContrato } from '../utils/enums/Enum.tsx';

// interface Pedido {
//   status: StatusDocumento;
//   nDocumento: string;
//   duracao: string;
//   tipo: TipoContrato;
//   proponente: string;
//   contratante: string;
//   objetoContrato: string[];
//   valorTotal: number;
//   rendimentos: string[];
//   comprarVeiculoFinal: boolean;
// }

// interface Vehicle {
//   id: number;
//   name: string;
//   brand: string;
//   model: string;
//   year: number;
//   price: number;
// }

// const RequestForm: React.FC = () => {
//   const [pedido, setPedido] = useState<Pedido>({
//     status: StatusDocumento.PENDENTE,
//     nDocumento: '',
//     duracao: "12 Meses",
//     tipo: TipoContrato.ALUGUEL,
//     proponente: 'Cliente A',
//     contratante: 'Agente B',
//     objetoContrato: [],
//     valorTotal: 0,
//     rendimentos: ['', '', ''], // Inicializa com três campos vazios
//     comprarVeiculoFinal: false
//   });

//   const [solicitarNovoVeiculo, setSolicitarNovoVeiculo] = useState<boolean>(false);
//   const duracaoContrato = ["12 Meses", "24 Meses", "36 Meses", "48 Meses"];
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [assurance, setAssurance] = useState<boolean>(false);
//   const token = localStorage.getItem('token');

//   const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setPedido({ ...pedido, status: event.target.value as StatusDocumento });
//   };

//   const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setPedido({ ...pedido, tipo: event.target.value as TipoContrato });
//   };

//   const handleDuracaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const duracaoMeses = Number(event.target.value.split(' ')[0]);
//     const valorTotal = 700 * duracaoMeses;
//     setPedido({ ...pedido, duracao: event.target.value, valorTotal });
//   };

//   const handleToggleCompra = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPedido({ ...pedido, comprarVeiculoFinal: event.target.checked });
//   };

//   const handleToggleAssurance = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const duracaoMeses = Number(pedido.duracao.split(' ')[0]);
//     let valorTotal = duracaoMeses * 700;

//     if (event.target.checked) {
//       valorTotal += duracaoMeses * 350;
//     }

//     setAssurance(event.target.checked);
//     setPedido({ ...pedido, valorTotal: valorTotal });
//   };

//   const handleSolicitarNovoVeiculoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSolicitarNovoVeiculo(event.target.checked);
//   };

//   const handleVehicleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const veiculo = vehicles.find((vehicle) => vehicle.id === Number(event.target.value));
//     gerarCodigoDocumento(pedido.tipo, veiculo?.brand || '');
//     setPedido({ ...pedido, objetoContrato: [veiculo?.id.toString() ?? ''] });
//   };

//   const handleRendimentoChange = (index: number, value: string) => {
//     const newRendimentos = [...pedido.rendimentos];
//     newRendimentos[index] = value;
//     setPedido({ ...pedido, rendimentos: newRendimentos });
//   };

//   return (
//     <div className="p-4 bg-[#F8F8F8]">
//       <h2 className="text-xl font-bold mb-4">Formulário de Pedido</h2>

//       <div className="mb-4">
//         <label className="block text-gray-700">Status:</label>
//         <select
//           value={pedido.status}
//           onChange={handleStatusChange}
//           className="mt-1 block w-full px-3 py-2 border rounded-md"
//         >
//           {Object.values(StatusDocumento).map((status) => (
//             <option key={status} value={status}>
//               {status}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700">Tipo do contrato:</label>
//         <select
//           value={pedido.tipo}
//           onChange={handleTipoChange}
//           className="mt-1 block w-full px-3 py-2 border rounded-md"
//         >
//           {Object.values(TipoContrato).map((tipo) => (
//             tipo !== TipoContrato.COMPRA && tipo !== TipoContrato.SEGURO && (
//               <option key={tipo} value={tipo}>
//                 {tipo}
//               </option>
//             )
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700">Duração:</label>
//         <select
//           value={pedido.duracao}
//           onChange={handleDuracaoChange}
//           className="mt-1 block w-full px-3 py-2 border rounded-md"
//         >
//           {duracaoContrato.map((duracao) => (
//             <option key={duracao} value={duracao}>
//               {duracao}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700">Valor Total: R${pedido.valorTotal}</label>
//       </div>

//       {pedido.tipo === TipoContrato.ALUGUEL && (
//         <>
//           <div className="mb-4">
//             <label className="block text-gray-700">Solicitar novo veículo?</label>
//             <label className="inline-flex items-center cursor-pointer">
//               <input 
//                 type="checkbox" 
//                 className="sr-only peer" 
//                 checked={solicitarNovoVeiculo} 
//                 onChange={handleSolicitarNovoVeiculoChange}
//               />
//               <div className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${solicitarNovoVeiculo ? 'bg-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : 'bg-red-500 peer-checked:bg-blue-600'}`}>
//               </div>
//               <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
//                 {solicitarNovoVeiculo ? 'Sim' : 'Não'}
//               </span>
//             </label>
//           </div>

//           {solicitarNovoVeiculo && (
//             <>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Deseja comprar o veículo ao final do contrato?</label>
//                 <label className="inline-flex items-center cursor-pointer">
//                   <input 
//                     type="checkbox" 
//                     className="sr-only peer" 
//                     checked={pedido.comprarVeiculoFinal} 
//                     onChange={handleToggleCompra}
//                   />
//                   <div className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${pedido.comprarVeiculoFinal ? 'bg-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : 'bg-red-500 peer-checked:bg-blue-600'}`}>
//                   </div>
//                   <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
//                     {pedido.comprarVeiculoFinal ? 'Sim' : 'Não'}
//                   </span>
//                 </label>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700">Contratar seguro?</label>
//                 <label className="inline-flex items-center cursor-pointer">
//                   <input 
//                     type="checkbox" 
//                     className="sr-only peer" 
//                     checked={assurance}
//                     onChange={handleToggleAssurance}
//                   />
//                   <div className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${assurance ? 'bg-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : 'bg-red-500 peer-checked:bg-blue-600'}`}>
//                   </div>
//                   <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
//                     {assurance ? 'Sim' : 'Não'}
//                   </span>
//                 </label>
//               </div>
//             </>
//           )}

//           <div className="mb-4">
//             <label className="block text-gray-700">Veículo: </label>
//             <div className="grid grid-cols-2 gap-4">
//               <select  
//                 value={pedido.objetoContrato}
//                 onChange={handleVehicleChange}
//                 className="mt-1 block w-full px-3 py-2 border rounded-md"
//               >
//                 {vehicles.map((vehicle) => (
//                   <option key={vehicle.id} value={vehicle.id}>
//                     {vehicle.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </>
//       )}

//       {pedido.tipo === TipoContrato.CREDITO && (
//         <>
//           <div className="mb-4">
//             <label className="block text-gray-700">Rendimentos:</label>
//             {[0, 1, 2].map((index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={pedido.rendimentos[index]}
//                 onChange={(e) => handleRendimentoChange(index, e.target.value)}
//                 placeholder={`Rendimento ${index + 1}`}
//                 className="mt-1 block w-full px-3 py-2 border rounded-md"
//               />
//             ))}
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Valor Solicitado:</label>
//             <input
//               type="text"
//               value={pedido.valorTotal}
//               onChange={(e) => setPedido({ ...pedido, valorTotal: parseFloat(e.target.value) })}
//               className="mt-1 block w-full px-3 py-2 border rounded-md"
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const gerarCodigoDocumento = (tipo: TipoContrato, placa: string): string => {
//   const data = new Date();
//   const mesAno = `${data.getMonth() + 1}-${data.getFullYear()}`;
//   return `${mesAno}[${tipo}][${placa}]`;
// };

// export default RequestForm;

import React, { useState } from 'react';
import { StatusDocumento, TipoContrato } from '../utils/enums/Enum.tsx';

interface Pedido {
  status: StatusDocumento;
  nDocumento: string;
  duracao: string;
  tipo: TipoContrato;
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
    status: StatusDocumento.PENDENTE,
    nDocumento: '',
    duracao: "12 Meses",
    tipo: TipoContrato.ALUGUEL,
    proponente: 'Cliente A',
    contratante: 'Agente B',
    objetoContrato: [],
    valorTotal: 0,
    rendimentos: ['', '', ''], // Inicializa com três campos vazios
    comprarVeiculoFinal: false
  });

  const [solicitarNovoVeiculo, setSolicitarNovoVeiculo] = useState<boolean>(false);
  const duracaoContrato = ["12 Meses", "24 Meses", "36 Meses", "48 Meses"];
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [assurance, setAssurance] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPedido({ ...pedido, status: event.target.value as StatusDocumento });
  };

  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPedido({ ...pedido, tipo: event.target.value as TipoContrato });
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

  const gerarCodigoDocumento = (tipo: TipoContrato, descricao: string) => {
    const nDocumento = `${tipo}-${descricao}-${Date.now()}`;
    setPedido({ ...pedido, nDocumento });
  };

  const gerarContratos = () => {
    const contratos = [];

    // Contrato de aluguel
    const contratoAluguel = {
      ...pedido,
      tipo: TipoContrato.ALUGUEL,
      status: StatusDocumento.PENDENTE,
    };
    contratos.push(contratoAluguel);

    // Contrato de seguro, se aplicável
    if (assurance) {
      const contratoSeguro = {
        ...pedido,
        tipo: TipoContrato.SEGURO,
        status: StatusDocumento.PENDENTE,
      };
      contratos.push(contratoSeguro);
    }

    // Contrato de compra, se aplicável
    if (pedido.comprarVeiculoFinal) {
      const contratoCompra = {
        ...pedido,
        tipo: TipoContrato.COMPRA,
        status: StatusDocumento.PENDENTE,
      };
      contratos.push(contratoCompra);
    }

    // Lógica para salvar os contratos na base de dados
    contratos.forEach(contrato => {
      // Exemplo de função que salva o contrato (ajustar conforme a implementação de backend)
      salvarContrato(contrato);
    });
  };

  const salvarContrato = (contrato: Pedido) => {
    // Implementação para enviar o contrato para o backend (ajustar conforme API)
    fetch('/api/contratos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contrato),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Contrato salvo com sucesso:', data);
      })
      .catch(error => {
        console.error('Erro ao salvar contrato:', error);
      });
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
          {Object.values(StatusDocumento).map((status) => (
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
          {Object.values(TipoContrato).map((tipo) => (
            tipo !== TipoContrato.COMPRA && tipo !== TipoContrato.SEGURO && (
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
                <label className="block text-gray-700">Veículos disponíveis:</label>
                <select
                  onChange={handleVehicleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Selecione um veículo</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} - {vehicle.brand} - {vehicle.year} - R${vehicle.price}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Deseja contratar seguro?</label>
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
        <label className="block text-gray-700">Rendimentos:</label>
        {pedido.rendimentos.map((rendimento, index) => (
          <input
            key={index}
            value={rendimento}
            onChange={(e) => handleRendimentoChange(index, e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md mb-2"
          />
        ))}
      </div>

      <button
        onClick={gerarContratos}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Gerar Contratos
      </button>
    </div>
  );
};

export default RequestForm;
