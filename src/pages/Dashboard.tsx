import BalanceCard from '../components/dashboard/BalanceCard';
import IncomeCard from '../components/dashboard/IncomeCard';
import ExpenseCard from '../components/dashboard/ExpenseCard';

/**
 * Dashboard - Página principal do sistema
 * Composição de componentes da dashboard
 */
export default function Dashboard() {
  return (
    <div className="w-full py-8">
      <h1
        className="text-2xl font-bold mb-6"
        style={{ color: 'var(--neutral-900)' }}
      >
        Dashboard
      </h1>
      
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <BalanceCard />
        <IncomeCard />
        <ExpenseCard />
      </div>
    </div>
  );
}
