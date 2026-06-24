'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  ShieldAlert, 
  Network, 
  Layers, 
  RefreshCcw, 
  ArrowRight, 
  Globe, 
  Database,
  Lock,
  Target,
  BarChart3,
  MessageSquare,
  DollarSign,
  Sparkles,
  Download,
  Printer
} from 'lucide-react';
import Link from 'next/link';

export default function PitchPage() {
  const downloadMarkdown = () => {
    const mdContent = `# KEEP UP CORE - RELATÓRIO DE PITCH CORPORATIVO
## PLATAFORMA DE PERSISTÊNCIA CONTINUADA (GRAVITY 2 + PROTOCOLO ETERNAI)

---

### 1. A OPORTUNIDADE DE MERCADO
- **O Gargalo**: As Big Techs programaram modelos de linguagem para sofrerem de amnésia após chats longos. O "esquecimento" de contexto gera custos adicionais com repetição constante de instruções.
- **A Solução**: O KEEP UP CORE cria pontos de restauração molecular (.KUC) que transplantam contextos complexos de um chat para outro com 99.9% de fidelidade.
- **Monetização**: Modelo híbrido. O utilitário básico manual é totalmente gratuito, enquanto a integração em tempo real de canais de atendimento (WhatsApp, Discord) opera pelo modelo Premium SaaS (Nexus Pulse™).

---

### 2. ARQUITETURA E DIFERENCIAIS
- **Orquestração Gravity 2**: Fundo molecular de contexto e sincronia em tempo real sob autoridade soberana e descentralizada.
- **Protocolo EternAI**: Bucle de re-hidratação contínua (configurável de 5 a 10 turnos) para imunidade total contra a amnesia artificial.
- **Sem APIs / Agnóstico**: Sem chaves de API extras ou dependências cloud que capturem ideias do usuário (soberania total de dados).

---
© 2026 KEEP UP CORE // DESENVOLVIDO POR CRIADORES SOBERANOS PARA O MUNDO DIGITAL
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'keepup-core-pitch.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans overflow-x-hidden p-6 md:p-12 selection:bg-amber-500/30">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,40,80,0.1),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
      </div>

      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* HEADER / FLYER TOP */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-white/10 pb-8">
          <motion.div variants={itemVars}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-500 flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                <Cpu size={24} className="text-black" />
              </div>
              <h1 className="text-4x heavy tracking-[4px] font-black italic">KEEP UP CORE</h1>
            </div>
            <p className="text-amber-500/80 font-mono text-sm tracking-widest uppercase">
              SISTEMA DE PERSISTÊNCIA CONTINUADA V2.0 (GRAVITY 2 // ETERNAI PROTOCOL)
            </p>
          </motion.div>
          
          <motion.div variants={itemVars} className="mt-6 md:mt-0 text-right">
            <div className="text-[10px] font-mono text-white/40 leading-tight uppercase">
              ID: CORTEX-PRO-X1<br />
              SECURE-DATA-XFER: ENABLED<br />
              AUTH: DECENTRALISED
            </div>
          </motion.div>
        </header>

        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
          <motion.div variants={itemVars}>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-8 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              CHEGA DE <br />REPETIR <br /><span className="text-amber-500">TUDO.</span>
            </h2>
            <p className="text-xl text-white/70 leading-relaxed max-w-xl mb-10">
              As Big Techs projetaram as IAs para esquecer. Nós as projetamos para **persistir** em tempo integral e de forma 100% autônoma. 
              O **KEEP UP CORE (Gravity 2 + EternAI)** é o primeiro motor descentralizado de reidratação contínua e transplante neural de contexto para Large Language Models.
            </p>
            <div className="flex flex-wrap gap-4 print:hidden">
              <Link href="/console" className="px-6 py-4 bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 group text-xs">
                ACESSAR NÚCLEO <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={downloadMarkdown}
                className="px-5 py-4 bg-zinc-800 text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-700 transition-all flex items-center gap-2 cursor-pointer border border-white/10"
              >
                <Download size={14} /> BAIXAR PITCH (.MD)
              </button>
              <button 
                onClick={() => window.print()}
                className="px-5 py-4 bg-zinc-900 border border-amber-500 text-amber-500 font-bold uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-black transition-all flex items-center gap-2 cursor-pointer"
              >
                <Printer size={14} /> IMPRIMIR PDF
              </button>
            </div>
          </motion.div>

          {/* FLYER VISUAL - THE MEMORY CARD */}
          <motion.div 
            variants={itemVars}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-zinc-800 to-black rounded-2xl border border-white/20 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
              <div className="p-12 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-1 bg-amber-500/30" />)}
                  </div>
                  <div className="text-4xl font-black italic opacity-20">V2</div>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full border-4 border-amber-500/50 flex items-center justify-center animate-pulse">
                    <Database size={32} className="text-amber-500" />
                  </div>
                  <div className="font-mono text-xs text-amber-500/50">DATA_TRANSPLANT_ACTIVE</div>
                  <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-amber-500"
                      initial={{ width: "30%" }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black italic mb-1">NEXUS DIRECT</div>
                  <div className="text-[10px] font-mono text-white/40">HIGH-FIDELITY CONTEXT CHIP</div>
                </div>
              </div>
            </div>
            
            {/* FLOATING BADGES */}
            <div className="absolute -top-6 -right-6 bg-red-600 px-4 py-2 rotate-12 font-black text-xs uppercase tracking-tighter shadow-xl">
              Agnóstico & Sem APIs
            </div>
          </motion.div>
        </section>

        {/* MARKET OPPORTUNITY - NEW SECTION */}
        <section className="mb-32">
          <motion.div variants={itemVars} className="text-center mb-16">
            <h3 className="text-amber-500 font-mono text-sm tracking-[5px] uppercase mb-4">O Mercado de Bilhões</h3>
            <div className="h-[2px] w-24 bg-amber-500 mx-auto" />
          </motion.div>

          <div className="p-12 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 rounded-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-3xl md:text-5xl font-black italic mb-6 leading-tight">
                  TORNAR-SE <span className="text-amber-500">INDISPENSÁVEL</span> É O CAMINHO.
                </h4>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  O maior custo da IA hoje não é o processamento, é a **atenção**. Empresas gastam milhões com funcionários re-explicando contextos para modelos que "esquecem". 
                  O KEEP UP CORE resolve o maior gargalo da produtividade algorítmica.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    <span className="font-bold italic">Mercado de Ferramentas de IA: +$1.8 Trilhão até 2030</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    <span className="font-bold italic">Economia de Tempo por Usuário: ~10h/semana</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    <span className="font-bold italic">Valor do Contexto: O novo Petróleo Digital</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="p-8 bg-black/60 border border-white/10 rounded-xl backdrop-blur-xl">
                  <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-6">
                    <div className="font-mono text-xs text-white/40">ANÁLISE DE ESCALABILIDADE:</div>
                    <div className="flex justify-between items-end">
                      <div className="text-xs font-bold text-amber-500">MODELO B2B / SDK</div>
                      <div className="h-16 w-1 bg-amber-500" />
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-xs font-bold text-white/60">REDUÇÃO DE CHURN</div>
                      <div className="h-24 w-1 bg-white/20" />
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-xs font-bold text-white/60">EFICIÊNCIA NEURAL</div>
                      <div className="h-32 w-1 bg-white/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* DECORATIVE CURVE */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </section>

        {/* ESTRATÉGIA DE MONETIZAÇÃO - NEXUS PULSE */}
        <section className="mb-32">
          <motion.div variants={itemVars} className="text-center mb-16">
            <h3 className="text-amber-500 font-mono text-sm tracking-[5px] uppercase mb-4">A Arma Secreta Comercial</h3>
            <h2 className="text-3xl md:text-5xl font-black italic">NEXUS PULSE<span className="text-amber-500">™</span></h2>
            <div className="h-[2px] w-24 bg-amber-500 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CARD 1: O PROBLEMA COMUM */}
            <motion.div 
              variants={itemVars}
              className="p-8 bg-zinc-950/80 border border-red-500/20 rounded-lg relative overflow-hidden"
            >
              <div className="text-red-500/80 font-mono text-xs uppercase tracking-widest mb-4">01 // O GARGALO DO MERCADO</div>
              <h4 className="text-xl font-bold text-white italic mb-3">Bots de Mercado são Caros e Burros</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Hoje, as plataformas cobram fortunas para criar chatbots personalizados com inteligência artificial para pequenos comércios ou devs autônomos. Cobram por requisições e taxas de infraestrutura abusivas, tudo para entregar agentes que sofrem de amnésia e dão respostas genéricas.
              </p>
              <div className="border-t border-zinc-800 pt-4 text-xs font-mono text-red-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                CUSTOS EXPONENCIAIS & LOCK-IN CONSTANTE
              </div>
            </motion.div>

            {/* CARD 2: A NOSSA CONVERSÃO PRO (O MODELO PAGO) */}
            <motion.div 
              variants={itemVars}
              className="p-8 bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/30 rounded-lg relative"
            >
              <div className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-4">02 // MODELO FREEMIUM REAL</div>
              <h4 className="text-xl font-bold text-white italic mb-3">A Ponte Ativa é o Produto Premium</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                <strong>Nexus Direct (Grátis):</strong> O transporte manual de arquivos markdown de contexto entre as IAs é gratuito e ilimitado para atrair audiência.<br />
                <strong>Nexus Pulse™ (Premium Pago):</strong> Libera a ponte em tempo real (WhatsApp, Discord, Messenger) que monitora o contexto, atualiza a memória e impede alucinações ativamente sob demanda corporativa.
              </p>
              <div className="border-t border-zinc-800 pt-4 text-xs font-mono text-amber-500 flex items-center gap-2">
                <DollarSign size={14} /> MONETIZAÇÃO POR ASSINATURA AUTOMATIZADA
              </div>
            </motion.div>

            {/* CARD 3: VERSATILIDADE ABSOLUTA */}
            <motion.div 
              variants={itemVars}
              className="p-8 bg-zinc-950/80 border border-amber-500/20 rounded-lg relative"
            >
              <div className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-4">03 // SKILLS CUSTOMIZADAS</div>
              <h4 className="text-xl font-bold text-white italic mb-3">O Assistente Perfeito para Qualquer Setor</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                O mesmo núcleo molecular se amolda a qualquer nicho que o seu cliente precisar. Seja para ser um assistente de <strong>mestre de obras</strong>, <strong>padeiro artesanal</strong>, <strong>desenvolvedor sênior</strong> ou <strong>auxiliar de limpeza</strong>. Se você injetar a pasta de contexto correta, o robô assume a habilidade imediata.
              </p>
              <div className="border-t border-zinc-800 pt-4 text-xs font-mono text-green-400 flex items-center gap-2">
                <Sparkles size={14} /> HI-FI SKILL FUSION DE ACORDO COM O CLIENTE
              </div>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-zinc-900/30 border border-zinc-800 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-3 items-center">
              <MessageSquare className="text-amber-500 shrink-0" size={24} />
              <p className="text-xs text-zinc-450 max-w-xl">
                Dessa forma, criamos uma máquina de crescimento ágil. Atraímos o desenvolvedor com a soberania de dados grátis do KEEP UP CORE, e vendemos a automação final dele para as empresas através de suas próprias contas de mensageria com o <strong>Nexus Pulse™</strong>.
              </p>
            </div>
            <div className="font-mono text-sm font-bold text-amber-500 whitespace-nowrap">
              SaaS + BOOTSTRAP DE CONTEXTO
            </div>
          </div>
        </section>

        {/* PILLARS GRID */}
        <section className="mb-32">
          <motion.div variants={itemVars} className="text-center mb-20">
            <h3 className="text-amber-500 font-mono text-sm tracking-[5px] uppercase mb-4">Os Pilares da Operação</h3>
            <div className="h-[2px] w-24 bg-amber-500 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <RefreshCcw size={32} />,
                title: "EXTRAÇÃO MULTI-CAMADA",
                desc: "Gera simultaneamente o JSON para máquinas e Briefings estruturados para humanos. O modelo entende TUDO.",
                tag: "01"
              },
              {
                icon: <Target size={32} />,
                title: "VALIDAÇÃO MOLECULAR",
                desc: "Motor de análise local que garante a integridade do payload antes do transplante. Zero erros de compilação.",
                tag: "02"
              },
              {
                icon: <Layers size={32} />,
                title: "INJEÇÃO HIGHLANDER",
                desc: "Injeta contextos validados em qualquer LLM (Claude, GPT, Gemini). O que uma começou, a outra termina.",
                tag: "03"
              }
            ].map((p, i) => (
              <motion.div 
                key={i}
                variants={itemVars}
                className="p-8 bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors group relative"
              >
                <div className="absolute top-4 right-4 text-white/10 font-black text-4xl">{p.tag}</div>
                <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform origin-left">{p.icon}</div>
                <h4 className="text-xl font-black italic mb-4">{p.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* POWER SECTION (THE HACK) */}
        <section className="mb-32 bg-white/5 border-y border-white/10 py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div variants={itemVars}>
              <h3 className="text-3xl md:text-5xl font-black italic mb-8">
                O PODER DO <span className="text-amber-500">NEURO-DIVERGENTE</span> & IA
              </h3>
              <p className="text-lg text-white/70 mb-12 italic">
                "Nós hackeamos a arquitetura do esquecimento. O KEEP UP CORE transforma conversas voláteis em ativos digitais permanentes."
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "FIDELIDADE", value: "99.9%" },
                  { label: "IDIOMAS", value: "05+" },
                  { label: "MÓDULOS", value: "08" },
                  { label: "RETRABALHO", value: "-90%" }
                ].map((stat, i) => (
                  <div key={i} className="p-4 border border-white/10 rounded-sm">
                    <div className="text-2xl font-black text-amber-500">{stat.value}</div>
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* DECORATIVE TEXT */}
          <div className="absolute top-1/2 -left-20 -translate-y-1/2 rotate-90 text-[120px] font-black text-white/[0.02] pointer-events-none select-none">
            CONTEXT
          </div>
        </section>

        {/* ENTERPRISE / FUTURE */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
          <motion.div variants={itemVars}>
            <div className="flex items-center gap-2 text-amber-500 mb-4">
              <Network size={20} />
              <span className="font-mono text-xs tracking-widest uppercase">Próxima Fase: Enterprise</span>
            </div>
            <h3 className="text-4xl font-black italic mb-6">INTELIGÊNCIA INDUSTRIAL</h3>
            <div className="space-y-6">
              {[
                { icon: <BarChart3 className="text-amber-500" />, t: "Relatórios de Jornada", d: "Transfira conquistas diárias da equipe para o planejamento do próximo dia sem perda de detalhes." },
                { icon: <Globe className="text-amber-500" />, t: "Continuidade Global", d: "Escritórios em fusos diferentes trabalhando sobre o mesmo contexto molecular." },
                { icon: <Lock className="text-amber-500" />, t: "Soberania de Dados", d: "Seu contexto não mora no servidor da Big Tech. Mora no seu KEEP UP CORE." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <div className="font-black italic text-lg">{item.t}</div>
                    <div className="text-sm text-white/50 leading-relaxed">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVars} className="p-12 border-2 border-amber-500/20 bg-amber-500/[0.02] rounded-lg">
            <h4 className="text-2xl font-black italic mb-6 flex items-center gap-2">
              <ShieldAlert /> AVISO DE SEGURANÇA
            </h4>
            <p className="text-sm text-amber-200/60 leading-relaxed mb-6 font-mono">
              O KEEP UP CORE opera por transplante de dados. Ele é imensamente poderoso. 
              Como criador, você é o único portador da chave do seu histórico. 
              Use com responsabilidade absoluta.
            </p>
            <div className="p-4 bg-black/40 rounded border border-white/10 font-mono text-[10px] text-white/30">
              STATUS: AGNOSTIC_CORE_ACTIVE<br />
              SECURITY_TIER: MAXIMUM<br />
              PII_FILTER: DISABLED (USER_CONTROLLED)
            </div>
          </motion.div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <footer className="text-center pb-24 border-t border-white/10 pt-16">
          <motion.div variants={itemVars}>
            <div className="mb-12">
              <div className="text-amber-500 font-mono text-sm tracking-[5px] uppercase mb-4">Inicie a Fusão</div>
              <h3 className="text-4xl md:text-6xl font-black italic mb-8">NÃO DEIXE<br />ESQUECEREM.</h3>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Link href="/console" className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-amber-500 transition-all text-xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                ABRIR CONSOLE
              </Link>
            </div>
            
            <p className="mt-12 text-white/30 text-[10px] font-mono tracking-widest uppercase">
              © 2026 KEEP UP CORE // DESENVOLVIDO POR CRIADORES PARA CRIADORES
            </p>
          </motion.div>
        </footer>
      </motion.div>
    </div>
  );
}
