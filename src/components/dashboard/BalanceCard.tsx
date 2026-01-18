import { useEffect, useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';

/**
 * BalanceCard - Card de saldo total
 * Mostra saldo total (contas - cartões) com animação de contagem
 */
export default function BalanceCard() {
  const { calculateTotalBalance } = useFinance();
  const [displayValue, setDisplayValue] = useState(0);
  const totalBalance = calculateTotalBalance();

  useEffect(() => {
    const duration = 1000; // 1 segundo
    const steps = 60;
    const increment = totalBalance / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, totalBalance);
      setDisplayValue(Math.round(current));

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(totalBalance);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalBalance]);

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
          Saldo Total
        </h3>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--brand-100)' }}
        >
          <span style={{ color: 'var(--brand-600)' }}>💰</span>
        </div>
      </div>
      <p
        className="text-3xl font-bold"
        style={{ color: 'var(--neutral-900)' }}
      >
        {formattedValue}
      </p>
    </div>
  );
}
