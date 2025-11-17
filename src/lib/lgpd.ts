/**
 * LGPD (Lei Geral de Proteção de Dados) Compliance Library for Vendas.IA
 * Ensures compliance with Brazilian data protection regulations
 * Handles consent management, data processing tracking, and user rights
 */

export interface LGPDConsent {
  id: string;
  userId?: string;
  sessionId: string;
  timestamp: number;
  ipAddress?: string;
  userAgent: string;
  consents: {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    personalization: boolean;
  };
  purposes: string[];
  dataCategories: string[];
  consentMethod: 'explicit' | 'implied' | 'updated';
  version: string;
  expiresAt?: number;
  withdrawnAt?: number;
  source: string; // Form or page where consent was given
}

export interface LGPDDataProcessing {
  id: string;
  userId?: string;
  sessionId: string;
  timestamp: number;
  dataType: 'personal' | 'sensitive' | 'anonymous';
  purpose: string;
  legalBasis: 'consent' | 'legitimate_interest' | 'contract' | 'legal_obligation';
  dataCategories: string[];
  retention: {
    period: number; // in days
    reason: string;
  };
  thirdParties?: string[];
  location: 'brazil' | 'international';
}

export interface LGPDUserRights {
  accessRequest: () => Promise<LGPDDataExport>;
  rectificationRequest: (data: Record<string, unknown>) => Promise<boolean>;
  deletionRequest: () => Promise<boolean>;
  portabilityRequest: () => Promise<LGPDDataExport>;
  withdrawConsent: (category: keyof LGPDConsent['consents']) => Promise<boolean>;
  complaintSubmission: (complaint: string) => Promise<boolean>;
}

export interface LGPDDataExport {
  metadata: {
    generatedAt: string;
    lgpdVersion: string;
    company: LGPDConfiguration['company'];
    dpo: LGPDConfiguration['dpo'];
  };
  consent?: LGPDConsent;
  dataProcessing: LGPDDataProcessing[];
  retentionPolicy: LGPDConfiguration['dataRetention'];
  userRights: Record<string, string>;
}

export interface LGPDConfiguration {
  version: string;
  dpo: {
    name: string;
    email: string;
    phone: string;
  };
  company: {
    name: string;
    cnpj: string;
    address: string;
    email: string;
  };
  dataRetention: {
    default: number; // days
    marketing: number;
    analytics: number;
    support: number;
  };
  consentExpiry: number; // days
  autoDeleteAfter: number; // days
}

class LGPDCompliance {
  private config: LGPDConfiguration;
  private consents: Map<string, LGPDConsent> = new Map();
  private processing: LGPDDataProcessing[] = [];

  constructor(config: LGPDConfiguration) {
    this.config = config;
    this.loadStoredConsents();
    this.setupAutoCleanup();
  }

