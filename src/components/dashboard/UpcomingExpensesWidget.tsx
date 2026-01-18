import { useFinance } from '../../contexts/FinanceContext';

/**
 * UpcomingExpensesWidget - Widget de próximas despesas conforme Figma
 * Lista cronológica de despesas com checkmarks verdes
 */
export default function UpcomingExpensesWidget() {
  const { transactions, updateTransaction } = useFinance();

  const upcomingExpenses = transactions
    .filter((t) => t.type === 'expense')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const handleMarkAsPaid = (id: string) => {
    updateTransaction(id, { isPaid: true, status: 'completed' });
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
          <span>$</span>
          Próximas despesas
        </h3>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: 'var(--neutral-100)',
            color: 'var(--neutral-600)',
          }}
          aria-label="Adicionar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 4V12M4 8H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {upcomingExpenses.length > 0 ? (
        <div className="space-y-3">
          {upcomingExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ backgroundColor: 'var(--neutral-100)' }}
            >
              <div className="flex-1">
                <p
                  className="font-medium text-sm"
                  style={{ color: 'var(--neutral-900)' }}
                >
                  {expense.description}
                </p>
                <div className="flex items-center gap-2 text-xs mt-1" style={{ color: 'var(--neutral-600)' }}>
                  <span>Vence dia {new Date(expense.date).getDate()}/01</span>
                  <span>•</span>
                  <span>{expense.accountId || 'Nubank conta'}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="font-bold text-sm"
                  style={{ color: 'var(--neutral-900)' }}
                >
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(expense.amount)}
                </span>
                <button
                  onClick={() => handleMarkAsPaid(expense.id)}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: expense.isPaid ? 'var(--green-600)' : 'transparent',
                    border: expense.isPaid ? 'none' : '2px solid var(--green-600)',
                    color: expense.isPaid ? 'var(--neutral-0)' : 'var(--green-600)',
                  }}
                  aria-label="Marcar como pago"
                >
                  {expense.isPaid && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          className="text-center py-8"
          style={{ color: 'var(--neutral-600)' }}
        >
          Nenhuma despesa pendente
        </p>
      )}
    </div>
  );
}
