import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { neighbourhood, city } = await req.json();

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        stream: true,
        max_tokens: 200,
        messages: [
          {
            role: "system",
            content:
              "You are a UAE real estate expert. Write concise, factual neighbourhood summaries in 3-4 sentences. Focus on lifestyle, connectivity, nearby landmarks, and who it suits. No markdown.",
          },
          {
            role: "user",
            content: `Write a neighbourhood summary for ${neighbourhood} in ${city}, UAE.`,
          },
        ],
      }),
    },
  );

  return new Response(response.body, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
