import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Search } from 'lucide-react';

const UserManagement: React.FC = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao.silva@empresa.com',
      departamento: 'TI',
      cargo: 'Desenvolvedor',
      role: 'funcionario',
      ativo: true
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      departamento: 'RH',
      cargo: 'Analista',
      role: 'supervisor',
      ativo: true
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      email: 'carlos.oliveira@empresa.com',
      departamento: 'Vendas',
      cargo: 'Vendedor',
      role: 'funcionario',
      ativo: false
    }
  ]);

  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);

  const usuariosFiltrados = usuarios.filter(user =>
    user.nome.toLowerCase().includes(busca.toLowerCase()) ||
    user.email.toLowerCase().includes(busca.toLowerCase()) ||
    user.departamento.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#1c1c1b] flex items-center mb-4 md:mb-0">
            <Users className="h-6 w-6 text-[#f23f35] mr-2" />
            Gerenciamento de Usuários
          </h2>
          
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-[#f23f35] text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Nome</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Departamento</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Cargo</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Função</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-[#ffb71b] rounded-full flex items-center justify-center text-[#1c1c1b] font-semibold mr-3">
                        {usuario.nome.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-[#1c1c1b]">{usuario.nome}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{usuario.email}</td>
                  <td className="py-3 px-4 text-gray-600">{usuario.departamento}</td>
                  <td className="py-3 px-4 text-gray-600">{usuario.cargo}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      usuario.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800'
                        : usuario.role === 'supervisor'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {usuario.role === 'admin' ? 'Admin' : usuario.role === 'supervisor' ? 'Supervisor' : 'Funcionário'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      usuario.ativo
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {usuario.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-[#f23f35] hover:bg-red-100 rounded transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

export default UserManagement;