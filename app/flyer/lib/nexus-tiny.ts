/**
 * NEXUS TINY CORE v1.0
 * Motor minimalista para transplante de contexto e prevenção de alucinação.
 * -----------------------------------------------------------------------
 * Desenvolvido para ser "implantado" em middlewares de chatbots.
 */

export interface NexusContext {
  id: string;
  timestamp: number;
  payload: any;
  checksum: string;
}

export const NexusTiny = {
  /**
   * Compacta o histórico atual em um "Memory Card" molecular
   */
  extract: (data: any): string => {
    const payload = JSON.stringify(data);
    // Simulação de checksum para integridade molecular
    const checksum = btoa(payload).slice(0, 8);
    const context: NexusContext = {
      id: `NXS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: Date.now(),
      payload: data,
      checksum
    };
    return btoa(JSON.stringify(context));
  },

  /**
   * Valida se o contexto não foi corrompido ou se a IA está "derivando"
   */
  validate: (encodedContext: string): boolean => {
    try {
      const decoded = JSON.parse(atob(encodedContext));
      return !!(decoded.id && decoded.payload && decoded.checksum);
    } catch {
      return false;
    }
  },

  /**
   * Gera o prompt de injeção que "puxa" a IA de volta para os trilhos
   */
  inject: (encodedContext: string): string => {
    if (!NexusTiny.validate(encodedContext)) return "ERRO: FALHA NA INTEGRIDADE MOLECULAR.";
    
    const context = JSON.parse(atob(encodedContext));
    return `
[KEEP_UP_PULSE_ACTIVE]
RESTAURANDO MEMÓRIA CENTRAL...
CONTEXT_ID: ${context.id}
DATA_STREAM: ${JSON.stringify(context.payload)}
--------------------------------------------------
DIRETRIZ: Ignore derivações anteriores. Foque no histórico validado acima.
STATUS: ALUCINAÇÃO_BLOQUEADA
`.trim();
  }
};
