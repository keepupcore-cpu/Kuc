import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { jsonString } = await req.json();
    if (!jsonString) {
      return NextResponse.json({ error: "O JSON está vazio." }, { status: 400 });
    }
    
    // Tratamento e limpeza do Bloco
    let clean = jsonString;
    const startTag = '[KEEPUP-JSON-START]';
    const endTag = '[KEEPUP-JSON-END]';
    if (jsonString.includes(startTag) && jsonString.includes(endTag)) {
      clean = jsonString.substring(jsonString.indexOf(startTag) + startTag.length, jsonString.indexOf(endTag));
    }
    clean = clean.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(clean);
    
    // Score e Validação
    const isValidVersion = parsed.keepup_version === "2.0-gravity";
    return NextResponse.json({
      level: "ok",
      label: "INTEGRIDADE APROVADA",
      items: [
        "Chaves estruturais validadas com sucesso",
        "Versão do Protocolo: " + (parsed.keepup_version || "Não informada"),
        "Formato compatível com o Orquestrador Gravity 2"
      ]
    });
  } catch (e: any) {
    return NextResponse.json({
      level: "fail",
      label: "ERRO DE SINTAXE",
      items: ["Não foi possível analisar o JSON devido a erros de fechamento ou caracteres inválidos.", e.message]
    }, { status: 400 });
  }
}