  /**
   * Record user consent with LGPD requirements
   */
  public async recordConsent(consent: Omit<LGPDConsent, 'id' | 'timestamp' | 'version'>): Promise<string> {
    const consentRecord: LGPDConsent = {
      ...consent,
      id: this.generateId(),
      timestamp: Date.now(),
      version: this.config.version,
      expiresAt: Date.now() + (this.config.consentExpiry * 24 * 60 * 60 * 1000)
    };

    // Store consent locally
    this.consents.set(consentRecord.sessionId, consentRecord);
    this.saveToLocalStorage('lgpd-consents', Array.from(this.consents.values()));

    // Send to n8n compliance workflow
    try {
      await fetch('/api/n8n/lgpd/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'consent_recorded',
          consent: consentRecord,
          compliance: {
            lgpdVersion: this.config.version,
            timestamp: new Date().toISOString(),
            dpo: this.config.dpo
          }
        })
      });
    } catch (error) {
      console.error('[LGPD] Failed to send consent to compliance system:', error);
      // Store for later retry
      this.storeForRetry('consent', consentRecord);
    }

    console.log('[LGPD] Consent recorded:', consentRecord.id);
    return consentRecord.id;
  }

  /**
   * Track data processing activity
   */
  public async trackDataProcessing(processing: Omit<LGPDDataProcessing, 'id' | 'timestamp'>): Promise<string> {
    const processingRecord: LGPDDataProcessing = {
      ...processing,
      id: this.generateId(),
      timestamp: Date.now()
    };

    this.processing.push(processingRecord);

    // Send to n8n compliance workflow
    try {
      await fetch('/api/n8n/lgpd/processing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'data_processing',
          processing: processingRecord,
          compliance: {
            lgpdVersion: this.config.version,
            timestamp: new Date().toISOString()
          }
        })
      });
    } catch (error) {
      console.error('[LGPD] Failed to send processing record:', error);
      this.storeForRetry('processing', processingRecord);
    }

    return processingRecord.id;
  }

  /**
   * Get current consent status for a session
   */
  public getConsent(sessionId: string): LGPDConsent | null {
    const consent = this.consents.get(sessionId);

    if (!consent) return null;

    // Check if consent has expired
    if (consent.expiresAt && Date.now() > consent.expiresAt) {
      this.consents.delete(sessionId);
      this.saveToLocalStorage('lgpd-consents', Array.from(this.consents.values()));
      return null;
    }

    return consent;
  }

  /**
   * Check if specific consent category is granted
   */
  public hasConsent(sessionId: string, category: keyof LGPDConsent['consents']): boolean {
    const consent = this.getConsent(sessionId);
    return consent?.consents[category] === true;
  }

  /**
   * Update consent preferences
   */
  public async updateConsent(
    sessionId: string,
    updates: Partial<LGPDConsent['consents']>,
    source: string
  ): Promise<boolean> {
    const existingConsent = this.getConsent(sessionId);
    if (!existingConsent) return false;

    const updatedConsent: LGPDConsent = {
      ...existingConsent,
      consents: { ...existingConsent.consents, ...updates },
      timestamp: Date.now(),
      consentMethod: 'updated',
      source
    };

    this.consents.set(sessionId, updatedConsent);
    this.saveToLocalStorage('lgpd-consents', Array.from(this.consents.values()));

    // Track the update
    await this.trackDataProcessing({
      userId: updatedConsent.userId,
      sessionId,
      dataType: 'personal',
      purpose: 'consent_management',
      legalBasis: 'consent',
      dataCategories: ['consent_preferences'],
      retention: {
        period: this.config.dataRetention.default,
        reason: 'Legal compliance and user preference management'
      },
      location: 'brazil'
    });

    return true;
  }

  /**
   * Withdraw specific consent
   */
  public async withdrawConsent(
    sessionId: string,
    category: keyof LGPDConsent['consents']
  ): Promise<boolean> {
    const consent = this.getConsent(sessionId);
    if (!consent) return false;

    const updates = { [category]: false };
    await this.updateConsent(sessionId, updates, 'consent_withdrawal');

    // If all non-essential consents are withdrawn, mark as withdrawn
    const updatedConsent = this.getConsent(sessionId);
    if (updatedConsent) {
      const nonEssentialConsents = Object.entries(updatedConsent.consents)
        .filter(([key]) => key !== 'essential')
        .map(([, value]) => value);

      if (nonEssentialConsents.every(consent => !consent)) {
        updatedConsent.withdrawnAt = Date.now();
        this.consents.set(sessionId, updatedConsent);
      }
    }

    return true;
  }

  /**
   * Generate data portability report
   */
  public async generatePortabilityReport(sessionId: string): Promise<LGPDDataExport> {
    const consent = this.getConsent(sessionId);
    const userProcessing = this.processing.filter(p => p.sessionId === sessionId);

    const report = {
      metadata: {
        generatedAt: new Date().toISOString(),
        lgpdVersion: this.config.version,
        company: this.config.company,
        dpo: this.config.dpo
      },
      consent: consent,
      dataProcessing: userProcessing,
      retentionPolicy: this.config.dataRetention,
      userRights: {
        access: 'Direito de acesso aos dados pessoais',
        rectification: 'Direito de correção de dados incompletos, inexatos ou desatualizados',
        deletion: 'Direito de eliminação dos dados pessoais',
        portability: 'Direito à portabilidade dos dados',
        withdrawal: 'Direito de revogação do consentimento'
      }
    };

    // Track the portability request
    await this.trackDataProcessing({
      sessionId,
      dataType: 'personal',
      purpose: 'data_portability',
      legalBasis: 'legal_obligation',
      dataCategories: ['consent_data', 'processing_logs'],
      retention: {
        period: 30,
        reason: 'LGPD compliance - data portability request'
      },
      location: 'brazil'
    });

    return report;
  }

  /**
   * Request data deletion (right to be forgotten)
   */
  public async requestDataDeletion(sessionId: string): Promise<boolean> {
    try {
      // Send deletion request to n8n workflow
      await fetch('/api/n8n/lgpd/deletion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'data_deletion_request',
          sessionId,
          timestamp: new Date().toISOString(),
          compliance: {
            lgpdVersion: this.config.version,
            dpo: this.config.dpo
          }
        })
      });

      // Remove local data
      this.consents.delete(sessionId);
      this.processing = this.processing.filter(p => p.sessionId !== sessionId);

      this.saveToLocalStorage('lgpd-consents', Array.from(this.consents.values()));

      console.log('[LGPD] Data deletion request processed for session:', sessionId);
      return true;
    } catch (error) {
      console.error('[LGPD] Failed to process deletion request:', error);
      return false;
    }
  }

  /**
   * Validate consent requirements before data processing
   */
  public validateProcessing(
    sessionId: string,
    requiredConsents: Array<keyof LGPDConsent['consents']>,
    purpose: string
  ): { valid: boolean; missing: string[]; message: string } {
    const consent = this.getConsent(sessionId);

    if (!consent) {
      return {
        valid: false,
        missing: requiredConsents,
        message: 'Consentimento não encontrado. É necessário aceitar os termos antes de prosseguir.'
      };
    }

    const missing = requiredConsents.filter(category => !consent.consents[category]);

    if (missing.length > 0) {
      const missingLabels = missing.map(category => {
        switch (category) {
          case 'analytics': return 'Analytics';
          case 'marketing': return 'Marketing';
          case 'personalization': return 'Personalização';
          default: return category;
        }
      });

      return {
        valid: false,
        missing,
        message: `Para ${purpose}, é necessário consentimento para: ${missingLabels.join(', ')}`
      };
    }

    return {
      valid: true,
      missing: [],
      message: 'Processamento autorizado'
    };
  }

  /**
   * Get compliance status report
   */
  public getComplianceStatus(): {
    totalConsents: number;
    activeConsents: number;
    expiredConsents: number;
    withdrawnConsents: number;
    totalProcessing: number;
    configuration: LGPDConfiguration;
  } {
    const now = Date.now();
    const allConsents = Array.from(this.consents.values());

    const activeConsents = allConsents.filter(c =>
      !c.withdrawnAt && (!c.expiresAt || c.expiresAt > now)
    ).length;

    const expiredConsents = allConsents.filter(c =>
      c.expiresAt && c.expiresAt <= now
    ).length;

    const withdrawnConsents = allConsents.filter(c => c.withdrawnAt).length;

    return {
      totalConsents: allConsents.length,
      activeConsents,
      expiredConsents,
      withdrawnConsents,
      totalProcessing: this.processing.length,
      configuration: this.config
    };
  }

  /**
   * Private methods
   */
  private generateId(): string {
    return `lgpd_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private loadStoredConsents(): void {
    try {
      const stored = localStorage.getItem('lgpd-consents');
      if (stored) {
        const consents: LGPDConsent[] = JSON.parse(stored);
        consents.forEach(consent => {
          this.consents.set(consent.sessionId, consent);
        });
      }
    } catch (error) {
      console.warn('[LGPD] Failed to load stored consents:', error);
    }
  }

  private saveToLocalStorage(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('[LGPD] Failed to save to localStorage:', error);
    }
  }

  private storeForRetry(type: string, data: unknown): void {
    try {
      const retryKey = `lgpd-retry-${type}`;
      const existing = JSON.parse(localStorage.getItem(retryKey) || '[]');
      existing.push({
        ...(typeof data === 'object' && data !== null ? data : {}),
        retryAt: Date.now()
      });
      localStorage.setItem(retryKey, JSON.stringify(existing));
    } catch (error) {
      console.warn('[LGPD] Failed to store for retry:', error);
    }
  }

  private setupAutoCleanup(): void {
    // Clean up expired consents every hour
    setInterval(() => {
      this.cleanupExpiredData();
    }, 60 * 60 * 1000);

    // Initial cleanup
    this.cleanupExpiredData();
  }

  private cleanupExpiredData(): void {
    const now = Date.now();
    const autoDeleteAfter = this.config.autoDeleteAfter * 24 * 60 * 60 * 1000;

    // Remove expired consents
    for (const [sessionId, consent] of this.consents.entries()) {
      const shouldDelete = (
        (consent.expiresAt && consent.expiresAt <= now) ||
        (consent.withdrawnAt && (now - consent.withdrawnAt) > autoDeleteAfter)
      );

      if (shouldDelete) {
        this.consents.delete(sessionId);
      }
    }

    // Remove old processing records
    this.processing = this.processing.filter(record => {
      const age = now - record.timestamp;
      const maxAge = record.retention.period * 24 * 60 * 60 * 1000;
      return age < maxAge;
    });

    // Save updated data
    this.saveToLocalStorage('lgpd-consents', Array.from(this.consents.values()));
  }
}

// Default LGPD configuration for Vendas.IA
export const defaultLGPDConfig: LGPDConfiguration = {
  version: '1.0',
  dpo: {
    name: 'Johnny Vaz',
    email: 'contato@johnnyvaz.com.br',
    phone: '+55 16 99778-7674'
  },
  company: {
    name: 'Vendas.IA',
    cnpj: '', // To be filled
    address: 'Brasil',
    email: 'contato@johnnyvaz.com.br'
  },
  dataRetention: {
    default: 730, // 2 years
    marketing: 365, // 1 year
    analytics: 730, // 2 years
    support: 1095 // 3 years
  },
  consentExpiry: 365, // 1 year
  autoDeleteAfter: 2190 // 6 years
};

// Global LGPD compliance instance
export const lgpdCompliance = new LGPDCompliance(defaultLGPDConfig);

export default lgpdCompliance;