import { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import Modal from '../ui/Modal';
import type { CardTheme } from '../../types';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'credit' | 'bank';
}

/**
 * AddCardModal - Modal para adicionar cartão ou conta bancária
 */
export default function AddCardModal({ isOpen, onClose, type }: AddCardModalProps) {
  const { addCreditCard, addBankAccount, familyMembers } = useFinance();
  const [formData, setFormData] = useState<{
    name: string;
    holderId: string;
    closingDay?: string;
    dueDay?: string;
    limit?: string;
    theme?: CardTheme;
    lastDigits?: string;
    balance?: string;
  }>({
    name: '',
    holderId: '',
    ...(type === 'credit'
      ? {
          closingDay: '5',
          dueDay: '15',
          limit: '',
          theme: 'black' as CardTheme,
          lastDigits: '',
        }
      : {
          balance: '',
        }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'credit') {
      if (!formData.name || !formData.holderId || !formData.limit) {
        alert('Preencha todos os campos obrigatórios');
        return;
      }
      addCreditCard({
        name: formData.name,
        holderId: formData.holderId,
        closingDay: parseInt(formData.closingDay as string),
        dueDay: parseInt(formData.dueDay as string),
        limit: parseFloat(formData.limit as string),
        currentBill: 0,
        theme: (formData.theme || 'black') as CardTheme,
        lastDigits: formData.lastDigits || undefined,
      });
    } else {
      if (!formData.name || !formData.holderId || !formData.balance) {
        alert('Preencha todos os campos obrigatórios');
        return;
      }
      addBankAccount({
        name: formData.name,
        holderId: formData.holderId,
        balance: parseFloat(formData.balance || '0'),
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'credit' ? 'Adicionar Cartão de Crédito' : 'Adicionar Conta Bancária'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
            Nome *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
            Titular *
          </label>
          <select
            value={formData.holderId}
            onChange={(e) => setFormData({ ...formData, holderId: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
            required
          >
            <option value="">Selecione um membro</option>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {type === 'credit' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
                  Dia de Fechamento
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={formData.closingDay}
                  onChange={(e) => setFormData({ ...formData, closingDay: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--neutral-100)',
                    borderColor: 'var(--neutral-300)',
                    color: 'var(--neutral-900)',
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
                  Dia de Vencimento
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={formData.dueDay}
                  onChange={(e) => setFormData({ ...formData, dueDay: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--neutral-100)',
                    borderColor: 'var(--neutral-300)',
                    color: 'var(--neutral-900)',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
                Limite *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: 'var(--neutral-100)',
                  borderColor: 'var(--neutral-300)',
                  color: 'var(--neutral-900)',
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
                Tema
              </label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value as CardTheme })}
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: 'var(--neutral-100)',
                  borderColor: 'var(--neutral-300)',
                  color: 'var(--neutral-900)',
                }}
              >
                <option value="black">Preto</option>
                <option value="lime">Verde-limão</option>
                <option value="white">Branco</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
                Últimos 4 dígitos (opcional)
              </label>
              <input
                type="text"
                maxLength={4}
                value={formData.lastDigits}
                onChange={(e) => setFormData({ ...formData, lastDigits: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: 'var(--neutral-100)',
                  borderColor: 'var(--neutral-300)',
                  color: 'var(--neutral-900)',
                }}
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
              Saldo Inicial *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--neutral-100)',
                borderColor: 'var(--neutral-300)',
                color: 'var(--neutral-900)',
              }}
              required
            />
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: 'var(--neutral-200)',
              color: 'var(--neutral-900)',
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: 'var(--brand-600)',
              color: 'var(--neutral-900)',
            }}
          >
            Adicionar
          </button>
        </div>
      </form>
    </Modal>
  );
}
