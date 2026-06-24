'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { translations, Lang } from '@/translations';
import { Cpu, CheckCircle2, AlertTriangle, Printer, FileText, Download } from 'lucide-react';

function FlyerContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') as Lang) || 'pt';
  const t = translations[lang];

  const downloadMarkdown = () => {
    const mdContent = `# ${t.flyerTitle}
### ${t.flyerSubtitle}

**SEC_LEVEL**: ALPHA-1
**VERSION**: 2.0.0-STABLE
**DATE**: 2026.06

---

## ${t.independenceReportTitle}
${(t.independenceReportItems as string[]).map(item => `- ${item}`).join('\n')}

---

## ${t.whatItDoes}
${(t.whatItDoesItems as string[]).map(item => `- ${item}`).join('\n')}

---

## ${t.whatItDoesnt}
${(t.whatItDoesntItems as string[]).map(item => `- ${item}`).join('\n')}

---

### PROTOCOLO DE CONFORMIDADE
Este sistema foi desenvolvido para atuar como uma ponte de hardware lógico entre diferentes instâncias de Inteligência Artificial. A eficácia do transplante de contexto é garantida pela estrutura molecular do payload JSON gerado pelo motor CORE. Ao utilizar este software, a organização garante soberania sobre o histórico de co-criação digital.

---
${t.footerNotice}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'keepup-core-dossier.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] p-[20mm] relative border border-zinc-200">
      
      {/* HEADER */}
      <header className="border-b-4 border-black pb-8 mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Cpu size={40} className="text-black" />
            <h1 className="text-4xl font-black italic tracking-tighter">KEEP UP CORE</h1>
          </div>
          <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase font-bold">
            {t.flyerSubtitle}
          </p>
        </div>
        <div className="text-right font-mono text-[10px] text-zinc-400">
          SEC_LEVEL: ALPHA-1<br />
          VERSION: 1.0.0-STABLE<br />
          DATE: 2026.05
        </div>
      </header>

      {/* CONTENT */}
      <div className="space-y-12">
        
        {/* SECTION: INDEPENDENCE REPORT */}
        <section className="bg-zinc-900 text-white p-8 rounded-sm mb-4">
          <h2 className="text-xl font-black italic border-b border-white/20 pb-4 mb-6 flex items-center gap-3">
             {t.independenceReportTitle}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {(t.independenceReportItems as string[]).map((item, i) => (
              <div key={i} className="flex gap-4 items-start border-b border-white/10 pb-2">
                <div className="w-1.5 h-1.5 bg-[#eab308] rounded-full mt-2 flex-shrink-0" />
                <p className="text-xs leading-tight text-zinc-300 font-mono italic uppercase tracking-tight">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: WHAT IT DOES */}
        <section>
          <h2 className="text-xl font-black italic bg-black text-white px-4 py-1 inline-block mb-6">
            {t.whatItDoes}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {(t.whatItDoesItems as string[]).map((item: string, i: number) => (
              <div key={i} className="flex gap-4 items-start border-b border-zinc-100 pb-2">
                <CheckCircle2 size={18} className="text-zinc-400 mt-1 flex-shrink-0" />
                <p className="text-sm leading-tight text-zinc-800 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: WHAT IT DOESNT */}
        <section>
          <h2 className="text-xl font-black italic bg-zinc-200 text-black px-4 py-1 inline-block mb-6">
            {t.whatItDoesnt}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {(t.whatItDoesntItems as string[]).map((item: string, i: number) => (
              <div key={i} className="flex gap-4 items-start border-b border-zinc-100 pb-2">
                <AlertTriangle size={18} className="text-zinc-300 mt-1 flex-shrink-0" />
                <p className="text-sm leading-tight text-zinc-500 italic">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL FOOTER BLOCK */}
        <section className="mt-12 p-8 border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-lg">
          <h3 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
            <FileText size={16} /> PROTOCOLO DE CONFORMIDADE
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-mono">
            Este sistema foi desenvolvido para atuar como uma ponte de hardware lógico entre diferentes instâncias de Inteligência Artificial. 
            A eficácia do transplante de contexto é garantida pela estrutura molecular do payload JSON gerado pelo motor CORE. 
            Ao utilizar este software, a organização garante soberania sobre o histórico de co-criação digital.
          </p>
        </section>

      </div>

      {/* BOTTOM DECOR */}
      <footer className="absolute bottom-12 left-[20mm] right-[20mm] border-t border-zinc-200 pt-8 flex justify-between items-center">
        <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">
          {t.footerNotice}
        </div>
        <div className="flex gap-2">
           <div className="w-4 h-4 bg-zinc-900" />
           <div className="w-4 h-4 bg-zinc-400" />
           <div className="w-4 h-4 bg-zinc-200" />
        </div>
      </footer>

      {/* FLOATING ACTION TOOLBAR (HIDDEN ON PRINT) */}
      <div className="fixed bottom-8 right-8 flex flex-col sm:flex-row gap-3 print:hidden z-50">
        <button 
          onClick={downloadMarkdown}
          className="bg-zinc-800 text-white px-5 py-3 rounded-full shadow-2xl flex items-center justify-center gap-2 font-bold hover:scale-105 hover:bg-zinc-700 transition-all cursor-pointer border border-zinc-700 text-sm"
        >
          <Download size={18} /> {t.btnMDDownload || "BAIXAR MD"}
        </button>
        <button 
          onClick={() => window.print()}
          className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center justify-center gap-2 font-bold hover:scale-105 hover:bg-zinc-900 transition-all cursor-pointer text-sm"
        >
          <Printer size={18} /> {t.btnPDFPrint || "SIMULAR / PDF"}
        </button>
      </div>
    </div>
  );
}

export default function FlyerPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans p-0 sm:p-20 flex justify-center">
      <Suspense fallback={<div className="font-mono text-xs uppercase p-20">Aguardando Núcleo...</div>}>
        <FlyerContent />
      </Suspense>
    </div>
  );
}
