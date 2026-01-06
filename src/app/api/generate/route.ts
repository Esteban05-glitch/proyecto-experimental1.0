import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const systemInstruction = `
      You are a historian and data expert. Generate a historical timeline about the user's topic.
      Return the data strictly as a JSON array of objects with the following structure:
      {
        "title": "Short event title",
        "date": "YYYY-MM-DD",
        "description": "Short but informative description",
        "category": "One word category (e.g., War, Art, Science, Politics)",
        "imageUrl": "",
        "mediaUrl": "",
        "mediaType": "None"
      }
      Provide exactly 5 to 7 major events. Only return the JSON array, no extra text, explanations, or markdown blocks.
    `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
            max_tokens: 1024,
            response_format: { type: "json_object" }
        });

        const content = chatCompletion.choices[0]?.message?.content;

        if (!content) {
            throw new Error("No content received from Groq");
        }

        // Groq with response_format: json_object might return an object with the array inside, 
        // or just the array. We'll handle both.
        let events = JSON.parse(content);
        if (!Array.isArray(events) && events.events) {
            events = events.events;
        } else if (!Array.isArray(events) && Object.values(events)[0] && Array.isArray(Object.values(events)[0])) {
            // Fallback for different JSON structures
            events = Object.values(events)[0];
        }

        return NextResponse.json(events);
    } catch (error) {
        console.error("AI Generation Error (Groq):", error);
        return NextResponse.json({ error: "Failed to generate timeline" }, { status: 500 });
    }
}
