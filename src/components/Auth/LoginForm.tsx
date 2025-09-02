import React, { useState } from 'react';
import { Building2, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.error) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f23f35] to-[#ff5805] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 bg-[#f23f35] rounded-full flex items-center justify-center">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#1c1c1b] mb-2">PontoSeg</h1>
          <p className="text-gray-600">Sistema de Ponto Eletrônico</p>
          <p className="text-sm text-gray-500 mt-2">Integração Active Directory</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1c1c1b] mb-2">
              Email Corporativo
            </label>
            <div className="relative">
              <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35] transition-colors duration-200"
                placeholder="seu.email@empresa.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1c1c1b] mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35] transition-colors duration-200"
                placeholder="Sua senha"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f23f35] text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 focus:ring-2 focus:ring-[#f23f35] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Autenticando...' : 'Entrar via AD'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">Usuários de teste:</p>
            <p>admin@empresa.com / 123456</p>
            <p>joao.silva@empresa.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;