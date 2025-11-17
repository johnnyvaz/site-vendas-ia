/**
 * Focus Management Utilities for Vendas.IA
 * WCAG 2.1 AA compliant keyboard navigation and focus management
 * Optimized for Brazilian Portuguese screen readers and accessibility tools
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export interface FocusableElement extends HTMLElement {
  focus(options?: FocusOptions): void;
}

export interface FocusTrapOptions {
  initialFocus?: string | HTMLElement | null;
  finalFocus?: string | HTMLElement | null;
  escapeDeactivates?: boolean;
  clickOutsideDeactivates?: boolean;
  returnFocusOnDeactivate?: boolean;
  allowOutsideClick?: boolean;
}

export interface FocusManagementReturn {
  trapRef: React.RefObject<HTMLElement>;
  activate: () => void;
  deactivate: () => void;
  isActive: boolean;
}

/**
 * Hook for managing focus traps in modals, dropdowns, and other overlay components
 * Ensures keyboard users can navigate properly without losing focus context
 */
export function useFocusTrap(options: FocusTrapOptions = {}): FocusManagementReturn {
  const {
    initialFocus,
    finalFocus,
    escapeDeactivates = true,
    clickOutsideDeactivates = true,
    returnFocusOnDeactivate = true,
    allowOutsideClick = false
  } = options;

  const trapRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const previousActiveElement = useRef<Element | null>(null);
  const firstFocusableElement = useRef<FocusableElement | null>(null);
  const lastFocusableElement = useRef<FocusableElement | null>(null);

  // Get all focusable elements within the trap
  const getFocusableElements = useCallback((): FocusableElement[] => {
    if (!trapRef.current) return [];

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
      'audio[controls]',
      'video[controls]',
      'details > summary'
    ].join(', ');

    const elements = Array.from(
      trapRef.current.querySelectorAll<FocusableElement>(focusableSelectors)
    ).filter(element => {
      // Filter out elements that are not actually focusable
      const style = window.getComputedStyle(element);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        !element.hasAttribute('aria-hidden') &&
        element.tabIndex !== -1
      );
    });

    return elements;
  }, []);

  // Handle tab key navigation within the trap
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (!isActive || !trapRef.current) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    firstFocusableElement.current = focusableElements[0];
    lastFocusableElement.current = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab (backward)
      if (document.activeElement === firstFocusableElement.current) {
        event.preventDefault();
        lastFocusableElement.current?.focus();
      }
    } else {
      // Tab (forward)
      if (document.activeElement === lastFocusableElement.current) {
        event.preventDefault();
        firstFocusableElement.current?.focus();
      }
    }
  }, [isActive, getFocusableElements]);

  // Handle escape key to deactivate trap
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (isActive && escapeDeactivates && event.key === 'Escape') {
      event.preventDefault();
      deactivate();
    }
  }, [isActive, escapeDeactivates]);

  // Handle click outside to deactivate trap
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      isActive &&
      clickOutsideDeactivates &&
      trapRef.current &&
      !trapRef.current.contains(event.target as Node) &&
      !allowOutsideClick
    ) {
      deactivate();
    }
  }, [isActive, clickOutsideDeactivates, allowOutsideClick]);

  // Activate focus trap
  const activate = useCallback(() => {
    if (isActive) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement;

    setIsActive(true);

    // Focus initial element
    setTimeout(() => {
      if (!trapRef.current) return;

      let elementToFocus: FocusableElement | null = null;

      if (typeof initialFocus === 'string') {
        elementToFocus = trapRef.current.querySelector(initialFocus);
      } else if (initialFocus instanceof HTMLElement) {
        elementToFocus = initialFocus;
      } else {
        // Focus first focusable element by default
        const focusableElements = getFocusableElements();
        elementToFocus = focusableElements[0] || null;
      }

      if (elementToFocus) {
        elementToFocus.focus({ preventScroll: false });
      }
    }, 0);
  }, [isActive, initialFocus, getFocusableElements]);

  // Deactivate focus trap
  const deactivate = useCallback(() => {
    if (!isActive) return;

    setIsActive(false);

    // Return focus to previous element
    if (returnFocusOnDeactivate) {
      setTimeout(() => {
        let elementToFocus: Element | null = null;

        if (typeof finalFocus === 'string') {
          elementToFocus = document.querySelector(finalFocus);
        } else if (finalFocus instanceof HTMLElement) {
          elementToFocus = finalFocus;
        } else {
          elementToFocus = previousActiveElement.current;
        }

        if (elementToFocus && 'focus' in elementToFocus) {
          (elementToFocus as FocusableElement).focus();
        }
      }, 0);
    }
  }, [isActive, returnFocusOnDeactivate, finalFocus]);

  // Setup event listeners
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        handleTabKey(event);
      } else if (event.key === 'Escape') {
        handleEscapeKey(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, handleTabKey, handleEscapeKey, handleClickOutside]);

  return {
    trapRef,
    activate,
    deactivate,
    isActive
  };
}

