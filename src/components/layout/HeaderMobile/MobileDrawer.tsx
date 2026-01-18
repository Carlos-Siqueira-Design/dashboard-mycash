import { useLocation, useNavigate } from 'react-router-dom';
import { useMobileMenu } from '../../../contexts/MobileMenuContext';

interface MobileDrawerProps {
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

/**
 * MobileDrawer - Menu dropdown que desliza de cima para baixo
 * 
 * Regras:
 * - Aparece quando avatar é tocado
 * - Desliza de cima para baixo com animação suave
 * - Não é fullscreen (cobre conteúdo mas não ocupa tela inteira)
 * - Fecha ao clicar em item, X ou fora (overlay escuro)
 * - Item ativo destacado com fundo preto
 * - Botão "Sair" vermelho na parte inferior
 */
export default function MobileDrawer({ user }: MobileDrawerProps) {
  const { isOpen, close } = useMobileMenu();
  const location = useLocation();
  const navigate = useNavigate();

  // Ícones (mesmos da Sidebar)
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

  const menuItems = [
    { to: '/', icon: <HomeIcon />, label: 'Home' },
    { to: '/cards', icon: <CardsIcon />, label: 'Cartões' },
    { to: '/transactions', icon: <TransactionsIcon />, label: 'Transações' },
    { to: '/profile', icon: <ProfileIcon />, label: 'Perfil' },
  ];

  const handleItemClick = (to: string) => {
    navigate(to);
    close();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay escuro semi-transparente */}
      <div
        className="
          lg:hidden fixed inset-0 z-40
          transition-opacity duration-300
        "
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`
          lg:hidden fixed left-0 right-0 z-50
          rounded-b-2xl shadow-2xl
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
        style={{
          top: '64px', // Altura do header (h-16 = 64px)
          backgroundColor: 'var(--neutral-0)',
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}
      >
        {/* Header do drawer */}
        <div
          className="flex items-center justify-between px-4 py-4 border-b"
          style={{ borderColor: 'var(--neutral-300)' }}
        >
          <h2
            className="font-bold text-lg"
            style={{ color: 'var(--neutral-900)' }}
          >
            Menu
          </h2>
          <button
            onClick={close}
            className="
              w-10 h-10 rounded-full flex items-center justify-center
              transition-colors duration-200
            "
            style={{
              backgroundColor: 'var(--neutral-200)',
              color: 'var(--neutral-900)',
            }}
            aria-label="Fechar menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Lista de navegação */}
        <nav className="px-4 py-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <button
                key={item.to}
                onClick={() => handleItemClick(item.to)}
                className="
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 mb-2
                "
                style={{
                  backgroundColor: isActive ? 'var(--neutral-900)' : 'transparent',
                  color: isActive ? 'var(--neutral-0)' : 'var(--neutral-600)',
                }}
              >
                <span
                  style={{
                    color: isActive ? 'var(--brand-600)' : 'var(--neutral-600)',
                  }}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Informações do usuário */}
        {user && (
          <div
            className="px-4 py-4 border-t"
            style={{ borderColor: 'var(--neutral-300)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold"
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
          </div>
        )}

        {/* Botão Sair */}
        <div className="px-4 pb-4">
          <button
            onClick={() => {
              // TODO: Implementar logout no PROMPT 4
              close();
            }}
            className="
              w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
              font-medium transition-colors duration-200
            "
            style={{
              backgroundColor: 'var(--red-600)',
              color: 'var(--neutral-0)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 17L2 12M2 12L7 7M2 12H18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
