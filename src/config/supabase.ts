import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Simulação de autenticação Active Directory
export const mockADAuth = {
  login: async (email: string, password: string) => {
    // Simula autenticação AD
    const mockUsers = [
      {
        id: '1',
        email: 'joao.silva@empresa.com',
        nome: 'João',
        sobrenome: 'Silva',
        departamento: 'TI',
        cargo: 'Desenvolvedor',
        role: 'funcionario' as const,
        ativo: true
      },
      {
        id: '2',
        email: 'admin@empresa.com',
        nome: 'Admin',
        sobrenome: 'Sistema',
        departamento: 'Administração',
        cargo: 'Administrador',
        role: 'admin' as const,
        ativo: true
      }
    ];

    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === '123456') {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { user, error: null };
    }
    
    return { user: null, error: 'Credenciais inválidas' };
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  logout: () => {
    localStorage.removeItem('currentUser');
  }
};