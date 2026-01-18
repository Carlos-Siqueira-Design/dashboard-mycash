import { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';

/**
 * DashboardHeader - Header do dashboard com busca, filtros e seletor de período
 */
export default function DashboardHeader() {
  const { filters, setFilters, familyMembers } = useFinance();
  const [searchText, setSearchText] = useState(filters.searchText);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setFilters((prev) => ({ ...prev, searchText: value }));
  };

  const handlePeriodChange = (period: 'month' | 'quarter' | 'year') => {
    const now = new Date();
    let startDate: Date;
    let endDate = new Date();

    switch (period) {
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }

    setFilters((prev) => ({
      ...prev,
      dateRange: { startDate, endDate },
    }));
  };

  return (
    <div
      className="rounded-xl p-6 mb-6"
      style={{
        backgroundColor: 'var(--neutral-0)',
        border: '1px solid var(--neutral-300)',
      }}
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Busca */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar transações..."
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border"
              style={{
                backgroundColor: 'var(--neutral-100)',
                borderColor: 'var(--neutral-300)',
                color: 'var(--neutral-900)',
              }}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--neutral-600)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Seletor de Período */}
        <div className="flex gap-2">
          {(['month', 'quarter', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor:
                  filters.dateRange.startDate?.getMonth() ===
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1).getMonth()
                    ? 'var(--brand-600)'
                    : 'var(--neutral-200)',
                color:
                  filters.dateRange.startDate?.getMonth() ===
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1).getMonth()
                    ? 'var(--neutral-900)'
                    : 'var(--neutral-600)',
              }}
            >
              {period === 'month' ? 'Mês' : period === 'quarter' ? 'Trimestre' : 'Ano'}
            </button>
          ))}
        </div>

        {/* Widget de Membros */}
        <div className="flex items-center gap-2">
          <select
            value={filters.selectedMember || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                selectedMember: e.target.value || null,
              }))
            }
            className="px-4 py-2 rounded-lg border text-sm"
            style={{
              backgroundColor: 'var(--neutral-100)',
              borderColor: 'var(--neutral-300)',
              color: 'var(--neutral-900)',
            }}
          >
            <option value="">Todos os membros</option>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
