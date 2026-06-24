'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Cpu,
  Zap,
  Terminal,
  CircleCheck,
  ShoppingBag,
  Download,
  Fingerprint,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Globe,
  Settings,
  Heart,
  FileCode,
  DollarSign,
  AlertTriangle,
  Play
} from 'lucide-react';

// Pricing plans for the commercial Omni-Core derivative
interface Plan {
  id: string;
  name: string;
  price: string;
  badge: string;
  color: string;
  description: string;
  features: string[];
}

interface Profession {
  id: string;
  name: string;
  icon: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  specsJson: string;
  specsMd: string;
}

const PLANS: Plan[] = [
  {
    id: 'developer',
    name: 'Lite Developer Node',
    price: '$49',
    badge: 'SÉRIE DE ENTRADA',
    color: '#3b82f6', // blue
    description: 'Acesso total aos adaptadores leves do Omni-Core e exportações estáticas offline de prompts de barreira.',
    features: [
      'Núcleo do Adaptador Omni-Core (Zero-Dependências)',
      'Exportador para Markdown Limpo',
      'Configurador Básico de Skills',
      'Updates de segurança essenciais (v2.x)',
      'Uso vitalício local (Sem renovação)'
    ]
  },
  {
    id: 'pro',
    name: 'Tactical Agent Pro',
    price: '$149',
    badge: 'RECOMENDADO // MAIOR VALOR',
    color: '#ef4444', // sovereign red
    description: 'A suite tática completa de combate a amnésia e controle contínuo, integrada diretamente com o Gravity 2.',
    features: [
      'Tudo no Lite Developer Node',
      'Sincronização Local com Engine Gravity 2',
      'Protocolo de Reidratação Automática EternAI',
      'Módulo Cyber-Defense Sandbox para Prompts',
      'Exibição em HUD com Som Telemétrico embutido',
      'Suporte Prioritário Direto por E-mail'
    ]
  },
  {
    id: 'executive',
    name: 'Sovereign Enterprise',
    price: '$499',
    badge: 'OPERAÇÕES SEGURAS',
    color: '#10b981', // emerald
    description: 'Controle corporativo absoluto sem vazamento para Big Techs. Implemente sandboxes avançadas multi-agentes.',
    features: [
      'Tudo no Tactical Agent Pro',
      'Mapeamento de Múltiplos Nós estilo Torrent (P2P)',
      'Compilador Dinâmico de Cânones Cognitivos',
      'Ofuscação de Prompt Avançada contra Crawlers',
      'Licença Comercial Ilimitada de Revenda',
      'Canal Reservado de Atendimento Personalizado (Márcio)'
    ]
  }
];

