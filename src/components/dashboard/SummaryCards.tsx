import { useFinance } from '../../contexts/FinanceContext';

/**
 * SummaryCards - Cards de resumo conforme Figma
 * 3 cards: Aluguel, Receitas, Despesas
 * Cada card tem ícone, seta indicativa e valor
 */
export default function SummaryCards() {
  const { calculateIncomeForPeriod, calculateExpensesForPeriod, filters } = useFinance();

  const startDate = filters.dateRange.startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endDate = filters.dateRange.endDate || new Date();
  const income = calculateIncomeForPeriod(startDate, endDate);
  const expenses = calculateExpensesForPeriod(startDate, endDate);
  const rent = expenses * 0.4; // Aproximação: 40% das despesas são aluguel

  const cards = [
    {
      title: 'Aluguel',
      amount: rent,
      icon: '$',
      arrow: 'down',
      color: 'var(--red-600)',
    },
    {
      title: 'Receitas',
      amount: income,
      icon: '↑',
      arrow: 'up',
      color: 'var(--green-600)',
    },
    {
      title: 'Despesas',
      amount: expenses,
      icon: '↓',
      arrow: 'down',
      color: 'var(--red-600)',
    },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl p-6"
          style={{
            backgroundColor: 'var(--neutral-0)',
            border: '1px solid var(--neutral-300)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className="text-xl"
                style={{ color: card.color }}
              >
                {card.icon}
              </span>
              <h3
                className="text-sm font-medium"
                style={{ color: 'var(--neutral-600)' }}
              >
                {card.title}
              </h3>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                card.arrow === 'up' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{ color: card.color }}
              >
                {card.arrow === 'up' ? (
                  <path
                    d="M6 2V10M2 6L6 2L10 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M6 10V2M2 6L6 10L10 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </div>
          </div>
          <p
            className="text-2xl font-bold"
            style={{ color: 'var(--neutral-900)' }}
          >
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(card.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}
