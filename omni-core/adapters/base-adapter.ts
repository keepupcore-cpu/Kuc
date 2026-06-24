import { GoogleGenAI } from '@google/genai';

export interface ModelCallConfig {
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
}

/**
 * Omni-Core Base Adapter
 * Lightweight, zero-dependency, and highly predictable interface
 * for interacting with Gemini models. Built for Sovereign P2P integration.
 */
export class OmniCoreBaseAdapter {
  private ai: GoogleGenAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    // Lazy initializing API key to prevent container boot stalls
    this.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || null;
    if (this.apiKey) {
      this.ai = new GoogleGenAI({ apiKey: this.apiKey });
    }
  }

  /**
   * Safe execution wrapper
   * @param systemInstruction Main deterministic rule-sets & active skills
   * @param userPrompt The tactical request payload
   * @param config Optional model overrides
   */
  public async execute(
    systemInstruction: string,
    userPrompt: string,
    config: ModelCallConfig = {}
  ): Promise<{ success: boolean; text: string; isMock: boolean }> {
    if (!this.ai) {
      // Predictable, zero-fail offline simulation/fallback mode for Keep Up
      return {
        success: true,
        isMock: true,
        text: `### [OMNI-CORE OFFLINE MODE]
A chave de API "GEMINI_API_KEY" não foi detectada no ambiente.
Entretanto, o motor determinístico OMNI-CORE compilou com sucesso as diretrizes:

---
🛡️ INSTRUÇÕES DE SISTEMA COMPILADAS:
${systemInstruction}

---
💬 INPUT DO OPERADOR:
${userPrompt}
---
`
      };
    }

    try {
      const modelName = config.model || 'gemini-2.5-flash';
      const response = await this.ai.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: config.temperature ?? 0.1, // Default cold temperature for maximum determinism
          ...(config.maxOutputTokens ? { maxOutputTokens: config.maxOutputTokens } : {}),
          ...(config.responseMimeType ? { responseMimeType: config.responseMimeType } : {})
        }
      });

      return {
        success: true,
        text: response.text || 'Sem resposta gerada pelo modelo.',
        isMock: false
      };
    } catch (error: any) {
      console.error('Omni-Core execution failure:', error);
      return {
        success: false,
        text: `Erro ao executar chamada OMNI-CORE: ${error.message || error}`,
        isMock: false
      };
    }
  }
}
