import { useMemo } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

/**
 * FinancialFlowChart - Gráfico de fluxo financeiro
 * Gráfico de área com receitas (azul) e despesas (preto)
 */
export default function FinancialFlowChart() {
  const { transactions, filters } = useFinance();

  const chartData = useMemo(() => {
    const startDate = filters.dateRange.startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = filters.dateRange.endDate || new Date();

    // Agrupar por dia
    const dailyData: Record<string, { income: number; expense: number }> = {};

    transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return tDate >= startDate && tDate <= endDate;
      })
      .forEach((t) => {
        const dateKey = new Date(t.date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        });

        if (!dailyData[dateKey]) {
          dailyData[dateKey] = { income: 0, expense: 0 };
        }

        if (t.type === 'income') {
          dailyData[dateKey].income += t.amount;
        } else {
          dailyData[dateKey].expense += t.amount;
        }
      });

    return Object.entries(dailyData)
      .map(([date, values]) => ({
        date,
        receitas: values.income,
        despesas: values.expense,
      }))
      .sort((a, b) => {
        const [dayA, monthA] = a.date.split('/').map(Number);
        const [dayB, monthB] = b.date.split('/').map(Number);
        if (monthA !== monthB) return monthA - monthB;
        return dayA - dayB;
      });
  }, [transactions, filters.dateRange]);

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
        Fluxo Financeiro
      </h3>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--neutral-300)" />
            <XAxis
              dataKey="date"
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
            <Area
              type="monotone"
              dataKey="receitas"
              stackId="1"
              stroke="var(--blue-600)"
              fill="var(--blue-600)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="despesas"
              stackId="1"
              stroke="var(--neutral-900)"
              fill="var(--neutral-900)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <p
          className="text-center py-8"
          style={{ color: 'var(--neutral-600)' }}
        >
          Nenhum dado disponível no período
        </p>
      )}
    </div>
  );
}
