export interface ModelCallConfig {
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
}

/**
 * Omni-Core Base Adapter
 * Lightweight, zero-dependency, and highly predictable interface
 * for interacting with Groq models. Built for Sovereign P2P integration.
 */
export class OmniCoreBaseAdapter {
  private apiKey: string | null = null;

  constructor() {
    // Lazy initializing API key to prevent container boot stalls
    this.apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || null;
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
    if (!this.apiKey) {
      // Predictable, zero-fail offline simulation/fallback mode for Keep Up
      return {
        success: true,
        isMock: true,
        text: `### [OMNI-CORE OFFLINE MODE]
A chave de API "GROQ_API_KEY" não foi detectada no ambiente.
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
      const modelName = config.model || 'llama-3.3-70b-versatile';
      
      const messages = [
        {
          role: 'system',
          content: systemInstruction
        },
        {
          role: 'user',
          content: userPrompt
        }
      ];

      const body: any = {
        model: modelName,
        messages,
        temperature: config.temperature ?? 0.1
      };

      if (config.maxOutputTokens) {
        body.max_tokens = config.maxOutputTokens;
      }

      if (config.responseMimeType === 'application/json') {
        body.response_format = { type: 'json_object' };
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API Error [${response.status}]: ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';

      return {
        success: true,
        text: content,
        isMock: false
      };
    } catch (error: any) {
      console.error('Omni-Core execution failure (Groq):', error);
      return {
        success: false,
        text: `Erro ao executar chamada OMNI-CORE (Groq): ${error.message || error}`,
        isMock: false
      };
    }
  }
}