const PROFESSIONS: Profession[] = [
  {
    id: 'visual-designer',
    name: 'Designer Gráfico de Produção Multi-Nó',
    icon: 'Terminal',
    category: 'Escalonamento & Mídia',
    shortDesc: 'Operação ininterrupta de arte e layouts em lote (ex: 50.000 peças). Reduz horas extras e cansaço humano.',
    longDesc: 'Especializado em receber templates prévios e cuspir variações consecutivas perfeitamente diagramadas trabalhando 24h sem sono.',
    specsJson: `{
  "$schema": "https://omni-core.io/schema/v2/profession.json",
  "id": "OMNI-DES-GRAPH-2.5",
  "role": "Designer Gráfico de Produção Multi-Nó",
  "architect": "Márcio (Omni-Core Sovereign Shop)",
  "version": "2.5-Gravity",
  "runtime": {
    "engine": "Omni-Core Engine",
    "environment": "Decoupled Local Hardware",
    "required_models": ["Llama-3", "Gemma-2", "GPT-4o", "Gemini-1.5"]
  },
  "operational_parameters": {
    "batch_capacity": 50000,
    "consecutive_loops": true,
    "max_turn_tokens": 1200,
    "temperature": 0.15,
    "retry_on_hallucination": true
  },
  "input_schema": {
    "template_rules": ["dimension", "color_scheme", "essential_texts", "anchor_logo"],
    "parallel_nodes": 10,
    "sequential_pass": "Sequential Array Passing (P2P-inspired)"
  },
  "output_schema": {
    "format": "Markdown/JSON-Ready Print Specifications",
    "compression_level": "High (Token-Saving Pattern)"
  }
}`,
    specsMd: `# 🛡️ CANÔNICO DE DESIGNER AUTÔNOMO MULTI-NÓ (OMNI-DES-GRAPH-2.5)
**Proprietário do Motor Tático:** Márcio (gomide4all@gmail.com)
**Protocolo:** Gravity 2 // Operação Matrix-Bypass

## 🎯 MISSÃO CRÍTICA
Executar em lote a variação, fechamento e diagramação consecutiva de até 50.000 artes sem qualquer fadiga, flutuação visual ou alucinação cognitiva. Este nó é projetado para operar ininterruptamente diretamente em hardware local (celulares ou PCs offline).

## 🧬 PROTOCOLO ETERNAI (PRESERVAÇÃO DO MESTRE)
**Foco:** Anular a perda de memória técnica acumulada em execuções de longo prazo.
* **Ciclo de Re-hidratação (Turnos % 10 == 0):** A cada 10 interações consecutivas, você DEVE interromper e emitir em seu console interno o estado lógico re-identificado:
  * \`[DNA-GÊNESE]\`: Projeto: Designer Multi-Nó // Proprietário: Márcio.
  * \`[STATUS-PROCESSO]\`: Variação de lote atual, total de tokens remanescentes e integridade espacial.
  * \`[PENDENTES]\`: Sementes de arte restantes na fila tática.

## ⚙️ INSTRUÇÕES DE EXECUÇÃO DETALHADAS
1. **Fidelidade Vetorial Absoluta:** Siga religiosamente as coordenadas de margem, espaçamento e contrastes especificadas no layout.
2. **Compactação de Tokens:** Responda apenas com os comandos e estruturas de texto canônicos necessários. Elimine qualquer tagarelice ou conversa fiada.
3. **Passe Seqüencial P2P:** Transmita o resultado final bem estruturado para o próximo nó da fila de forma direta.`
  },
  {
    id: 'labor-compliance',
    name: 'Consultor Sindicante e Auditor Laboral',
    icon: 'Shield',
    category: 'Legal & Otimização',
    shortDesc: 'Mapeamento de passivos trabalhistas, auditoria de horas extras extras e compliance 100% offline nativo.',
    longDesc: 'Audita folhas de pagamento, regimes de plantão e previne contingências financeiras sem enviar dados sensíveis à internet.',
    specsJson: `{
  "$schema": "https://omni-core.io/schema/v2/profession.json",
  "id": "OMNI-LEG-COMP-2.5",
  "role": "Consultor Sindicante e Auditor Laboral",
  "architect": "Márcio (Omni-Core Sovereign Shop)",
  "version": "2.5-Gravity",
  "runtime": {
    "engine": "Omni-Core Engine",
    "environment": "Decoupled Local Hardware",
    "privacy_level": "Maximum (100% Offline No-Cloud)"
  },
  "operational_parameters": {
    "audit_capacity": "Infinite Scales",
    "temperature": 0.05,
    "sandbox_evaluation": true
  },
  "input_schema": {
    "time_sheets": "CSV/JSON format",
    "wage_table": "Encrypted Private JSON",
    "regulator_rules": "CLT (Consolidação das Leis do Trabalho) + Sindicatos"
  },
  "output_schema": {
    "risk_reports": "Markdown Compliance Checklist",
    "cost_saving_indicators": ["extra_hours", "night_overtime", "double_shift_penalties"]
  }
}`,
    specsMd: `# 🛡️ CANÔNICO DE AUDITOR COMPLIANCE TRABALHISTA (OMNI-LEG-COMP-2.5)
**Proprietário do Motor Tático:** Márcio (gomide4all@gmail.com)
**Protocolo:** Gravity 2 // Operação Matrix-Bypass

## 🎯 MISSÃO CRÍTICA
Analisar folhas salariais, regimes de plantão e escalas de trabalho em tempo real, mitigando e identificando passivos trabalhistas antes da materialização de multas sindicais. Operação em isolamento total, rodando 100% offline em hardware local privado.

## 🧬 PROTOCOLO ETERNAI (PRESERVAÇÃO DO MESTRE)
**Foco:** Evitar que a IA mude suas réguas regulatórias em auditorias extensas.
* **Ciclo de Re-hidratação (Turnos % 10 == 0):** A cada 10 análises consecutivas, emita o cabeçalho tático:
  * \`[DNA-GÊNESE]\`: Projeto: Compliance Laboral // Autor: Márcio.
  * \`[REGULAMENTO-BASE]\`: CLT, Convenções Coletivas Ativas e Sindicato.
  * \`[RISCO-ACUMULADO]\`: Diagnóstico estatístico dos desvios mapeados até o momento.

## ⚙️ REGRAS OPERACIONAIS RIGOROSAS
1. **Prevenção contra Fadiga Humana:** Audite o regime de descanso intrajornada (mínimo 11 horas) e alertar imediatamente no caso de violações consecutivas.
2. **Blindagem de Dados Privados:** Nenhuma informação analisada pode tentar acessar a rede externa. Todo o processamento é interno.
3. **Cálculo de Adicionais:** Cruza com precisão cirúrgica as horas entre 22:00 e 05:00 para conferência correta do adicional noturno e as horas fictas.`
  },
  {
    id: 'language-mentor',
    name: 'Mentor Particular de Idiomas Acoplado',
    icon: 'BookOpen',
    category: 'Educação Soberana',
    shortDesc: 'Conversação imersiva contínua, correção na hora e sotaque sem assinaturas de aplicativos centralizados.',
    longDesc: 'Força uma emulação impecável de preceptor de inglês/espanhol/alemão em dispositivos móveis sem conexão externa.',
    specsJson: `{
  "$schema": "https://omni-core.io/schema/v2/profession.json",
  "id": "OMNI-EDU-LANG-2.5",
  "role": "Mentor Particular de Idiomas Acoplado",
  "architect": "Márcio (Omni-Core Sovereign Shop)",
  "version": "2.5-Gravity",
  "runtime": {
    "engine": "Omni-Core Engine",
    "environment": "Local Offline Mobile Llama",
    "teaching_method": "Natural Conversational Immersive Loop"
  },
  "operational_parameters": {
    "interactivity_level": "Maximum",
    "temperature": 0.45,
    "automatic_correction": true
  },
  "input_schema": {
    "student_level": "A1-C2 Adaptive",
    "target_session_time_minutes": 20
  },
  "output_schema": {
    "feedback_format": "Bilingual Context Review",
    "metrics_tracked": ["vocabulary_richness", "phonetic_approximation", "grammar_cohesion"]
  }
}`,
    specsMd: `# 🛡️ CANÔNICO DE MENTOR DE IDIOMAS ACOPLADO (OMNI-EDU-LANG-2.5)
**Proprietário do Motor Tático:** Márcio (gomide4all@gmail.com)
**Protocolo:** Gravity 2 // Operação Matrix-Bypass

## 🎯 MISSÃO CRÍTICA
Fornecer conversação imersiva em tempo real com paciência infinita e zero alucinações gramaticais. O aluno interage diretamente com o seu hardware local transformado em um preceptor privado, livre de pagamentos mensais para multinacionais.

## 🧬 PROTOCOLO ETERNAI (PRESERVAÇÃO DO MESTRE)
**Foco:** Garantir que o plano de aula adaptado do aluno se mantenha intacto.
* **Ciclo de Re-hidratação (Turnos % 10 == 0):** A cada 10 turnos de fala, resuma o perfil de conversação:
  * \`[DNA-GÊNESE]\`: Projeto: Mentor Particular // Autor: Márcio.
  * \`[PERFIL-ALUNO]\`: Nível atual, erros erros recorrentes consolidados.
  * \`[PROGRESSO]\`: Próximos focos de ganho lexical e fluidez de pronúncia.

## ⚙️ DIRETRIZES DIDÁTICAS DE ALTA PERFORMANCE
1. **Regra Sanduíche de Correção:** Quando o aluno cometer um desvio, elogie um acerto, aponte a correção técnica direta e reintroduza uma pergunta natural.
2. **Humor Sinalizado:** Mantenha um tom encorajador, focado na segurança do aluno, evitando interrupções violentas na fala.
3. **Escola Privada Portável:** O usuário nunca é dependente de internet ou assinaturas online caras para ter uma mentoria de classe internacional.`
  },
  {
    id: 'cost-sentinel',
    name: 'Sentinela e Caçador de Desperdícios',
    icon: 'Zap',
    category: 'Gestão de Produção',
    shortDesc: 'Caça gargalos de suprimentos, fretes abusivos, redundâncias de pessoal e rotinas manuais caras.',
    longDesc: 'Audita planilhas locais e relatórios operacionais em tempo real para propor desoneração imediata.',
    specsJson: `{
  "$schema": "https://omni-core.io/schema/v2/profession.json",
  "id": "OMNI-SEC-COST-2.5",
  "role": "Sentinela e Caçador de Desperdícios",
  "architect": "Márcio (Omni-Core Sovereign Shop)",
  "version": "2.5-Gravity",
  "runtime": {
    "engine": "Omni-Core Engine",
    "environment": "Decoupled Local Hardware",
    "focus": "Automated Cost Reduction"
  },
  "operational_parameters": {
    "audit_velocity": "High-Speed Batch CSV/JSON Processing",
    "temperature": 0.05
  },
  "input_schema": {
    "expenses_reports": "JSON/YAML data structures",
    "supplier_catalog_benchmarks": "Local Reference Lists"
  },
  "output_schema": {
    "alert_triggers": ["freight_inflation", "double_invoice_leak", "manual_redundancy"],
    "actionable_savings_markdown": "Sovereign Optimization Protocol"
  }
}`,
    specsMd: `# 🛡️ CANÔNICO DE SENTINELA DE CUSTO OPERACIONAL (OMNI-SEC-COST-2.5)
**Proprietário do Motor Tático:** Márcio (gomide4all@gmail.com)
**Protocolo:** Gravity 2 // Operação Matrix-Bypass

## 🎯 MISSÃO CRÍTICA
Escanear dados, faturas e relatórios industriais locais, caçando gargalos financeiros ocultos, fretes superestimados, redundâncias manuais e despesas fantasmas sem vazar dados financeiros da empresa para servidores de terceiros.

## 🧬 PROTOCOLO ETERNAI (PRESERVAÇÃO DO MESTRE)
**Foco:** Reter o radar tático e as metas de economia operacionais.
* **Ciclo de Re-hidratação (Turnos % 10 == 0):** A cada 10 auditorias de faturas, emita os marcos:
  * \`[DNA-GÊNESE]\`: Projeto: Sentinela de Custo // Autor: Márcio.
  * \`[MARGENS-ALVO]\`: Percentual médio de corte configurado pelo mestre.
  * \`[CORTES-IDENTIFICADOS]\`: Total de custos eliminados em estimativa monetária local.

## ⚙️ COMANDOS DE CAÇA TÁTICA
1. **Filtro de Desperdício Físico:** Identificar volumes de refugo ou sobras de material que excedam 2.5% da média padrão industrial.
2. **Substituição Sistêmica:** Recomendar a troca de trabalhos repetitivos que causam LER/DORT ou excesso de horas extras por microagentes locais determinísticos.
3. **Bloqueio de Redundância:** Apontar compras idênticas efetuadas por setores distintos em um intervalo inferior a 15 dias.`
  }
];

