import React, { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTimeTracking } from '../../hooks/useTimeTracking';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const TimesheetView: React.FC = () => {
  const { user } = useAuth();
  const { registros } = useTimeTracking(user?.id || '');
  const [filtro, setFiltro] = useState('esta_semana');

  const getFilteredRegistros = () => {
    const hoje = new Date();
    let inicio: Date;
    let fim: Date;

    switch (filtro) {
      case 'esta_semana':
        inicio = startOfWeek(hoje, { weekStartsOn: 1 });
        fim = endOfWeek(hoje, { weekStartsOn: 1 });
        break;
      case 'este_mes':
        inicio = startOfMonth(hoje);
        fim = endOfMonth(hoje);
        break;
      default:
        return registros;
    }

    return registros.filter(r => {
      const data = new Date(r.timestamp);
      return data >= inicio && data <= fim;
    });
  };

  const registrosFiltrados = getFilteredRegistros();

  const calcularHorasDiarias = () => {
    const diasComHoras = new Map<string, number>();
    
    registrosFiltrados.forEach(registro => {
      const dia = format(new Date(registro.timestamp), 'yyyy-MM-dd');
      
      if (!diasComHoras.has(dia)) {
        diasComHoras.set(dia, 0);
      }
    });

    // Calcular horas por dia (simplificado)
    const registrosPorDia = Array.from(diasComHoras.keys()).map(dia => {
      const registrosDoDia = registrosFiltrados.filter(r => 
        format(new Date(r.timestamp), 'yyyy-MM-dd') === dia
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      let totalHoras = 0;
      let ultimaEntrada: Date | null = null;

      registrosDoDia.forEach(registro => {
        const timestamp = new Date(registro.timestamp);
        
        if (registro.tipo === 'entrada' || registro.tipo === 'pausa_fim') {
          ultimaEntrada = timestamp;
        } else if (registro.tipo === 'saida' || registro.tipo === 'pausa_inicio') {
          if (ultimaEntrada) {
            totalHoras += (timestamp.getTime() - ultimaEntrada.getTime()) / (1000 * 60 * 60);
            ultimaEntrada = null;
          }
        }
      });

      return {
        dia,
        totalHoras,
        registros: registrosDoDia
      };
    });

    return registrosPorDia.sort((a, b) => b.dia.localeCompare(a.dia));
  };

  const diasComHoras = calcularHorasDiarias();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#1c1c1b] flex items-center mb-4 md:mb-0">
            <Calendar className="h-6 w-6 text-[#f23f35] mr-2" />
            Minha Folha de Ponto
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
            >
              <option value="esta_semana">Esta Semana</option>
              <option value="este_mes">Este Mês</option>
              <option value="todos">Todos os Registros</option>
            </select>
            
            <button className="flex items-center px-4 py-2 bg-[#f23f35] text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Data</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Entrada</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Saída</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-[#1c1c1b]">Status</th>
              </tr>
            </thead>
            <tbody>
              {diasComHoras.map((dia) => {
                const entrada = dia.registros.find(r => r.tipo === 'entrada');
                const saida = dia.registros.find(r => r.tipo === 'saida');
                
                return (
                  <tr key={dia.dia} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 font-medium text-[#1c1c1b]">
                      {format(new Date(dia.dia), "dd 'de' MMMM", { locale: ptBR })}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {entrada ? format(new Date(entrada.timestamp), 'HH:mm') : '-'}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {saida ? format(new Date(saida.timestamp), 'HH:mm') : '-'}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#1c1c1b]">
                      {Math.floor(dia.totalHoras)}h {Math.round((dia.totalHoras % 1) * 60)}m
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        dia.totalHoras >= 8
                          ? 'bg-green-100 text-green-800'
                          : dia.totalHoras >= 6
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {dia.totalHoras >= 8 ? 'Completo' : dia.totalHoras > 0 ? 'Parcial' : 'Ausente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimesheetView;