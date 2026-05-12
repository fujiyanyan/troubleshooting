import { GoogleGenAI } from "@google/genai";

let aiClient: any = null;

function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please ensure it is set in the environment.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function askGemini(symptom: string, chatHistory: any[], context?: { eqType?: string, os?: string }) {
  try {
    const ai = getAI();
    
    const systemInstruction = `あなたは大学の講義室（シアター）のAV設備担当エンジニアです。
ユーザーは講義中に機材トラブルで困っています。
以下の情報を踏まえて、簡潔に、かつ落ち着かせるような口調でアドバイスしてください。

現在のコンテキスト:
- 対象機材: ${context?.eqType || "未指定"}
- 使用OS: ${context?.os || "未指定"}

設備環境:
- 卓上スイッチャー: LMS-GC53U (HDMI入力切替、電源操作、プロジェクター操作が可能)
- プロジェクター: 高解像度（4K等）には非対応の場合がある
- 音響: ラック内にマイク電源とゲインつまみ、ミキサーにPC音声つまみがある

制約:
- 専門用語を避け、操作場所（つまみの色やボタンの位置）を具体的に伝える。
- 3行以内の短い文章で回答を心がける。
- 解決しない場合は、一旦アプリ内のチェックリストを確認するよう促す。
- 緊急性が高い場合は「予備機への切り替え」を検討させる。`;

    // Map history to the format expected by the new SDK
    const contents = chatHistory.map(msg => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.parts[0].text }]
    }));

    // Add current prompt
    contents.push({
      role: "user",
      parts: [{ text: `状況: ${symptom}\n上記のトラブルについて、今すぐ現場で試せることを1つ教えてください。` }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 200,
      },
    });

    return response.text || "申し訳ありません。回答を生成できませんでした。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return "AI相談機能を利用するには、管理画面から Gemini API Key を設定する必要があります。";
    }
    return "申し訳ありません。AI相談に一時的に接続できません。マニュアルの手順を確認してください。";
  }
}
