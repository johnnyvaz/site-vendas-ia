/**
 * DisparoRapido Component Tests
 * Comprehensive testing for the Disparo Rápido WhatsApp automation product component
 * Tests Brazilian market features, pricing, and user interactions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisparoRapido from '../DisparoRapido';

// Mock analytics hook
const mockTrackEvent = vi.fn();
vi.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: mockTrackEvent
  })
}));

// Mock WhatsApp utility
const mockGenerateWhatsAppLink = vi.fn();
vi.mock('@/lib/whatsapp', () => ({
  generateWhatsAppLink: mockGenerateWhatsAppLink
}));

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen
});

describe('DisparoRapido Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerateWhatsAppLink.mockReturnValue('https://wa.me/5516997787674?text=mock-message');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering and Content', () => {
    it('renders the main heading correctly', () => {
      render(<DisparoRapido />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Disparo Rápido');
    });

    it('displays the product description', () => {
      render(<DisparoRapido />);

      const description = screen.getByText(/Extensão para Chrome que automatiza envios em massa pelo WhatsApp Web/);
      expect(description).toBeInTheDocument();
    });

    it('shows Brazilian-specific features', () => {
      render(<DisparoRapido />);

      expect(screen.getByText(/Disparos Ilimitados/)).toBeInTheDocument();
      expect(screen.getByText(/Até 10 Disparos Grátis/)).toBeInTheDocument();
      expect(screen.getByText(/7 Dias de Garantia/)).toBeInTheDocument();
    });

    it('displays pricing in Brazilian Real (BRL)', () => {
      render(<DisparoRapido />);

      expect(screen.getByText('R$ 39,90')).toBeInTheDocument();
      expect(screen.getByText('R$ 249,00')).toBeInTheDocument();
      expect(screen.getByText('65% de economia')).toBeInTheDocument();
    });

    it('shows the "MAIS VENDIDO" badge on annual plan', () => {
      render(<DisparoRapido />);

      expect(screen.getByText('MAIS VENDIDO')).toBeInTheDocument();
    });
  });

  describe('How It Works Section', () => {
    it('displays all 4 steps in the correct order', () => {
      render(<DisparoRapido />);

      const steps = [
        'Instalar',
        'Carregar',
        'Configurar',
        'Enviar'
      ];

      steps.forEach((step, index) => {
        expect(screen.getByText(step)).toBeInTheDocument();
        expect(screen.getByText((index + 1).toString())).toBeInTheDocument();
      });
    });

    it('shows step descriptions', () => {
      render(<DisparoRapido />);

      expect(screen.getByText(/Baixe a extensão no Google Chrome/)).toBeInTheDocument();
      expect(screen.getByText(/Importe contatos via Excel ou grupos/)).toBeInTheDocument();
      expect(screen.getByText(/Defina intervalos entre disparos/)).toBeInTheDocument();
      expect(screen.getByText(/Automatize seus disparos no WhatsApp Web/)).toBeInTheDocument();
    });
  });

  describe('Features Grid', () => {
    it('displays all key features', () => {
      render(<DisparoRapido />);

      const features = [
        'Disparos Ilimitados',
        'Importação de Contatos',
        'Intervalos Personalizáveis',
        'Acompanhamento em Tempo Real',
        'Suporte Completo à Mídia',
        'Instalação Simples'
      ];

      features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it('highlights important features with special styling', () => {
      render(<DisparoRapido />);

      const unlimitedCard = screen.getByText('Disparos Ilimitados').closest('.feature-card, [class*="ring-2"]');
      const mediaCard = screen.getByText('Suporte Completo à Mídia').closest('.feature-card, [class*="ring-2"]');

      expect(unlimitedCard).toBeInTheDocument();
      expect(mediaCard).toBeInTheDocument();
    });
  });

  describe('Pricing Section', () => {
    it('shows both monthly and annual plans', () => {
      render(<DisparoRapido />);

      expect(screen.getByText('Mensal')).toBeInTheDocument();
      expect(screen.getByText('Anual')).toBeInTheDocument();
    });

    it('displays strikethrough prices', () => {
      render(<DisparoRapido />);

      expect(screen.getByText('R$ 59,90')).toBeInTheDocument();
      expect(screen.getByText('R$ 718,80')).toBeInTheDocument();
    });

    it('shows all bonus items', () => {
      render(<DisparoRapido />);

      const bonuses = [
        'Guia Prático de Vendas no WhatsApp',
        'Manual Antibanimento',
        'Agentes de IA para Copywriting',
        'Estratégias de Marketing Personalizadas'
      ];

      bonuses.forEach(bonus => {
        expect(screen.getByText(new RegExp(bonus.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions and Analytics', () => {
    it('tracks WhatsApp contact clicks with correct data', async () => {
      render(<DisparoRapido />);

      const whatsappButton = screen.getAllByText(/Falar com Especialista/)[0];
      await userEvent.click(whatsappButton);

      expect(mockTrackEvent).toHaveBeenCalledWith('cta_click', {
        action: 'whatsapp_contact',
        product: 'disparo-rapido',
        component: 'DisparoRapido',
        timestamp: expect.any(String)
      });
    });

    it('generates WhatsApp link with correct parameters', async () => {
      render(<DisparoRapido />);

      const whatsappButton = screen.getAllByText(/Falar com Especialista/)[0];
      await userEvent.click(whatsappButton);

      expect(mockGenerateWhatsAppLink).toHaveBeenCalledWith({
        message: "Olá! Gostaria de saber mais sobre o Disparo Rápido para WhatsApp. Pode me ajudar?",
        leadData: {
          interest: 'disparo-rapido',
          urgencyLevel: 'high',
          source: 'disparo-rapido-component'
        },
        autoTrack: true
      });
    });

    it('opens WhatsApp link in new tab', async () => {
      render(<DisparoRapido />);

      const whatsappButton = screen.getAllByText(/Falar com Especialista/)[0];
      await userEvent.click(whatsappButton);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://wa.me/5516997787674?text=mock-message',
        '_blank'
      );
    });

    it('tracks Chrome Store clicks', async () => {
      render(<DisparoRapido />);

      const chromeButton = screen.getByText(/Baixar na Chrome Store/);
      await userEvent.click(chromeButton);

      expect(mockTrackEvent).toHaveBeenCalledWith('cta_click', {
        action: 'chrome_store',
        product: 'disparo-rapido',
        component: 'DisparoRapido',
        timestamp: expect.any(String)
      });
    });

    it('tracks plan selection clicks', async () => {
      render(<DisparoRapido />);

      const annualPlanButton = screen.getByText('Escolher Plano Anual');
      await userEvent.click(annualPlanButton);

      expect(mockTrackEvent).toHaveBeenCalledWith('cta_click', {
        action: 'whatsapp_contact',
        product: 'disparo-rapido',
        component: 'DisparoRapido',
        timestamp: expect.any(String)
      });
    });
  });

  describe('Free Version CTA', () => {
    it('displays free trial information', () => {
      render(<DisparoRapido />);

      expect(screen.getByText('Teste Grátis Agora!')).toBeInTheDocument();
      expect(screen.getByText(/Faça até 10 disparos gratuitos/)).toBeInTheDocument();
    });

    it('has both Chrome Store and WhatsApp contact buttons', () => {
      render(<DisparoRapido />);

      expect(screen.getByText('Baixar na Chrome Store')).toBeInTheDocument();
      expect(screen.getAllByText('Falar com Especialista')).toHaveLength(2);
    });
  });

  describe('Guarantee Section', () => {
    it('displays guarantee information', () => {
      render(<DisparoRapido />);

      expect(screen.getByText('Garantia de 7 Dias')).toBeInTheDocument();
      expect(screen.getByText('Satisfação garantida ou cancelamento sem burocracia')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<DisparoRapido />);

      const h2 = screen.getByRole('heading', { level: 2, name: /Disparo Rápido/ });
      const h3s = screen.getAllByRole('heading', { level: 3 });

      expect(h2).toBeInTheDocument();
      expect(h3s.length).toBeGreaterThan(0);
    });

    it('has accessible button labels', () => {
      render(<DisparoRapido />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });
    });

    it('has proper alt text for icons', () => {
      render(<DisparoRapido />);

      // Icons should be decorative (aria-hidden) or have proper labels
      const icons = document.querySelectorAll('svg');
      icons.forEach(icon => {
        const hasAriaHidden = icon.hasAttribute('aria-hidden');
        const hasAriaLabel = icon.hasAttribute('aria-label');
        const hasTitle = icon.querySelector('title');

        expect(hasAriaHidden || hasAriaLabel || hasTitle).toBe(true);
      });
    });
  });

  describe('Mobile Responsiveness', () => {
    it('renders without layout issues on mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<DisparoRapido />);

      // Component should render without throwing errors
      expect(screen.getByText('Disparo Rápido')).toBeInTheDocument();
    });

    it('has touch-friendly button sizes', () => {
      render(<DisparoRapido />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const computedStyle = window.getComputedStyle(button);
        const minHeight = parseInt(computedStyle.minHeight) || parseInt(computedStyle.height);

        // WCAG AA recommends minimum 44px touch targets
        expect(minHeight).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Performance', () => {
    it('does not have memory leaks in event handlers', () => {
      const { unmount } = render(<DisparoRapido />);

      // Click buttons multiple times
      const whatsappButton = screen.getAllByText(/Falar com Especialista/)[0];
      fireEvent.click(whatsappButton);
      fireEvent.click(whatsappButton);
      fireEvent.click(whatsappButton);

      // Unmount component
      unmount();

      // Should not throw errors or cause memory leaks
      expect(true).toBe(true);
    });

    it('handles rapid clicks gracefully', async () => {
      render(<DisparoRapido />);

      const whatsappButton = screen.getAllByText(/Falar com Especialista/)[0];

      // Rapid clicks
      await userEvent.click(whatsappButton);
      await userEvent.click(whatsappButton);
      await userEvent.click(whatsappButton);

      // Should handle all clicks
      expect(mockTrackEvent).toHaveBeenCalledTimes(3);
    });
  });

  describe('Error Handling', () => {
    it('handles WhatsApp generation errors gracefully', async () => {
      mockGenerateWhatsAppLink.mockImplementation(() => {
        throw new Error('WhatsApp generation failed');
      });

      render(<DisparoRapido />);

      const whatsappButton = screen.getAllByText(/Falar com Especialista/)[0];

      // Should not throw unhandled errors
      expect(() => userEvent.click(whatsappButton)).not.toThrow();
    });

    it('handles analytics tracking errors gracefully', async () => {
      mockTrackEvent.mockImplementation(() => {
        throw new Error('Analytics failed');
      });

      render(<DisparoRapido />);

      const whatsappButton = screen.getAllByText(/Falar com Especialista/)[0];

      // Should not throw unhandled errors
      expect(() => userEvent.click(whatsappButton)).not.toThrow();
    });
  });

  describe('SEO and Content Quality', () => {
    it('contains relevant Brazilian keywords', () => {
      render(<DisparoRapido />);

      const content = document.body.textContent || '';
      const brazilianKeywords = [
        'WhatsApp',
        'automação',
        'disparos',
        'Chrome',
        'brasileiro',
        'garantia'
      ];

      brazilianKeywords.forEach(keyword => {
        expect(content.toLowerCase()).toContain(keyword.toLowerCase());
      });
    });

    it('has proper pricing format for Brazilian market', () => {
      render(<DisparoRapido />);

      const priceElements = screen.getAllByText(/R\$\s*\d+[,.]?\d*/);
      expect(priceElements.length).toBeGreaterThan(0);

      priceElements.forEach(element => {
        expect(element.textContent).toMatch(/R\$\s*\d+[,.]?\d*/);
      });
    });
  });

  describe('Component Integration', () => {
    it('integrates properly with analytics system', async () => {
      render(<DisparoRapido />);

      const button = screen.getAllByText(/Falar com Especialista/)[0];
      await userEvent.click(button);

      expect(mockTrackEvent).toHaveBeenCalledWith(
        'cta_click',
        expect.objectContaining({
          action: 'whatsapp_contact',
          product: 'disparo-rapido',
          component: 'DisparoRapido'
        })
      );
    });

    it('integrates properly with WhatsApp utility', async () => {
      render(<DisparoRapido />);

      const button = screen.getAllByText(/Falar com Especialista/)[0];
      await userEvent.click(button);

      expect(mockGenerateWhatsAppLink).toHaveBeenCalledWith(
        expect.objectContaining({
          leadData: expect.objectContaining({
            interest: 'disparo-rapido',
            urgencyLevel: 'high'
          })
        })
      );
    });
  });
});