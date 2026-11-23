'use client';

import React, { useMemo, useState } from 'react';
import {
  Dna,
  Copy,
  Download,
  Check,
  AlertTriangle,
  Layers,
  Sparkles,
  FileText,
  Clapperboard,
  Smile,
  PersonStanding,
  Hand,
  Film,
  Coffee,
  Drama,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OmniCoreRegistry } from '../omni-core/registry';

type SheetType =
  | 'turnaround'
  | 'expressions'
  | 'poses'
  | 'gestures'
  | 'action'
  | 'storyboard'
  | 'routine'
  | 'humor';

type SheetDefinition = {
  key: SheetType;
  label: string;
  hint: string;
  content: string;
  defaultViews: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const SHEETS: SheetDefinition[] = [
  {
    key: 'turnaround',
    label: 'Turnaround',
    hint: 'Frontal, 3/4, perfil e costas',
    content: 'vistas frontal, 3/4, perfil e costas, em escala comparável e com os detalhes fixos visíveis',
    defaultViews: 4,
    icon: PersonStanding
  },
  {
    key: 'expressions',
    label: 'Expressões',
    hint: 'Close-ups com emoções legíveis',
    content: 'close-ups com emoções legíveis, variando sobrancelhas, olhos e boca sem redesenhar a identidade-base',
    defaultViews: 9,
    icon: Smile
  },
  {
    key: 'poses',
    label: 'Poses',
    hint: 'Corpo inteiro, silhuetas distintas',
    content: 'ações de corpo inteiro com silhuetas distintas e anatomia consistente',
    defaultViews: 6,
    icon: PersonStanding
  },
  {
    key: 'gestures',
    label: 'Gestos e objetos',
    hint: 'Mãos, sinais e interações',
    content: 'mãos, sinais e interações úteis; mostre o personagem quando isso ajudar a ligar o gesto à identidade',
    defaultViews: 8,
    icon: Hand
  },
  {
    key: 'action',
    label: 'Sequência de ação',
    hint: 'Movimento ou piada visual breve',
    content: 'quadros ordenados que expressem movimento ou uma piada visual breve',
    defaultViews: 6,
    icon: Film
  },
  {
    key: 'storyboard',
    label: 'Storyboard de vídeo (5s)',
    hint: '2 canvases 16:9 · 24 painéis 9:16',
    content: 'dois canvases 16:9 com 12 painéis verticais 9:16 cada, em duas linhas de seis',
    defaultViews: 24,
    icon: Clapperboard
  },
  {
    key: 'routine',
    label: 'Rotina diária',
    hint: 'Cenas cotidianas legíveis',
    content: 'cenas de rotina diária com leitura clara de ação, continuidade de figurino e reações expressivas',
    defaultViews: 6,
    icon: Coffee
  },
  {
    key: 'humor',
    label: 'Humor visual',
    hint: 'Contraste e humor físico',
    content: 'humor de contraste e humor físico com leitura clara e expressiva, sem ferimentos gráficos',
    defaultViews: 6,
    icon: Drama
  }
];

const EXAMPLE_ANCHOR =
  'Aria: mulher adulta, rosto oval 1.618:1, pele clara, cabelo preto preso em coque baixo, olhos castanhos, pinta discreta acima do lábio esquerdo.';

const EXAMPLE_WARDROBE =
  'Jaqueta técnica cinza-escuro de mangas longas com zíper frontal e bolso no peito; camiseta preta de gola alta; calça cargo preta; coturnos pretos; pulseira metálica fina no pulso direito.';

const EXAMPLE_UNKNOWN = 'Tatuagens sob a roupa; cor exata da linha do zíper; texto em etiquetas.';

// Deterministic pt-BR thousands separator (avoids locale drift between server and client).
const formatCount = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function AtomicCharacterKitStudio() {
  const [sheetType, setSheetType] = useState<SheetType>('turnaround');
  const [anchor, setAnchor] = useState<string>('');
  const [wardrobe, setWardrobe] = useState<string>('');
  const [unknown, setUnknown] = useState<string>('');
  const [style, setStyle] = useState<string>('Ilustração limpa e reutilizável, linhas claras, cores consistentes');
  const [views, setViews] = useState<number>(4);
  const [composition, setComposition] = useState<string>('Grade ordenada, enquadramento de corpo inteiro, escala comparável entre quadros');
  const [background, setBackground] = useState<string>('Fundo branco limpo');
  const [format, setFormat] = useState<string>('PNG quadrado, 2048×2048');
  const [restrictions, setRestrictions] = useState<string>('Leve e expressivo; sem ferimentos gráficos nem violência realista gratuita.');
  const [script, setScript] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedSkill, setCopiedSkill] = useState<boolean>(false);

  const activeSheet = useMemo(
    () => SHEETS.find(sheet => sheet.key === sheetType) || SHEETS[0],
    [sheetType]
  );

  const portableSkill = OmniCoreRegistry.getSkill('atomic-character-kit');
  const portableText = portableSkill?.portable_text || '';

  const compiledPrompt = useMemo(() => {
    const safeAnchor = anchor.trim() || '[DESCREVA AQUI OS TRAÇOS VISÍVEIS E IMUTÁVEIS DO PERSONAGEM]';
    const safeWardrobe = wardrobe.trim() || '[DESCREVA AQUI O FIGURINO FIXO]';
    const unknownBlock = unknown.trim()
      ? `Detalhes não identificáveis (trate como desconhecidos e não os invente): ${unknown.trim()}`
      : 'Detalhes não identificáveis: marque como desconhecidos; não os invente.';

    if (sheetType === 'storyboard') {
      const safeScript = script.trim() || '[DESCREVA AQUI O ROTEIRO OU A CENA DE 5 SEGUNDOS]';
      return `Use o roteiro/descrição informada: ${safeScript}

Sujeito/personagem, se houver: ${safeAnchor}
Estilo visual: ${style.trim() || '[ESTILO VISUAL]'}
Gênero/tom: ${restrictions.trim() || '[GÊNERO/TOM]'}
Use somente as ações e informações desse contexto. Se faltar dado necessário, pergunte em vez de presumir.

FIGURINO FIXO (copie literalmente em todos os quadros): ${safeWardrobe}
${unknownBlock}

Para cada trecho de cinco segundos, crie dois canvases separados em proporção 16:9; não os una num panorama. Em cada canvas, disponha 12 painéis verticais 9:16 em duas linhas de seis, sem distorção. Canvas 1: painéis 01–12; canvas 2: painéis 13–24.

Crie os 24 painéis sequencialmente em ordem cronológica: quadro 01 = primeiro frame (0 s); quadro 24 = último frame (5 s). Os demais quadros mostram a progressão fiel do roteiro. Uma referência anexada de layout serve somente para a disposição visual; não copie seu conteúdo, sujeito, estilo ou ações. Numere os quadros e, se útil, marque tempos crescentes nos gutters, sem cobrir a imagem.

Composição: dois canvases 16:9 separados, cada um com 12 painéis 9:16 em duas linhas de seis. Fundo/cenário: conforme o roteiro, com continuidade de espaço e iluminação. Proporção/resolução desejadas: ${format.trim() || '[FORMATO]'}. Confirme a contagem, as proporções e a ordem. Informe qualquer limite real da ferramenta.`;
    }

    return `Use a referência visual fornecida (ou a descrição abaixo) como guia de identidade para ${safeAnchor}. Preserve os traços fixos visíveis. ${unknownBlock} O personagem usa: ${safeWardrobe}.

Crie uma folha de referência de ${activeSheet.label.toLowerCase()} em ${style.trim() || '[ESTILO VISUAL]'}, com ${views} vistas/quadros mostrando ${activeSheet.content}. Mantenha escala, anatomia, rosto, cores, materiais e roupa consistentes entre os quadros. Varie apenas pose, expressão, perspectiva, iluminação ou cenário.

Composição: ${composition.trim() || '[ENQUADRAMENTO E DISPOSIÇÃO]'}. Fundo: ${background.trim() || '[FUNDO]'}. Proporção/resolução desejadas: ${format.trim() || '[FORMATO]'}. Sem texto, rótulos ou objetos extras, a menos que sejam pedidos. Mãos, pés, rosto e objetos devem estar legíveis e anatomicamente coerentes.

Restrições de conteúdo/tom: ${restrictions.trim() || '[RESTRIÇÕES]'}. Para humor físico, priorize leitura clara e expressiva, sem ferimentos gráficos.`;
  }, [
    anchor,
    wardrobe,
    unknown,
    style,
    views,
    composition,
    background,
    format,
    restrictions,
    script,
    sheetType,
    activeSheet
  ]);

  const loadExample = () => {
    setAnchor(EXAMPLE_ANCHOR);
    setWardrobe(EXAMPLE_WARDROBE);
    setUnknown(EXAMPLE_UNKNOWN);
  };

  const copyText = async (text: string, kind: 'prompt' | 'skill') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      document.body.removeChild(helper);
    }
    if (kind === 'prompt') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      setCopiedSkill(true);
      setTimeout(() => setCopiedSkill(false), 2500);
    }
  };

  const downloadSkill = () => {
    if (!portableText) return;
    const blob = new Blob([portableText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'atomic-character-kit.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const checklist = [
    { label: 'Âncora de identidade preenchida', done: anchor.trim().length > 0 },
    { label: 'FIGURINO FIXO registrado literalmente', done: wardrobe.trim().length > 0 },
    { label: 'Formato e dimensões declarados', done: format.trim().length > 0 },
    {
      label: sheetType === 'storyboard' ? 'Roteiro de 5 segundos informado' : 'Enquadramento e disposição definidos',
      done: sheetType === 'storyboard' ? script.trim().length > 0 : composition.trim().length > 0
    }
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#040404',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    color: '#fff',
    padding: '9px 10px',
    fontSize: '11px',
    fontFamily: 'var(--mono)',
    lineHeight: '1.45',
    outline: 'none'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '9px',
    color: 'rgba(255,255,255,0.45)',
    fontFamily: 'var(--mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    marginBottom: '5px'
  };

  return (
    <div
      className="card metal-panel"
      id="atomic-character-kit-studio"
      style={{
        width: '100%',
        padding: '32px',
        borderLeft: '4px solid #fbbf24',
        background: 'rgba(5,5,5,0.85)',
        position: 'relative',
        marginTop: '24px'
      }}
    >
      <div style={{ position: 'absolute', top: '12px', right: '16px', display: 'flex', gap: '6px', opacity: 0.3 }}>
        <div style={{ width: '8px', height: '8px', background: '#fbbf24', transform: 'rotate(45deg)' }} />
        <div style={{ width: '8px', height: '8px', background: '#ef4444', transform: 'rotate(45deg)' }} />
        <div style={{ width: '8px', height: '8px', background: '#fff', transform: 'rotate(45deg)' }} />
      </div>

      <div className="card-head" style={{ borderBottomColor: '#fbbf24', marginBottom: '20px' }}>
        <span
          className="card-title"
          style={{ color: '#fbbf24', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase' }}
        >
          <Dna className="animate-pulse" size={24} /> KIT ATÔMICO DE PERSONAGEM
        </span>
      </div>

      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--head)', lineHeight: '1.6', marginBottom: '20px' }}>
        Forja folhas de personagem consistentes para qualquer gerador de imagem. Registre apenas os traços visíveis,
        trave o <strong>FIGURINO FIXO</strong> e varia apenas o que a ação exige. A skill completa está registrada no
        Omni-Core como <code style={{ color: '#fbbf24', fontFamily: 'var(--mono)' }}>atomic-character-kit</code>.
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => copyText(portableText, 'skill')}
          disabled={!portableText}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: copiedSkill ? '#10b981' : 'rgba(251,191,36,0.12)',
            border: '1px solid rgba(251,191,36,0.35)',
            color: copiedSkill ? '#052e16' : '#fbbf24',
            borderRadius: '4px',
            padding: '7px 11px',
            fontSize: '10px',
            fontWeight: 'bold',
            fontFamily: 'var(--mono)',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          {copiedSkill ? <Check size={12} /> : <Copy size={12} />}
          {copiedSkill ? 'Skill copiada' : 'Copiar skill portátil'}
        </button>
        <button
          type="button"
          onClick={downloadSkill}
          disabled={!portableText}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.8)',
            borderRadius: '4px',
            padding: '7px 11px',
            fontSize: '10px',
            fontWeight: 'bold',
            fontFamily: 'var(--mono)',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          <Download size={12} /> Baixar texto completo (.md)
        </button>
        <button
          type="button"
          onClick={loadExample}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.8)',
            borderRadius: '4px',
            padding: '7px 11px',
            fontSize: '10px',
            fontWeight: 'bold',
            fontFamily: 'var(--mono)',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={12} /> Carregar exemplo
        </button>
        {portableText && (
          <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--mono)', alignSelf: 'center', marginLeft: '4px' }}>
            {formatCount(portableText.length)} caracteres na skill
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.05fr] gap-8">
        {/* COLUNA ESQUERDA: CONFIGURAÇÃO DO KIT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* SELETOR DE FOLHA */}
          <div style={{ background: '#090909', border: '1px solid rgba(255,255,255,0.05)', padding: '18px', borderRadius: '6px' }}>
            <span style={{ fontSize: '10px', color: '#fbbf24', fontFamily: 'var(--mono)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', fontWeight: 'bold' }}>
              <Layers size={12} /> TIPO DE FOLHA / MODO 6
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '7px' }}>
              {SHEETS.map(sheet => {
                const Icon = sheet.icon;
                const isActive = sheet.key === sheetType;
                return (
                  <button
                    key={sheet.key}
                    type="button"
                    onClick={() => {
                      setSheetType(sheet.key);
                      setViews(sheet.defaultViews);
                      setFormat(
                        sheet.key === 'storyboard'
                          ? 'Dois canvases 16:9 separados (ex.: 3840×2160)'
                          : 'PNG quadrado, 2048×2048'
                      );
                    }}
                    style={{
                      textAlign: 'left',
                      background: isActive ? 'rgba(251,191,36,0.1)' : 'rgba(0,0,0,0.35)',
                      border: isActive ? '1px solid #fbbf24' : '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '5px',
                      padding: '9px 10px',
                      cursor: 'pointer',
                      color: isActive ? '#fbbf24' : 'rgba(255,255,255,0.65)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>
                      <Icon size={13} /> {sheet.label}
                    </span>
                    <span style={{ display: 'block', fontSize: '8.5px', fontFamily: 'var(--mono)', marginTop: '3px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.3 }}>
                      {sheet.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* IDENTIDADE */}
          <div style={{ background: '#090909', border: '1px solid rgba(255,255,255,0.05)', padding: '18px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '10px', color: '#fbbf24', fontFamily: 'var(--mono)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
              <Sparkles size={12} /> ÂNCORA DE IDENTIDADE
            </span>

            <div>
              <label style={labelStyle}>Traços visíveis e imutáveis (silhueta, rosto, paleta, materiais, marcas)</label>
              <textarea
                value={anchor}
                onChange={e => setAnchor(e.target.value)}
                placeholder="Ex.: adulto, rosto oval, cicatriz fina na sobrancelha esquerda, cabelo raspado..."
                rows={3}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>FIGURINO FIXO — copie literalmente em todos os prompts e quadros</label>
              <textarea
                value={wardrobe}
                onChange={e => setWardrobe(e.target.value)}
                placeholder="Peças e camadas; corte; cores; tecido/material; textura/estampa; mangas, gola e comprimento; fechos; calçados; acessórios."
                rows={4}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Detalhes encobertos ou ilegíveis — declare como desconhecidos (opcional)</label>
              <textarea
                value={unknown}
                onChange={e => setUnknown(e.target.value)}
                placeholder="Ex.: tatuagens sob a roupa; costas do personagem; texto em etiquetas."
                rows={2}
                style={inputStyle}
              />
            </div>
          </div>

          {/* COMPOSIÇÃO E FORMATO */}
          <div style={{ background: '#090909', border: '1px solid rgba(255,255,255,0.05)', padding: '18px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '10px', color: '#fbbf24', fontFamily: 'var(--mono)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
              <FileText size={12} /> COMPOSIÇÃO, ESTILO E FORMATO
            </span>

            <div>
              <label style={labelStyle}>Estilo visual</label>
              <input
                type="text"
                value={style}
                onChange={e => setStyle(e.target.value)}
                style={inputStyle}
              />
            </div>

            {sheetType !== 'storyboard' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Vistas / quadros</label>
                  <input
                    type="number"
                    min={1}
                    max={24}
                    value={views}
                    onChange={e => setViews(Math.max(1, Math.min(24, Number(e.target.value) || 1)))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Fundo</label>
                  <input
                    type="text"
                    value={background}
                    onChange={e => setBackground(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label style={labelStyle}>Roteiro ou descrição explícita do trecho de 5 segundos</label>
                <textarea
                  value={script}
                  onChange={e => setScript(e.target.value)}
                  placeholder="Descreva somente o que acontece no trecho: personagem, ação, espaço, direção do movimento, iluminação."
                  rows={4}
                  style={inputStyle}
                />
              </div>
            )}

            {sheetType !== 'storyboard' && (
              <div>
                <label style={labelStyle}>Enquadramento e disposição</label>
                <textarea
                  value={composition}
                  onChange={e => setComposition(e.target.value)}
                  rows={2}
                  style={inputStyle}
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Proporção / resolução desejada</label>
                <input
                  type="text"
                  value={format}
                  onChange={e => setFormat(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Tom / gênero / restrições</label>
                <input
                  type="text"
                  value={restrictions}
                  onChange={e => setRestrictions(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: PROMPT COMPILADO + CHECKLIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ background: '#090909', border: '1px solid rgba(251,191,36,0.2)', padding: '18px', borderRadius: '6px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '10px', color: '#fbbf24', fontFamily: 'var(--mono)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                <Dna size={12} /> PROMPT COMPILADO DO KIT
              </span>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--mono)' }}>
                {formatCount(compiledPrompt.length)} CARACTERES
              </span>
            </div>

            <div
              style={{
                height: '340px',
                overflowY: 'auto',
                background: '#040404',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '4px',
                padding: '12px',
                fontFamily: 'var(--mono)',
                fontSize: '10.5px',
                color: 'rgba(255,255,255,0.88)',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.55'
              }}
            >
              {compiledPrompt}
            </div>

            <button
              type="button"
              onClick={() => copyText(compiledPrompt, 'prompt')}
              style={{
                width: '100%',
                marginTop: '10px',
                background: copied ? '#10b981' : '#fbbf24',
                border: 'none',
                color: copied ? '#052e16' : '#1c1917',
                fontWeight: 'bold',
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                padding: '11px',
                borderRadius: '4px',
                cursor: 'pointer',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                boxShadow: copied ? '0 0 18px rgba(16,185,129,0.2)' : '0 0 18px rgba(251,191,36,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'PROMPT COPIADO' : 'COPIAR PROMPT DO KIT'}
            </button>
          </div>

          {/* CHECKLIST DE INTEGRIDADE */}
          <div style={{ background: '#090909', border: '1px solid rgba(255,255,255,0.05)', padding: '18px', borderRadius: '6px' }}>
            <span style={{ fontSize: '10px', color: '#fbbf24', fontFamily: 'var(--mono)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', fontWeight: 'bold' }}>
              <AlertTriangle size={12} /> CHECKLIST DE INTEGRIDADE DO KIT
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {checklist.map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '3px',
                      flexShrink: 0,
                      marginTop: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: item.done ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${item.done ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.12)'}`,
                      color: item.done ? '#10b981' : 'rgba(255,255,255,0.25)'
                    }}
                  >
                    {item.done && <Check size={9} />}
                  </span>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--mono)', color: item.done ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {checklist.every(item => item.done) && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ fontSize: '9px', color: '#10b981', fontFamily: 'var(--mono)', marginTop: '10px', lineHeight: 1.4 }}
                >
                  ✔ Kit pronto para copiar. Revise contagem, identidade, anatomia, recortes, fundo e dimensões na imagem final.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
