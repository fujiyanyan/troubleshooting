import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini
  app.post("/api/gemini", async (req, res) => {
    try {
      const { symptom, chatHistory, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const genAI = new GoogleGenAI(apiKey);
      
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

      const contents = chatHistory.map((msg: any) => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.parts[0].text }]
      }));

      contents.push({
        role: "user",
        parts: [{ text: `状況: ${symptom}\n上記のトラブルについて、今すぐ現場で試せることを1つ教えてください。` }]
      });

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash", // Use a stable model name
        systemInstruction: systemInstruction,
      });

      const result = await model.generateContent({
        contents: contents,
        generationConfig: {
          maxOutputTokens: 200,
        },
      });

      const response = await result.response;
      res.json({ text: response.text() });
    } catch (error: any) {
      console.error("Gemini Proxy Error:", error);
      res.status(500).json({ error: "AI communication failed", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
