'use server';

import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function validateWithAI(jsonString: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    // Fallback if API key is not present: Basic validation instead of an error.
    if (!apiKey) {
      let parsed;
      try {
        parsed = JSON.parse(jsonString);
      } catch (e) {
        return {
          level: 'fail',
          label: 'JSON INVÁLIDO',
          items: ['O texto colado não é um formato JSON válido.']
        };
      }
      
      const missingKeys = [];
      const requiredKeys = ['keepup_version', 'objetivo_principal', 'contexto_critico', 'decisoes_confirmadas', 'estado_atual', 'proximo_passo_definido'];
      
      for (const k of requiredKeys) {
        if (!parsed[k]) missingKeys.push(k);
      }

      if (missingKeys.length > 0) {
        return {
          level: 'warn',
          label: 'VALIDAÇÃO BÁSICA: FALTAM CAMPOS',
          items: [
            'Chave de API do Gemini não configurada. Usando validação básica.',
            `Campos ausentes: ${missingKeys.join(', ')}`
          ]
        };
      }

      return {
        level: 'ok',
        label: 'VALIDAÇÃO BÁSICA OK',
        items: [
          'Chave de API do Gemini não detectada. Usando validação básica (estrutural).',
          'A estrutura do JSON está correta com todos os campos principais presentes.'
        ]
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Você é um Validador de Contexto Crítico para IAs.
Sua função é analisar o JSON de contexto abaixo e determinar se ele tem qualidade suficiente para que outra IA assuma o projeto sem perder o fio da meada.

CRITÉRIOS DE AVALIAÇÃO:
1. objetivo_principal: Está claro e direto?
2. contexto_critico: Tem informações realmente úteis, específicas e sem ruído repetitivo?
3. decisoes_confirmadas: São decisões reais, deduplicadas (apenas a mais recente) e específicas?
4. estado_atual: Diz exatamente onde o projeto parou?
5. proximo_passo_definido: É uma instrução acionável e clara?
6. descartado_log: Está objetivo, focado apenas em ramificações ou arquiteturas descartadas, sem ruído de erros triviais?
7. referencias_visuais / trechos_de_codigo: Estão presentes e são úteis?

JSON A SER AVALIADO:
${jsonString}

Responda EXATAMENTE neste formato JSON:
{
  "level": "ok" | "warn" | "fail",
  "label": "VEREDITO CURTO (ex: CONTEXTO SÓLIDO, ATENÇÃO, INSUFICIENTE)",
  "items": [
    "Ponto forte ou fraco 1",
    "Ponto forte ou fraco 2",
    "Ponto forte ou fraco 3"
  ]
}

Regras para o level:
- "ok": Contexto excelente, a próxima IA vai conseguir continuar perfeitamente.
- "warn": Faltam detalhes importantes, mas dá para continuar.
- "fail": Contexto genérico, inútil ou vazio. A próxima IA vai se perder.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    if (!response.text) {
      throw new Error("Resposta vazia da IA");
    }

    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("Erro na validação com IA:", error);
    
    // Check if it's an API Key invalid error
    if (error.message && error.message.includes('API key not valid')) {
      return {
        level: 'fail',
        label: 'CHAVE DE API AUSENTE / INVÁLIDA',
        items: [
          'A validação inteligente com Gemini não pode ocorrer porque a API Key não foi configurada ou é inválida.',
          'No painel do Google AI Studio, vá no menu de configurações ou "Secrets" / "Environment Variables".',
          'Certifique-se de preencher a variável "NEXT_PUBLIC_GEMINI_API_KEY" com uma chave válida do Google AI Studio.'
        ]
      };
    }

    return {
      level: 'fail',
      label: 'ERRO DE VALIDAÇÃO',
      items: ['Falha ao contatar a IA validadora.', error.message]
    };
  }
}

export async function runDeterministicForge(compiledPrompt: string, outputType: 'text' | 'image') {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return {
        success: true,
        text: `### [KEEP UP CORE - PROMPT FUSIONADO DIRECTO]
[AVISO: COMPILADO OFFLINE - ADICIONE SUA CHAVE NOS SECRETS PARA REFINAMENTO DA IA]

Você está operando sob a diretiva de DETERMINISMO estrito do Sistema Keep Up Core:

${compiledPrompt}

---
💡 Cole este prompt no Claude, ChatGPT ou Gemini diretamente para operar sob nossas regras de integridade semântica de alta fidelidade!`,
        isMock: true
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    const metaPrompt = `Você é um Engenheiro de Prompts Mestre especializado no ecossistema Keep Up Core.
Sua missão é fundir o objetivo principal do usuário com as diretivas de DETERMINISMO, travas de persistência contra alucinação, constantes físicas e parâmetros de vídeo/shorts especificados no bloco abaixo.

Você não deve realizar a tarefa final em si. Em vez disso, você deve criar e estruturar o MELHOR e mais INFALÍVEL PROMPT DO MUNDO para que ele envie a outro modelo de IA (Sora, Luma Dream Machine, Kling, Runway, Claude, ChatGPT ou Gemini) para realizar esse objetivo sem sofrer de amnésia, desvios ou alucinações.

Caso o input identifique parâmetros de VÍDEO (timing e limites de caracteres) ou de EXTENSÃO DE VÍDEO:
1. Você DEVE particionar a narrativa ou storyboard em PARTES SEQUENCIAIS bem marcadas (ex: Parte 1, Parte 2), onde cada parte respeita a limitação de tempo do Freetier selecionado (ex: 3s, 4s ou 5s).
2. Se o MODO EXTENSÃO estiver ativo, monte um prompt que garanta continuidade total com o vídeo anterior fornecido, sem perder as feições do personagem (ex: consistência da Aria), iluminação ou o clima, oferecendo uma transição impecável para as próximas partes de extensão.
3. Respeite RIGOROSAMENTE o limite de caracteres estipulado por cena/prompt (ex: 500, 700 ou 900 caracteres) em cada uma das partes sequenciais geradas, mantendo extrema densidade sensorial e descritiva para caber nos inputs dos geradores de vídeo ou shorts.

PROMPT COMPILADO BRUTO DE ENTRADA:
${compiledPrompt}

Por favor, forneça o prompt lapidado formatado em Markdown impecável, contendo seções claras e industriais como:
1. 🛡️ **[SISTEMA DE SEGURANÇA DETERMINÍSTICO]** (Diretivas de barreira baseadas no KEEP UP CORE contra drift de contexto)
2. 🎛️ **[DIRETIVAS ATIVAS DE INTEGRIDADE & VÍDEO]** (As regras e limites de tempo e caracteres que devem ser cumpridos)
3. 🎯 **[PROMPTS SEQUENCIAIS DE PRODUÇÃO (DIVIDIDO EM PARTES)]** (A divisão sequencial com cada bloco descritivo limitado rigorosamente ao número de caracteres solicitado de no máximo 500, 700 ou 900 caracteres, calibrado para a duração gratuita de 3, 4 ou 5 segundos, otimizado para Kling, Luma ou Runway)
4. 🧠 **[ESCUDO MESTRE DE EXTENSÃO & CONSISTÊNCIA]** (Caso ativo, regras rígidas de continuidade, bloqueando alucinações de personagem ou cenários em relação ao vídeo anterior)
5. 📋 **[REGRAS DE CONFINAMENTO NEGATIVAS]** (O que a IA final é terminantemente PROIBIDA de fazer)

Seja direto e prático. Escreva o prompt de forma que o usuário final possa simplesmente copiar e colar cada parte sequencial individualmente de maneira limpa.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: metaPrompt
    });

    return {
      success: true,
      text: response.text || "Sem prompt gerado",
      isMock: false
    };

  } catch (error: any) {
    console.error("Erro no Forjador Determinístico:", error);
    return {
      success: false,
      text: "Erro ao contatar o Gemini para polir o prompt: " + error.message,
      isMock: true
    };
  }
}

export interface ManifestoFile {
  key: string;
  name: string;
  label: string;
  content: string;
}

export async function getManifests(): Promise<ManifestoFile[]> {
  const filenames = [
    { key: 'ownership', name: 'OWNERSHIP_CERTIFICATE.md', label: 'Certificado de Autoria' },
    { key: 'manual', name: 'MANUAL_SOBERANO.md', label: 'Manual de Blindagem de Dados' },
    { key: 'agents', name: 'AGENTS.md', label: 'Protocolo de Memória Herdada (AGENTS.md)' },
    { key: 'privacy', name: 'PRIVACY_PROTOCOL.md', label: 'Protocolo de Privacidade (PRIVACY_PROTOCOL.md)' },
    { key: 'discovery', name: 'KEEP_UP_DISCOVERY_LOG.md', label: 'Log de Descoberta Crítica (KEEP_UP_DISCOVERY_LOG.md)' },
    { key: 'payload', name: 'KEEP_UP_TRANSFER_PAYLOAD.md', label: 'Payload de Transferência (KEEP_UP_TRANSFER_PAYLOAD.md)' },
    { key: 'release', name: 'RELEASE_NOTES_CORE_V1.md', label: 'Release Notes Core v1' },
    { key: 'no_ai_training', name: 'app/NO_AI_TRAINING_PROTOCOL.md', label: 'Protocolo Anti-Treinamento (NO_AI_TRAINING_PROTOCOL.md)' }
  ];

  const results: ManifestoFile[] = [];

  for (const f of filenames) {
    try {
      const filePath = path.join(process.cwd(), f.name);
      // Read file content
      const content = await fs.readFile(filePath, 'utf-8');
      results.push({
        key: f.key,
        name: f.name.includes('/') ? f.name.split('/').pop()! : f.name,
        label: f.label,
        content
      });
    } catch (error) {
      // Silently ignore files that do not exist or cannot be read to prevent logging warnings that trigger platform errors.
    }
  }

  return results;
}

export async function transcribeOcrImages(images: { mimeType: string; base64: string }[]) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: "Chave de API do Gemini não configurada nos Secrets do Google AI Studio. Por favor, adicione NEXT_PUBLIC_GEMINI_API_KEY."
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const parts: any[] = [];
    for (const img of images) {
      let cleanBase64 = img.base64;
      if (cleanBase64.includes(';base64,')) {
        cleanBase64 = cleanBase64.split(';base64,').pop() || '';
      }
      parts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: cleanBase64
        }
      });
    }

    parts.push({
      text: `Você é um Assistente especialista em OCR (Reconhecimento Óptico de Caracteres) de Alta Precisão integrado ao ecossistema Keep Up Core.
Sua missão é:
1. Extrair TODO o texto legível contido nas imagens fornecidas (geralmente capturas de tela/prints de conversas, códigos, arquivos de log, prompts ou instruções de outras IAs onde o usuário perdeu o acesso por falta de créditos ou limites).
2. Agrupar e ordenar o texto de forma cronológica ou lógica para fazer sentido completo.
3. Identificar elementos cruciais do Keep Up Core presentes no texto extraído, como objetivos principais, contextos críticos, decisões, trechos de código, ou payloads de transferência.
4. Organizar o conteúdo de forma extremamente limpa e legível em formato Markdown.
5. No final, gerar uma sugestão de Bloco de Injeção JSON do Keep Up Core ou um Prompt de Injeção estruturado para que o usuário copie, cole em outra IA e continue seu trabalho sem amnésia.

Seja extremamente preciso, não resuma ou omita partes importantes do texto original. Ignore ruídos irrelevantes de interface (botões de curtir, avatares, pings de rede, créditos de chat, etc.).`
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts }
    });

    return {
      success: true,
      text: response.text || "Nenhum texto pôde ser extraído das imagens."
    };
  } catch (error: any) {
    console.error("Erro no OCR com Gemini:", error);
    return {
      success: false,
      error: error.message || "Erro inesperado ao processar OCR das imagens."
    };
  }
}


