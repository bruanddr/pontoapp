import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Shield, Database, Mail, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  const [configuracoes, setConfiguracoes] = useState({
    empresa: {
      nome: 'Empresa LTDA',
      endereco: 'Rua Principal, 123 - Centro',
      telefone: '(11) 1234-5678',
      email: 'contato@empresa.com'
    },
    sistema: {
      toleranciaEntrada: 15,
      toleranciaSaida: 15,
      intervaloMinimo: 30,
      horasDiariasObrigatorias: 8,
      notificacaoAtrasos: true,
      backupAutomatico: true
    },
    ad: {
      servidor: 'ad.empresa.com',
      porta: 389,
      dominio: 'EMPRESA',
      ssl: true,
      sincronizacaoAutomatica: true
    },
    notificacoes: {
      emailRelatorios: true,
      emailAtrasos: true,
      emailFaltas: true,
      pushNotifications: false
    }
  });

  const handleSave = () => {
    // Aqui seria implementada a lógica de salvamento
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#1c1c1b] flex items-center">
            <SettingsIcon className="h-6 w-6 text-[#f23f35] mr-2" />
            Configurações do Sistema
          </h2>
          
          <button 
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-[#f23f35] text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configurações da Empresa */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4 flex items-center">
              <Database className="h-5 w-5 text-[#ff5805] mr-2" />
              Informações da Empresa
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={configuracoes.empresa.nome}
                  onChange={(e) => setConfiguracoes(prev => ({
                    ...prev,
                    empresa: { ...prev.empresa, nome: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  value={configuracoes.empresa.endereco}
                  onChange={(e) => setConfiguracoes(prev => ({
                    ...prev,
                    empresa: { ...prev.empresa, endereco: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Telefone
                  </label>
                  <input
                    type="text"
                    value={configuracoes.empresa.telefone}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      empresa: { ...prev.empresa, telefone: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={configuracoes.empresa.email}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      empresa: { ...prev.empresa, email: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Configurações do Sistema */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4 flex items-center">
              <SettingsIcon className="h-5 w-5 text-[#ffb71b] mr-2" />
              Configurações Gerais
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Tolerância Entrada (min)
                  </label>
                  <input
                    type="number"
                    value={configuracoes.sistema.toleranciaEntrada}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      sistema: { ...prev.sistema, toleranciaEntrada: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Tolerância Saída (min)
                  </label>
                  <input
                    type="number"
                    value={configuracoes.sistema.toleranciaSaida}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      sistema: { ...prev.sistema, toleranciaSaida: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Intervalo Mínimo (min)
                  </label>
                  <input
                    type="number"
                    value={configuracoes.sistema.intervaloMinimo}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      sistema: { ...prev.sistema, intervaloMinimo: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Horas Diárias Obrigatórias
                  </label>
                  <input
                    type="number"
                    value={configuracoes.sistema.horasDiariasObrigatorias}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      sistema: { ...prev.sistema, horasDiariasObrigatorias: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuracoes.sistema.notificacaoAtrasos}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      sistema: { ...prev.sistema, notificacaoAtrasos: e.target.checked }
                    }))}
                    className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-[#1c1c1b]">Notificar atrasos automaticamente</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuracoes.sistema.backupAutomatico}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      sistema: { ...prev.sistema, backupAutomatico: e.target.checked }
                    }))}
                    className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-[#1c1c1b]">Backup automático dos dados</span>
                </label>
              </div>
            </div>
          </div>

          {/* Configurações Active Directory */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4 flex items-center">
              <Shield className="h-5 w-5 text-[#f23f35] mr-2" />
              Configurações Active Directory
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                  Servidor AD
                </label>
                <input
                  type="text"
                  value={configuracoes.ad.servidor}
                  onChange={(e) => setConfiguracoes(prev => ({
                    ...prev,
                    ad: { ...prev.ad, servidor: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Porta
                  </label>
                  <input
                    type="number"
                    value={configuracoes.ad.porta}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      ad: { ...prev.ad, porta: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                    Domínio
                  </label>
                  <input
                    type="text"
                    value={configuracoes.ad.dominio}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      ad: { ...prev.ad, dominio: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuracoes.ad.ssl}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      ad: { ...prev.ad, ssl: e.target.checked }
                    }))}
                    className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-[#1c1c1b]">Conexão SSL/TLS</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuracoes.ad.sincronizacaoAutomatica}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      ad: { ...prev.ad, sincronizacaoAutomatica: e.target.checked }
                    }))}
                    className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-[#1c1c1b]">Sincronização automática de usuários</span>
                </label>
              </div>
            </div>
          </div>

          {/* Configurações de Notificações */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4 flex items-center">
              <Bell className="h-5 w-5 text-[#ffb71b] mr-2" />
              Notificações
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1c1c1b] mb-2">
                  Email para Relatórios
                </label>
                <input
                  type="email"
                  placeholder="relatorios@empresa.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f23f35] focus:border-[#f23f35]"
                />
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuracoes.notificacoes.emailRelatorios}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      notificacoes: { ...prev.notificacoes, emailRelatorios: e.target.checked }
                    }))}
                    className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-[#1c1c1b]">Enviar relatórios por email</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuracoes.notificacoes.emailAtrasos}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      notificacoes: { ...prev.notificacoes, emailAtrasos: e.target.checked }
                    }))}
                    className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-[#1c1c1b]">Notificar atrasos</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuracoes.notificacoes.emailFaltas}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      notificacoes: { ...prev.notificacoes, emailFaltas: e.target.checked }
                    }))}
                    className="h-4 w-4 text-[#f23f35] focus:ring-[#f23f35] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-[#1c1c1b]">Notificar faltas</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Segurança */}
        <div className="border border-gray-200 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4 flex items-center">
            <Shield className="h-5 w-5 text-[#f23f35] mr-2" />
            Configurações de Segurança
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-[#1c1c1b] mb-2">Backup de Dados</h4>
              <button className="px-4 py-2 bg-[#ff5805] text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm">
                Realizar Backup
              </button>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-[#1c1c1b] mb-2">Auditoria de Logs</h4>
              <button className="px-4 py-2 bg-[#ffb71b] text-[#1c1c1b] rounded-lg hover:bg-yellow-500 transition-colors duration-200 text-sm">
                Ver Logs
              </button>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-[#1c1c1b] mb-2">Sincronizar AD</h4>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm">
                Sincronizar
              </button>
            </div>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="bg-gray-50 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-[#1c1c1b] mb-4">Informações do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-sm">
              <span className="text-gray-600">Versão:</span>
              <span className="ml-2 font-medium text-[#1c1c1b]">2.1.0</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Última Atualização:</span>
              <span className="ml-2 font-medium text-[#1c1c1b]">15/01/2025</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Status AD:</span>
              <span className="ml-2 font-medium text-green-600">Conectado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;