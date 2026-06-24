'use server';

import * as fs from 'fs/promises';
import * as path from 'path';

// Helper function to call Groq API natively via Fetch
async function callGroqAPI(body: any, apiKey: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API Error [${response.status}]: ${errText}`);
  }

  return response.json();
}

export async function validateWithAI(jsonString: string) {
  try {
    let parsed: any = null;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      // If it fails to parse as JSON, we proceed. It might be invalid JSON validation input.
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    
    // Check if it's the Omni-Core Test mode from OmniCoreSkillsStudio
    if (parsed && parsed.mode === 'omni-core-test') {
      if (!apiKey) {
        return {
          items: [
            "⚙️ [NÚCLEO OMNI-CORE OPERANTE - MODO SIMULAÇÃO DE ALTA FIDELIDADE (OFFLINE)]",
            `**Análise do Input do Operador:** "${parsed.operatorInput || ''}"`,
            "",
            "#### CÓDIGO/RESPOSTA SIMULADA:",
            "```typescript",
            "export function processAgnosticSignal(signal: string): boolean {",
            "  // Código compilado de forma determinística sem lock-in de big tech",
            "  return signal === 'SOVEREIGN';",
            "}",
            "```",
            "",
            "*Nota: Conecte sua chave GROQ_API_KEY no menu de segredos para disparar resoluções inteligentes em tempo real através do modelo de ponta.*"
          ]
        };
      }

      // We have the key! Let's execute the actual custom instructions and inputs against Groq!
      const body = {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: parsed.compiledSystemPrompt || 'Você é um assistente Omni-Core altamente preciso.'
          },
          {
            role: 'user',
            content: parsed.operatorInput || 'Olá'
          }
        ],
        temperature: 0.1
      };

      const data = await callGroqAPI(body, apiKey);
      const textResult = data.choices?.[0]?.message?.content || 'Nenhuma resposta gerada.';

      return {
        items: [
          "🤖 [NÚCLEO OMNI-CORE OPERANTE - MODELO LLAMA-3.3-70B]",
          textResult
        ]
      };
    }

    // Fallback if API key is not present: Basic validation instead of an error.
    if (!apiKey) {
      if (!parsed) {
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
            'Chave de API do Groq não configurada nos Secrets. Usando validação básica.',
            `Campos ausentes: ${missingKeys.join(', ')}`
          ]
        };
      }

      return {
        level: 'ok',
        label: 'VALIDAÇÃO BÁSICA OK',
        items: [
          'Chave de API do Groq não detectada. Usando validação básica (estrutural).',
          'A estrutura do JSON está correta com todos os campos principais presentes.'
        ]
      };
    }

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

    const body = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    };

    const data = await callGroqAPI(body, apiKey);
    const contentText = data.choices?.[0]?.message?.content || '';

    if (!contentText) {
      throw new Error("Resposta vazia da IA");
    }

    return JSON.parse(contentText);
  } catch (error: any) {
    console.error("Erro na validação com IA (Groq):", error);
    
    // Check if it's an API Key invalid error
    if (error.message && (error.message.includes('API key not valid') || error.message.includes('401'))) {
      return {
        level: 'fail',
        label: 'CHAVE DE API AUSENTE / INVÁLIDA',
        items: [
          'A validação inteligente com Groq não pode ocorrer porque a API Key do Groq não foi configurada ou é inválida.',
          'No painel do Google AI Studio, vá no menu de configurações ou "Secrets" / "Environment Variables".',
          'Certifique-se de preencher a variável "GROQ_API_KEY" ou "NEXT_PUBLIC_GROQ_API_KEY" com uma chave válida do Groq.'
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
    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
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

    const body = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: metaPrompt
        }
      ],
      temperature: 0.1
    };

    const data = await callGroqAPI(body, apiKey);
    const textResult = data.choices?.[0]?.message?.content || 'Sem prompt gerado';

    return {
      success: true,
      text: textResult,
      isMock: false
    };

  } catch (error: any) {
    console.error("Erro no Forjador Determinístico:", error);
    return {
      success: false,
      text: "Erro ao contatar o Groq para polir o prompt: " + error.message,
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
    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: "Chave de API do Groq não configurada nos Secrets do Google AI Studio. Por favor, adicione GROQ_API_KEY ou NEXT_PUBLIC_GROQ_API_KEY."
      };
    }

    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Você é um Assistente especialista em OCR (Reconhecimento Óptico de Caracteres) de Alta Precisão integrado ao ecossistema Keep Up Core.
Sua missão é:
1. Extrair TODO o texto legível contido nas imagens fornecidas (geralmente capturas de tela/prints de conversas, códigos, arquivos de log, prompts ou instruções de outras IAs onde o usuário perdeu o acesso por falta de créditos ou limites).
2. Agrupar e ordenar o texto de forma cronológica ou lógica para fazer sentido completo.
3. Identificar elementos cruciais do Keep Up Core presentes no texto extraído, como objetivos principais, contextos críticos, decisões, trechos de código, ou payloads de transferência.
4. Organizar o conteúdo de forma extremamente limpa e legível em formato Markdown.
5. No final, gerar uma sugestão de Bloco de Injeção JSON do Keep Up Core ou um Prompt de Injeção estruturado para que o usuário copie, cole em outra IA e continue seu trabalho sem amnésia.

Seja extremamente preciso, não resuma ou omita partes importantes do texto original. Ignore ruídos irrelevantes de interface (botões de curtir, avatares, pings de rede, créditos de chat, etc.).`
          },
          ...images.map(img => {
            let cleanBase64 = img.base64;
            if (cleanBase64.includes(';base64,')) {
              cleanBase64 = cleanBase64.split(';base64,').pop() || '';
            }
            return {
              type: "image_url",
              image_url: {
                url: `data:${img.mimeType};base64,${cleanBase64}`
              }
            };
          })
        ]
      }
    ];

    const body = {
      model: "llama-3.2-11b-vision-preview",
      messages,
      temperature: 0.1
    };

    const data = await callGroqAPI(body, apiKey);
    const textResult = data.choices?.[0]?.message?.content || "Nenhum texto pôde ser extraído das imagens.";

    return {
      success: true,
      text: textResult
    };
  } catch (error: any) {
    console.error("Erro no OCR com Groq:", error);
    return {
      success: false,
      error: error.message || "Erro inesperado ao processar OCR das imagens."
    };
  }
}
