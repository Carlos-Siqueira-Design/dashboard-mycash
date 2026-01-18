import { type ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  fullscreen?: boolean;
}

/**
 * Modal - Componente base de modal
 * Suporta fullscreen e overlay com fechamento ao clicar fora
 */
export default function Modal({ isOpen, onClose, title, children, fullscreen = false }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 transition-opacity"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed z-50 ${
          fullscreen
            ? 'inset-0'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'
        }`}
        style={{
          backgroundColor: 'var(--neutral-0)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b sticky top-0"
          style={{
            backgroundColor: 'var(--neutral-0)',
            borderColor: 'var(--neutral-300)',
          }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: 'var(--neutral-900)' }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-neutral-200"
            style={{ color: 'var(--neutral-600)' }}
            aria-label="Fechar"
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

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </>
  );
}
