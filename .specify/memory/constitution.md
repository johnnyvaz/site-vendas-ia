<!--
Version change: NEW → v1.0.0
Modified principles:
- Added: I. Performance-First Frontend
- Added: II. Brazilian Market Focus
- Added: III. Conversion-Optimized Design
- Added: IV. LGPD Compliance
- Added: V. Mobile-First Responsive Design

Added sections:
- Marketing Constraints
- Quality Standards

Removed sections: None

Templates requiring updates:
✅ .specify/templates/plan-template.md - Constitution Check section aligned
⚠ .specify/templates/spec-template.md - pending review for B2B SaaS scope requirements
⚠ .specify/templates/tasks-template.md - pending review for performance/UX task categorization

Follow-up TODOs: None
-->

# Vendas.IA Constitution

## Core Principles

### I. Performance-First Frontend
Every feature must prioritize loading speed and user experience. Page load times must be under 3 seconds on 3G networks. All images must be optimized and properly lazy-loaded. Code splitting and modern bundling practices are mandatory for production builds.

**Rationale**: B2B buyers abandon slow sites within seconds. Fast performance directly impacts conversion rates and user trust, which are critical for a SaaS landing page.

### II. Brazilian Market Focus
All content, messaging, and user flows must be optimized for Brazilian B2B buyers. Portuguese language must be grammatically correct and use business terminology familiar to Brazilian executives. Local business practices, compliance requirements (LGPD), and cultural nuances must be respected.

**Rationale**: Vendas.IA targets Brazilian enterprises exclusively. Generic or poorly localized content reduces credibility and conversion rates in this specific market.

### III. Conversion-Optimized Design
Every component must have a clear purpose in the conversion funnel. CTAs must be prominent, benefit-focused, and strategically placed. Social proof, urgency indicators, and trust signals must be integrated throughout the user journey.

**Rationale**: This is a commercial landing page with the primary goal of generating qualified leads. Design decisions must be data-driven and focused on business outcomes.

### IV. LGPD Compliance
All data collection, cookies, and user tracking must comply with Lei Geral de Proteção de Dados (LGPD). Explicit consent mechanisms are required for non-essential cookies and data processing. Privacy policy and data handling practices must be transparent and legally compliant.

**Rationale**: LGPD compliance is mandatory for Brazilian businesses. Non-compliance risks legal liability and damages brand trust.

### V. Mobile-First Responsive Design
All components must be designed and tested on mobile devices first, then enhanced for desktop. Touch interactions must be optimized with appropriate target sizes. The experience must be consistent and fully functional across all device types.

**Rationale**: Brazilian B2B decision-makers increasingly research and make purchasing decisions on mobile devices. Mobile experience directly impacts lead quality and conversion rates.

## Marketing Constraints

### Lead Generation Requirements
- All forms must capture qualified business leads with proper validation
- Lead magnets must provide immediate value and establish authority
- Contact forms must integrate with CRM systems for seamless sales follow-up
- UTM tracking and analytics must be implemented for campaign attribution

### Brand Consistency
- Visual design must align with Vendas.IA brand guidelines and color scheme
- Messaging must maintain professional B2B tone while being approachable
- All content must reinforce the AI-powered sales automation value proposition
- Trust signals must be authentic and verifiable

## Quality Standards

### Code Quality
- TypeScript must be used for all new components with strict typing
- ESLint and Prettier configurations must be followed consistently
- Components must be reusable and follow established design system patterns
- All interactive elements must be accessible (WCAG 2.1 AA compliance)

### Testing Requirements
- Critical conversion paths must have end-to-end tests
- Component testing is required for all interactive elements
- Performance budgets must be enforced in CI/CD pipeline
- Cross-browser testing is mandatory for production releases

### SEO Standards
- All pages must have optimized meta tags and structured data
- Core Web Vitals must meet Google's "Good" thresholds
- Internal linking structure must support topic authority
- Local SEO optimization for Brazilian search behavior

## Governance

**Amendment Authority**: Constitution changes require documentation of business impact and technical rationale. All amendments must be approved by project maintainers and compliance verified through template updates.

**Development Compliance**: All pull requests must verify adherence to constitutional principles. Performance regressions, LGPD violations, or accessibility issues are blocking violations. Code reviews must include UX/conversion impact assessment.

**Quality Gates**: Pre-production deployments require Lighthouse performance scores above 90, accessibility audit passage, and LGPD compliance verification. Marketing effectiveness metrics must be tracked and optimized continuously.

**Version**: 1.0.0 | **Ratified**: 2025-09-28 | **Last Amended**: 2025-09-28