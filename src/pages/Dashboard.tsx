import TopHeaderBar from '../components/dashboard/TopHeaderBar';
import CategoryProgressCards from '../components/dashboard/CategoryProgressCards';
import SummaryCards from '../components/dashboard/SummaryCards';
import CardsAccountsWidget from '../components/dashboard/CardsAccountsWidget';
import UpcomingExpensesWidget from '../components/dashboard/UpcomingExpensesWidget';
import FinancialFlowLineChart from '../components/dashboard/FinancialFlowLineChart';
import DetailedStatement from '../components/transactions/DetailedStatement';

/**
 * Dashboard - Página principal do sistema
 * Estrutura conforme Figma:
 * 1. Top Header Bar (busca, filtros, data, avatares, botão nova transação)
 * 2. Cards de Categorias com Progresso (4 cards: Aluguel, Alimentação, Compras, Moradia)
 * 3. Seção Meio: Cards de Resumo (esquerda) + Cartões/Contas e Próximas Despesas (direita)
 * 4. Seção Inferior: Gráfico de Fluxo (esquerda) + Extrato Detalhado (direita)
 */
export default function Dashboard() {
  return (
    <div className="w-full py-8">
      {/* Top Header Bar */}
      <TopHeaderBar />

      {/* Cards de Categorias com Progresso Circular */}
      <CategoryProgressCards />

      {/* Seção Meio: Dividida em duas partes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Esquerda: Cards de Resumo */}
        <SummaryCards />

        {/* Direita: Cartões/Contas e Próximas Despesas */}
        <div className="space-y-4">
          <CardsAccountsWidget />
          <UpcomingExpensesWidget />
        </div>
      </div>

      {/* Seção Inferior: Dividida em duas partes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Esquerda: Gráfico de Fluxo Financeiro (linha) */}
        <FinancialFlowLineChart />

        {/* Direita: Extrato Detalhado */}
        <DetailedStatement />
      </div>
    </div>
  );
}
