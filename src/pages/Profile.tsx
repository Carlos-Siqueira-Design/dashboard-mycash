import { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import AddMemberModal from '../components/profile/AddMemberModal';

/**
 * Profile - Página de perfil do usuário
 */
export default function Profile() {
  const { familyMembers } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--neutral-900)' }}
        >
          Perfil
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg font-medium"
          style={{
            backgroundColor: 'var(--brand-600)',
            color: 'var(--neutral-900)',
          }}
        >
          Adicionar Membro
        </button>
      </div>

      <div
        className="rounded-xl p-6 mb-6"
        style={{
          backgroundColor: 'var(--neutral-0)',
          border: '1px solid var(--neutral-300)',
        }}
      >
        <h2
          className="text-lg font-bold mb-4"
          style={{ color: 'var(--neutral-900)' }}
        >
          Membros da Família
        </h2>
        <div className="space-y-3">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{ backgroundColor: 'var(--neutral-100)' }}
            >
              <div>
                <p className="font-medium" style={{ color: 'var(--neutral-900)' }}>
                  {member.name}
                </p>
                <p className="text-sm" style={{ color: 'var(--neutral-600)' }}>
                  {member.role}
                </p>
              </div>
              {member.monthlyIncome && (
                <p className="text-sm font-medium" style={{ color: 'var(--neutral-600)' }}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(member.monthlyIncome)}
                  /mês
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
