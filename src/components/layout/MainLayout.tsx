import { type ReactNode } from 'react';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import { MobileMenuProvider } from '../../contexts/MobileMenuContext';
import Sidebar from './Sidebar/Sidebar';
import HeaderMobile from './HeaderMobile/HeaderMobile';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * MainLayout - Layout principal da aplicação
 * Gerencia Sidebar (desktop) e HeaderMobile (mobile/tablet)
 * Container fluido com padding responsivo
 * 
 * A sidebar empurra o conteúdo, não sobrepõe
 * Sidebar e HeaderMobile nunca aparecem juntos
 */
function MainLayoutContent({ children }: MainLayoutProps) {
  const { isExpanded } = useSidebar();

  // Dados mock do usuário (será substituído por contexto no PROMPT 4)
  const user = {
    name: 'Carlos Siqueira',
    email: 'carlos.ls.one@gmail.com',
  };

  const sidebarWidth = isExpanded ? '280px' : '80px';

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: 'var(--neutral-100)' }}>
      {/* HeaderMobile - apenas mobile/tablet (<1280px) */}
      <HeaderMobile user={user} />
      
      <div className="flex flex-1">
        {/* Sidebar - apenas desktop (≥1280px) */}
        <Sidebar user={user} />
        
        {/* Spacer invisível no desktop para empurrar conteúdo */}
        <div
          className="hidden lg:block transition-all duration-300 ease-in-out flex-shrink-0"
          style={{
            width: sidebarWidth,
          }}
        />
        
        {/* Conteúdo principal - layout fluido */}
        <main className="flex-1 w-full min-w-0">
          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <MobileMenuProvider>
        <MainLayoutContent>{children}</MainLayoutContent>
      </MobileMenuProvider>
    </SidebarProvider>
  );
}
