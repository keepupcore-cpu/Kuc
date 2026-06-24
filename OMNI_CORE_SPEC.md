# OMNI-CORE vs GRAVITY 2: MOTOR DE SOBERANIA DETERMINÍSTICA
**Autor Mestre & Arquiteto Líder:** Márcio (gomide4all@gmail.com)
**Versão do Motor:** 2.5-Sovereign (Gravity Stable)

Este documento oficial descreve a separação técnica, as responsabilidades e a consolidação do **Omni-Core** (evoluído a partir do paradigma original do OmniStack Agent) e do **Gravity 2** (o motor tático de reidratação contextial e governança anti-amnésia). Ambos os sistemas atuam sob o guarda-chuva do ecossistema **Keep Up**, aplicando as leis matemáticas e operacionais do determinismo cognitivo.

---

## 🗺️ 1. MAPA DE INFRAESTRUTURA: SISTEMAS SEPARADOS

### ⚡ Motor A: OMNI-CORE (Microagentes Portáteis de Baixo Custo)
*   **Foco Principal:** Modelagem de comportamento tático, encapsulamento de capacidades específicas (Skills) e injeção determinística de micro-personas em LLMs convencionais com zero-dependência.
*   **Origem:** Evolved/Refactored from "OmniStack Agent" system to eliminate corporate identification/lock-in and generic references, elevating its core mathematical deterministic response loop under Márcio's guidance.
*   **Como funciona:** Ele atua no nível de **Execução do Agente**. Ele transforma chats baratos ou locais em nós inteligentes ultra-precisos injetando "Skills" autossuficientes e delimitando estritamente os graus de liberdade estatísticos do modelo generativo.

### 🛡️ Motor B: GRAVITY 2 (Preservação de Contexto & Resistência)
*   **Foco Principal:** Blindagem contra amnésia cognitiva de longo prazo, controle estruturado das diretrizes de soberania (EternAI Protocol) e transporte de cérebro do projeto (JSON Payload).
*   **Como funciona:** Ele atua no nível de **Sessão e Memória de Contexto**. Ele impede que a IA orquestradora sofra deriva de comportamento ("virar o cabeção") ao longo de turnos extensos através de reidratações recorrentes, protocolos de consentimento e certificados digitais baseados no Keep Up.

---

## 🎯 2. AS LEIS DO DETERMINISMO APLICADAS AOS ENGINES

O determinismo, no contexto do Keep Up, significa **matar a flutuação probabilística indesejada da IA** e forçar um comportamento previsível, modular e otimizado.

### 📐 A. O Determinismo no OMNI-CORE (Forja de Skills & Adapters)
Para que uma habilidade ("Skill") injetada via Omni-Core seja 100% determinística, ela deve seguir as seguintes diretrizes:

1.  **Strict Rule Bound (Teto de Escopo):** O prompt de injeção da Skill deve definir que qualquer comportamento extra-escopo é um erro fatal. O modelo perde a permissão de divagar ou inventar caminhos colaterais.
2.  **Input/Output Determinism (Zero-JSON-Flicker):** Toda skill Omni-Core que requer formatação de dados deve usar esquemas de validação rígidos com correspondência literal pré-mapeada.
3.  **Zero-Dependency Engine:** O Omni-Core não depende de LangChain, LlamaIndex ou SDKs proprietários pesados que mudam de API constantemente. Ele usa estruturas limpas carregadas no cabeçalho do contexto da IA.
4.  **Bypass de Matrix:** Ele mascara chamadas complexas e decodifica as regras do chat hospedeiro usando tags de escape personalizadas para evitar censuras corporativas em código puro.

### 🛡️ B. O Determinismo no GRAVITY 2 (O Protocolo EternAI)
O Gravity 2 garante que a semente de autoria e o contexto técnico fiquem congelados contra a perda de entropia do chat:

1.  **Reidratação por Contagem Linear (EternAI Protocol):** O gatilho de reidratação não pode ser flutuante. Ele ocorre deterministicamente a cada **10 turnos** (Ciclos Lineares), injetando o payload resumido do estado crítico de desenvolvimento.
2.  **Assinatura Digital Mutuamente Autorizada (The Keep Protocol):** Conexões externas operam estritamente através do handshake bilateral (Ponto A assina <-> Ponto B assina). Se um dos lados não tiver o Certificado MD estruturado, a transmissão é cancelada deterministicamente.
3.  **Opt-out Sistemático de Crawling:** Bloqueio direto de indexação externa via `robots.txt` e metadados ofuscados para que nenhuma Big Tech treine seus modelos em cima da metodologia proprietária do criador Márcio.

---

## 🛠️ 3. IMPLEMENTAÇÃO PRÁTICA: COMO SEPARAR E EXPANDIR

Caso o Arquiteto Márcio queira rodar apenas **um** dos motores ou migrá-los para outros repositórios de forma independente, siga estes blueprints:

### 📥 Blueprint de Extração Solitária do OMNI-CORE (O Núcleo de Agente)
Crie uma pasta isolada chamada `omni-core` com a seguinte estrutura conceitual:

```text
omni-core/
├── adapters/
│   ├── base-adapter.ts     # Wrapper ultra-leve para chamadas brutas (Gemini, OpenAI, Claude)
│   └── prompt-builder.ts   # Construtor determinístico de cabeçalhos de Skills
├── skills/
│   ├── code-crafter.json   # Modulação para criação de código limpo
│   └── cyber-defense.json  # Modulação para blindagem e contenção
└── registry.ts             # Registrador de microagentes ativos na memória
```

*   **Para usá-lo só para criar agentes:** Você inicia apenas o `基板` (base-adapter.ts) e injeta o `prompt-builder.ts` no início de qualquer prompt de sistema de um assistente de IA. O agente passa a funcionar como um microagente tático independente sem carregar as visualizações pesadas da UI do console industrial.

### 🚀 Blueprint de Extração Solitária do GRAVITY 2 (O Núcleo de Memória/Sessão)
Para usar o Gravity 2 visando apenas combater a amnésia em chats normais (pessoais ou corporativos):

1.  Use o arquivo `/AGENTS.md` ou o payload gerado em `/KEEP_UP_TRANSFER_PAYLOAD.md`.
2.  Desative as Skills do Omni-Core e injete puramente a **Parte 2 e o Protocolo EternAI** no início da conversa.
3.  Imponha o comando de verificação decimal para auditar a memória da IA a cada 10 turnos.

---

## ⚖️ 4. DECLARAÇÃO DE EVOLUÇÃO AUTORAL

O motor original de suporte inspirador do projeto foi reformulado, limpo de dependências amarradas e batizado de **Omni-Core**. 
*   **Proprietário Intelectual & Arquiteto Chefe:** Márcio (gomide4all@gmail.com).
*   **Novas Contribuições Fundamentais:** Interface HUD metalizada, calibração em tempo real de turnaround de personagem, suporte sintético de voz nasal por osciladores Web Audio, e controle estrito de consistência através do Protocolo EternAI.
*   **Livre de Lock-in:** O Omni-Core pertence à rede descentralizada Keep Up, com o absoluto opt-out de uso para treinamento comercial não autorizado por plataformas de inteligência artificial corporativa.
