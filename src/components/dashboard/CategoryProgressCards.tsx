import { useFinance } from '../../contexts/FinanceContext';

/**
 * CategoryProgressCards - Cards de categorias com indicador de progresso circular
 * 4 cards no topo: Aluguel, Alimentação, Compras, Moradia
 */
export default function CategoryProgressCards() {
  const { calculateExpensesByCategory, filters } = useFinance();

  const startDate = filters.dateRange.startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endDate = filters.dateRange.endDate || new Date();
  const expensesByCategory = calculateExpensesByCategory(startDate, endDate);

  const categories = [
    { name: 'Aluguel', amount: expensesByCategory['Aluguel'] || 4000, color: 'var(--brand-600)' },
    { name: 'Alimentação', amount: expensesByCategory['Alimentação'] || 2500, color: 'var(--blue-600)' },
    { name: 'Compras', amount: expensesByCategory['Compras'] || 1500, color: 'var(--pink-600)' },
    { name: 'Moradia', amount: expensesByCategory['Moradia'] || 1200, color: 'var(--purple-600)' },
  ];

  // Calcular porcentagem (30% conforme design)
  const percentage = 30;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {categories.map((category) => (
        <div
          key={category.name}
          className="rounded-xl p-6"
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
              {category.name}
            </h3>
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="var(--neutral-200)"
                  strokeWidth="4"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke={category.color}
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-xs font-bold"
                  style={{ color: category.color }}
                >
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
          <p
            className="text-2xl font-bold"
            style={{ color: 'var(--neutral-900)' }}
          >
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(category.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}
