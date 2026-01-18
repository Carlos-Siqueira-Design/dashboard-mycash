import { type ReactNode } from 'react';

interface SidebarTooltipProps {
  children: ReactNode;
  label: string;
  isVisible: boolean;
}

/**
 * SidebarTooltip - Tooltip que aparece quando sidebar está colapsada
 * Aparece ao lado direito do item com leve delay
 */
export default function SidebarTooltip({ children, label, isVisible }: SidebarTooltipProps) {
  if (!isVisible) {
    return <>{children}</>;
  }

  return (
    <div className="relative group/tooltip">
      {children}
      <div
        className="
          absolute left-full ml-2 px-3 py-2 rounded-lg
          text-sm whitespace-nowrap
          opacity-0 group-hover/tooltip:opacity-100
          transition-opacity duration-200 delay-300
          pointer-events-none
          z-50
          shadow-lg
        "
        style={{
          backgroundColor: 'var(--neutral-900)',
          color: 'var(--neutral-0)',
        }}
      >
        {label}
        {/* Seta do tooltip apontando para esquerda */}
        <div
          className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0"
          style={{
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: '6px solid var(--neutral-900)',
          }}
        />
      </div>
    </div>
  );
}
