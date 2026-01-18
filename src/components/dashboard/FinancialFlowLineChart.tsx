import { useMemo } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

/**
 * FinancialFlowLineChart - Gráfico de linha (não área) conforme Figma
 * Receitas em azul, Despesas em rosa/pink
 */
export default function FinancialFlowLineChart() {
  const { transactions } = useFinance();

  const chartData = useMemo(() => {
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const monthlyData: Record<string, { receitas: number; despesas: number }> = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).getMonth();
      const monthKey = months[month];

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { receitas: 0, despesas: 0 };
      }

      if (t.type === 'income') {
        monthlyData[monthKey].receitas += t.amount;
      } else {
        monthlyData[monthKey].despesas += t.amount;
      }
    });

    return months.map((month) => ({
      month,
      receitas: monthlyData[month]?.receitas || 0,
      despesas: monthlyData[month]?.despesas || 0,
    }));
  }, [transactions]);

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: 'var(--neutral-0)',
        border: '1px solid var(--neutral-300)',
      }}
    >
      <h3
        className="text-lg font-bold mb-4 flex items-center gap-2"
        style={{ color: 'var(--neutral-900)' }}
      >
        <span>$</span> Fluxo financeiro
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--neutral-300)" />
          <XAxis
            dataKey="month"
            stroke="var(--neutral-600)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="var(--neutral-600)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) =>
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                notation: 'compact',
              }).format(value)
            }
          />
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
          <Line
            type="monotone"
            dataKey="receitas"
            stroke="var(--blue-600)"
            strokeWidth={2}
            dot={{ fill: 'var(--blue-600)', r: 4 }}
            name="Receitas"
          />
          <Line
            type="monotone"
            dataKey="despesas"
            stroke="var(--pink-600)"
            strokeWidth={2}
            dot={{ fill: 'var(--pink-600)', r: 4 }}
            name="Despesas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
