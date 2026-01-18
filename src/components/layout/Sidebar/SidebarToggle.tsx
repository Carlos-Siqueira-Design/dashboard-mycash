interface SidebarToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * SidebarToggle - Botão para alternar estado da sidebar
 * Posicionado na borda direita da sidebar
 * Ícone muda conforme estado: seta esquerda (expandida) / seta direita (colapsada)
 */
export default function SidebarToggle({ isExpanded, onToggle }: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="
        absolute -right-4 top-8 w-8 h-8 rounded-full
        bg-neutral-900 text-neutral-0
        flex items-center justify-center
        shadow-lg hover:scale-110
        transition-all duration-200
        z-10
      "
      style={{
        backgroundColor: 'var(--neutral-900)',
        color: 'var(--neutral-0)',
      }}
      aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200"
      >
        {isExpanded ? (
          // Seta para esquerda (colapsar)
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          // Seta para direita (expandir)
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
