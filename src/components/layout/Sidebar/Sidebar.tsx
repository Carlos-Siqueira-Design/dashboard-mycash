import { useSidebar } from '../../../contexts/SidebarContext';
import SidebarItem from './SidebarItem';
import SidebarToggle from './SidebarToggle';

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

/**
 * Sidebar - Navegação lateral desktop
 * 
 * Estados:
 * - Expandido: mostra logo completo, textos e perfil completo
 * - Colapsado: mostra apenas ícones
 * 
 * Regras:
 * - Apenas visível em desktop (≥1280px)
 * - Empurra conteúdo, não sobrepõe
 * - Transições suaves entre estados
 * - Tooltips quando colapsada
 */
export default function Sidebar({ user }: SidebarProps) {
  const { isExpanded, toggle } = useSidebar();

  // Ícones simples (serão substituídos por biblioteca de ícones no futuro)
  const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3 10L10 3L17 10M6 10V16H14V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const CardsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect
        x="3"
        y="5"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M3 9H17" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const TransactionsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M4 6H16M4 10H16M4 14H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const ProfileIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 17C5 14 7 12 10 12C13 12 15 14 15 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const sidebarWidth = isExpanded ? '280px' : '80px';

  return (
    <aside
      className={`
        hidden lg:flex left-0 top-0 h-screen
        flex-col flex-shrink-0
        transition-all duration-300 ease-in-out
        z-40
      `}
      style={{
        width: sidebarWidth,
        backgroundColor: 'var(--neutral-0)',
        borderRight: '1px solid var(--neutral-300)',
      }}
    >
      {/* Header com Logo */}
      <div className="px-4 py-6 border-b" style={{ borderColor: 'var(--neutral-300)' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl"
            style={{ backgroundColor: 'var(--brand-600)', color: 'var(--neutral-900)' }}
          >
            M
          </div>
          {isExpanded && (
            <span
              className="font-bold text-xl"
              style={{ color: 'var(--neutral-900)' }}
            >
              mycash+
            </span>
          )}
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        <SidebarItem
          to="/"
          icon={<HomeIcon />}
          label="Home"
          isExpanded={isExpanded}
        />
        <SidebarItem
          to="/cards"
          icon={<CardsIcon />}
          label="Cartões"
          isExpanded={isExpanded}
        />
        <SidebarItem
          to="/transactions"
          icon={<TransactionsIcon />}
          label="Transações"
          isExpanded={isExpanded}
        />
        <SidebarItem
          to="/profile"
          icon={<ProfileIcon />}
          label="Perfil"
          isExpanded={isExpanded}
        />
      </nav>

      {/* Perfil do Usuário */}
      {user && (
        <div
          className="px-4 py-4 border-t"
          style={{ borderColor: 'var(--neutral-300)' }}
        >
          {isExpanded ? (
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{
                  backgroundColor: 'var(--neutral-200)',
                  color: 'var(--neutral-900)',
                }}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: 'var(--neutral-900)' }}
                >
                  {user.name}
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: 'var(--neutral-600)' }}
                >
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{
                  backgroundColor: 'var(--neutral-200)',
                  color: 'var(--neutral-900)',
                }}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botão Toggle */}
      <div className="relative">
        <SidebarToggle isExpanded={isExpanded} onToggle={toggle} />
      </div>
    </aside>
  );
}
