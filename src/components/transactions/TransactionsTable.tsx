import { useState, useMemo } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import type { Transaction } from '../../types';

/**
 * TransactionsTable - Tabela de transações detalhada
 * Tabela completa com busca, filtros locais e paginação
 */
export default function TransactionsTable() {
  const { getFilteredTransactions, familyMembers } = useFinance();
  const [localSearch, setLocalSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allTransactions = getFilteredTransactions();

  const filteredTransactions = useMemo(() => {
    if (!localSearch) return allTransactions;
    const searchLower = localSearch.toLowerCase();
    return allTransactions.filter(
      (t) =>
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower)
    );
  }, [allTransactions, localSearch]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const getMemberName = (memberId: string | null) => {
    if (!memberId) return 'Geral';
    const member = familyMembers.find((m) => m.id === memberId);
    return member?.name || 'Desconhecido';
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: 'var(--neutral-0)',
        border: '1px solid var(--neutral-300)',
      }}
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
        <h3
          className="text-lg font-bold"
          style={{ color: 'var(--neutral-900)' }}
        >
          Transações
        </h3>
        <input
          type="text"
          placeholder="Buscar na tabela..."
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg border text-sm"
          style={{
            backgroundColor: 'var(--neutral-100)',
            borderColor: 'var(--neutral-300)',
            color: 'var(--neutral-900)',
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--neutral-300)' }}>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: 'var(--neutral-600)' }}>
                Data
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: 'var(--neutral-600)' }}>
                Descrição
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: 'var(--neutral-600)' }}>
                Categoria
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: 'var(--neutral-600)' }}>
                Membro
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold" style={{ color: 'var(--neutral-600)' }}>
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                style={{ borderBottom: '1px solid var(--neutral-200)' }}
              >
                <td className="py-3 px-4 text-sm" style={{ color: 'var(--neutral-600)' }}>
                  {new Date(transaction.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--neutral-900)' }}>
                  {transaction.description}
                </td>
                <td className="py-3 px-4 text-sm" style={{ color: 'var(--neutral-600)' }}>
                  {transaction.category}
                </td>
                <td className="py-3 px-4 text-sm" style={{ color: 'var(--neutral-600)' }}>
                  {getMemberName(transaction.memberId)}
                </td>
                <td
                  className="py-3 px-4 text-sm font-bold text-right"
                  style={{
                    color: transaction.type === 'income' ? 'var(--blue-600)' : 'var(--red-600)',
                  }}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm" style={{ color: 'var(--neutral-600)' }}>
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              style={{
                backgroundColor: 'var(--neutral-200)',
                color: 'var(--neutral-900)',
              }}
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              style={{
                backgroundColor: 'var(--neutral-200)',
                color: 'var(--neutral-900)',
              }}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
