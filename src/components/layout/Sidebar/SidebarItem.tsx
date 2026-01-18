import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarTooltip from './SidebarTooltip';

interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isExpanded: boolean;
}

/**
 * SidebarItem - Item de navegação da sidebar
 * Estado ativo: fundo preto, texto branco, ícone verde-limão
 * Estado inativo: fundo transparente, texto cinza
 * Tooltip aparece quando colapsada
 */
export default function SidebarItem({ to, icon, label, isExpanded }: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const itemContent = (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${isExpanded ? 'justify-start' : 'justify-center'}
      `}
      style={{
        backgroundColor: isActive ? 'var(--neutral-900)' : 'transparent',
        color: isActive ? 'var(--neutral-0)' : 'var(--neutral-600)',
      }}
    >
      <span
        className="flex-shrink-0"
        style={{
          color: isActive ? 'var(--brand-600)' : 'var(--neutral-600)',
        }}
      >
        {icon}
      </span>
      {isExpanded && (
        <span className="font-medium">{label}</span>
      )}
    </Link>
  );

  // Se colapsada, envolver com tooltip
  if (!isExpanded) {
    return (
      <SidebarTooltip label={label} isVisible={!isExpanded}>
        {itemContent}
      </SidebarTooltip>
    );
  }

  return itemContent;
}
