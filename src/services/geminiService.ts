export async function askGemini(symptom: string, chatHistory: any[], context?: { eqType?: string, os?: string }) {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptom, chatHistory, context }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Server error");
    }

    const data = await response.json();
    return data.text || "申し訳ありません。回答を生成できませんでした。";
  } catch (error) {
    console.error("Gemini API Proxy Error:", error);
    return "申し訳ありません。AI相談に一時的に接続できません。マニュアルの手順を確認してください。";
  }
}
