import React, { useState } from 'react';
import { Building2, Plus, Edit, Trash2, Search, Users } from 'lucide-react';
import { Departamento } from '../../types';

const DepartmentManagement: React.FC = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([
    {
      id: '1',
      nome: 'Tecnologia da Informação',
      descricao: 'Desenvolvimento de software e infraestrutura',
      supervisor_id: '2',
      ativo: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      nome: 'Recursos Humanos',
      descricao: 'Gestão de pessoas e processos organizacionais',
      supervisor_id: '4',
      ativo: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      nome: 'Vendas',
      descricao: 'Equipe comercial e relacionamento com clientes',
      supervisor_id: '5',
      ativo: true,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      nome: 'Marketing',
      descricao: 'Estratégias de marketing e comunicação',
      supervisor_id: '6',
      ativo: false,
      created_at: new Date().toISOString()
    }
  ]);

  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState<Departamento | null>(null);

  const departamentosFiltrados = departamentos.filter(dept =>
    dept.nome.toLowerCase().includes(busca.toLowerCase()) ||
    dept.descricao?.toLowerCase().includes(busca.toLowerCase())
  );

  const handleEdit = (dept: Departamento) => {
    setEditingDept(dept);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este departamento?')) {
      setDepartamentos(prev => prev.filter(d => d.id !== id));
    }
  };

  const funcionariosPorDepartamento = {
    '1': 12,
    '2': 5,
    '3': 8,
    '4': 3
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#1c1c1b] flex items-center mb-4 md:mb-0">
            <Building2 className="h-6 w-6 text-[#f23f35] mr-2" />
            Gerenciamento de Departamentos
          </h2>
          
          <button 
            onClick={() => {
              setEditingDept(null);
              setShowModal(true);
            }}
            className="flex items-center px-4 py-2 bg-[#f23f35] text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Departamento
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar departamentos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departamentosFiltrados.map((dept) => (
            <div key={dept.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 bg-[#f23f35] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-[#f23f35]" />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(dept)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="p-1 text-[#f23f35] hover:bg-red-100 rounded transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="font-semibold text-[#1c1c1b] mb-2">{dept.nome}</h3>
              <p className="text-sm text-gray-600 mb-4">{dept.descricao}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{funcionariosPorDepartamento[dept.id] || 0} funcionários</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  dept.ativo
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {dept.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Edição/Criação */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4">
              {editingDept ? 'Editar Departamento' : 'Novo Departamento'}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                  Nome do Departamento
                </label>
                <input
                  type="text"
                  defaultValue={editingDept?.nome || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  placeholder="Ex: Tecnologia da Informação"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                  Descrição
                </label>
                <textarea
                  rows={3}
                  defaultValue={editingDept?.descricao || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  placeholder="Descrição do departamento..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                  Supervisor
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]">
                  <option value="">Selecionar supervisor...</option>
                  <option value="2">Maria Santos</option>
                  <option value="4">Ana Costa</option>
                  <option value="5">Pedro Lima</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ativo"
                  defaultChecked={editingDept?.ativo !== false}
                  className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                />
                <label htmlFor="ativo" className="ml-2 text-sm text-[#1c1c1b]">
                  Departamento ativo
                </label>
              </div>
            </form>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#f23f35] text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                {editingDept ? 'Atualizar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;