import { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';

/**
 * CardsAccountsWidget - Widget de Cartões/Contas conforme Figma
 * Lista de cartões com logos, valores, datas de vencimento e últimos dígitos
 */
export default function CardsAccountsWidget() {
  const { creditCards, bankAccounts } = useFinance();
  const [showAll, setShowAll] = useState(false);

  const getLogoFromName = (name: string) => {
    if (name.toLowerCase().includes('nubank')) return 'Nubank';
    if (name.toLowerCase().includes('inter')) return 'Inter';
    if (name.toLowerCase().includes('xp')) return 'XP Inc.';
    return 'Banco';
  };

  const allItems = [
    ...creditCards.map((card) => ({
      type: 'credit' as const,
      id: card.id,
      name: card.name,
      amount: card.currentBill,
      dueDate: card.dueDay,
      lastDigits: card.lastDigits || '5897',
      logo: getLogoFromName(card.name),
    })),
    ...bankAccounts.map((account) => ({
      type: 'bank' as const,
      id: account.id,
      name: account.name,
      amount: account.balance,
      dueDate: null,
      lastDigits: null,
      logo: getLogoFromName(account.name),
    })),
  ];

  const displayItems = showAll ? allItems : allItems.slice(0, 3);

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
            <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M3 9H17" stroke="currentColor" strokeWidth="2" />
          </svg>
          Cartões/Contas
        </h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: 'var(--neutral-100)',
            color: 'var(--neutral-600)',
          }}
          aria-label={showAll ? 'Mostrar menos' : 'Mostrar mais'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d={showAll ? 'M4 6L8 2L12 6' : 'M4 10L8 14L12 10'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: 'var(--neutral-100)' }}
          >
            <div className="flex items-center gap-3">
              {/* Logo do banco (placeholder) */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor:
                    item.logo === 'Nubank'
                      ? 'var(--purple-600)'
                      : item.logo === 'Inter'
                      ? 'var(--orange-600)'
                      : 'var(--neutral-900)',
                  color: 'var(--neutral-0)',
                }}
              >
                {item.logo.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-sm" style={{ color: 'var(--neutral-900)' }}>
                  {item.name}
                </p>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--neutral-600)' }}>
                  {item.dueDate && (
                    <>
                      <span>
                        {item.type === 'credit'
                          ? `Vence dia ${item.dueDate}`
                          : `Vence ${item.dueDate} jan`}
                      </span>
                      {item.lastDigits && <span>•</span>}
                    </>
                  )}
                  {item.lastDigits && <span>**** {item.lastDigits}</span>}
                </div>
              </div>
            </div>
            <p className="font-bold text-sm" style={{ color: 'var(--neutral-900)' }}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
