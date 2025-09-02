import React, { useState } from 'react';
import { Users, Clock, AlertTriangle, Download, Search } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FuncionarioStatus {
  id: string;
  nome: string;
  departamento: string;
  status: 'trabalhando' | 'pausa' | 'fora' | 'atrasado';
  ultimoRegistro: string;
  horasHoje: number;
}

const SupervisorView: React.FC = () => {
  const [funcionarios] = useState<FuncionarioStatus[]>([
    {
      id: '1',
      nome: 'João Silva',
      departamento: 'TI',
      status: 'trabalhando',
      ultimoRegistro: '08:15',
      horasHoje: 6.5
    },
    {
      id: '2',
      nome: 'Maria Santos',
      departamento: 'TI',
      status: 'pausa',
      ultimoRegistro: '14:30',
      horasHoje: 6.0
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      departamento: 'TI',
      status: 'atrasado',
      ultimoRegistro: '09:30',
      horasHoje: 5.5
    },
    {
      id: '4',
      nome: 'Ana Costa',
      departamento: 'TI',
      status: 'fora',
      ultimoRegistro: '17:45',
      horasHoje: 8.2
    }
  ]);

  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const funcionariosFiltrados = funcionarios.filter(func => {
    const matchBusca = func.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      func.departamento.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || func.status === filtroStatus;
    
    return matchBusca && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trabalhando':
        return 'bg-green-100 text-green-800';
      case 'pausa':
        return 'bg-yellow-100 text-yellow-800';
      case 'fora':
        return 'bg-gray-100 text-gray-800';
      case 'atrasado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'trabalhando':
        return 'Trabalhando';
      case 'pausa':
        return 'Em Pausa';
      case 'fora':
        return 'Fora';
      case 'atrasado':
        return 'Atrasado';
      default:
        return 'Desconhecido';
    }
  };

  const estatisticas = {
    totalFuncionarios: funcionarios.length,
    trabalhando: funcionarios.filter(f => f.status === 'trabalhando').length,
    emPausa: funcionarios.filter(f => f.status === 'pausa').length,
    atrasados: funcionarios.filter(f => f.status === 'atrasado').length
  };

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total da Equipe</p>
              <p className="text-2xl font-bold text-[#1c1c1b]">{estatisticas.totalFuncionarios}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Trabalhando</p>
              <p className="text-2xl font-bold text-[#1c1c1b]">{estatisticas.trabalhando}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Em Pausa</p>
              <p className="text-2xl font-bold text-[#1c1c1b]">{estatisticas.emPausa}</p>
            </div>
            <div className="h-12 w-12 bg-[#ffb71b] bg-opacity-20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-[#ffb71b]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Atrasados</p>
              <p className="text-2xl font-bold text-[#1c1c1b]">{estatisticas.atrasados}</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-[#f23f35]" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Funcionários */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4 md:mb-0">
            Status da Equipe em Tempo Real
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar funcionário..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
              />
            </div>
            
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
            >
              <option value="todos">Todos os Status</option>
              <option value="trabalhando">Trabalhando</option>
              <option value="pausa">Em Pausa</option>
              <option value="fora">Fora</option>
              <option value="atrasado">Atrasados</option>
            </select>
            
            <button className="flex items-center px-4 py-2 bg-[#ff5805] text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Funcionário</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Departamento</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Último Registro</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Horas Hoje</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionariosFiltrados.map((funcionario) => (
                <tr key={funcionario.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-[#ffb71b] rounded-full flex items-center justify-center text-[#1c1c1b] font-semibold mr-3">
                        {funcionario.nome.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-[#1c1c1b]">{funcionario.nome}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{funcionario.departamento}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(funcionario.status)}`}>
                      {getStatusLabel(funcionario.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{funcionario.ultimoRegistro}</td>
                  <td className="py-3 px-4 font-semibold text-[#1c1c1b]">
                    {Math.floor(funcionario.horasHoje)}h {Math.round((funcionario.horasHoje % 1) * 60)}m
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-[#f23f35] hover:underline text-sm font-medium">
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupervisorView;