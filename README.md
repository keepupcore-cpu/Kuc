# 🧩 KEEP UP

**O sistema definitivo de continuidade de contexto para IA.**

Este projeto foi construído para ser independente e soberano.

## 🚀 Opções de Deploy no Netlify

### Opção 1: Via GitHub (Recomendado)
É a mais simples porque o Netlify cuida de tudo. Sempre que você atualizar o código no GitHub, o site atualiza sozinho.

### Opção 2: Deploy Manual (Sem GitHub)
Se você não quiser usar o GitHub, você pode usar o **Netlify CLI** no seu computador:

1. **Instale o CLI**: `npm install netlify-cli -g`
2. **Faça o Login**: `netlify login`
3. **Execute o Deploy**: Dentro da pasta do projeto, rode `netlify deploy --build`.
   - O CLI vai rodar o `npm run build` localmente e enviar os arquivos prontos para o servidor do Netlify, incluindo as funções de servidor do Next.js.

> **Nota para Leigos**: O "Arrastar e Soltar" (Netlify Drop) funciona apenas para sites estáticos. Como o **KEEP UP** usa recursos inteligentes do Next.js, ele precisa passar pelo processo de "Build" (construção), que é feito automaticamente no GitHub ou via CLI.

## ⚙️ Configuração da Groq API (Essencial)

Para que as funções de IA (Extração/Injeção/OCR) funcionem no Netlify:
1. No painel do seu site no Netlify, vá em **Site settings** > **Environment variables**.
2. Clique em **Add a variable** > **Import from .env** ou adicione manualmente:
   - Key: `GROQ_API_KEY`
   - Value: `SUA_CHAVE_AQUI` (Pegue sua chave no console da Groq: console.groq.com).
3. **Importante**: Se as variáveis não aparecerem no app, vá em **Deploys** e clique em **"Trigger deploy"** > **"Clear cache and deploy site"**.

---
*KEEP UP - A Roda foi Reinventada.*
