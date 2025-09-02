export interface User {
  id: string;
  email: string;
  nome: string;
  sobrenome: string;
  departamento: string;
  cargo: string;
  role: 'funcionario' | 'supervisor' | 'admin';
  ativo: boolean;
  created_at: string;
  foto_perfil?: string;
}

export interface RegistroPonto {
  id: string;
  user_id: string;
  tipo: 'entrada' | 'saida' | 'pausa_inicio' | 'pausa_fim';
  timestamp: string;
  localizacao?: string;
  ip_address?: string;
  observacoes?: string;
  created_at: string;
}

export interface Departamento {
  id: string;
  nome: string;
  descricao?: string;
  supervisor_id?: string;
  ativo: boolean;
  created_at: string;
}

export interface Turno {
  id: string;
  nome: string;
  hora_inicio: string;
  hora_fim: string;
  dias_semana: number[];
  intervalo_obrigatorio: number;
  tolerancia_entrada: number;
  tolerancia_saida: number;
  ativo: boolean;
  created_at: string;
}

export interface Relatorio {
  id: string;
  user_id: string;
  periodo_inicio: string;
  periodo_fim: string;
  total_horas: number;
  horas_extras: number;
  faltas: number;
  atrasos: number;
  created_at: string;
}

export interface DashboardStats {
  totalFuncionarios: number;
  funcionariosAtivos: number;
  horasTrabalhadasHoje: number;
  horasExtrasEsteMes: number;
}