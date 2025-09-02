import { useState, useEffect } from 'react';
import { RegistroPonto } from '../types';

export const useTimeTracking = (userId: string) => {
  const [registros, setRegistros] = useState<RegistroPonto[]>([]);
  const [statusAtual, setStatusAtual] = useState<'fora' | 'trabalhando' | 'pausa'>('fora');
  const [horasHoje, setHorasHoje] = useState(0);

  useEffect(() => {
    carregarRegistros();
    calcularStatus();
  }, [userId]);

  const carregarRegistros = () => {
    const registrosSalvos = localStorage.getItem(`registros_${userId}`);
    if (registrosSalvos) {
      const registrosArray = JSON.parse(registrosSalvos);
      setRegistros(registrosArray);
      calcularHorasHoje(registrosArray);
    }
  };

  const calcularStatus = () => {
    const hoje = new Date().toDateString();
    const registrosHoje = registros.filter(r => 
      new Date(r.timestamp).toDateString() === hoje
    );
    
    const ultimoRegistro = registrosHoje.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];

    if (!ultimoRegistro) {
      setStatusAtual('fora');
    } else {
      switch (ultimoRegistro.tipo) {
        case 'entrada':
          setStatusAtual('trabalhando');
          break;
        case 'pausa_inicio':
          setStatusAtual('pausa');
          break;
        case 'pausa_fim':
          setStatusAtual('trabalhando');
          break;
        case 'saida':
          setStatusAtual('fora');
          break;
      }
    }
  };

  const calcularHorasHoje = (registrosArray: RegistroPonto[]) => {
    const hoje = new Date().toDateString();
    const registrosHoje = registrosArray.filter(r => 
      new Date(r.timestamp).toDateString() === hoje
    );

    let totalMinutos = 0;
    let ultimaEntrada: Date | null = null;

    for (const registro of registrosHoje.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )) {
      const timestamp = new Date(registro.timestamp);
      
      if (registro.tipo === 'entrada' || registro.tipo === 'pausa_fim') {
        ultimaEntrada = timestamp;
      } else if (registro.tipo === 'saida' || registro.tipo === 'pausa_inicio') {
        if (ultimaEntrada) {
          totalMinutos += (timestamp.getTime() - ultimaEntrada.getTime()) / (1000 * 60);
          ultimaEntrada = null;
        }
      }
    }

    setHorasHoje(totalMinutos / 60);
  };

  const baterPonto = async (tipo: RegistroPonto['tipo'], observacoes?: string) => {
    const novoRegistro: RegistroPonto = {
      id: Date.now().toString(),
      user_id: userId,
      tipo,
      timestamp: new Date().toISOString(),
      ip_address: '192.168.1.100',
      observacoes,
      created_at: new Date().toISOString()
    };

    const novosRegistros = [...registros, novoRegistro];
    setRegistros(novosRegistros);
    localStorage.setItem(`registros_${userId}`, JSON.stringify(novosRegistros));
    
    calcularStatus();
    calcularHorasHoje(novosRegistros);
    
    return novoRegistro;
  };

  return {
    registros,
    statusAtual,
    horasHoje,
    baterPonto,
    carregarRegistros
  };
};