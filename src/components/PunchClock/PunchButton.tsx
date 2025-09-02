import React, { useState } from 'react';
import { Clock, Coffee, LogOut, LogIn } from 'lucide-react';

interface PunchButtonProps {
  tipo: 'entrada' | 'saida' | 'pausa_inicio' | 'pausa_fim';
  onClick: (tipo: 'entrada' | 'saida' | 'pausa_inicio' | 'pausa_fim') => void;
  disabled?: boolean;
  statusAtual: 'fora' | 'trabalhando' | 'pausa';
}

const PunchButton: React.FC<PunchButtonProps> = ({ 
  tipo, 
  onClick, 
  disabled = false,
  statusAtual 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getButtonConfig = () => {
    switch (tipo) {
      case 'entrada':
        return {
          label: 'Entrada',
          icon: LogIn,
          color: 'bg-green-500 hover:bg-green-600',
          available: statusAtual === 'fora'
        };
      case 'saida':
        return {
          label: 'Saída',
          icon: LogOut,
          color: 'bg-[#f23f35] hover:bg-red-600',
          available: statusAtual === 'trabalhando'
        };
      case 'pausa_inicio':
        return {
          label: 'Iniciar Pausa',
          icon: Coffee,
          color: 'bg-[#ffb71b] hover:bg-yellow-500',
          available: statusAtual === 'trabalhando'
        };
      case 'pausa_fim':
        return {
          label: 'Fim da Pausa',
          icon: Clock,
          color: 'bg-[#ff5805] hover:bg-orange-600',
          available: statusAtual === 'pausa'
        };
    }
  };

  const config = getButtonConfig();
  const Icon = config.icon;

  if (!config.available) {
    return null;
  }

  return (
    <button
      onClick={() => onClick(tipo)}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        ${config.color} text-white font-semibold
        px-8 py-6 rounded-xl shadow-lg
        transform transition-all duration-200
        ${isPressed ? 'scale-95 shadow-md' : 'hover:scale-105 hover:shadow-xl'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        flex flex-col items-center justify-center
        min-w-[160px] min-h-[120px]
      `}
    >
      <Icon className="h-8 w-8 mb-2" />
      <span className="text-lg">{config.label}</span>
    </button>
  );
};

export default PunchButton;