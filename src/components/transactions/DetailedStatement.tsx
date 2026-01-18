import { useState, useMemo } from 'react';
import { useFinance } from '../../contexts/FinanceContext';

/**
 * DetailedStatement - Extrato detalhado conforme Figma
 * Tabela completa com: Membro, Data, Descrição, Categoria, Conta/Cartão, Parcelas, Valor
 */
export default function DetailedStatement() {
  const { getFilteredTransactions, familyMembers } = useFinance();
  const [localSearch, setLocalSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const getMemberAvatar = (memberId: string | null) => {
    if (!memberId) return null;
    const member = familyMembers.find((m) => m.id === memberId);
    return member;
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: 'var(--neutral-0)',
        border: '1px solid var(--neutral-300)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-lg font-bold flex items-center gap-2"
          style={{ color: 'var(--neutral-900)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 4H16V16H4V4ZM4 2C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V4C18 2.89543 17.1046 2 16 2H4Z"
              fill="currentColor"
            />
          </svg>
          Extrato detalhado
        </h3>
      </div>

      {/* Busca e Filtro */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar lançamentos"
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 px-4 py-2 rounded-lg border text-sm"
          style={{
            backgroundColor: 'var(--neutral-100)',
            borderColor: 'var(--neutral-300)',
            color: 'var(--neutral-900)',
          }}
        />
        <select
          className="px-4 py-2 rounded-lg border text-sm"
          style={{
            backgroundColor: 'var(--neutral-100)',
            borderColor: 'var(--neutral-300)',
            color: 'var(--neutral-900)',
          }}
        >
          <option>Todos</option>
          <option>Receitas</option>
          <option>Despesas</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--neutral-300)' }}>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: 'var(--neutral-600)' }}>
                Membro
              </th>
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
                Conta/Cartão
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: 'var(--neutral-600)' }}>
                Parcelas
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold" style={{ color: 'var(--neutral-600)' }}>
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => {
              const member = getMemberAvatar(transaction.memberId);
              return (
                <tr
                  key={transaction.id}
                  style={{ borderBottom: '1px solid var(--neutral-200)' }}
                >
                  <td className="py-3 px-4">
                    {member ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                          style={{
                            backgroundColor: 'var(--neutral-200)',
                            color: 'var(--neutral-900)',
                          }}
                        >
                          {member.avatarUrl ? (
                            <img
                              src={member.avatarUrl}
                              alt={member.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            member.name.charAt(0).toUpperCase()
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm" style={{ color: 'var(--neutral-600)' }}>
                        -
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--neutral-600)' }}>
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm"
                        style={{
                          color: transaction.type === 'income' ? 'var(--blue-600)' : 'var(--red-600)',
                        }}
                      >
                        {transaction.type === 'income' ? '↑' : '↓'}
                      </span>
                      <span className="text-sm font-medium" style={{ color: 'var(--neutral-900)' }}>
                        {transaction.description}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--neutral-600)' }}>
                    {transaction.category}
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--neutral-600)' }}>
                    {transaction.accountId || '-'}
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--neutral-600)' }}>
                    {transaction.installments && transaction.currentInstallment
                      ? `${transaction.currentInstallment}/${transaction.installments}`
                      : '-'}
                  </td>
                  <td
                    className="py-3 px-4 text-sm font-bold text-right"
                    style={{ color: 'var(--neutral-900)' }}
                  >
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(transaction.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm" style={{ color: 'var(--neutral-600)' }}>
            Mostrado {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} de {filteredTransactions.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded flex items-center justify-center disabled:opacity-50"
              style={{
                backgroundColor: 'var(--neutral-200)',
                color: 'var(--neutral-900)',
              }}
            >
              ←
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm font-medium ${
                    currentPage === page ? 'font-bold' : ''
                  }`}
                  style={{
                    backgroundColor: currentPage === page ? 'var(--brand-600)' : 'var(--neutral-200)',
                    color: currentPage === page ? 'var(--neutral-900)' : 'var(--neutral-600)',
                  }}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded flex items-center justify-center disabled:opacity-50"
              style={{
                backgroundColor: 'var(--neutral-200)',
                color: 'var(--neutral-900)',
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
