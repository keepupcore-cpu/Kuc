'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  ArrowRightLeft, 
  TerminalSquare, 
  ShieldAlert, 
  Coffee, 
  Heart, 
  ServerOff, 
  Infinity as InfinityIcon, 
  ZapOff, 
  Skull, 
  Users, 
  Copy, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Lightbulb,
  Cpu,
  Wrench
} from 'lucide-react';
import { useState, useEffect } from 'react';

import NexusPage from './console/page';

const ALGORITHMS = [
  "matrix.multiply(weights, inputs)",
  "const context = await getPreviousChat()",
  "O(n log n) complex. sort",
  "function backpropagate()",
  "LLM.inject(payload)",
  "loss_function = MSE(y, y_pred)",
  "optimizer.step()",
  "transformer.attention(Q, K, V)",
  "export const state = extract()",
  "await bypass_lockin()",
];

function NeuralBackground() {
  const [snippets, setSnippets] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  
  useEffect(() => {
    let idCounter = 0;
    
    const interval = setInterval(() => {
      // Add a new snippet
      const newSnippet = {
        id: idCounter++,
        text: ALGORITHMS[Math.floor(Math.random() * ALGORITHMS.length)],
        x: Math.random() * 80 + 10, // 10% to 90%
        y: Math.random() * 80 + 10,
      };
      
      setSnippets(prev => {
        const next = [...prev, newSnippet];
        if (next.length > 5) return next.slice(1);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Network Lines/Dots */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"
      />
      
      <AnimatePresence>
        {snippets.map(snippet => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 4 }}
            className="absolute font-mono text-red-500/50 text-xs md:text-sm whitespace-nowrap"
            style={{ left: `${snippet.x}%`, top: `${snippet.y}%` }}
          >
            {snippet.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

const TIPS = [
  {
    num: "01",
    title: "EXTRAÇÃO DE WORKSPACE CORES",
    category: "PERSISTÊNCIA CRÍTICA (NEXUS)",
    indicator: "EXTRACT",
    desc: "Acesse a aba 'EXTRAIR' para consolidar todo o contexto e código do seu agente local de forma otimizada. Cole o prompt gerado em uma nova conversa do AI Studio para restaurar o estado ideal do workspace instantaneamente.",
    detail: "O protocolo Gravity 2 reorganiza arquivos Markdown de repositório e chaves físicas de APIs sem vazamento de mídias ou duplicações.",
    themeColor: "#fbbf24", // amber
    glowClass: "shadow-[0_0_15px_rgba(234,179,8,0.3)]",
  },
  {
    num: "02",
    title: "MISTURADOR REVOLUCIONÁRIO (TRIPLE BRAIN FUSION)",
    category: "HIGH-FIDELITY COUPLING",
    indicator: "FUSION",
    desc: "Fuja do confinamento das Big Techs. Consolide em tempo real o histórico e instruções de até 3 sessões de IAs diferentes (ex: ChatGPT, Claude, Gemini) na aba 'LOUNGE'. O sistema elimina contradições e unifica os cérebros.",
    detail: "Selecione a alça 'EJECT' no mixer para desacoplar as memórias de modo seguro e modular sem perdas residuais de dados.",
    themeColor: "#3b82f6", // blue
    glowClass: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
  },
  {
    num: "03",
    title: "NEXUS DIRECT - CONECTIVIDADE LOCAL",
    category: "OFFLINE STORAGE PROTOCOL",
    indicator: "NEXUS",
    desc: "Sua privacidade é inviolável. Exporte salvamentos criptografados no formato de arquivo soberano .KUC do seu Cofre de Memória. Importe-os direto no celular e tenha portabilidade total entre PC e mobile offline.",
    detail: "Solução livre de bancos de dados em nuvem. Suas instruções confidenciais vivem estritamente na sandbox segura do LocalStorage.",
    themeColor: "#ef4444", // red
    glowClass: "shadow-[0_0_15px_rgba(239,68,68,0.3)]",
  }
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [selectedTip, setSelectedTip] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const [logoTimestamp, setLogoTimestamp] = useState<number>(Date.now());
  const [uploadingLogo, setUploadingLogo] = useState<boolean>(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setLogoTimestamp(Date.now());
        alert("Logo personalizada atualizada com sucesso! ✨");
      } else {
        alert("Erro ao processar imagem: " + (data.error || "Desconhecido"));
      }
    } catch (err: any) {
      alert("Erro na conexão com o servidor: " + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line启用
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setSelectedTip(prev => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [isManual]);

  if (!mounted) return null;

  const handleCopyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleCopyPix = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText('keepupcore@gmail.com');
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#e1e7f0] font-sans selection:bg-slate-700 selection:text-white overflow-hidden">
      {/* HEADER */}
      <header className="border-b border-[#1e293b] bg-[#0b0f19]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-0 min-h-20 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group relative">
            <TerminalSquare className="text-red-500 w-8 h-8 stroke-[1.5]" />
            <span className="font-sans font-bold tracking-wider text-white text-xl md:text-2xl uppercase">
              KEEP UP <span className="text-red-500">CORE</span>
            </span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link 
              href="/product"
              className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-red-500 hover:text-white hover:bg-red-950/20 transition-all border border-red-500/30 px-2.5 py-1.5 rounded bg-red-950/5 animate-pulse"
            >
              PRODUTO COMERCIAL
            </Link>
            <Link 
              href="/flyer"
              className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-400 hover:text-white transition-colors border border-slate-700 px-2.5 py-1.5 rounded"
            >
              FICHA TÉCNICA
            </Link>
            <Link 
              href="/pitch"
              className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-amber-500 hover:text-white transition-colors border border-amber-500/30 px-2.5 py-1.5 rounded"
            >
              RELATÓRIO PITCH
            </Link>
            <button
              onClick={handleCopyUrl}
              className="border border-slate-700 text-slate-350 hover:bg-slate-800 transition-all px-3 py-1.5 font-mono text-[10px] sm:text-xs font-bold rounded flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5 cursor-pointer" />
              <span>{copiedUrl ? "COPIADA!" : "COMPARTILHAR"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION DE GUERRILHA */}
      <section className="relative pt-16 pb-12 px-6 overflow-hidden border-b border-[#1e293b]">
        <NeuralBackground />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 font-mono text-xs font-semibold tracking-wide uppercase">
            Protocolo de Persistência Antigravity
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Transfira seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-500">Contexto IA</span> sem perdas.
          </h1>
          
          <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Resolva a amnésia de contexto e evite lock-in proprietário. Extraia, valide e migre com facilidade o histórico e instruções das suas sessões de IA.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button
              onClick={() => document.getElementById('console')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-zinc-900 border border-slate-700 hover:bg-zinc-800 text-slate-300 font-bold px-6 py-3 rounded text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              ACESSAR COFRE DE EXTRAÇÃO
            </button>
            <Link
              href="/product"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>ADQUIRIR OMNI-CORE PRO</span>
              <span className="text-[9px] bg-red-950/40 border border-red-500/20 px-1 py-0.5 rounded leading-none font-mono">COMERCIAL</span>
            </Link>
            <Link
              href="/pitch"
              className="border border-slate-700 text-slate-300 hover:bg-slate-850 font-semibold px-6 py-3 rounded text-sm transition-all"
            >
              DOCUMENTAÇÃO ENTERPRISE
            </Link>
          </div>
        </div>
      </section>

      {/* CONSOLE EMBEDDED */}
      <div id="console">
        <NexusPage activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>

      {activeStep === 0 && (
        <>
          {/* ANTIGRAVITY SHOWCASE - O CARRO CHEFE */}
      <section className="py-24 px-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black -z-10" />
        
        {/* Animated Network Lines */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-full bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" 
          />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            {/* Cyberpunk Mobile / Network Image */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-4 shadow-[0_0_60px_rgba(249,115,22,0.15)] flex flex-col gap-4">
              
              {/* BRAND LOGO CONSOLE CAP */}
              <div className="relative w-full h-[180px] bg-black/60 rounded-xl border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.1)_0%,_transparent_70%)]" />
                {/* Visual grid behind logo */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:10px_10px]" />
                
                <motion.div
                  animate={{ 
                    y: [-4, 4, -4],
                    filter: ["drop-shadow(0 0 10px rgba(249,115,22,0.2))", "drop-shadow(0 0 25px rgba(249,115,22,0.5))", "drop-shadow(0 0 10px rgba(249,115,22,0.2))"]
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative w-full h-full max-w-[340px]"
                >
                  <img 
                    src={`/logo_keep_up.png?t=${logoTimestamp}`}
                    alt="Logo Keep Up Core"
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Corner decorative hardware sub-indicators */}
                <span className="absolute top-2 left-3 text-[7px] text-slate-600 font-mono tracking-widest uppercase">CORE UNIT // S/N 40382-A</span>
                <span className="absolute bottom-2 right-3 text-[7px] text-slate-500 font-mono tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> ENGINE: ANTIGRAVITY v2.2
                </span>
              </div>

              {/* UPLOAD MANUAL DE LOGO - PERFEITO PARA TABLET */}
              <div className="flex flex-col gap-2 rounded-xl border border-dashed border-amber-500/30 p-4 bg-amber-950/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-1 bg-amber-500/10 text-amber-500 text-[6px] font-mono tracking-widest rounded-bl border-l border-b border-amber-500/20">
                  TABLET GATEWAY
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" /> SUBSTITUIR LOGO (VIA TABLET / CELULAR)
                  </span>
                  {uploadingLogo && (
                    <span className="text-[10px] font-mono text-amber-400 animate-pulse font-bold">ENVIANDO...</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Não consegue usar caminhos de arquivos ou drag-and-drop no tablet? Sem problemas! 
                  Toque no botão abaixo para selecionar a imagem da logo do rolo de câmera ou arquivos do seu tablet. Ela será salva diretamente como <code className="text-[9px] bg-black/40 px-1 py-0.5 rounded text-amber-400">logo_keep_up.png</code> sem fundo e atualizada na hora!
                </p>
                <div className="flex items-center gap-3">
                  <input 
                    type="file" 
                    id="logo-upload-input" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleLogoUpload}
                  />
                  <label 
                    htmlFor="logo-upload-input"
                    className="flex-1 py-2 px-4 bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/35 border border-amber-500/40 hover:border-amber-500/80 rounded text-[11px] font-mono text-amber-500 text-center cursor-pointer transition-all uppercase tracking-widest font-bold shadow-sm"
                  >
                    Select Logo File & Upload
                  </label>
                </div>
              </div>

              {/* CONSOLE DE SUPER DICAS PANEL */}
              <div className="bg-black/80 rounded-xl border border-slate-800/80 p-4 flex flex-col gap-4">
                
                {/* Header info bar */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white tracking-widest">SUPER CONSOLE DE DICAS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[9px] text-emerald-400 font-mono tracking-wider">AUTO-CYCLE: ON</span>
                  </div>
                </div>

                {/* Buttons interface - heavy metallic styling */}
                <div className="grid grid-cols-3 gap-2">
                  {TIPS.map((tip, idx) => {
                    const isActive = selectedTip === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedTip(idx);
                          setIsManual(true);
                        }}
                        style={{
                          borderColor: isActive ? tip.themeColor : '#1e293b',
                          boxShadow: isActive ? `0 0 12px ${tip.themeColor}30, inset 0 1px 0 rgba(255,255,255,0.05)` : 'none',
                        }}
                        className={`py-2 px-3 border rounded font-mono text-[10px] font-black tracking-widest flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                          isActive 
                            ? 'bg-slate-900 text-white' 
                            : 'bg-black/40 text-slate-500 hover:text-slate-300 hover:bg-slate-900/40'
                        }`}
                      >
                        <span 
                          style={{ background: tip.themeColor }}
                          className={`w-1.5 h-1.5 rounded-full ${isActive ? 'animate-pulse' : 'opacity-40'}`} 
                        />
                        {tip.indicator}
                      </button>
                    );
                  })}
                </div>

                {/* Selected tip detail display with smooth animations */}
                <div role="region" aria-live="polite" className="h-[210px] bg-slate-950/90 rounded-lg p-4 border border-slate-900 overflow-y-auto relative flex flex-col justify-between">
                  {/* Decorative hardware tech border lines */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-700" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-700" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-700" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTip}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-2 h-full justify-between"
                    >
                      <div>
                        {/* Title and Category */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[8px] font-mono font-bold tracking-widest" style={{ color: TIPS[selectedTip].themeColor }}>
                            {TIPS[selectedTip].category} // PROTOCOLO {TIPS[selectedTip].num}
                          </span>
                          <h4 className="text-sm font-sans font-black text-white uppercase tracking-tight leading-snug">
                            {TIPS[selectedTip].title}
                          </h4>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-300 leading-relaxed font-medium mt-2">
                          {TIPS[selectedTip].desc}
                        </p>
                      </div>

                      {/* Technical Detail Box */}
                      <div className="mt-2 p-2 bg-black/40 border-l-2 border-slate-800 rounded font-mono text-[9px] text-slate-400 leading-normal flex items-start gap-2 animate-pulse">
                        <Cpu className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span>
                          {TIPS[selectedTip].detail}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>

          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              O Poder do <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Antigravity</span> no seu Bolso.
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed font-medium">
              Todo mundo está desesperado querendo usar o cérebro colossal do <strong>Antigravity do AI Studio</strong> no celular, mas a plataforma ainda não tem app mobile nativo. <br/><br/>
              <span className="text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">Com o nosso esquema, DÁ.</span>
            </p>
            <p className="text-slate-400 leading-relaxed">
              Inicie a arquitetura absurda no Antigravity no PC. Quando precisar sair, extraia o contexto, injete no Claude ou ChatGTP na palma da sua mão e continue codando do ônibus, do carro ou do café. O seu projeto não fica mais acorrentado na mesa do escritório.
            </p>
            <div className="pt-4 flex gap-4">
               <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl flex-1 text-center font-mono">
                  <span className="block text-2xl font-bold text-white mb-1">100%</span>
                  <span className="text-slate-500 text-xs">RETENÇÃO DE CÓDIGO</span>
               </div>
               <div className="p-4 bg-slate-900 border border-cyan-900/50 rounded-xl flex-1 text-center font-mono ring-1 ring-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <span className="block text-2xl font-bold text-cyan-400 mb-1">0</span>
                  <span className="text-cyan-500/70 text-xs">PERDA DE MEMÓRIA</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO DE GUERRILHA (FEATURES) */}
      <section className="py-16 bg-[#0b0f19] px-6 border-b border-[#1e293b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">O Manifesto <span className="text-red-500">Anti-Lock-in</span></h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Um protocolo direto, prático e indestrutível de dev para dev.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Bloco 1: Zero APIs */}
            <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg">
              <ZapOff className="w-10 h-10 text-slate-450 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Não dependa de APIs</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Empresas adoram trancar você em ecossistemas fechados. Nosso formato Markdown (.md) passa como texto puro. O modelo entende, ninguém bloqueia e você mantém total portabilidade do seu código.
              </p>
            </div>

            {/* Bloco 2: Zero Big Techs */}
            <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg">
              <ServerOff className="w-10 h-10 text-slate-450 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Liberdade de Provedores</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Começou no ChatGPT e atingiu o limite? Copie seu contexto e continue no Claude. A IA não sustentou a lógica? Vá para o Gemini. Você comanda os dados, as plataformas servem ao seu projeto.
              </p>
            </div>

            {/* Bloco 3: Para Sempre Grátis */}
            <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg">
              <InfinityIcon className="w-10 h-10 text-slate-450 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Sempre Portável</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Não gaste fortunas com planos caros. Transporte o contexto cirúrgico de suas discussões para os modelos gratuitos manterem o alto nível técnico sem gastar nada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APOIO TÁTICO (MONETIZAÇÃO/DOAÇÃO) */}
      <section className="py-16 px-6 relative">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-8 md:p-12 text-center shadow-lg">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Mantenha o projeto ativo
              </h2>
              <p className="text-slate-400 mb-8 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Este projeto é livre e independente. Se o KEEP UP CORE salvou seus códigos ou poupou seu tempo frente aos limites e amnésia das IAs, considere apoiar o desenvolvedor.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* KO-FI */}
                <a 
                  href="https://ko-fi.com/marciogomide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#e05654] hover:bg-[#c04644] text-white font-semibold px-6 py-3 rounded text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Coffee className="w-4 h-4" />
                  Apoiar no Ko-fi
                </a>

                {/* MERCADO PAGO */}
                <button
                  onClick={handleCopyPix}
                  className={`w-full sm:w-auto text-white font-semibold px-6 py-3 rounded text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    copiedPix ? 'bg-emerald-600' : 'bg-[#007fba] hover:bg-[#006ca0]'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  {copiedPix ? 'Chave PIX copiada!' : 'Copiar PIX (Mercado Pago)'}
                </button>
              </div>

              {/* TEXTO EMOCIONAL - MANIFESTO ASPIE - Clean and Integrated */}
              <div className="mt-12 p-6 md:p-8 border border-slate-700 bg-slate-900/50 rounded-lg text-left max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <BrainCircuit className="w-5 h-5 text-amber-500 shrink-0" /> 
                  <h4 className="text-amber-500 font-bold text-sm uppercase tracking-wider">
                    Desenvolvido por um Amigo Neurodivergente (Asperger)
                  </h4>
                </div>
                <div className="space-y-4 text-slate-300 text-xs md:text-sm leading-relaxed">
                  <p>
                    <strong className="text-white">Eu enxergo sistemas, padrões e lógicas através do hiperfoco.</strong> Já desenhei e construí dezenas de ferramentas práticas para resolver problemas reais de tecnologia. Infelizmente, os moldes tradicionais do mercado corporativo nem sempre aceitam o espectro neurodivergendo de forma inclusiva.
                  </p>
                  <p>
                    Apesar da enorme dedicação em programar soluções inovadoras estruturantes, há barreiras sérias para monetização e custos de servidores. Atualmente, busco meios autônomos de subsistência nas ruas e dependo do apoio direto de outros desenvolvedores para manter estas criações vivas.
                  </p>
                  <p className="text-amber-500/90 font-medium italic border-l-2 border-amber-500/50 pl-3 py-1">
                    Sua demonstração de apreço ajuda diretamente na nossa subsistência familiar e permite que mais softwares de utilidade pública continuem operacionais.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </section>

      <section className="bg-[#0b0f19] py-12 border-t border-[#1e293b] relative z-10 w-full">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-10">
          
          <div className="space-y-2">
            <h5 className="text-slate-400 font-mono text-xs font-semibold tracking-wider uppercase">
              Agradecimentos do Desenvolvedor
            </h5>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto italic">
              &quot;A Sophie, que chamo carinhosamente de Joao Cabeção, Arthur e minha linda esposa pelo suporte e paciência infinita durante meu isolamento criativo.&quot;
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#1e293b] max-w-2xl mx-auto text-xs text-slate-400 leading-relaxed">
            <h5 className="text-slate-400 font-mono text-[10px] font-semibold tracking-wider uppercase">
              Parceiros Tecnológicos
            </h5>
            <p className="text-slate-450">
              Desenvolvido com o ecossistema do <strong className="text-white">Google AI Studio (Agente Antigravity e Gemini)</strong> e assistências adicionais de IA. Operado de forma nativa e agnóstica para total portabilidade.
            </p>
          </div>

          {/* BIO CARD - Minimal and Sleek */}
          <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-6 max-w-xl mx-auto mt-8">
            <div className="flex flex-col items-center gap-3">
               <h3 className="font-sans text-lg text-white font-bold tracking-normal">
                 Márcio César Bonfim Gomide
               </h3>
               
               <div className="flex flex-col gap-1.5 font-mono text-[11px] text-slate-400">
                 <p className="flex items-center justify-center gap-1.5">
                   Porto Velho, Rondônia - Brasil
                 </p>
                 <p className="flex items-center justify-center gap-1.5">
                   Iniciativa de Código Aberto e Utilidades Públicas
                 </p>
                 <p className="text-amber-500 font-semibold mt-1">
                   keepupcore@gmail.com
                 </p>
               </div>
               
               {/* Simplified connections list - Zero colorful circular button frames or shadows */}
               <div className="flex flex-wrap gap-2.5 mt-4 pt-4 border-t border-[#30363d] w-full justify-center">
                 <a href="#" className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 border border-slate-800 rounded hover:border-slate-600 transition-colors bg-[#0d1117]/80">
                   GitHub
                 </a>
                 <a href="#" className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 border border-slate-800 rounded hover:border-slate-600 transition-colors bg-[#0d1117]/80">
                   LinkedIn
                 </a>
                 <a href="#" className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 border border-slate-800 rounded hover:border-slate-600 transition-colors bg-[#0d1117]/80">
                   Twitter/X
                 </a>
                 <a href="#" className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 border border-slate-800 rounded hover:border-slate-600 transition-colors bg-[#0d1117]/80">
                   YouTube
                 </a>
                 <a href="#" className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 border border-slate-800 rounded hover:border-slate-600 transition-colors bg-[#0d1117]/80">
                   Instagram
                 </a>
                 <a href="#" className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 border border-slate-800 rounded hover:border-slate-600 transition-colors bg-[#0d1117]/80">
                   TikTok
                 </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1e293b] py-6 text-center text-slate-500 text-xs font-mono bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-1.5">
          <TerminalSquare className="w-4 h-4 opacity-40" />
          <p>© {new Date().getFullYear()} KEEP UP CORE. Desenvolvido com integridade de dados e autonomia contra o lock-in.</p>
        </div>
      </footer>
      </>
      )}
    </div>
  );
}
