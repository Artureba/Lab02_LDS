import './App.css';
import RequestForm from './pages/Request.tsx';
import ClienteForm from './pages/Cliente/ClienteForm.tsx';
import UsuarioForm from './pages/User/UserForm.tsx';
import React, { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState<'request' | 'cliente' | 'usuario'>('request'); // Estado para controlar qual tela está sendo exibida

  return (
    <div className="App">
      {/* Criação de um simples menu de navegação */}
      <nav className="p-4 bg-gray-800">
        <ul className="flex space-x-4">
          <li>
            <button 
              onClick={() => setCurrentPage('request')} 
              className="text-white"
            >
              Pedido
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('cliente')} 
              className="text-white"
            >
              Cliente
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('usuario')} 
              className="text-white"
            >
              Usuário
            </button>
          </li>
        </ul>
      </nav>

      <div className="container mx-auto p-4">
        {/* Renderização condicional dos formulários */}
        {currentPage === 'request' && <RequestForm />}
        {currentPage === 'cliente' && <ClienteForm />}
        {currentPage === 'usuario' && <UsuarioForm />}
      </div>
    </div>
  );
}

export default App;