/**
 * Hook for managing programmatic focus announcements for screen readers
 * Useful for dynamic content updates and form validation feedback
 */
export function useFocusAnnouncement() {
  const [announcement, setAnnouncement] = useState('');
  const announcementRef = useRef<HTMLDivElement>(null);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message);

    if (announcementRef.current) {
      announcementRef.current.setAttribute('aria-live', priority);
    }

    // Clear announcement after a short delay
    setTimeout(() => {
      setAnnouncement('');
    }, 1000);
  }, []);

  const AnnouncementRegion = useCallback(() => (
    <div
      ref={announcementRef}
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  ), [announcement]);

  return {
    announce,
    AnnouncementRegion
  };
}

/**
 * Hook for managing roving tabindex pattern (e.g., in toolbars, menus)
 * Allows arrow key navigation while maintaining single tab stop
 */
export function useRovingTabIndex<T extends HTMLElement = HTMLElement>(
  options: {
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
    autoFocus?: boolean;
  } = {}
) {
  const { orientation = 'horizontal', loop = true, autoFocus = false } = options;
  const containerRef = useRef<T>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getItems = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('[role="option"], [role="menuitem"], button, [tabindex]')
    ).filter(item => !item.hasAttribute('disabled') && item.tabIndex !== -1);
  }, []);

  const focusItem = useCallback((index: number) => {
    const items = getItems();
    if (items.length === 0) return;

    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    const item = items[clampedIndex];

    if (item) {
      // Update tabindex values
      items.forEach((element, i) => {
        element.tabIndex = i === clampedIndex ? 0 : -1;
      });

      item.focus();
      setCurrentIndex(clampedIndex);
    }
  }, [getItems]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const items = getItems();
    if (items.length === 0) return;

    let newIndex = currentIndex;
    let handled = false;

    switch (event.key) {
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          newIndex = currentIndex + 1;
          if (newIndex >= items.length) {
            newIndex = loop ? 0 : items.length - 1;
          }
          handled = true;
        }
        break;

      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          newIndex = currentIndex - 1;
          if (newIndex < 0) {
            newIndex = loop ? items.length - 1 : 0;
          }
          handled = true;
        }
        break;

      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          newIndex = currentIndex + 1;
          if (newIndex >= items.length) {
            newIndex = loop ? 0 : items.length - 1;
          }
          handled = true;
        }
        break;

      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          newIndex = currentIndex - 1;
          if (newIndex < 0) {
            newIndex = loop ? items.length - 1 : 0;
          }
          handled = true;
        }
        break;

      case 'Home':
        newIndex = 0;
        handled = true;
        break;

      case 'End':
        newIndex = items.length - 1;
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      focusItem(newIndex);
    }
  }, [currentIndex, orientation, loop, getItems, focusItem]);

  // Initialize tabindex on mount
  useEffect(() => {
    const items = getItems();
    if (items.length === 0) return;

    items.forEach((item, index) => {
      item.tabIndex = index === 0 ? 0 : -1;
    });

    if (autoFocus) {
      items[0]?.focus();
    }
  }, [getItems, autoFocus]);

  return {
    containerRef,
    currentIndex,
    focusItem,
    handleKeyDown
  };
}

/**
 * Hook for managing skip navigation and landmark focus
 * Helps screen reader users navigate to main content areas quickly
 */
export function useSkipNavigation() {
  const skipToContent = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      // Make target focusable if it isn't already
      const originalTabIndex = target.tabIndex;
      if (originalTabIndex === -1) {
        target.tabIndex = -1;
      }

      target.focus();

      // Restore original tabIndex after focusing
      setTimeout(() => {
        if (originalTabIndex === -1) {
          target.removeAttribute('tabindex');
        }
      }, 100);

      // Announce navigation to screen readers
      const announcement = `Navegou para: ${target.getAttribute('aria-label') || target.textContent || 'conteúdo principal'}`;

      // Create temporary announcement
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'assertive');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;

      document.body.appendChild(announcer);

      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 1000);
    }
  }, []);

  return { skipToContent };
}

/**
 * Hook for detecting and managing focus within a component
 * Useful for dropdown menus, tooltips, and other floating elements
 */
export function useFocusWithin<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [isFocusWithin, setIsFocusWithin] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleFocusIn = (event: FocusEvent) => {
      if (element.contains(event.target as Node)) {
        setIsFocusWithin(true);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (!element.contains(event.relatedTarget as Node)) {
        setIsFocusWithin(false);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return {
    ref,
    isFocusWithin
  };
}

export default {
  useFocusTrap,
  useFocusAnnouncement,
  useRovingTabIndex,
  useSkipNavigation,
  useFocusWithin
};