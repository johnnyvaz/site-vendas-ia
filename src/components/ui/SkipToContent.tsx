/**
 * SkipToContent - WCAG 2.1 AA Skip Navigation Component
 * Provides keyboard users quick access to main content areas
 * Portuguese language support for Brazilian accessibility standards
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { useSkipNavigation } from '@/hooks/useFocusManagement';

export interface SkipLink {
  id: string;
  label: string;
  description?: string;
  href: string;
}

export interface SkipToContentProps {
  links?: SkipLink[];
  className?: string;
  showOnFocus?: boolean;
  position?: 'top-left' | 'top-center' | 'top-right';
}

// Default skip navigation links for Vendas.IA
const defaultSkipLinks: SkipLink[] = [
  {
    id: 'skip-to-main',
    label: 'Ir para o conteúdo principal',
    description: 'Pular navegação e ir diretamente para o conteúdo principal da página',
    href: '#main-content'
  },
  {
    id: 'skip-to-nav',
    label: 'Ir para a navegação',
    description: 'Pular para o menu de navegação principal',
    href: '#main-navigation'
  },
  {
    id: 'skip-to-footer',
    label: 'Ir para o rodapé',
    description: 'Pular para o rodapé com informações de contato',
    href: '#footer'
  },
  {
    id: 'skip-to-search',
    label: 'Ir para a busca',
    description: 'Pular para o campo de pesquisa',
    href: '#search'
  },
  {
    id: 'skip-to-contact',
    label: 'Ir para contato',
    description: 'Pular para o formulário de contato',
    href: '#contact-form'
  }
];

const SkipToContent: React.FC<SkipToContentProps> = ({
  links = defaultSkipLinks,
  className,
  showOnFocus = true,
  position = 'top-left'
}) => {
  const { skipToContent } = useSkipNavigation();

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // Remove # from href if present
    const cleanTargetId = targetId.replace('#', '');
    skipToContent(cleanTargetId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, targetId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const cleanTargetId = targetId.replace('#', '');
      skipToContent(cleanTargetId);
    }
  };

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4'
  };

  const baseClasses = cn(
    'fixed z-[9999] flex flex-col gap-1',
    positionClasses[position],
    showOnFocus && 'opacity-0 pointer-events-none',
    showOnFocus && 'focus-within:opacity-100 focus-within:pointer-events-auto',
    'transition-opacity duration-200 ease-in-out'
  );

  return (
    <nav
      className={cn(baseClasses, className)}
      aria-label="Links de navegação rápida"
      role="navigation"
    >
      <div className="bg-primary text-primary-foreground rounded-md shadow-lg border border-border">
        <div className="p-3">
          <h2 className="text-sm font-semibold mb-2">
            Navegação Rápida
          </h2>
          <p className="text-xs opacity-90 mb-3">
            Use os links abaixo para navegar rapidamente pela página
          </p>

          <ul className="space-y-1" role="list">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleSkipClick(e, link.href)}
                  onKeyDown={(e) => handleKeyDown(e, link.href)}
                  className={cn(
                    'block px-3 py-2 text-sm rounded-md',
                    'bg-primary-foreground/10 hover:bg-primary-foreground/20',
                    'focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary',
                    'transition-colors duration-150',
                    'text-primary-foreground hover:text-primary-foreground',
                    'underline-offset-2 hover:underline',
                    // Ensure adequate touch target size
                    'min-h-[44px] flex items-center'
                  )}
                  aria-describedby={link.description ? `${link.id}-desc` : undefined}
                >
                  <span className="flex-1">{link.label}</span>
                  <span
                    className="text-xs opacity-75 ml-2"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </a>

                {link.description && (
                  <div
                    id={`${link.id}-desc`}
                    className="sr-only"
                  >
                    {link.description}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-3 pt-2 border-t border-primary-foreground/20">
            <p className="text-xs opacity-75">
              Pressione Tab para navegar entre os links
            </p>
          </div>
        </div>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Menu de navegação rápida disponível. Pressione Tab para acessar os links de pular conteúdo.
      </div>
    </nav>
  );
};

/**
 * Individual Skip Link Component
 * For use when you need a single skip link
 */
export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showOnFocus?: boolean;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  children,
  className,
  showOnFocus = true
}) => {
  const { skipToContent } = useSkipNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    skipToContent(targetId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const targetId = href.replace('#', '');
      skipToContent(targetId);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'fixed top-4 left-4 z-[9999]',
        'bg-primary text-primary-foreground',
        'px-4 py-2 rounded-md shadow-lg',
        'font-medium text-sm',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'transition-all duration-200',
        // Minimum touch target size
        'min-h-[44px] flex items-center',
        showOnFocus && 'opacity-0 pointer-events-none -translate-y-2',
        showOnFocus && 'focus:opacity-100 focus:pointer-events-auto focus:translate-y-0',
        className
      )}
    >
      {children}
    </a>
  );
};

/**
 * Hook for managing skip navigation targets
 * Ensures target elements are properly configured for accessibility
 */
export const useSkipTarget = (id: string, label?: string) => {
  React.useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      // Ensure element can receive focus
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }

      // Add aria-label if provided and not already present
      if (label && !element.hasAttribute('aria-label')) {
        element.setAttribute('aria-label', label);
      }

      // Add role if it's a generic div/section
      if (!element.hasAttribute('role') && ['DIV', 'SECTION'].includes(element.tagName)) {
        element.setAttribute('role', 'main');
      }
    }
  }, [id, label]);

  return { targetId: id };
};

/**
 * Layout wrapper component that sets up proper skip navigation targets
 */
export interface SkipNavigationLayoutProps {
  children: React.ReactNode;
  showSkipLinks?: boolean;
  customSkipLinks?: SkipLink[];
}

export const SkipNavigationLayout: React.FC<SkipNavigationLayoutProps> = ({
  children,
  showSkipLinks = true,
  customSkipLinks
}) => {
  // Setup default skip targets
  useSkipTarget('main-content', 'Conteúdo principal da página');
  useSkipTarget('main-navigation', 'Menu de navegação principal');
  useSkipTarget('footer', 'Rodapé da página');

  return (
    <>
      {showSkipLinks && (
        <SkipToContent
          links={customSkipLinks}
          showOnFocus={true}
          position="top-left"
        />
      )}
      {children}
    </>
  );
};

export default SkipToContent;