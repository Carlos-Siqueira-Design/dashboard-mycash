import BalanceCard from '../components/dashboard/BalanceCard';
import IncomeCard from '../components/dashboard/IncomeCard';
import ExpenseCard from '../components/dashboard/ExpenseCard';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import CategorySpendingCarousel from '../components/dashboard/CategorySpendingCarousel';
import FinancialFlowChart from '../components/dashboard/FinancialFlowChart';
import CreditCardsWidget from '../components/dashboard/CreditCardsWidget';
import UpcomingExpensesWidget from '../components/dashboard/UpcomingExpensesWidget';

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
      
      {/* Header com Controles */}
      <DashboardHeader />
      
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <BalanceCard />
        <IncomeCard />
        <ExpenseCard />
      </div>

      {/* Carrossel de Gastos por Categoria */}
      <div className="mb-8">
        <CategorySpendingCarousel />
      </div>

      {/* Gráfico de Fluxo Financeiro */}
      <div className="mb-8">
        <FinancialFlowChart />
      </div>

      {/* Widget de Cartões de Crédito */}
      <div className="mb-8">
        <CreditCardsWidget />
      </div>

      {/* Widget de Próximas Despesas */}
      <div className="mb-8">
        <UpcomingExpensesWidget />
      </div>
    </div>
  );
}
