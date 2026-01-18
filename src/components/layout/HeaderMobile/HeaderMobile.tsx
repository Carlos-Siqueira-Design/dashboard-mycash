import { Link } from 'react-router-dom';
import { useMobileMenu } from '../../../contexts/MobileMenuContext';
import MobileDrawer from './MobileDrawer';

interface HeaderMobileProps {
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

/**
 * HeaderMobile - Header de navegação para mobile/tablet
 * 
 * Regras:
 * - Aparece apenas em <1280px
 * - Fixo no topo, ocupa largura total
 * - Contém logo à esquerda e avatar à direita
 * - Avatar abre MenuDropdown
 * - Some completamente no desktop
 */
export default function HeaderMobile({ user }: HeaderMobileProps) {
  const { toggle } = useMobileMenu();

  return (
    <>
      <header
        className="
          lg:hidden fixed top-0 left-0 right-0 z-50
          flex items-center justify-between px-4 py-3
          shadow-sm
        "
        style={{
          backgroundColor: 'var(--neutral-0)',
          borderBottom: '1px solid var(--neutral-300)',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg"
            style={{ backgroundColor: 'var(--brand-600)', color: 'var(--neutral-900)' }}
          >
            M
          </div>
          <span
            className="font-bold text-lg"
            style={{ color: 'var(--neutral-900)' }}
          >
            mycash+
          </span>
        </Link>

        {/* Avatar do usuário (abre menu) */}
        {user && (
          <button
            onClick={toggle}
            className="
              w-10 h-10 rounded-full flex items-center justify-center
              transition-transform duration-200 hover:scale-110
            "
            style={{
              backgroundColor: 'var(--neutral-200)',
              color: 'var(--neutral-900)',
            }}
            aria-label="Abrir menu"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </button>
        )}
      </header>

      {/* Spacer para compensar header fixo */}
      <div className="lg:hidden h-16" />

      {/* Menu Drawer */}
      <MobileDrawer user={user} />
    </>
  );
}
