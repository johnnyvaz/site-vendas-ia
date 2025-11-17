# Data Model: Enhanced AI Business Solutions Website

## Contact Information Entity

### ContactInfo
**Purpose**: Centralized storage of Johnny's business contact information
**Fields**:
- `email`: string - Primary business email (contato@johnnyvaz.com.br)
- `phone`: string - WhatsApp business number (+55 16 99778 7674)
- `whatsappUrl`: string - Formatted WhatsApp link with UTM tracking
- `businessHours`: string - Operating hours in Brazilian timezone
- `responseTime`: string - Expected response time commitment
- `languages`: string[] - Supported languages (Portuguese, English)

**Validation Rules**:
- Email must be valid format and verified
- Phone number must include country code (+55)
- WhatsApp URL must include proper encoding for Brazilian characters
- Response time must be realistic (< 24 hours for initial contact)

## Product Portfolio Entity

### Product
**Purpose**: Standardized representation of AI business solutions
**Fields**:
- `id`: string - Unique product identifier (leads-rapido, disparo-rapido, sdr-virtual)
- `name`: string - Display name in Portuguese
- `slug`: string - URL-friendly identifier
- `category`: enum - Product category (lead-generation, automation, ai-agent, custom)
- `tagline`: string - Brief value proposition
- `description`: string - Detailed description in Portuguese
- `features`: ProductFeature[] - Array of key features
- `benefits`: Benefit[] - Business outcomes and metrics
- `pricing`: PricingInfo - Pricing structure in BRL
- `integrations`: string[] - Compatible tools and platforms
- `targetAudience`: string[] - Ideal customer profiles
- `complianceFeatures`: string[] - LGPD and regulatory compliance features
- `status`: enum - Product status (available, coming-soon, beta)

**Validation Rules**:
- All text content must be in Portuguese
- Pricing must be in Brazilian Reais (BRL)
- Features must be measurable and specific
- Compliance features must include LGPD references

### ProductFeature
**Purpose**: Individual product capabilities and features
**Fields**:
- `icon`: string - Lucide icon name
- `title`: string - Feature name
- `description`: string - Feature explanation
- `highlight`: boolean - Featured on main showcase
- `metrics`: string - Quantifiable benefit if available

### Benefit
**Purpose**: Business outcomes and value propositions
**Fields**:
- `metric`: string - Quantified improvement (e.g., "300%", "< 2 hours")
- `description`: string - What the metric represents
- `timeframe`: string - How quickly benefit is achieved
- `proofType`: enum - Evidence type (case-study, benchmark, guarantee)

### PricingInfo
**Purpose**: Product pricing and payment options
**Fields**:
- `startingPrice`: number - Minimum price in BRL
- `currency`: string - Always "BRL"
- `billingCycle`: enum - Billing frequency (monthly, annually)
- `paymentMethods`: string[] - Accepted payment options (PIX, boleto, cartão)
- `discountInfo`: string - Current promotions
- `freeTier`: boolean - Whether free version available
- `trialPeriod`: number - Trial days if applicable

## Lead Capture Entity

### LeadForm
**Purpose**: Progressive form data collection for qualified leads
**Fields**:
- `personalInfo`: PersonalInfo - Basic contact information
- `businessInfo`: BusinessInfo - Company and role details
- `interests`: InterestInfo - Product preferences and goals
- `consent`: ConsentInfo - LGPD compliance tracking
- `metadata`: FormMetadata - Tracking and attribution data

**State Transitions**:
1. `initiated` → Form started, basic info collected
2. `business-qualified` → Company information validated
3. `interest-assessed` → Product interests identified
4. `consent-given` → LGPD compliance confirmed
5. `submitted` → Complete form sent to Johnny
6. `contacted` → Initial outreach completed

### PersonalInfo
**Purpose**: Individual contact details
**Fields**:
- `name`: string - Full name (required)
- `email`: string - Business email (required, validated)
- `phone`: string - WhatsApp number (required for follow-up)
- `position`: string - Job title/role
- `linkedinUrl`: string - LinkedIn profile (optional)

