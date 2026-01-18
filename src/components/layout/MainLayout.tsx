import { type ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * MainLayout - Layout principal da aplicação
 * Gerencia Sidebar (desktop) e HeaderMobile (mobile/tablet)
 * Container fluido com padding responsivo
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: 'var(--neutral-100)' }}>
      {/* TODO: Sidebar será adicionada no PROMPT 2 (apenas desktop ≥1280px) */}
      {/* TODO: HeaderMobile será adicionado no PROMPT 3 (apenas <1280px) */}
      
      {/* Conteúdo principal - layout fluido */}
      <main className="w-full">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
