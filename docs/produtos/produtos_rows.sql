-- Produtos atualizados conforme a landing page (janeiro/2026)
-- Categorias: crm_saas, disparo_rapido

INSERT INTO
    "public"."produtos" (
        "id",
        "nome",
        "descricao",
        "codigo_produto",
        "categoria",
        "tipo_cobranca",
        "periodo_validade",
        "preco",
        "funcionalidades",
        "metadata",
        "status",
        "created_at",
        "updated_at",
        "max_web_sessions",
        "max_extension_sessions",
        "tipo_produto"
    )
VALUES
    -- =============================================
    -- CRM SAAS - Página CRMPricing.tsx
    -- =============================================

    -- CRM Starter: R$ 49,90/mês - 1 usuário, 1.000 créditos/mês
    (
        'ae958437-a459-4293-94f9-cb9866044587',
        'CRM SaaS - Starter',
        'Ideal para começar com 1 usuário',
        'CRM_STARTER_001',
        'crm_saas',
        'mensal',
        null,
        '49.90',
        '["basic_crm", "contact_management", "sales_funnel_basic", "lead_score_auto", "dashboard_basic", "essential_integrations", "email_support"]',
        '{"plano": "starter", "usuarios_incluidos": 1, "creditos_mes": 1000, "preco_usuario_adicional": 49.90, "trial_dias": 7}',
        'ativo',
        '2026-01-03 00:00:00+00',
        '2026-01-03 00:00:00+00',
        '1',
        '1',
        'subscription'
    ),
    
    -- CRM Pro: R$ 99,90/mês - 2 usuários, 5.000 créditos/mês (Mais Popular)
    (
        'ee342be7-e425-4315-a0fd-7f790ddb35eb',
        'CRM SaaS - Pro',
        'Mais popular - Mais créditos e recursos',
        'CRM_PRO_001',
        'crm_saas',
        'mensal',
        null,
        '99.90',
        '["advanced_crm", "contact_management", "sales_funnel_advanced", "lead_score_ia_predictive", "google_maps_scraping", "multi_channel_automation", "priority_support", "api_basic", "advanced_integrations", "custom_reports"]',
        '{"plano": "pro", "usuarios_incluidos": 2, "creditos_mes": 5000, "preco_usuario_adicional": 49.90, "trial_dias": 7, "destaque": true}',
        'ativo',
        '2026-01-03 00:00:00+00',
        '2026-01-03 00:00:00+00',
        '5',
        '5',
        'subscription'
    ),
    
    -- CRM Business: Personalizado - contato via WhatsApp
    (
        'e3388291-b47c-4667-924c-66eaa2aa33a2',
        'CRM SaaS - Business',
        'Plano personalizado para sua empresa',
        'CRM_BUSINESS_001',
        'crm_saas',
        'mensal',
        null,
        '0.00',
        '["enterprise_crm", "contact_management", "custom_funnel", "ia_advanced_gpt4", "multi_tenancy", "n8n_automation", "chatwoot_integrated", "api_complete_webhooks", "dedicated_support_24x7", "customer_success_manager", "custom_training", "white_label"]',
        '{"plano": "business", "usuarios_sob_demanda": true, "creditos_personalizados": true, "preco_usuario": 49.90, "contato_whatsapp": true}',
        'ativo',
        '2026-01-03 00:00:00+00',
        '2026-01-03 00:00:00+00',
        '10',
        '10',
        'subscription'
    ),

    -- =============================================
    -- DISPARO RÁPIDO - Página DisparoRapido.tsx
    -- =============================================

    -- Disparo Rápido Mensal: R$ 39,90/mês (de R$ 59,90)
    (
        '65e6942f-4d20-45f3-a302-f685e2c6754f',
        'Disparo Rápido - Mensal',
        'Extensão Chrome para automação de WhatsApp Web',
        'DISPARO_MENSAL_001',
        'disparo_rapido',
        'mensal',
        '30',
        '39.90',
        '["whatsapp_sending", "unlimited_messages", "contact_import_excel", "contact_import_groups", "custom_intervals", "realtime_tracking", "media_support", "chrome_extension"]',
        '{"preco_original": 59.90, "suporte": "email", "trial_envios": 10, "garantia_dias": 7}',
        'ativo',
        '2026-01-03 00:00:00+00',
        '2026-01-03 00:00:00+00',
        '1',
        '1',
        'subscription'
    ),
    
    -- Disparo Rápido Anual: R$ 249,00/ano (de R$ 718,80 - 65% economia)
    (
        '47882815-2c1f-40d3-b895-9de5de30cffa',
        'Disparo Rápido - Anual',
        'Licença anual com 65% de economia',
        'DISPARO_ANUAL_001',
        'disparo_rapido',
        'anual',
        '365',
        '249.00',
        '["whatsapp_sending", "unlimited_messages", "contact_import_excel", "contact_import_groups", "custom_intervals", "realtime_tracking", "media_support", "chrome_extension", "priority_support"]',
        '{"preco_original": 718.80, "economia": "65%", "suporte": "prioritario", "trial_envios": 10, "garantia_dias": 7, "destaque": true}',
        'ativo',
        '2026-01-03 00:00:00+00',
        '2026-01-03 00:00:00+00',
        '1',
        '1',
        'subscription'
    );