**Validation Rules**:
- Name must be at least 2 words (first + last name)
- Email must be business domain (not gmail/hotmail for B2B)
- Phone must be Brazilian format with proper WhatsApp validation
- Position must indicate decision-making authority

### BusinessInfo
**Purpose**: Company qualification data
**Fields**:
- `company`: string - Company name (required)
- `website`: string - Company website
- `industry`: string - Business sector
- `size`: enum - Company size (1-10, 11-50, 51-200, 200+)
- `revenue`: enum - Annual revenue range in BRL
- `currentTools`: string[] - Existing sales/marketing tools
- `location`: string - Primary business location in Brazil

**Validation Rules**:
- Company name must be validated against business registry if possible
- Website must be accessible and match company name
- Revenue ranges must be in Brazilian Reais
- Location must be Brazilian city/state

### InterestInfo
**Purpose**: Product interest and timeline assessment
**Fields**:
- `products`: string[] - Selected products of interest
- `primaryGoal`: enum - Main business objective
- `timeline`: enum - Implementation urgency
- `budget`: enum - Available budget range in BRL
- `decisionMakers`: number - People involved in decision
- `currentChallenges`: string[] - Specific pain points

**Validation Rules**:
- At least one product must be selected
- Primary goal must align with selected products
- Budget must be realistic for selected products
- Timeline must be specific and actionable

### ConsentInfo
**Purpose**: LGPD compliance and permission tracking
**Fields**:
- `lgpdConsent`: boolean - Required data processing consent
- `marketingConsent`: boolean - Marketing communication permission
- `dataRetention`: boolean - Data storage period agreement
- `thirdPartySharing`: boolean - Partner communication consent
- `consentTimestamp`: Date - When consent was given
- `ipAddress`: string - User IP for legal record
- `consentVersion`: string - Privacy policy version

**Validation Rules**:
- LGPD consent is mandatory (cannot proceed without)
- Marketing consent is optional but encouraged
- Consent timestamp must be accurate
- IP address must be logged for legal compliance

### FormMetadata
**Purpose**: Attribution and optimization tracking
**Fields**:
- `utmSource`: string - Traffic source
- `utmMedium`: string - Marketing medium
- `utmCampaign`: string - Specific campaign
- `referrer`: string - Previous page URL
- `userAgent`: string - Browser/device information
- `sessionDuration`: number - Time spent on site
- `pagesVisited`: string[] - User journey pages
- `formStartTime`: Date - When form was initiated
- `formCompletionTime`: Date - When form was submitted

## Content Management Entity

### DisparoRapidoContent
**Purpose**: Structured content for Disparo Rápido product showcase
**Fields**:
- `heroContent`: HeroContent - Main presentation section
- `features`: FeatureContent[] - Detailed feature explanations
- `useCases`: UseCase[] - Real-world application examples
- `testimonials`: Testimonial[] - Customer success stories
- `faqItems`: FAQItem[] - Common questions and answers
- `pricingDetails`: PricingDetails - Specific pricing information

**Validation Rules**:
- All content must be in Portuguese
- Features must be specific to WhatsApp automation
- Use cases must be relevant to Brazilian B2B market
- Testimonials must be authentic and verifiable

### HeroContent
**Purpose**: Main value proposition presentation
**Fields**:
- `headline`: string - Primary value proposition
- `subheadline`: string - Supporting explanation
- `benefitBullets`: string[] - Key benefits list
- `ctaPrimary`: string - Main call-to-action text
- `ctaSecondary`: string - Alternative action text
- `heroImage`: string - Main visual element
- `trustIndicators`: string[] - Social proof elements

### FeatureContent
**Purpose**: Individual feature explanations
**Fields**:
- `featureId`: string - Unique identifier
- `title`: string - Feature name
- `description`: string - Detailed explanation
- `benefits`: string[] - Specific advantages
- `usageExample`: string - How it works in practice
- `relatedFeatures`: string[] - Connected capabilities
- `technicalSpecs`: string - Implementation details if relevant

### UseCase
**Purpose**: Real-world application scenarios
**Fields**:
- `title`: string - Use case name
- `scenario`: string - Specific business situation
- `solution`: string - How Disparo Rápido addresses it
- `results`: string - Expected outcomes
- `industry`: string - Relevant business sector
- `companySize`: string - Applicable company size

### Testimonial
**Purpose**: Customer success stories and social proof
**Fields**:
- `customerName`: string - Client name (if permission given)
- `company`: string - Customer company
- `role`: string - Customer position
- `quote`: string - Testimonial content
- `results`: string - Specific outcomes achieved
- `timeframe`: string - How long to achieve results
- `verified`: boolean - Whether testimonial is verified
- `permissionToUse`: boolean - Legal permission for display

## Integration Data Models

### WhatsAppIntegration
**Purpose**: WhatsApp Business API integration data
**Fields**:
- `businessPhoneId`: string - WhatsApp Business phone number ID
- `accessToken`: string - API access token (encrypted)
- `webhookUrl`: string - Callback URL for responses
- `templateMessages`: WhatsAppTemplate[] - Pre-approved message templates
- `messageStats`: MessageStats - Delivery and engagement metrics

### WhatsAppTemplate
**Purpose**: Pre-approved message templates
**Fields**:
- `templateId`: string - WhatsApp template identifier
- `name`: string - Template name
- `category`: enum - Template category (marketing, utility, authentication)
- `language`: string - Template language (pt_BR)
- `components`: TemplateComponent[] - Header, body, footer, buttons
- `approvalStatus`: enum - WhatsApp approval status
- `usageCount`: number - How many times used

### TemplateComponent
**Purpose**: Individual template elements
**Fields**:
- `type`: enum - Component type (header, body, footer, button)
- `format`: enum - Content format (text, image, video, document)
- `text`: string - Template text content
- `variables`: string[] - Dynamic content placeholders
- `buttonType`: enum - Button category (quick_reply, url, phone_number)

### EmailIntegration
**Purpose**: Email routing and notification system
**Fields**:
- `recipientEmail`: string - Johnny's email (contato@johnnyvaz.com.br)
- `emailTemplates`: EmailTemplate[] - Notification templates
- `deliveryStatus`: DeliveryStatus - Email delivery tracking
- `autoResponders`: AutoResponder[] - Automated confirmation emails

### EmailTemplate
**Purpose**: Email notification formats
**Fields**:
- `templateId`: string - Unique template identifier
- `subject`: string - Email subject line
- `bodyHtml`: string - HTML email content
- `bodyText`: string - Plain text fallback
- `variables`: string[] - Dynamic content fields
- `triggerEvent`: enum - When to send (form_submit, urgent_lead, etc.)

## Validation and Business Rules

### Data Quality Rules
1. **Contact Validation**: All contact information must be verified for deliverability
2. **Business Qualification**: Company information must indicate legitimate B2B prospect
3. **Interest Alignment**: Selected products must match stated business goals
4. **Compliance Tracking**: All LGPD consent must be timestamped and logged
5. **Performance Monitoring**: All user interactions must be tracked for optimization

### Business Logic Rules
1. **Lead Scoring**: Combine company size, budget, timeline, and urgency for prioritization
2. **Response Routing**: Urgent leads (immediate timeline) trigger WhatsApp notifications
3. **Content Personalization**: Show relevant products based on company size and industry
4. **Follow-up Automation**: Schedule appropriate follow-up based on lead characteristics
5. **Compliance Enforcement**: Block form submission without mandatory LGPD consent

### Data Retention Rules
1. **Active Leads**: Retain full data while sales process is active
2. **Converted Customers**: Long-term retention for customer success tracking
3. **Unqualified Leads**: Purge after 12 months per LGPD requirements
4. **Marketing Consent**: Honor unsubscribe requests immediately
5. **Legal Compliance**: Maintain audit trail for regulatory requirements

This data model provides the foundation for implementing the enhanced Vendas.IA website while ensuring LGPD compliance, business qualification, and effective lead management for Johnny's AI solutions business.