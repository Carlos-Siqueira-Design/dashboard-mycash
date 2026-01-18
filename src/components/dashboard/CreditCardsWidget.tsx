import { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';

/**
 * CreditCardsWidget - Widget de cartões de crédito
 * Exibe cartões com hover, clique e paginação
 */
export default function CreditCardsWidget() {
  const { creditCards } = useFinance();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (creditCards.length === 0) {
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
          Cartões de Crédito
        </h3>
        <p style={{ color: 'var(--neutral-600)' }}>Nenhum cartão cadastrado</p>
      </div>
    );
  }

  const currentCard = creditCards[currentIndex];
  const usagePercentage = (currentCard.currentBill / currentCard.limit) * 100;

  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'black':
        return {
          background: 'var(--neutral-900)',
          text: 'var(--neutral-0)',
        };
      case 'lime':
        return {
          background: 'var(--brand-600)',
          text: 'var(--neutral-900)',
        };
      default:
        return {
          background: 'var(--neutral-0)',
          text: 'var(--neutral-900)',
        };
    }
  };

  const themeStyles = getThemeStyles(currentCard.theme);

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
          className="text-lg font-bold"
          style={{ color: 'var(--neutral-900)' }}
        >
          Cartões de Crédito
        </h3>
        <div className="flex gap-2">
          {creditCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-6' : ''
              }`}
              style={{
                backgroundColor:
                  index === currentIndex
                    ? 'var(--brand-600)'
                    : 'var(--neutral-300)',
              }}
              aria-label={`Cartão ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        className="rounded-xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          backgroundColor: themeStyles.background,
          color: themeStyles.text,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-80 mb-1">{currentCard.name}</p>
            <p className="text-2xl font-bold">
              •••• {currentCard.lastDigits || '1234'}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-80">Fatura atual</span>
            <span className="font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(currentCard.currentBill)}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-80">Limite</span>
            <span>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(currentCard.limit)}
            </span>
          </div>
          <div className="w-full h-2 rounded-full mt-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(usagePercentage, 100)}%`,
                backgroundColor: usagePercentage > 80 ? 'var(--red-600)' : 'var(--brand-600)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
