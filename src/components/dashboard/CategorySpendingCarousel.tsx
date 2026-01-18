import { useFinance } from '../../contexts/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

/**
 * CategorySpendingCarousel - Carrossel de gastos por categoria
 * Widget com gráficos donut por categoria
 */
export default function CategorySpendingCarousel() {
  const { calculateExpensesByCategory, filters, categories } = useFinance();

  const startDate = filters.dateRange.startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endDate = filters.dateRange.endDate || new Date();
  const expensesByCategory = calculateExpensesByCategory(startDate, endDate);

  const data = categories
    .filter((cat) => cat.type === 'expense')
    .map((cat) => ({
      name: cat.name,
      value: expensesByCategory[cat.name] || 0,
      color: cat.color || '#6C5CE7',
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const COLORS = data.map((item) => item.color);

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
        Gastos por Categoria
      </h3>

      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="min-w-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) =>
                    value !== undefined
                      ? new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(value)
                      : ''
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p
          className="text-center py-8"
          style={{ color: 'var(--neutral-600)' }}
        >
          Nenhuma despesa encontrada no período
        </p>
      )}
    </div>
  );
}
