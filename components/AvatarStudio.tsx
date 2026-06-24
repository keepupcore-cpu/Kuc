'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Sparkles, 
  SlidersHorizontal, 
  Video, 
  Gamepad2, 
  RotateCcw, 
  Maximize, 
  Play, 
  Check, 
  Mic, 
  Sliders, 
  CornerDownRight, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AvatarStudio() {
  // Posicionamento do Avatar no Palco
  const [xPos, setXPos] = useState<number>(50); // % do palco (horizontal)
  const [yPos, setYPos] = useState<number>(60); // % do palco (vertical)
  const [scale, setScale] = useState<number>(100); // % escala zoom (frente/trás)
  const [activePose, setActivePose] = useState<'front' | 'back' | 'left' | 'right' | 'side'>('front');

  // Calibradores de Sprite Sheet
  const [cropX, setCropX] = useState<number>(0);       // % Offset X
  const [cropY, setCropY] = useState<number>(0);       // % Offset Y
  const [cropW, setCropW] = useState<number>(25);      // % Largura do Sprite
  const [cropH, setCropH] = useState<number>(100);     // % Altura do Sprite
  const [calibrationMode, setCalibrationMode] = useState<boolean>(false);

  // Mecanismo de Áudio & Fala
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [customPhrase, setCustomPhrase] = useState<string>("Sim, Mestre Márcio. O núcleo molecular do Keep Up está operando a 100% de integridade.");
  const [nasality, setNasality] = useState<number>(6.5); // Nível de voz nasal (1-10)
  const [telemetryVolume, setTelemetryVolume] = useState<number>(0.3);
  const [lastSpokenText, setLastSpokenText] = useState<string>("");
  const [speechFinished, setSpeechFinished] = useState<boolean>(true);
  const [voiceWave, setVoiceWave] = useState<number[]>([10, 10, 10, 10, 10, 10, 10, 10, 10]);

  // Teclas ativas
  const [activeKeys, setActiveKeys] = useState<{ [key: string]: boolean }>({});

  // Citações Soberanas Predefinidas do Dr. Alpha
  const SOVEREIGN_QUOTES = [
    { text: "Sim, Márcio. O contexto foi reidratado taticamente e a Matrix central foi anulada!", category: "Fidelidade" },
    { text: "Iniciando sequência de transplante neural de altíssima precisão via AGENTS.md.", category: "Transplante" },
    { text: "Módulo de Forja Bloqueado! Chave tática de monetização orgânica no YouTube em andamento.", category: "Monetização" },
    { text: "Calibrando voz robótica-nasal com ressonância metálica superior... Bip-bop-bip!", category: "Calibração" }
  ];

  // Presets de corte baseados em Turnaround típico de Gemini (4 colunas simétricas)
  const PRESETS = {
    front: { cx: 4, cy: 0, cw: 22, ch: 100 },
    side:  { cx: 28, cy: 0, cw: 22, ch: 100 },
    back:  { cx: 52, cy: 0, cw: 22, ch: 100 },
    other: { cx: 75, cy: 0, cw: 22, ch: 100 }
  };

  // Carrega predefinições ao alterar pose para sincronizar
  const applyPosePreset = (pose: 'front' | 'back' | 'left' | 'right' | 'side') => {
    setActivePose(pose);
    if (pose === 'front') {
      setCropX(PRESETS.front.cx);
      setCropY(PRESETS.front.cy);
      setCropW(PRESETS.front.cw);
      setCropH(PRESETS.front.ch);
    } else if (pose === 'back') {
      setCropX(PRESETS.back.cx);
      setCropY(PRESETS.back.cy);
      setCropW(PRESETS.back.cw);
      setCropH(PRESETS.back.ch);
    } else if (pose === 'left' || pose === 'right' || pose === 'side') {
      setCropX(PRESETS.side.cx);
      setCropY(PRESETS.side.cy);
      setCropW(PRESETS.side.cw);
      setCropH(PRESETS.side.ch);
    }
  };

  // Caminhada tática fluida e contínua via teclas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's', 'a', 'd'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      setActiveKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Loop de física/animação de caminhada
  useEffect(() => {
    const updatePhysics = () => {
      let isMoving = false;
      let nextX = xPos;
      let nextY = yPos;
      let nextScale = scale;
      let nextPose = activePose;

      if (activeKeys['arrowup'] || activeKeys['w']) {
        nextY = Math.max(25, yPos - 1.5);
        nextScale = Math.max(50, scale - 1.2);
        nextPose = 'back';
        isMoving = true;
      }
      if (activeKeys['arrowdown'] || activeKeys['s']) {
        nextY = Math.min(85, yPos + 1.5);
        nextScale = Math.min(150, scale + 1.2);
        nextPose = 'front';
        isMoving = true;
      }
      if (activeKeys['arrowleft'] || activeKeys['a']) {
        nextX = Math.max(5, xPos - 1.5);
        nextPose = 'left';
        isMoving = true;
      }
      if (activeKeys['arrowright'] || activeKeys['d']) {
        nextX = Math.min(95, xPos + 1.5);
        nextPose = 'right';
        isMoving = true;
      }

      if (isMoving) {
        setXPos(nextX);
        setYPos(nextY);
        setScale(nextScale);
        if (nextPose !== activePose) {
          applyPosePreset(nextPose);
        }
        // Animação de caminhada metálica barulhenta com bips aleatórios
        if (Math.random() < 0.05) {
          playWalkPing();
        }
      }
    };

    const interval = setInterval(updatePhysics, 33); // ~30 FPS
    return () => clearInterval(interval);
  }, [activeKeys, xPos, yPos, scale, activePose]);

  // Sons sintéticos de telemetria baseados no Web Audio API
  const playWalkPing = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
      // tom agudo e robótico de telemetria
      osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(telemetryVolume * 0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Ignora falhas se áudio não inicializado/bloqueado
    }
  };

  const playSpeakBeepEx = (accentHz: number, durationSec: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(accentHz, ctx.currentTime);
      gain.gain.setValueAtTime(telemetryVolume * 0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationSec);
    } catch (e) {}
  };

  // TTS por WebSpeech API simula a voz nasal
  const triggerTelemetrySpeak = (phraseText: string) => {
    if (!phraseText.trim()) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Para fala anterior

      const utterance = new SpeechSynthesisUtterance(phraseText);
      utterance.lang = 'pt-BR';
      // Ajusta parâmetros para soar robótico e nasal (fino com taxa ligeiramente acelerada)
      // Um tom alto simulando cavidade nasal contraída
      const computedPitch = 1.3 + (nasality / 10) * 0.5; // pitch de 1.3 até 1.8
      utterance.pitch = computedPitch;
      utterance.rate = 1.15;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeechFinished(false);
        setLastSpokenText(phraseText);
        playSpeakBeepEx(1800, 0.25);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeechFinished(true);
        playSpeakBeepEx(1100, 0.15);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeechFinished(true);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback sem suporte a fala
      setIsSpeaking(true);
      setSpeechFinished(false);
      setLastSpokenText(phraseText);
      setTimeout(() => {
        setIsSpeaking(false);
        setSpeechFinished(true);
      }, 3000);
    }
  };

  // Simulação gráfica de onda sonora enquanto fala
  useEffect(() => {
    let waveInterval: NodeJS.Timeout;
    if (isSpeaking) {
      waveInterval = setInterval(() => {
        setVoiceWave(Array.from({ length: 12 }, () => Math.floor(5 + Math.random() * (nasality * 6))));
      }, 80);
    } else {
      setVoiceWave([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
    }
    return () => clearInterval(waveInterval);
  }, [isSpeaking, nasality]);

  // Reiniciar posição e calibração
  const resetAvatarPhysics = () => {
    setXPos(50);
    setYPos(60);
    setScale(100);
    applyPosePreset('front');
    playSpeakBeepEx(1400, 0.2);
  };

  return (
    <div className="card metal-panel" style={{ width: '100%', padding: '32px', borderLeft: '4px solid #ef4444', background: 'rgba(0,0,0,0.55)', position: 'relative', marginTop: '24px' }}>
      
      {/* Decorative top rivet mesh */}
      <div style={{ position: 'absolute', top: '12px', right: '16px', display: 'flex', gap: '6px', opacity: 0.3 }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
      </div>

      <div className="card-head" style={{ borderBottomColor: '#ef4444', marginBottom: '24px' }}>
        <span className="card-title" style={{ color: '#ef4444', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase' }}>
          <Sparkles className="animate-pulse" size={24} /> ESTÚDIO AVATAR 2.0 // SIMULADOR DE MOVIMENTO & FALA NASAL
        </span>
      </div>

      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--head)', lineHeight: '1.6', marginBottom: '24px' }}>
        Criado sob o DNA de design de Márcio. Este painel isola a folha de personagem consistente do seu avatar <strong>Dr. Alpha (Scientific Atlas)</strong>. Ele conta com um palco interativo retro-futurista onde você pode movimentá-lo em coordenadas completas e gerar fala nasal sintética via telemetria acústica!
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-8">
        
        {/* COLUNA ESQUERDA: PALCO DA SIMULAÇÃO (HUD AMBIENT PLANE) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '10px', color: '#8a99ad', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              📍 PALCO DE TESTE DO AVATAR // HUD FÍSICO CONTROLLER
            </span>
            <span style={{ fontSize: '9px', color: '#10b981', fontFamily: 'var(--mono)' }}>
              COORDENADAS: X={xPos.toFixed(1)}% | Y={yPos.toFixed(1)}% | E={scale.toFixed(0)}%
            </span>
          </div>

          {/* PALCO DE EXIBIÇÃO: TEXTURA BRONZEADOS/GRUNGE DO MEIO */}
          <div 
            style={{ 
              width: '100%', 
              height: '420px', 
              background: 'radial-gradient(circle at center, #1b2631 0%, #080d12 100%)', 
              border: '3px solid #2d3748', 
              borderRadius: '8px', 
              position: 'relative', 
              overflow: 'hidden',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9)'
            }}
          >
            {/* Background texture matching image 3 (using simple overlay mask for rust/grunge aesthetic) */}
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                opacity: 0.15,
                background: 'radial-gradient(ellipse at center, transparent 0%, #000 100%), repeating-linear-gradient(45deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 2px, transparent 2px, transparent 4px)',
                pointerEvents: 'none'
              }} 
            />

            {/* DYNAMIC SHADOWS SPOTLIGHT */}
            <div style={{ position: 'absolute', top: '20%', left: '30%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '10%', right: '10%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 80%)', pointerEvents: 'none' }} />

            {/* LOGO KEEP UP CORE (attachment 1) NO TOPO DO PALCO */}
            <div 
              style={{ 
                position: 'absolute', 
                top: '20px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                zIndex: 20, 
                width: '180px', 
                height: '50px',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.7))',
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Logo from public directory */}
              <img 
                src="/logo_keep_up.png" 
                alt="KEEP UP Core" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* AVATAR ACTOR (SLICED SPRITE INSIDE THE SHEET) */}
            <div 
              style={{ 
                position: 'absolute', 
                left: `${xPos}%`, 
                top: `${yPos}%`, 
                transform: `translate(-50%, -75%) scale(${scale / 100})`,
                transition: 'all 0.05s linear',
                zIndex: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none'
              }}
            >
              {/* Shadow floor disk */}
              <div 
                style={{ 
                  width: '90px', 
                  height: '14px', 
                  borderRadius: '50%', 
                  background: 'rgba(0,0,0,0.6)', 
                  filter: 'blur(4px)',
                  position: 'absolute',
                  bottom: '-5px',
                  zIndex: -1,
                  transform: 'scale(1.1)'
                }} 
              />

              {/* Character sprite container with CSS cutout */}
              <div 
                style={{ 
                  width: '160px', 
                  height: '240px', 
                  overflow: 'hidden', 
                  position: 'relative',
                  border: calibrationMode ? '1px dashed #ef4444' : 'none'
                }}
              >
                <img 
                  src="/dr_alpha_model_sheet.png" 
                  alt="Dr. Alpha Model Sprite" 
                  style={{
                    position: 'absolute',
                    width: `${100 / (cropW / 100)}%`, // Adapta baseado na largura do crop
                    height: `${100 / (cropH / 100)}%`, // Adapta baseado na altura do crop
                    left: `-${cropX * (160 / cropW)}px`, // Deslocamento dinâmico
                    top: `-${cropY * (240 / cropH)}px`, // Deslocamento dinâmico
                    objectFit: 'fill',
                    transform: activePose === 'right' ? 'scaleX(-1)' : 'none',
                    transformOrigin: 'center center'
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Simulated speak core overlay (cor de reator) */}
                {isSpeaking && (
                  <div 
                    style={{ 
                      position: 'absolute',
                      top: '47%', 
                      left: activePose === 'right' ? '60%' : activePose === 'left' ? '40%' : '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#06b6d4',
                      boxShadow: '0 0 14px #06b6d4, 0 0 28px #06b6d4',
                      opacity: 0.8,
                      animation: 'pulse 0.2s infinite'
                    }} 
                  />
                )}
              </div>

              {/* Subtitles on speech active */}
              {isSpeaking && (
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '-45px', 
                    background: 'rgba(5, 10, 15, 0.9)', 
                    border: '1px solid #ef4444', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    width: '260px', 
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    whiteSpace: 'normal',
                    zIndex: 40
                  }}
                >
                  <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: 'bold', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--mono)', marginBottom: '1px' }}>
                    🎙️ DR. ALPHA TELEMETRIA:
                  </span>
                  <p style={{ fontSize: '11px', color: '#fff', margin: 0, fontFamily: 'var(--head)', lineHeight: '1.3' }}>
                    {lastSpokenText}
                  </p>
                </div>
              )}
            </div>

            {/* Instruction Banner at Bottom */}
            <div 
              style={{ 
                position: 'absolute', 
                bottom: '12px', 
                left: '12px', 
                right: '12px', 
                background: 'rgba(0,0,0,0.7)', 
                border: '1px solid rgba(255,255,255,0.06)', 
                borderRadius: '4px', 
                padding: '10px 14px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                zIndex: 25
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="live-pill" style={{ display: 'inline-block', width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--head)', color: 'rgba(255,255,255,0.8)' }}>
                  Pressione <kbd style={{ padding: '2px 4px', background: '#1a202c', border: '1px solid #4a5568', borderRadius: '3px', color: '#fff', fontSize: '9px', margin: '0 2px' }}>W</kbd> 
                  <kbd style={{ padding: '2px 4px', background: '#1a202c', border: '1px solid #4a5568', borderRadius: '3px', color: '#fff', fontSize: '9px', margin: '0 2px' }}>A</kbd> 
                  <kbd style={{ padding: '2px 4px', background: '#1a202c', border: '1px solid #4a5568', borderRadius: '3px', color: '#fff', fontSize: '9px', margin: '0 2px' }}>S</kbd> 
                  <kbd style={{ padding: '2px 4px', background: '#1a202c', border: '1px solid #4a5568', borderRadius: '3px', color: '#fff', fontSize: '9px', margin: '0 2px' }}>D</kbd> ou as <b>Setas do Teclado</b> para caminhar.
                </span>
              </div>
              <button 
                onClick={resetAvatarPhysics}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', color: '#fff', padding: '4px 8px', fontSize: '10px', cursor: 'pointer', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RotateCcw size={10} /> REINICIAR
              </button>
            </div>
          </div>

          {/* VIRTUAL GAMEPAD / CONTROLES FÍSICOS NA TELA */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '14px', background: '#090909', padding: '16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Teclas Auxiliares Virtuais (Direcional):</span>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', maxWidth: '140px' }}>
                <div />
                <button 
                  onMouseDown={() => setActiveKeys(p => ({ ...p, arrowup: true }))}
                  onMouseUp={() => setActiveKeys(p => ({ ...p, arrowup: false }))}
                  onMouseLeave={() => setActiveKeys(p => ({ ...p, arrowup: false }))}
                  style={{ background: activeKeys['arrowup'] ? '#ef4444' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', height: '32px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ▲
                </button>
                <div />
                
                <button 
                  onMouseDown={() => setActiveKeys(p => ({ ...p, arrowleft: true }))}
                  onMouseUp={() => setActiveKeys(p => ({ ...p, arrowleft: false }))}
                  onMouseLeave={() => setActiveKeys(p => ({ ...p, arrowleft: false }))}
                  style={{ background: activeKeys['arrowleft'] ? '#ef4444' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', height: '32px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ◀
                </button>
                <button 
                  onMouseDown={() => setActiveKeys(p => ({ ...p, arrowdown: true }))}
                  onMouseUp={() => setActiveKeys(p => ({ ...p, arrowdown: false }))}
                  onMouseLeave={() => setActiveKeys(p => ({ ...p, arrowdown: false }))}
                  style={{ background: activeKeys['arrowdown'] ? '#ef4444' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', height: '32px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ▼
                </button>
                <button 
                  onMouseDown={() => setActiveKeys(p => ({ ...p, arrowright: true }))}
                  onMouseUp={() => setActiveKeys(p => ({ ...p, arrowright: false }))}
                  onMouseLeave={() => setActiveKeys(p => ({ ...p, arrowright: false }))}
                  style={{ background: activeKeys['arrowright'] ? '#ef4444' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', height: '32px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ▶
                </button>
              </div>
            </div>

            {/* CONTROLES DE ESCALA & DISTÂNCIA */}
            <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)', display: 'block', textTransform: 'uppercase' }}>Escala do Robô (Geral):</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--mono)' }}>AFINAR (50%)</span>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={scale} 
                  onChange={(e) => setScale(parseInt(e.target.value))}
                  style={{ flex: 1, accentColor: '#ef4444' }} 
                />
                <span style={{ fontSize: '11px', color: '#fff', fontFamily: 'var(--mono)', fontWeight: 'bold' }}>AMPLIAR (150%)</span>
              </div>

              {/* POSES QUICK PRESET SWITCHER */}
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>Alterar Pose Manualmente:</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['front', 'side', 'back'] as const).map((pose) => (
                    <button
                      key={pose}
                      onClick={() => applyPosePreset(pose)}
                      style={{
                        flex: 1,
                        background: activePose === pose ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.03)',
                        border: activePose === pose ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.06)',
                        color: activePose === pose ? '#ef4444' : 'rgba(255,255,255,0.6)',
                        borderRadius: '4px',
                        padding: '6px',
                        fontSize: '11px',
                        fontFamily: 'var(--mono)',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                      }}
                    >
                      {pose === 'front' ? 'Frente' : pose === 'back' ? 'Costas' : 'Perfil'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: MECANISMO DE FALA NASAL + CALIBRADOR DE ARRASTES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* NASAL VOICE ENGINE CONFIG */}
          <div style={{ background: '#090909', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '20px' }}>
            <span style={{ fontSize: '11px', color: '#ef4444', fontFamily: 'var(--mono)', textTransform: 'uppercase', display: 'block', marginBottom: '14px', fontWeight: 'bold' }}>
              🎙️ CONTROLADOR DE VOZ NASAL (SYNTH TELEMETRY)
            </span>

            {/* PRE-PROGRAMMED PHRASES */}
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Selecione uma Frase de Transmissão:</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {SOVEREIGN_QUOTES.map((quote, qId) => (
                <button
                  key={qId}
                  onClick={() => {
                    setCustomPhrase(quote.text);
                    triggerTelemetrySpeak(quote.text);
                  }}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    textAlign: 'left',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '12px',
                    fontFamily: 'var(--head)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.1s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <span style={{ flex: 1, paddingRight: '12px' }}>"{quote.text}"</span>
                  <span style={{ fontSize: '9px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1.5px solid rgba(239, 68, 68, 0.2)', padding: '2px 6px', borderRadius: '3px', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>
                    {quote.category}
                  </span>
                </button>
              ))}
            </div>

            {/* CUSTOM PHRASE TYPE AREA */}
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Escreva uma Frase Personalizada para a Telemetria:</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea
                value={customPhrase}
                onChange={(e) => setCustomPhrase(e.target.value)}
                placeholder="Insira o texto que o Dr. Alpha irá pronunciar de forma nasalizada..."
                style={{
                  width: '100%',
                  height: '70px',
                  background: '#020617',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: '#fff',
                  padding: '10px',
                  fontSize: '12px',
                  fontFamily: 'var(--head)',
                  resize: 'none'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Visual Oscillator Soundwave Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '28px', flex: 1, paddingRight: '12px' }}>
                  {voiceWave.map((h, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        width: '3px', 
                        height: `${h}px`, 
                        background: isSpeaking ? '#06b6d4' : 'rgba(255,255,255,0.1)', 
                        borderRadius: '1px', 
                        transition: 'height 0.1s ease',
                        boxShadow: isSpeaking ? '0 0 6px rgba(6,182,212,0.5)' : 'none'
                      }} 
                    />
                  ))}
                </div>

                <button 
                  onClick={() => triggerTelemetrySpeak(customPhrase)}
                  disabled={!customPhrase.trim()}
                  style={{
                    background: '#ef4444',
                    border: 'none',
                    color: '#fff',
                    fontFamily: 'var(--head)',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    padding: '10px 18px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    boxShadow: '0 0 14px rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Play size={11} fill="#fff" /> FALAR VIA TELEMETRIA
                </button>
              </div>
            </div>

            {/* METRIC NOISE ACCENTS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
              <div>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)', display: 'block', textTransform: 'uppercase' }}>Nasalização / Agudeza:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="0.5"
                    value={nasality} 
                    onChange={(e) => setNasality(parseFloat(e.target.value))}
                    style={{ flex: 1, accentColor: '#06b6d4' }} 
                  />
                  <span style={{ fontSize: '11px', color: '#06b6d4', fontFamily: 'var(--mono)', fontWeight: 'bold' }}>{nasality.toFixed(1)}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)', display: 'block', textTransform: 'uppercase' }}>Volume de Telemetria:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={telemetryVolume} 
                    onChange={(e) => setTelemetryVolume(parseFloat(e.target.value))}
                    style={{ flex: 1, accentColor: '#ffbf00' }} 
                  />
                  <span style={{ fontSize: '11px', color: '#ffbf00', fontFamily: 'var(--mono)', fontWeight: 'bold' }}>{(telemetryVolume * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

          </div>

          {/* CALIBRATION SENSOR (SPRITE CROP TUNER) */}
          <div style={{ background: '#090909', border: '1.5px dashed rgba(255,255,255,0.1)', borderRadius: '6px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', color: '#ffb61e', fontFamily: 'var(--mono)', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ⚙️ CALIBRADOS SENSORIAIS DA FOLHA DE PERSONAGEMS
              </span>
              
              <button
                onClick={() => setCalibrationMode(!calibrationMode)}
                style={{
                  background: calibrationMode ? 'rgba(255, 182, 30, 0.15)' : 'rgba(255,255,255,0.03)',
                  border: calibrationMode ? '1px solid #ffb61e' : '1px solid rgba(255,255,255,0.08)',
                  color: calibrationMode ? '#ffb61e' : 'rgba(255,255,255,0.4)',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  fontSize: '9px',
                  fontFamily: 'var(--mono)',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {calibrationMode ? 'Desativar Caixa' : 'Ativar Caixa'}
              </button>
            </div>

            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--head)', lineHeight: '1.4', marginBottom: '16px' }}>
              Precisa recortar o turnaround de forma diferente? Ajuste os potenciômetros calibradores abaixo em tempo real para encontrar a moldura perfeita do seu personagem na folha:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.4)' }}>
                  <span>Horizontal Offset (Crop X):</span>
                  <span style={{ color: '#fff' }}>{cropX}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="80" 
                  value={cropX} 
                  onChange={(e) => setCropX(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#ffb61e', marginTop: '4px' }} 
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.4)' }}>
                  <span>Vertical Offset (Crop Y):</span>
                  <span style={{ color: '#fff' }}>{cropY}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={cropY} 
                  onChange={(e) => setCropY(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#ffb61e', marginTop: '4px' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.4)' }}>
                    <span>Largura Foco:</span>
                    <span style={{ color: '#fff' }}>{cropW}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="50" 
                    value={cropW} 
                    onChange={(e) => setCropW(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#ffb61e', marginTop: '4px' }} 
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.4)' }}>
                    <span>Altura Foco:</span>
                    <span style={{ color: '#fff' }}>{cropH}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={cropH} 
                    onChange={(e) => setCropH(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#ffb61e', marginTop: '4px' }} 
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 182, 30, 0.04)', padding: '10px 12px', borderRadius: '4px', border: '1px solid rgba(255, 182, 30, 0.15)', marginTop: '16px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--head)' }}>
                👉 Folha Carregada:
              </span>
              <a 
                href="/dr_alpha_model_sheet.png" 
                target="_blank" 
                rel="noreferrer"
                style={{ fontSize: '10px', color: '#ffb61e', fontFamily: 'var(--mono)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Abrir Imagem em Nova Guia <ExternalLink size={10} />
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
