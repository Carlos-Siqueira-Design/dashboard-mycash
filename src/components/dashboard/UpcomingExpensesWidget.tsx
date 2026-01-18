import { useFinance } from '../../contexts/FinanceContext';

/**
 * UpcomingExpensesWidget - Widget de próximas despesas
 * Lista cronológica de despesas pendentes com botão de check
 */
export default function UpcomingExpensesWidget() {
  const { transactions, updateTransaction } = useFinance();

  const upcomingExpenses = transactions
    .filter((t) => t.type === 'expense' && !t.isPaid && t.status === 'pending')
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
      <h3
        className="text-lg font-bold mb-4"
        style={{ color: 'var(--neutral-900)' }}
      >
        Próximas Despesas
      </h3>

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
                  className="font-medium"
                  style={{ color: 'var(--neutral-900)' }}
                >
                  {expense.description}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--neutral-600)' }}
                >
                  {new Date(expense.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="font-bold"
                  style={{ color: 'var(--red-600)' }}
                >
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(expense.amount)}
                </span>
                <button
                  onClick={() => handleMarkAsPaid(expense.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-green-100"
                  style={{ color: 'var(--green-600)' }}
                  aria-label="Marcar como pago"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.667 5L7.5 14.167 3.333 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