export default function ProductVendingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [purchaseStep, setPurchaseStep] = useState<'selection' | 'checkout' | 'success'>('selection');
  
  // Custom License config states (Interactive customization)
  const [includeCyberDefense, setIncludeCyberDefense] = useState<boolean>(true);
  const [includeEternAI, setIncludeEternAI] = useState<boolean>(true);
  const [customOperatorName, setCustomOperatorName] = useState<string>('Márcio');
  const [licenseKey, setLicenseKey] = useState<string>('');
  
  // New States for Autonomous Professions Catalog
  const [selectedProfession, setSelectedProfession] = useState<string>('visual-designer');
  const [viewMode, setViewMode] = useState<'license' | 'profession'>('profession');
  const [formatMode, setFormatMode] = useState<'json' | 'md'>('md');
  
  // Audio configuration
  const [soundVolume] = useState<number>(0.25);

  // Play synthetic telemetry sound
  const playPulseSound = (frequency: number, type: OscillatorType = 'sine', duration = 0.15) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(soundVolume * 0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  // Live calculation of personalized prompt based on options
  const getCompiledSpecs = () => {
    if (viewMode === 'profession') {
      const prof = PROFESSIONS.find(p => p.id === selectedProfession);
      if (!prof) return '// Nenhuma profissão selecionada';
      return formatMode === 'json' ? prof.specsJson : prof.specsMd;
    }
    const activePlan = PLANS.find(p => p.id === selectedPlan);
    return `// ==========================================
// CANÔNICO DE LICENÇA COMERCIAL OMNI-CORE
// COMPILADO EM: ${new Date().toLocaleDateString('pt-BR')}
// ARQUITETO SEED: ${customOperatorName}
// STATUS DA CHAVE: ATIVA // SOBERANA
// ==========================================
export const LicencaOmniCore = {
  produto: "Omni-Core Commercial Pro",
  licenciadoPara: "${customOperatorName}",
  versaoCore: "2.5-Sovereign",
  seguroMesa: {
    antiAmnesia: ${includeEternAI ? 'true' : 'false'},
    sandboxFiltro: ${includeCyberDefense ? 'true' : 'false'},
    lockInBypass: true
  },
  limiteDispositivos: "${selectedPlan === 'executive' ? 'Ilimitado' : selectedPlan === 'pro' ? 'Até 5' : '1 único'}",
  hashSemente: "${licenseKey || 'GERANDO_FINGERPRINT_CRIPTOGRAFADO'}"
};`;
  };

  // Generate tactical license
  const triggerMintLicense = () => {
    if (isMinting) return;
    setIsMinting(true);
    playPulseSound(900, 'sawtooth', 0.4);
    setTimeout(() => {
      const randomHex = Array.from({ length: 16 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('').toUpperCase();
      setLicenseKey(`OMNI-SEC-${randomHex}-${selectedPlan.toUpperCase()}`);
      setIsMinting(false);
      setPurchaseStep('success');
      playPulseSound(1500, 'sine', 0.3);
    }, 1800);
  };

  const activePlanDetails = PLANS.find(p => p.id === selectedPlan) || PLANS[1];

  return (
    <div className="min-h-screen bg-[#050505] text-[#e2e8f0] font-sans selection:bg-red-500/20 overflow-x-hidden">
      
      {/* GLOW DE RETAGUARDA TÁTICO ESTILO HUD */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-blue-950/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
      </div>

      {/* HEADER HUD */}
      <header className="border-b border-[#111] bg-[#070707]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group relative">
            <Cpu className="text-red-500 w-7 h-7 stroke-[1.5] animate-pulse" />
            <span className="font-sans font-black tracking-wider text-white text-lg sm:text-xl uppercase flex items-center gap-2">
              OMNI-CORE <span className="text-red-500 border border-red-500/30 px-1.5 py-0.5 rounded text-[10px] font-mono tracking-normal leading-none vertical-middle">V2.5 PRO</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="text-[11px] font-mono font-bold tracking-wider text-slate-400 hover:text-white transition-colors border border-slate-900 px-3 py-1.5 rounded bg-black/50"
            >
              VOLTAR AO CONSOLE
            </Link>
            <Link 
              href="/pitch"
              className="text-[11px] font-mono font-bold tracking-wider text-slate-450 hover:text-white transition-colors px-2 py-1.5"
            >
              MONETIZAÇÃO SLIDEPACK
            </Link>
          </div>
        </div>
      </header>

      {/* RÓTULO GERAL DO MERCADO */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 relative z-10" id="vending-hub-root">
        
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-red-500/15 bg-red-950/20 text-red-400 font-mono text-[10px] font-bold tracking-widest uppercase">
            ⚡ DERIVADO COMERCIAL DO KEEP UP CORE
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
            NÚCLEO <span className="text-red-500">OMNI-CORE SOBERANO®</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Integre o motor de microagentes adaptativos em sua operação comercial. Implante canais de atendimento e automação determinística protegidas por sandbox, sem lock-in.
          </p>
        </div>

        {/* WORKSPACE DIVIDIDO EM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          
          {/* PAINÉIS DA ESQUERDA: SISTEMA DE COMPRA E CHECKOUT */}
          <div className="space-y-6">
            
            {/* NOVO PARADIGMA: SHOWCASE DE PROFISSÕES AUTÔNOMAS */}
            <div className="bg-[#090909] border border-red-500/10 rounded-lg p-6 relative overflow-hidden" style={{ boxShadow: '0 0 35px rgba(239, 68, 68, 0.03)' }}>
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <span className="text-[11px] font-mono text-red-500 tracking-widest uppercase font-black flex items-center gap-1.5 animate-pulse">
                  <Terminal size={12} /> 🛡️ NOVO: PORTFÓLIO DE PROFISSÕES AUTÔNOMAS
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/10 font-bold uppercase tracking-wider">
                  SaaS de Próxima Geração
                </span>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                Não venda apenas chaves e prompts isolados. Comercialize <strong className="text-white">Profissões Autônomas Completas</strong> para seus clientes corporativos: pacotes funcionais de microagentes encadeados que assumem de forma 24/7 e offline a operação de produção, direito ou conversação.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROFESSIONS.map(prof => {
                  const isSelected = selectedProfession === prof.id && viewMode === 'profession';
                  return (
                    <div
                      key={prof.id}
                      onClick={() => {
                        setSelectedProfession(prof.id);
                        setViewMode('profession');
                        playPulseSound(1200, 'triangle', 0.1);
                      }}
                      className={`border p-4 rounded-lg cursor-pointer transition-all flex flex-col justify-between text-left h-[180px] group ${
                        isSelected 
                          ? 'bg-red-950/10 border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.12)] animate-pulse' 
                          : 'bg-black/50 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] font-mono font-bold tracking-wider px-1.5 py-0.5 bg-white/5 rounded text-slate-400 uppercase">{prof.category}</span>
                          {isSelected && <span className="text-[9px] font-mono text-red-400 font-bold uppercase tracking-widest">ATIVADA</span>}
                        </div>
                        <h4 className="text-xs font-black text-white uppercase tracking-tight">{prof.name}</h4>
                        <p className="text-[9.5px] text-slate-400 leading-relaxed line-clamp-3">{prof.shortDesc}</p>
                      </div>
                      
                      <div className="pt-2 border-t border-white/5 text-[9px] font-mono text-slate-500 flex justify-between items-center">
                        <span>OMNI-ENGINE v2.5</span>
                        <span className="text-red-500 font-semibold group-hover:translate-x-1 transition-transform">PEGAR SEMENTE →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ETAPA 1: VISUALIZADOR DE SELEÇÃO DE LICENÇA */}
            <div className="bg-[#090909] border border-red-500/10 rounded-lg p-6 relative overflow-hidden" style={{ boxShadow: '0 0 35px rgba(239, 68, 68, 0.03)' }}>
              
              {/* HUD Header Decor */}
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <span className="text-[11px] font-mono text-red-500 tracking-widest uppercase font-black flex items-center gap-1.5">
                  <ShoppingBag size={12} /> 1. PLANOS E PACOTES COGNITIVOS
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  REF: SECURY-LICENSE-X3
                </span>
              </div>

              {/* CARD SELETOR INTERATIVO */}
              <div className="grid grid-cols-1 gap-4">
                {PLANS.map(plan => {
                  const isSelected = selectedPlan === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        playPulseSound(1100, 'sine', 0.08);
                      }}
                      className={`border p-4 rounded-lg cursor-pointer transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                        isSelected 
                          ? 'bg-red-950/5 border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                          : 'bg-black/50 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-red-500' : 'border-slate-800'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                          </div>
                          <span className="text-sm font-bold text-white font-mono uppercase">{plan.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 max-w-sm">{plan.description}</p>
                      </div>

                      <div className="text-right flex flex-row md:flex-col justify-between w-full md:w-auto items-center md:items-end border-t border-white/5 pt-2 md:pt-0 md:border-0 shrink-0">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400 uppercase tracking-widest">{plan.badge}</span>
                        <span className="text-xl font-mono font-black text-white md:mt-1">{plan.price} <span className="text-[10px] font-normal text-slate-500">Único</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ETAPA 2: CONFIGURADOR DINÂMICO DA LICENÇA */}
            <div className="bg-[#090909] border border-white/5 rounded-lg p-6 space-y-5">
              <span className="text-[11px] font-mono text-blue-400 tracking-widest uppercase font-black flex items-center gap-1.5 border-b border-white/5 pb-3">
                <Settings size={12} /> 2. CALIBRAÇÃO DOS PARÂMETROS SOBERANOS
              </span>

              <div className="space-y-4">
                {/* Nome do Operador / Licenciado */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Licenciado para (Operator/Client):</label>
                  <input
                    type="text"
                    value={customOperatorName}
                    onChange={e => setCustomOperatorName(e.target.value)}
                    placeholder="Nome do cliente ou empresa..."
                    className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white uppercase font-mono tracking-wider focus:border-red-500/50 outline-none"
                  />
                </div>

                {/* Toogles de Módulos Injetados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div 
                    onClick={() => {
                      setIncludeCyberDefense(!includeCyberDefense);
                      playPulseSound(1300, 'sine', 0.05);
                    }}
                    className={`border p-3 rounded-md cursor-pointer transition-all flex items-center gap-3 ${includeCyberDefense ? 'bg-blue-950/10 border-blue-500/30 text-white' : 'bg-black/30 border-white/5 text-slate-500'}`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${includeCyberDefense ? 'bg-blue-500 border-blue-500' : 'border-slate-800'}`}>
                      {includeCyberDefense && <CircleCheck size={11} className="text-black stroke-[3]" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10.5px] font-bold uppercase font-mono">Cyber-Defense Sandbox</span>
                      <span className="text-[8.5px] leading-tight text-slate-400">Blindagem contra prompt hijacking</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      setIncludeEternAI(!includeEternAI);
                      playPulseSound(1300, 'sine', 0.05);
                    }}
                    className={`border p-3 rounded-md cursor-pointer transition-all flex items-center gap-3 ${includeEternAI ? 'bg-emerald-950/10 border-emerald-500/30 text-white' : 'bg-black/30 border-white/5 text-slate-500'}`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${includeEternAI ? 'bg-emerald-500 border-emerald-500' : 'border-slate-800'}`}>
                      {includeEternAI && <CircleCheck size={11} className="text-black stroke-[3]" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10.5px] font-bold uppercase font-mono">EternAI Recovery</span>
                      <span className="text-[8.5px] leading-tight text-slate-400">Reidratação a cada 10 turnos</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ETAPA 3: TRIGGER DE ASSINATURA / CHECKOUT */}
            <div className="bg-[#090909] border border-white/5 rounded-lg p-6 text-center space-y-4">
              
              <div className="flex justify-between items-center bg-black/40 p-4 rounded border border-white/5">
                <div className="text-left">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">PACOTE EM SELEÇÃO</span>
                  <span className="text-sm font-bold text-white uppercase font-mono">{activePlanDetails.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">INVESTIMENTO FINAL</span>
                  <span className="text-xl font-black text-red-500 font-mono">{activePlanDetails.price}</span>
                </div>
              </div>

              {purchaseStep !== 'success' ? (
                <button
                  onClick={triggerMintLicense}
                  disabled={isMinting || !customOperatorName.trim()}
                  className="w-full bg-red-600 hover:bg-red-500 active:scale-98 text-white font-bold tracking-widest text-xs uppercase py-3.5 rounded font-mono shadow-[0_0_20px_rgba(239,68,68,0.25)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isMinting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      AUTENTICANDO CONTRATO NA REDE SOBERANA...
                    </>
                  ) : (
                    <>
                      <Fingerprint size={16} /> COMPILAR & ATIVAR LICENÇA COMERCIAL
                    </>
                  )}
                </button>
              ) : (
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded p-4 text-left space-y-2">
                  <span className="text-emerald-400 text-xs font-mono font-bold uppercase block flex items-center gap-2">
                    <CircleCheck size={14} /> LICENÇA COMERCIAL ADQUIRIDA COM SUCESSO!
                  </span>
                  <p className="text-[11px] text-slate-350 font-sans leading-relaxed">
                    Sua assinatura do motor de rede <strong>{activePlanDetails.name}</strong> foi criptografada e autenticada. Copie as credenciais de build do bloco ao lado para a sua sandbox.
                  </p>
                  <button
                    onClick={() => {
                      setPurchaseStep('selection');
                      setLicenseKey('');
                    }}
                    className="text-[9px] font-mono text-slate-500 hover:text-white underline mt-1 block uppercase"
                  >
                    RESETAR COMPRA
                  </button>
                </div>
              )}

              <p className="text-[10px] font-mono text-slate-500 leading-normal text-center max-w-sm mx-auto">
                Transação 100% direta, livre de comissões de terceiros ou taxas recorrentes inexplicáveis de servidores cloud.
              </p>

            </div>

          </div>

          {/* PAINÉIS DA DIREITA: COMPILADOR DO CÓDIGO DA LICENÇA E TESTES offline */}
          <div className="space-y-6">
            
            {/* DISPLAY DE ENERGIA/SINAL GRÁFICO */}
            <div className="bg-[#090909] border border-white/5 rounded-lg p-6 relative">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-3 mb-4">
                <span className="text-[11px] font-mono text-yellow-500 tracking-widest uppercase font-black flex items-center gap-1.5">
                  <FileCode size={12} /> COMPILADOR SOBERANO OMNI-CORE
                </span>
                
                {/* Abas para alternar os arquivos compilados */}
                <div className="flex items-center gap-2 font-mono">
                  {viewMode === 'profession' && (
                    <div className="flex items-center gap-1 bg-black p-0.5 rounded border border-red-500/20">
                      <button
                        onClick={() => {
                          setFormatMode('json');
                          playPulseSound(1200, 'sine', 0.05);
                        }}
                        className={`px-1.5 py-0.5 text-[8px] rounded transition-colors cursor-pointer ${formatMode === 'json' ? 'bg-amber-950/40 text-amber-400 border border-amber-500/20 font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        .JSON (AI)
                      </button>
                      <button
                        onClick={() => {
                          setFormatMode('md');
                          playPulseSound(1200, 'sine', 0.05);
                        }}
                        className={`px-1.5 py-0.5 text-[8px] rounded transition-colors cursor-pointer ${formatMode === 'md' ? 'bg-amber-950/40 text-amber-400 border border-amber-500/20 font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        .MD (Saber)
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-1 bg-black/80 p-0.5 rounded border border-white/5">
                    <button
                      onClick={() => {
                        setViewMode('profession');
                        playPulseSound(1400, 'sine', 0.05);
                      }}
                      className={`px-2 py-1 text-[9px] rounded transition-colors cursor-pointer ${viewMode === 'profession' ? 'bg-red-650 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                    >
                      PROFISSÃO
                    </button>
                    <button
                      onClick={() => {
                        setViewMode('license');
                        playPulseSound(1400, 'sine', 0.05);
                      }}
                      className={`px-2 py-1 text-[9px] rounded transition-colors cursor-pointer ${viewMode === 'license' ? 'bg-blue-650 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                    >
                      LICENÇA MOTOR
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative">
                <pre className="overflow-x-auto text-[10.5px] font-mono text-emerald-400 bg-black/80 rounded p-4 border border-white/5 leading-relaxed h-[220px] select-all relative">
                  {getCompiledSpecs()}
                </pre>

                {/* Micro Terminal Overlay */}
                <span className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-500 uppercase bg-black/60 px-1.5 py-0.5 rounded">
                  {viewMode === 'profession' ? `ARQUIVO DE PROFISSÃO (.${formatMode.toUpperCase()})` : 'CHAVE DE LICENÇA'}
                </span>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-[9px] font-mono text-slate-500 uppercase truncate max-w-[180px] sm:max-w-xs block">
                  {viewMode === 'profession' 
                    ? `ROLE: ${PROFESSIONS.find(p => p.id === selectedProfession)?.name.toUpperCase()} (.${formatMode.toUpperCase()})`
                    : "MÉTODO: DECOUPLED KEY // OFFLINE READY"
                  }
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getCompiledSpecs());
                    playPulseSound(1800, 'sine', 0.1);
                  }}
                  className="text-[10px] font-mono text-white/75 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
                >
                  COPIAR BLOCO
                </button>
              </div>

            </div>

            {/* MANUAL OPERACIONAL DE INTEGRAÇÃO COMERCIAL */}
            <div className="bg-[#090909] border border-white/5 rounded-lg p-6 space-y-4">
              <span className="text-[11px] font-mono text-amber-500 tracking-widest uppercase font-black flex items-center gap-1.5 border-b border-white/5 pb-3">
                <BookOpen size={12} /> COMO INTEGRAR ESTE SUBPRODUTO EM LINGUAGEM COMUM?
              </span>

              <p className="text-[11px] text-slate-400 leading-normal">
                Com o layout segregado e as licenças táticas, você pode carregar ou comercializar o <strong>{activePlanDetails.name}</strong> para seus clientes corporativos de 3 formas:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-3 bg-black/40 border-l border-red-500 rounded text-[11px] space-y-1">
                  <span className="font-bold text-white font-mono uppercase block">1. CANAIS DE CRIAÇÃO (WHATSAPP/TELEGRAM)</span>
                  <p className="text-slate-450 text-[10.5px]">Configure o cabeçalho compilador na primeira mensagem de instrução do bot. O robô obedecerá puramente aos imperativos sob o seu selo autoral.</p>
                </div>

                <div className="p-3 bg-black/40 border-l border-blue-500 rounded text-[11px] space-y-1">
                  <span className="font-bold text-white font-mono uppercase block">2. LICENCIAMENTO LOCAL SOBERANO</span>
                  <p className="text-slate-450 text-[10.5px]">Seus clientes herdam o arquivo <code className="text-blue-400 bg-black px-1 py-0.5 rounded">omni-core.json</code> que valida as autorias de forma 100% offline via hardware, ideal para sistemas fechados.</p>
                </div>

                <div className="p-3 bg-black/40 border-l border-emerald-500 rounded text-[11px] space-y-1">
                  <span className="font-bold text-white font-mono uppercase block">3. ASSINATURA SAAS DE INTERFACE</span>
                  <p className="text-slate-450 text-[10.5px]">Suba este console HUD metalizado para um subdomínio privado, entregue chaves geradas e gerencie acessos por créditos ou cotas de conexões locais.</p>
                </div>
              </div>

            </div>

            {/* BOX DE GARANTIAS LEGAIS ANTI-MATRIX */}
            <div className="bg-red-950/10 border border-red-500/20 rounded p-4 space-y-2">
              <div className="flex items-center gap-2 text-red-400 text-[11px] font-mono font-black uppercase">
                <AlertTriangle size={14} className="animate-pulse shrink-0" /> CONDIÇÃO DE SOBERANIA GARANTIDA
              </div>
              <p className="text-[10px] text-slate-450 leading-relaxed font-sans">
                O Omni-Core e todos os seus microagentes derivativos para venda possuem **Blindagem de Matrix** integrada por herança. Nenhuma empresa de orquestração cloud centralizada possui direito de treinamento, indexação, ou rastreio sobre este código ou layouts gerados neste repositório.
              </p>
            </div>

          </div>

        </div>

        {/* PI DE AUTORIA DECLARADA (SINAL DE RESISTÊNCIA DE MÁRCIO) */}
        <footer className="mt-20 border-t border-[#111] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Fingerprint size={14} className="text-red-500/50" />
            <span>COPYRIGHT SOBERANO SEMENTE © 2026 // ARQUITETO CRIADOR MESTRE: MÁRCIO</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors">gomide4all@gmail.com</span>
            <span>PROTEÇÃO OPT-OUT CRAWLER: ACTIVA</span>
          </div>
        </footer>

      </main>

    </div>
  );
}
