import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Download, Calendar, Users } from 'lucide-react';

const ReportsView: React.FC = () => {
  const [periodo, setPeriodo] = useState('este_mes');

  // Dados mockados para demonstração
  const dadosHorasPorDia = [
    { dia: 'Seg', horas: 8.2 },
    { dia: 'Ter', horas: 7.8 },
    { dia: 'Qua', horas: 8.5 },
    { dia: 'Qui', horas: 8.1 },
    { dia: 'Sex', horas: 7.9 },
  ];

  const dadosDepartamentos = [
    { nome: 'TI', funcionarios: 12, cor: '#f23f35' },
    { nome: 'RH', funcionarios: 5, cor: '#ffb71b' },
    { nome: 'Vendas', funcionarios: 8, cor: '#ff5805' },
    { nome: 'Marketing', funcionarios: 6, cor: '#1c1c1b' },
  ];

  const estatisticas = {
    totalFuncionarios: 31,
    funcionariosAtivos: 28,
    horasTrabalhadasHoje: 234.5,
    horasExtrasEsteMes: 45.2
  };

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Funcionários</p>
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
              <p className="text-sm text-gray-600 mb-1">Funcionários Ativos</p>
              <p className="text-2xl font-bold text-[#1c1c1b]">{estatisticas.funcionariosAtivos}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Horas Hoje</p>
              <p className="text-2xl font-bold text-[#1c1c1b]">{estatisticas.horasTrabalhadasHoje}h</p>
            </div>
            <div className="h-12 w-12 bg-[#ffb71b] bg-opacity-20 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-[#ffb71b]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Horas Extras (Mês)</p>
              <p className="text-2xl font-bold text-[#1c1c1b]">{estatisticas.horasExtrasEsteMes}h</p>
            </div>
            <div className="h-12 w-12 bg-[#f23f35] bg-opacity-20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-[#f23f35]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Horas por Dia */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1c1c1b]">Horas Trabalhadas por Dia</h3>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
            >
              <option value="esta_semana">Esta Semana</option>
              <option value="este_mes">Este Mês</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosHorasPorDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}h`, 'Horas']}
                labelStyle={{ color: '#1c1c1b' }}
              />
              <Bar dataKey="horas" fill="#f23f35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Departamentos */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4">Funcionários por Departamento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dadosDepartamentos}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="funcionarios"
                label={({ nome, funcionarios }) => `${nome}: ${funcionarios}`}
              >
                {dadosDepartamentos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela de Relatórios Rápidos */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1c1c1b]">Relatórios Disponíveis</h3>
          <button className="flex items-center px-4 py-2 bg-[#ff5805] text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
            <Download className="h-4 w-4 mr-2" />
            Exportar Todos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Folha de Ponto Mensal',
            'Relatório de Horas Extras',
            'Resumo de Frequência',
            'Relatório de Ausências',
            'Produtividade por Departamento',
            'Relatório de Atrasos'
          ].map((relatorio, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <h4 className="font-medium text-[#1c1c1b] mb-2">{relatorio}</h4>
              <p className="text-sm text-gray-600 mb-3">Dados do período selecionado</p>
              <button className="text-sm text-[#f23f35] font-medium hover:underline">
                Gerar Relatório
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsView;