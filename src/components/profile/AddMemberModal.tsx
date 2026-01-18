import { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import Modal from '../ui/Modal';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AddMemberModal - Modal de adicionar membro
 * Formulário para adicionar membros da família
 */
export default function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const { addFamilyMember } = useFinance();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    monthlyIncome: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.role) {
      alert('Preencha nome e função');
      return;
    }

    addFamilyMember({
      name: formData.name,
      role: formData.role,
      monthlyIncome: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : undefined,
    });

    setFormData({ name: '', role: '', monthlyIncome: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Membro">
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
            Função *
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="Ex: Pai, Mãe, Filho"
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
            Renda Mensal (opcional)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.monthlyIncome}
            onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
          />
        </div>

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
