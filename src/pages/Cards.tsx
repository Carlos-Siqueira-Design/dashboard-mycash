import { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import AddCardModal from '../components/cards/AddCardModal';

/**
 * Cards - Página de cartões de crédito
 */
export default function Cards() {
  const { creditCards, bankAccounts } = useFinance();
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--neutral-900)' }}
        >
          Cartões e Contas
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsCreditModalOpen(true)}
            className="px-4 py-2 rounded-lg font-medium text-sm"
            style={{
              backgroundColor: 'var(--brand-600)',
              color: 'var(--neutral-900)',
            }}
          >
            + Cartão
          </button>
          <button
            onClick={() => setIsBankModalOpen(true)}
            className="px-4 py-2 rounded-lg font-medium text-sm"
            style={{
              backgroundColor: 'var(--blue-600)',
              color: 'var(--neutral-0)',
            }}
          >
            + Conta
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {creditCards.map((card) => (
          <div
            key={card.id}
            className="rounded-xl p-6"
            style={{
              backgroundColor: 'var(--neutral-0)',
              border: '1px solid var(--neutral-300)',
            }}
          >
            <h3 className="font-bold mb-2" style={{ color: 'var(--neutral-900)' }}>
              {card.name}
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--neutral-600)' }}>
              •••• {card.lastDigits || '1234'}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--neutral-600)' }}>Fatura atual:</span>
                <span className="font-bold" style={{ color: 'var(--neutral-900)' }}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(card.currentBill)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--neutral-600)' }}>Limite:</span>
                <span style={{ color: 'var(--neutral-600)' }}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(card.limit)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {bankAccounts.map((account) => (
          <div
            key={account.id}
            className="rounded-xl p-6"
            style={{
              backgroundColor: 'var(--neutral-0)',
              border: '1px solid var(--neutral-300)',
            }}
          >
            <h3 className="font-bold mb-2" style={{ color: 'var(--neutral-900)' }}>
              {account.name}
            </h3>
            <p className="text-2xl font-bold" style={{ color: 'var(--blue-600)' }}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(account.balance)}
            </p>
          </div>
        ))}
      </div>

      <AddCardModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        type="credit"
      />
      <AddCardModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        type="bank"
      />
    </div>
  );
}
