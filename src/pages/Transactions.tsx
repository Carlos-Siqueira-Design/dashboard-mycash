import { useState } from 'react';
import TransactionsTable from '../components/transactions/TransactionsTable';
import NewTransactionModal from '../components/transactions/NewTransactionModal';

/**
 * Transactions - Página de transações
 */
export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--neutral-900)' }}
        >
          Transações
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg font-medium"
          style={{
            backgroundColor: 'var(--brand-600)',
            color: 'var(--neutral-900)',
          }}
        >
          Nova Transação
        </button>
      </div>
      <TransactionsTable />
      <NewTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
