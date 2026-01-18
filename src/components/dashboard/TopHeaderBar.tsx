import { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import NewTransactionModal from '../transactions/NewTransactionModal';

/**
 * TopHeaderBar - Barra superior do dashboard conforme Figma
 * Contém: busca, filtros, seletor de data, avatares de membros, botão nova transação
 */
export default function TopHeaderBar() {
  const { filters, familyMembers } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <div
        className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6 p-4 rounded-xl"
        style={{
          backgroundColor: 'var(--neutral-0)',
          border: '1px solid var(--neutral-300)',
        }}
      >
        {/* Busca */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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

        {/* Filtros (ícone de sliders) */}
        <button
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: 'var(--neutral-100)',
            color: 'var(--neutral-600)',
          }}
          aria-label="Filtros"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10H15M3 5H17M7 15H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Seletor de Data */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ color: 'var(--neutral-600)' }}
          >
            <path
              d="M4 2V4M12 2V4M3 7H13M2 5C2 4.44772 2.44772 4 3 4H13C13.5523 4 14 4.44772 14 5V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V5Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span className="text-sm" style={{ color: 'var(--neutral-900)' }}>
            {filters.dateRange.startDate
              ? new Date(filters.dateRange.startDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                })
              : '01 Jan'}{' '}
            -{' '}
            {filters.dateRange.endDate
              ? new Date(filters.dateRange.endDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : '31 Jan 2026'}
          </span>
        </div>

        {/* Avatares dos Membros */}
        <div className="flex -space-x-2">
          {familyMembers.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-semibold"
              style={{
                backgroundColor: 'var(--neutral-200)',
                borderColor: 'var(--neutral-0)',
                color: 'var(--neutral-900)',
              }}
              title={member.name}
            >
              {member.avatarUrl ? (
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                member.name.charAt(0).toUpperCase()
              )}
            </div>
          ))}
        </div>

        {/* Ícone Plus */}
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: 'var(--neutral-100)',
            color: 'var(--neutral-600)',
          }}
          aria-label="Adicionar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4V16M4 10H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Botão Nova Transação */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg font-medium"
          style={{
            backgroundColor: 'var(--brand-600)',
            color: 'var(--neutral-900)',
          }}
        >
          + Nova transação
        </button>
      </div>

      <NewTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
