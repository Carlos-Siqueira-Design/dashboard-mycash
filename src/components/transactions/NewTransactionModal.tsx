import { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import Modal from '../ui/Modal';
import type { TransactionType } from '../../types';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NewTransactionModal - Modal de nova transação
 * Modal fullscreen com formulário completo e validação
 */
export default function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
  const { addTransaction, categories, familyMembers, bankAccounts } = useFinance();
  const [formData, setFormData] = useState({
    type: 'expense' as TransactionType,
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    memberId: '',
    accountId: '',
    isRecurring: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.description || !formData.category || !formData.accountId) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    addTransaction({
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: new Date(formData.date),
      memberId: formData.memberId || null,
      accountId: formData.accountId,
      status: 'pending',
      isRecurring: formData.isRecurring,
      isPaid: false,
    });

    // Reset form
    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      memberId: '',
      accountId: '',
      isRecurring: false,
    });

    onClose();
  };

  const availableCategories = categories.filter((cat) => cat.type === formData.type);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Transação" fullscreen>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
            Tipo
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
              />
              <span style={{ color: 'var(--neutral-600)' }}>Despesa</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="income"
                checked={formData.type === 'income'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
              />
              <span style={{ color: 'var(--neutral-600)' }}>Receita</span>
            </label>
          </div>
        </div>

        {/* Valor */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
            Valor *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
            required
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
            Descrição *
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
            required
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
            Categoria *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
            required
          >
            <option value="">Selecione uma categoria</option>
            {availableCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
            Data
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
          />
        </div>

        {/* Membro */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
            Membro
          </label>
          <select
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
          >
            <option value="">Geral</option>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Conta */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-900)' }}>
            Conta *
          </label>
          <select
            value={formData.accountId}
            onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
            required
          >
            <option value="">Selecione uma conta</option>
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        {/* Recorrente */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isRecurring}
              onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
            />
            <span style={{ color: 'var(--neutral-600)' }}>Despesa recorrente</span>
          </label>
        </div>

        {/* Botões */}
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
