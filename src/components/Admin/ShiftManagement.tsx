import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, Clock, Users } from 'lucide-react';
import { Turno } from '../../types';

const ShiftManagement: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([
    {
      id: '1',
      nome: 'Expediente Normal',
      hora_inicio: '08:00',
      hora_fim: '17:00',
      dias_semana: [1, 2, 3, 4, 5],
      intervalo_obrigatorio: 60,
      tolerancia_entrada: 15,
      tolerancia_saida: 15,
      ativo: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      nome: 'Turno Manhã',
      hora_inicio: '06:00',
      hora_fim: '14:00',
      dias_semana: [1, 2, 3, 4, 5, 6],
      intervalo_obrigatorio: 30,
      tolerancia_entrada: 10,
      tolerancia_saida: 10,
      ativo: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      nome: 'Turno Tarde',
      hora_inicio: '14:00',
      hora_fim: '22:00',
      dias_semana: [1, 2, 3, 4, 5, 6],
      intervalo_obrigatorio: 30,
      tolerancia_entrada: 10,
      tolerancia_saida: 10,
      ativo: true,
      created_at: new Date().toISOString()
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingTurno, setEditingTurno] = useState<Turno | null>(null);

  const getDiasSemanaNomes = (dias: number[]) => {
    const nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return dias.map(dia => nomesDias[dia]).join(', ');
  };

  const handleEdit = (turno: Turno) => {
    setEditingTurno(turno);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este turno?')) {
      setTurnos(prev => prev.filter(t => t.id !== id));
    }
  };

  const funcionariosPorTurno = {
    '1': 18,
    '2': 8,
    '3': 5
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#1c1c1b] flex items-center mb-4 md:mb-0">
            <Calendar className="h-6 w-6 text-[#f23f35] mr-2" />
            Gerenciamento de Turnos
          </h2>
          
          <button 
            onClick={() => {
              setEditingTurno(null);
              setShowModal(true);
            }}
            className="flex items-center px-4 py-2 bg-[#f23f35] text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Turno
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {turnos.map((turno) => (
            <div key={turno.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 bg-[#ffb71b] bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-[#ffb71b]" />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(turno)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(turno.id)}
                    className="p-1 text-[#f23f35] hover:bg-red-100 rounded transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="font-semibold text-[#1c1c1b] mb-2">{turno.nome}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Horário:</span>
                  <span className="font-medium text-[#1c1c1b]">{turno.hora_inicio} - {turno.hora_fim}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Dias:</span>
                  <span className="font-medium text-[#1c1c1b]">{getDiasSemanaNomes(turno.dias_semana)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Intervalo:</span>
                  <span className="font-medium text-[#1c1c1b]">{turno.intervalo_obrigatorio}min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tolerância:</span>
                  <span className="font-medium text-[#1c1c1b]">±{turno.tolerancia_entrada}min</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{funcionariosPorTurno[turno.id] || 0} funcionários</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  turno.ativo
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {turno.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Edição/Criação */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4">
              {editingTurno ? 'Editar Turno' : 'Novo Turno'}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                  Nome do Turno
                </label>
                <input
                  type="text"
                  defaultValue={editingTurno?.nome || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  placeholder="Ex: Expediente Normal"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Hora de Início
                  </label>
                  <input
                    type="time"
                    defaultValue={editingTurno?.hora_inicio || '08:00'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Hora de Fim
                  </label>
                  <input
                    type="time"
                    defaultValue={editingTurno?.hora_fim || '17:00'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                  Dias da Semana
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked={editingTurno?.dias_semana.includes(index) || (index >= 1 && index <= 5)}
                        className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-[#1c1c1b]">{dia}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Intervalo (min)
                  </label>
                  <input
                    type="number"
                    defaultValue={editingTurno?.intervalo_obrigatorio || 60}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Tolerância Entrada (min)
                  </label>
                  <input
                    type="number"
                    defaultValue={editingTurno?.tolerancia_entrada || 15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Tolerância Saída (min)
                  </label>
                  <input
                    type="number"
                    defaultValue={editingTurno?.tolerancia_saida || 15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="turno_ativo"
                  defaultChecked={editingTurno?.ativo !== false}
                  className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                />
                <label htmlFor="turno_ativo" className="ml-2 text-sm text-[#1c1c1b]">
                  Turno ativo
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
                {editingTurno ? 'Atualizar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftManagement;