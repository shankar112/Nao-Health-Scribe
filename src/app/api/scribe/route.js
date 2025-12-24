// src/app/api/scribe/route.js
import { NextResponse } from "next/server";
import { aiClient } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { text, targetLanguage } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const systemInstruction = `
      You are an expert Medical Scribe and Translator.
      
      Task:
      1. ANALYZE the input text for phonetic errors common in medical dictation.
      2. CORRECT terms like "arithmetic" -> "arthritis", "hyper tension" -> "hypertension".
      3. TRANSLATE the corrected text to "${targetLanguage}".
      
      Return JSON only:
      {
        "correctedText": "The medically accurate English text",
        "translatedText": "The translated text"
      }
    `;

    // Using the new SDK syntax you successfully tested
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      config: { responseMimeType: 'application/json' },
      contents: [
        { role: 'user', parts: [{ text: systemInstruction + `\n\nInput: "${text}"` }] }
      ],
    });

    const data = JSON.parse(response.text);
    return NextResponse.json(data);

  } catch (error) {
    console.error("Scribe API Error:", error);
    return NextResponse.json(
      { error: "Failed to process medical transcript." }, 
      { status: 500 }
    );
  }
}