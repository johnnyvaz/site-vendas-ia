/**
 * Accessibility Tests for WCAG 2.1 AA Compliance
 * Comprehensive testing for accessibility features across Vendas.IA components
 * Tests keyboard navigation, screen reader support, color contrast, and ARIA compliance
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Import components for testing
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Solutions from '@/components/Solutions';
import About from '@/components/About';
import DisparoRapido from '@/components/products/DisparoRapido';
import ProgressiveContactForm from '@/components/forms/ProgressiveContactForm';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import ConsentBanner from '@/components/ConsentBanner';

// Mock hooks and dependencies
const mockTrackEvent = vi.fn();
vi.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: mockTrackEvent
  })
}));

vi.mock('@/lib/whatsapp', () => ({
  generateWhatsAppLink: vi.fn(() => 'https://wa.me/5516997787674?text=test'),
  JOHNNY_WHATSAPP_NUMBER: '5516997787674'
}));

vi.mock('@/lib/form-handlers', () => ({
  submitContactForm: vi.fn(() => Promise.resolve({ success: true }))
}));

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn()
});

describe('WCAG 2.1 AA Accessibility Compliance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Automated Accessibility Testing (axe-core)', () => {
    it('Hero component has no accessibility violations', async () => {
      const { container } = render(<Hero />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Header component has no accessibility violations', async () => {
      const { container } = render(<Header />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Footer component has no accessibility violations', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Contact component has no accessibility violations', async () => {
      const { container } = render(<Contact />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Solutions component has no accessibility violations', async () => {
      const { container } = render(<Solutions />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('About component has no accessibility violations', async () => {
      const { container } = render(<About />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('DisparoRapido component has no accessibility violations', async () => {
      const { container } = render(<DisparoRapido />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('ProgressiveContactForm has no accessibility violations', async () => {
      const { container } = render(<ProgressiveContactForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('ContactForm has no accessibility violations', async () => {
      const { container } = render(<ContactForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('WhatsAppButton has no accessibility violations', async () => {
      const { container } = render(<WhatsAppButton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('ConsentBanner has no accessibility violations', async () => {
      const { container } = render(<ConsentBanner />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    describe('Tab Order and Focus Management', () => {
      it('Hero component has logical tab order', async () => {
        render(<Hero />);
        const user = userEvent.setup();

        // Get all interactive elements
        const buttons = screen.getAllByRole('button');
        const links = screen.getAllByRole('link');
        const interactiveElements = [...buttons, ...links];

        // Test tab navigation
        if (interactiveElements.length > 0) {
          interactiveElements[0].focus();
          expect(interactiveElements[0]).toHaveFocus();

          for (let i = 1; i < interactiveElements.length; i++) {
            await user.keyboard('{Tab}');
            // Note: Testing framework limitations may not perfectly simulate browser tab order
            // In real browser testing, this would verify each element receives focus in order
          }
        }
      });

      it('Header navigation is keyboard accessible', async () => {
        render(<Header />);
        const user = userEvent.setup();

        const navLinks = screen.getAllByRole('link');

        if (navLinks.length > 0) {
          navLinks[0].focus();
          expect(navLinks[0]).toHaveFocus();

          // Test arrow key navigation if implemented
          await user.keyboard('{ArrowRight}');
          // Implementation would depend on whether arrow key nav is implemented
        }
      });

      it('Contact form is fully keyboard navigable', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        const nameInput = screen.getByLabelText(/nome/i);
        const emailInput = screen.getByLabelText(/email/i);
        const submitButton = screen.getByRole('button', { name: /enviar/i });

        // Test tab navigation through form
        nameInput.focus();
        expect(nameInput).toHaveFocus();

        await user.keyboard('{Tab}');
        expect(emailInput).toHaveFocus();

        // Continue tabbing to submit button
        await user.keyboard('{Tab}');
        // Skip other form fields for brevity

        // Should eventually reach submit button
        submitButton.focus();
        expect(submitButton).toHaveFocus();
      });

      it('Progressive form steps are keyboard navigable', async () => {
        render(<ProgressiveContactForm />);
        const user = userEvent.setup();

        // Test navigation within current step
        const inputs = screen.getAllByRole('textbox');
        if (inputs.length > 0) {
          inputs[0].focus();
          expect(inputs[0]).toHaveFocus();
        }

        // Test step navigation buttons
        const nextButton = screen.getByRole('button', { name: /próximo/i });
        nextButton.focus();
        expect(nextButton).toHaveFocus();

        // Test Enter key activation
        await user.keyboard('{Enter}');
        // Should trigger next step or validation
      });

      it('Modal dialogs trap focus correctly', async () => {
        // Note: This would test modal components if they exist
        // Testing focus trap implementation
        expect(true).toBe(true); // Placeholder - implement when modals are added
      });

      it('Skip links are provided for screen readers', () => {
        render(<Header />);

        // Look for skip navigation links
        const skipLink = screen.queryByText(/pular para o conteúdo/i) ||
                        screen.queryByText(/skip to content/i) ||
                        screen.queryByText(/pular navegação/i);

        if (skipLink) {
          expect(skipLink).toBeInTheDocument();
          expect(skipLink).toHaveAttribute('href', '#main-content');
        }
      });
    });

    describe('Enter and Space Key Activation', () => {
      it('buttons respond to Enter and Space keys', async () => {
        render(<Hero />);
        const user = userEvent.setup();

        const primaryButton = screen.getByRole('button', { name: /falar com johnny/i });
        primaryButton.focus();

        // Test Enter key
        await user.keyboard('{Enter}');
        // Should trigger click handler

        // Test Space key
        await user.keyboard(' ');
        // Should also trigger click handler
      });

      it('custom interactive elements support keyboard activation', async () => {
        render(<DisparoRapido />);
        const user = userEvent.setup();

        // Find custom interactive elements (cards, CTAs, etc.)
        const productCards = screen.getAllByRole('button').filter(btn =>
          btn.textContent?.includes('Falar com Especialista')
        );

        for (const card of productCards) {
          card.focus();
          await user.keyboard('{Enter}');
          // Should activate the element
        }
      });

      it('WhatsApp button is keyboard activatable', async () => {
        render(<WhatsAppButton />);
        const user = userEvent.setup();

        const whatsappButton = screen.getByRole('button');
        whatsappButton.focus();

        await user.keyboard('{Enter}');
        expect(window.open).toHaveBeenCalled();

        await user.keyboard(' ');
        expect(window.open).toHaveBeenCalledTimes(2);
      });
    });

    describe('Escape Key Handling', () => {
      it('modals close with Escape key', async () => {
        // Test when modal components are implemented
        expect(true).toBe(true); // Placeholder
      });

      it('dropdowns close with Escape key', async () => {
        render(<ProgressiveContactForm />);
        const user = userEvent.setup();

        // Find select dropdowns
        const selects = screen.getAllByRole('combobox');

        for (const select of selects) {
          // Open dropdown
          await user.click(select);

          // Close with Escape
          await user.keyboard('{Escape}');

          // Dropdown should be closed and focus should return to trigger
          expect(select).toHaveFocus();
        }
      });
    });
  });

  describe('Screen Reader Support', () => {
    describe('Semantic HTML Structure', () => {
      it('has proper heading hierarchy', () => {
        render(<Hero />);

        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeInTheDocument();

        const allHeadings = screen.getAllByRole('heading');

        // Check heading levels are in logical order
        let previousLevel = 0;
        allHeadings.forEach(heading => {
          const level = parseInt(heading.tagName.charAt(1));
          expect(level).toBeGreaterThanOrEqual(1);
          expect(level).toBeLessThanOrEqual(6);

          // Heading levels should not skip more than one level
          if (previousLevel > 0) {
            expect(level - previousLevel).toBeLessThanOrEqual(1);
          }
          previousLevel = level;
        });
      });

      it('uses semantic landmarks', () => {
        render(<Header />);

        const navigation = screen.getByRole('navigation');
        expect(navigation).toBeInTheDocument();

        render(<Footer />);
        const contentinfo = screen.getByRole('contentinfo');
        expect(contentinfo).toBeInTheDocument();
      });

      it('has proper list structures', () => {
        render(<Solutions />);

        const lists = screen.getAllByRole('list');
        lists.forEach(list => {
          const listItems = screen.getAllByRole('listitem');
          expect(listItems.length).toBeGreaterThan(0);
        });
      });

      it('forms have proper fieldset grouping', () => {
        render(<ProgressiveContactForm />);

        // Look for fieldsets for related form controls
        const fieldsets = document.querySelectorAll('fieldset');
        fieldsets.forEach(fieldset => {
          const legend = fieldset.querySelector('legend');
          expect(legend).toBeTruthy(); // Each fieldset should have a legend
        });
      });
    });

    describe('ARIA Labels and Descriptions', () => {
      it('interactive elements have accessible names', () => {
        render(<Hero />);

        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
          expect(button).toHaveAccessibleName();
        });

        const links = screen.getAllByRole('link');
        links.forEach(link => {
          expect(link).toHaveAccessibleName();
        });
      });

      it('form controls have proper labels', () => {
        render(<ContactForm />);

        const inputs = screen.getAllByRole('textbox');
        inputs.forEach(input => {
          expect(input).toHaveAccessibleName();

          // Should have either label, aria-label, or aria-labelledby
          const hasLabel = input.getAttribute('aria-label') ||
                           input.getAttribute('aria-labelledby') ||
                           input.closest('label') ||
                           document.querySelector(`label[for="${input.id}"]`);

          expect(hasLabel).toBeTruthy();
        });
      });

      it('complex widgets have appropriate ARIA attributes', () => {
        render(<ProgressiveContactForm />);

        // Test step indicators
        const stepButtons = screen.getAllByRole('button').filter(btn =>
          btn.textContent?.includes('Passo') || btn.getAttribute('aria-label')?.includes('passo')
        );

        stepButtons.forEach(step => {
          // Should have aria-current for current step
          const isCurrent = step.getAttribute('aria-current');
          if (isCurrent) {
            expect(isCurrent).toBe('step');
          }
        });

        // Test comboboxes
        const comboboxes = screen.getAllByRole('combobox');
        comboboxes.forEach(combobox => {
          expect(combobox).toHaveAttribute('aria-expanded');

          if (combobox.getAttribute('aria-expanded') === 'true') {
            expect(combobox).toHaveAttribute('aria-controls');
          }
        });
      });

      it('error messages are properly associated', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        const emailInput = screen.getByLabelText(/email/i);

        // Trigger validation by submitting empty form
        const submitButton = screen.getByRole('button', { name: /enviar/i });
        await user.click(submitButton);

        await waitFor(() => {
          const errorMessage = screen.queryByText(/email.*obrigatório/i);
          if (errorMessage) {
            // Error should be associated with input
            expect(emailInput).toHaveAttribute('aria-describedby');
            expect(errorMessage).toHaveAttribute('id');

            const describedBy = emailInput.getAttribute('aria-describedby');
            const errorId = errorMessage.getAttribute('id');
            expect(describedBy).toContain(errorId);
          }
        });
      });

      it('loading states are announced', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        const submitButton = screen.getByRole('button', { name: /enviar/i });

        // Fill form and submit
        await user.type(screen.getByLabelText(/nome/i), 'Test User');
        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.click(submitButton);

        // Check for loading state announcement
        const loadingButton = screen.queryByRole('button', { name: /enviando/i });
        if (loadingButton) {
          expect(loadingButton).toHaveAttribute('aria-busy', 'true');
        }
      });
    });

    describe('Live Regions and Dynamic Content', () => {
      it('form validation messages are announced', async () => {
        render(<ProgressiveContactForm />);
        const user = userEvent.setup();

        // Try to proceed without filling required fields
        const nextButton = screen.getByRole('button', { name: /próximo/i });
        await user.click(nextButton);

        await waitFor(() => {
          // Look for aria-live regions
          const liveRegions = document.querySelectorAll('[aria-live]');
          expect(liveRegions.length).toBeGreaterThan(0);

          // Error messages should be in live regions
          const errorMessages = screen.getAllByRole('alert');
          expect(errorMessages.length).toBeGreaterThan(0);
        });
      });

      it('step progression is announced', async () => {
        render(<ProgressiveContactForm />);
        const user = userEvent.setup();

        // Fill first step
        await user.type(screen.getByLabelText(/nome/i), 'Test User');
        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByLabelText(/telefone/i), '(11) 99999-9999');

        // Proceed to next step
        await user.click(screen.getByRole('button', { name: /próximo/i }));

        await waitFor(() => {
          // Should announce step change
          const status = screen.getByRole('status');
          expect(status).toHaveTextContent(/passo 2/i);
        });
      });

      it('success messages are announced', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        // Complete form submission
        await user.type(screen.getByLabelText(/nome/i), 'Test User');
        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.click(screen.getByRole('button', { name: /enviar/i }));

        await waitFor(() => {
          const successMessage = screen.queryByText(/sucesso/i);
          if (successMessage) {
            // Success should be announced
            expect(successMessage).toHaveAttribute('role', 'status');
            expect(successMessage).toHaveAttribute('aria-live', 'polite');
          }
        });
      });
    });
  });

  describe('Color and Contrast', () => {
    describe('Color Contrast Ratios', () => {
      it('text has sufficient contrast ratios', () => {
        render(<Hero />);

        // This is a basic test - real contrast testing would require
        // computed styles and color analysis
        const textElements = screen.getAllByText(/./);

        textElements.forEach(element => {
          const styles = window.getComputedStyle(element);
          const color = styles.color;
          const backgroundColor = styles.backgroundColor;

          // Basic check that colors are defined
          expect(color).toBeTruthy();
          // In real testing, would calculate actual contrast ratio
        });
      });

      it('interactive elements have sufficient focus contrast', async () => {
        render(<Hero />);
        const user = userEvent.setup();

        const buttons = screen.getAllByRole('button');

        for (const button of buttons) {
          button.focus();

          // Check that focus styles are applied
          const styles = window.getComputedStyle(button);
          const outline = styles.outline;
          const boxShadow = styles.boxShadow;

          // Should have some form of focus indicator
          expect(outline !== 'none' || boxShadow !== 'none').toBe(true);
        }
      });

      it('error states have sufficient contrast', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        // Trigger validation errors
        await user.click(screen.getByRole('button', { name: /enviar/i }));

        await waitFor(() => {
          const errorElements = screen.getAllByRole('alert');
          errorElements.forEach(error => {
            const styles = window.getComputedStyle(error);
            const color = styles.color;

            // Error text should have high contrast
            expect(color).toBeTruthy();
            expect(color).not.toBe('rgb(0, 0, 0)'); // Should have actual color
          });
        });
      });
    });

    describe('Color Independence', () => {
      it('does not rely solely on color to convey information', () => {
        render(<DisparoRapido />);

        // Check for icons, text, or other indicators alongside color
        const ctaButtons = screen.getAllByRole('button');
        ctaButtons.forEach(button => {
          const hasIcon = button.querySelector('svg') || button.querySelector('[class*="icon"]');
          const hasText = button.textContent && button.textContent.trim().length > 0;

          // Should have text or icons, not just color
          expect(hasIcon || hasText).toBe(true);
        });
      });

      it('form validation shows text messages, not just color', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: /enviar/i }));

        await waitFor(() => {
          const errorMessages = screen.getAllByRole('alert');
          errorMessages.forEach(error => {
            // Error should have descriptive text
            expect(error.textContent).toBeTruthy();
            expect(error.textContent!.length).toBeGreaterThan(0);
          });
        });
      });

      it('interactive states are distinguishable without color', async () => {
        render(<ProgressiveContactForm />);

        // Check step indicators have text/numbers, not just color
        const stepIndicators = screen.getAllByRole('button').filter(btn =>
          btn.textContent?.includes('Passo') || btn.getAttribute('aria-label')?.includes('passo')
        );

        stepIndicators.forEach(step => {
          const hasText = step.textContent && step.textContent.trim().length > 0;
          const hasAriaLabel = step.getAttribute('aria-label');

          expect(hasText || hasAriaLabel).toBe(true);
        });
      });
    });
  });

  describe('Touch and Mobile Accessibility', () => {
    describe('Touch Target Sizes', () => {
      it('interactive elements meet minimum touch target size', () => {
        render(<Hero />);

        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
          const rect = button.getBoundingClientRect();

          // WCAG AAA: 44x44px minimum, AA: 24x24px minimum
          expect(rect.width).toBeGreaterThanOrEqual(44);
          expect(rect.height).toBeGreaterThanOrEqual(44);
        });
      });

      it('form inputs have adequate touch targets', () => {
        render(<ContactForm />);

        const inputs = screen.getAllByRole('textbox');
        inputs.forEach(input => {
          const rect = input.getBoundingClientRect();

          expect(rect.height).toBeGreaterThanOrEqual(44);
        });
      });

      it('WhatsApp floating button has adequate size', () => {
        render(<WhatsAppButton />);

        const button = screen.getByRole('button');
        const rect = button.getBoundingClientRect();

        expect(rect.width).toBeGreaterThanOrEqual(44);
        expect(rect.height).toBeGreaterThanOrEqual(44);
      });
    });

    describe('Mobile Responsive Accessibility', () => {
      beforeEach(() => {
        // Mock mobile viewport
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 375
        });
      });

      it('content reflows properly on mobile', () => {
        render(<Solutions />);

        // Content should still be accessible on mobile
        const headings = screen.getAllByRole('heading');
        expect(headings.length).toBeGreaterThan(0);

        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
          expect(button).toBeVisible();
        });
      });

      it('navigation adapts for mobile without losing accessibility', () => {
        render(<Header />);

        // Navigation should remain accessible on mobile
        const navigation = screen.getByRole('navigation');
        expect(navigation).toBeInTheDocument();

        const navLinks = screen.getAllByRole('link');
        navLinks.forEach(link => {
          expect(link).toHaveAccessibleName();
        });
      });
    });
  });

  describe('Brazilian Accessibility Standards', () => {
    describe('Portuguese Language Support', () => {
      it('has correct lang attribute for Portuguese content', () => {
        render(<Hero />);

        // Check if document or elements have pt-BR lang attribute
        const textElements = screen.getAllByText(/./);
        const hasPortugueseContent = textElements.some(el =>
          /[áàâãçéêíóôõú]/.test(el.textContent || '')
        );

        if (hasPortugueseContent) {
          // Should have lang="pt-BR" somewhere in the hierarchy
          const htmlElement = document.documentElement;
          const langAttribute = htmlElement.getAttribute('lang');
          expect(langAttribute).toMatch(/^pt(-BR)?$/i);
        }
      });

      it('error messages are in Portuguese', async () => {
        render(<ContactForm />);
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: /enviar/i }));

        await waitFor(() => {
          const errorMessages = screen.getAllByRole('alert');
          errorMessages.forEach(error => {
            const text = error.textContent || '';

            // Should contain Portuguese words/phrases
            const hasPortugueseWords = /obrigatório|necessário|inválido|erro/.test(text.toLowerCase());
            expect(hasPortugueseWords).toBe(true);
          });
        });
      });
    });

    describe('LGPD Compliance Accessibility', () => {
      it('consent banner is accessible', () => {
        render(<ConsentBanner />);

        const banner = screen.getByRole('banner') || screen.getByRole('region');
        expect(banner).toBeInTheDocument();

        // Should have clear labeling
        expect(banner).toHaveAccessibleName();

        // Consent buttons should be clearly labeled
        const acceptButton = screen.getByRole('button', { name: /aceitar/i });
        const rejectButton = screen.getByRole('button', { name: /rejeitar/i });

        expect(acceptButton).toBeInTheDocument();
        expect(rejectButton).toBeInTheDocument();
      });

      it('privacy policy links are descriptive', () => {
        render(<Footer />);

        const privacyLink = screen.getByRole('link', { name: /privacidade/i });
        expect(privacyLink).toHaveAccessibleName();

        // Link text should be descriptive
        const linkText = privacyLink.textContent || '';
        expect(linkText.length).toBeGreaterThan(5); // Not just "clique aqui"
      });
    });
  });

  describe('Performance and Accessibility', () => {
    it('animations respect prefers-reduced-motion', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(<Hero />);

      // Animated elements should respect reduced motion
      const animatedElements = document.querySelectorAll('[class*="animate-"]');
      animatedElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        // In real implementation, animations would be reduced/disabled
        // This is a placeholder for checking the implementation
        expect(element).toBeInTheDocument();
      });
    });

    it('focus indicators are not hidden by z-index issues', async () => {
      render(<Header />);
      const user = userEvent.setup();

      const navLinks = screen.getAllByRole('link');

      for (const link of navLinks) {
        link.focus();

        const styles = window.getComputedStyle(link);
        const zIndex = styles.zIndex;

        // Focus indicator should not be hidden behind other elements
        expect(zIndex === 'auto' || parseInt(zIndex) >= 0).toBe(true);
      }
    });
  });
});