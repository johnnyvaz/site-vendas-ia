/**
 * Página de Política de Privacidade - Vendas.IA
 * Em conformidade com a LGPD (Lei Geral de Proteção de Dados)
 */

import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Database,
  Clock,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const PoliticaPrivacidade = () => {
  const lastUpdated = '04 de Fevereiro de 2026';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-12 md:py-20">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Política de Privacidade
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sua privacidade é importante para nós. Esta política explica como coletamos,
            usamos e protegemos seus dados pessoais em conformidade com a LGPD.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Última atualização: {lastUpdated}
          </p>
        </div>

        {/* Quick Summary */}
        <Card className="mb-12 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-orange-600" />
              Resumo Rápido
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Coletamos apenas dados necessários para prestar nossos serviços</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Seus dados nunca são vendidos a terceiros</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Você pode solicitar acesso, correção ou exclusão dos seus dados</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Scripts de terceiros só carregam com seu consentimento explícito</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 1. Introdução */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">1</span>
              Introdução
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                A <strong>Vendas.IA</strong>, operada por Johnny Vaz, está comprometida em proteger sua privacidade
                e seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos
                e protegemos suas informações quando você utiliza nosso site e serviços.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Esta política está em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong> -
                Lei nº 13.709/2018 - e outras regulamentações aplicáveis no Brasil.
              </p>
            </div>
          </section>

          {/* 2. Dados Coletados */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">2</span>
              Dados que Coletamos
            </h2>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Dados fornecidos por você
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span><strong>Dados de contato:</strong> nome, e-mail, telefone/WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span><strong>Dados profissionais:</strong> empresa, cargo, segmento de atuação</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span><strong>Comunicações:</strong> mensagens enviadas através de formulários</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-600" />
                    Dados coletados automaticamente (com seu consentimento)
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span><strong>Dados de navegação:</strong> páginas visitadas, tempo de permanência</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span><strong>Dados técnicos:</strong> endereço IP, tipo de navegador, dispositivo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span><strong>Cookies:</strong> identificadores para melhorar sua experiência</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 flex items-start gap-2">
                      <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Importante:</strong> Scripts de análise e marketing (Google Analytics, Facebook Pixel, etc.)
                        só são carregados após seu consentimento explícito através do banner de cookies.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 3. Finalidade */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">3</span>
              Como Usamos seus Dados
            </h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Prestar e melhorar nossos serviços de automação de vendas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Entrar em contato para responder suas dúvidas e solicitações</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Enviar comunicações sobre nossos produtos (apenas com seu consentimento)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Analisar o uso do site para melhorar a experiência do usuário</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cumprir obrigações legais e regulatórias</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 4. Base Legal */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">4</span>
              Base Legal para Tratamento
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Tratamos seus dados pessoais com base nas seguintes hipóteses previstas na LGPD (Art. 7º):
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">Consentimento</h4>
                  <p className="text-sm text-muted-foreground">
                    Para envio de comunicações de marketing e uso de cookies analíticos.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">Execução de Contrato</h4>
                  <p className="text-sm text-muted-foreground">
                    Para prestar os serviços contratados por você.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">Interesse Legítimo</h4>
                  <p className="text-sm text-muted-foreground">
                    Para melhorar nossos serviços e garantir a segurança do site.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">Obrigação Legal</h4>
                  <p className="text-sm text-muted-foreground">
                    Para cumprir exigências legais e regulatórias.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">5</span>
              Política de Cookies
            </h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência. Os cookies são categorizados em:
                </p>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      <h4 className="font-semibold">Cookies Necessários</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Sempre ativos</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Essenciais para o funcionamento do site. Não podem ser desabilitados.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <h4 className="font-semibold">Cookies Analíticos</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Requer consentimento</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Nos ajudam a entender como você usa o site (ex: Google Analytics).
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <h4 className="font-semibold">Cookies de Marketing</h4>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Requer consentimento</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Usados para personalizar anúncios (ex: Facebook Pixel).
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <strong>Como gerenciar:</strong> Você pode alterar suas preferências de cookies a qualquer momento
                    clicando no link "Configurações de Privacidade" no rodapé do site.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 6. Compartilhamento */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">6</span>
              Compartilhamento de Dados
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  <strong>Não vendemos seus dados pessoais.</strong> Podemos compartilhar informações apenas nas seguintes situações:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <span><strong>Prestadores de serviço:</strong> empresas que nos ajudam a operar o site (hospedagem, e-mail marketing), sempre sob contratos de confidencialidade.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <span><strong>Obrigações legais:</strong> quando exigido por lei, ordem judicial ou autoridade competente.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <span><strong>Com seu consentimento:</strong> em qualquer outra situação, somente com sua autorização prévia.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 7. Retenção */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">7</span>
              Retenção de Dados
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="h-5 w-5 text-orange-600 mt-1" />
                  <p className="text-muted-foreground">
                    Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política:
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-sm">Dados de contato</p>
                    <p className="text-sm text-muted-foreground">Até 2 anos após último contato</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-sm">Dados de marketing</p>
                    <p className="text-sm text-muted-foreground">Até 1 ano ou até revogação</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-sm">Dados contratuais</p>
                    <p className="text-sm text-muted-foreground">5 anos (obrigação legal)</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-sm">Cookies analíticos</p>
                    <p className="text-sm text-muted-foreground">Até 2 anos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 8. Seus Direitos */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">8</span>
              Seus Direitos (LGPD Art. 18)
            </h2>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <p className="text-blue-900 mb-4">
                  Você tem os seguintes direitos em relação aos seus dados pessoais:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Confirmação e Acesso</p>
                      <p className="text-xs text-blue-800">Saber se tratamos seus dados e acessá-los</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Correção</p>
                      <p className="text-xs text-blue-800">Corrigir dados incompletos ou incorretos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Eliminação</p>
                      <p className="text-xs text-blue-800">Solicitar exclusão dos dados desnecessários</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Portabilidade</p>
                      <p className="text-xs text-blue-800">Receber seus dados em formato estruturado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Revogação</p>
                      <p className="text-xs text-blue-800">Retirar consentimento a qualquer momento</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">Oposição</p>
                      <p className="text-xs text-blue-800">Opor-se ao tratamento em certas situações</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Para exercer seus direitos, entre em contato conosco pelos canais indicados abaixo.
                    Responderemos em até 15 dias úteis.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 9. Segurança */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">9</span>
              Segurança dos Dados
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Implementamos medidas técnicas e organizacionais para proteger seus dados:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Criptografia SSL/TLS</p>
                    <p className="text-xs text-muted-foreground">Dados em trânsito protegidos</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Acesso Restrito</p>
                    <p className="text-xs text-muted-foreground">Apenas pessoal autorizado</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Database className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Backup Seguro</p>
                    <p className="text-xs text-muted-foreground">Cópias de segurança regulares</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 10. Contato */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">10</span>
              Contato e Encarregado (DPO)
            </h2>
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Controlador dos Dados</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-600" />
                        <strong>Vendas.IA</strong> - Johnny Vaz
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-600" />
                        Brasil
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Encarregado (DPO)</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-600" />
                        Johnny Vaz
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-orange-600" />
                        <a href="mailto:contato@johnnyvaz.com.br" className="text-orange-600 hover:underline">
                          contato@johnnyvaz.com.br
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-orange-600" />
                        <a href="tel:+5516997787674" className="text-orange-600 hover:underline">
                          +55 16 99778-7674
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 inline mr-2" />
                    Você também pode registrar uma reclamação junto à{' '}
                    <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong> caso entenda que
                    seus direitos não foram atendidos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 11. Alterações */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">11</span>
              Alterações nesta Política
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Esta política pode ser atualizada periodicamente. Quando fizermos alterações significativas,
                  notificaremos você através do site ou por e-mail. Recomendamos que revise esta página
                  regularmente para se manter informado sobre como protegemos seus dados.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Versão:</strong> 1.0 | <strong>Última atualização:</strong> {lastUpdated}
                </p>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Back to top */}
        <div className="text-center mt-12">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
