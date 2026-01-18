import { useEffect, useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';

/**
 * ExpenseCard - Card de despesas do período
 * Mostra despesas do mês atual com animação de contagem
 */
export default function ExpenseCard() {
  const { calculateExpensesForPeriod, filters } = useFinance();
  const [displayValue, setDisplayValue] = useState(0);

  const startDate = filters.dateRange.startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endDate = filters.dateRange.endDate || new Date();
  const totalExpenses = calculateExpensesForPeriod(startDate, endDate);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = totalExpenses / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, totalExpenses);
      setDisplayValue(Math.round(current));

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(totalExpenses);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalExpenses]);

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(displayValue);

  return (
    <div
      className="rounded-xl p-6 shadow-sm"
      style={{
        backgroundColor: 'var(--neutral-0)',
        border: '1px solid var(--neutral-300)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-sm font-medium"
          style={{ color: 'var(--neutral-600)' }}
        >
          Despesas
        </h3>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--red-100)' }}
        >
          <span style={{ color: 'var(--red-600)' }}>📉</span>
        </div>
      </div>
      <p
        className="text-3xl font-bold"
        style={{ color: 'var(--red-600)' }}
      >
        {formattedValue}
      </p>
    </div>
  );
}
