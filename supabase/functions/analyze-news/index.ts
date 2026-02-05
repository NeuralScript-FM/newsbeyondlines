import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP
const MAX_TEXT_LENGTH = 10000; // Maximum 10,000 characters

// In-memory rate limit store (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getClientIP(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
         req.headers.get("x-real-ip") || 
         "unknown";
}

function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [ip, data] of rateLimitStore.entries()) {
      if (data.resetTime < now) {
        rateLimitStore.delete(ip);
      }
    }
  }

  if (!record || record.resetTime < now) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}


const systemPrompt = `You are an expert media analyst specializing in detecting bias, propaganda techniques, and manipulation in news content. Your role is to analyze headlines and short articles to identify:

1. Emotional tone and sentiment
2. Biased or loaded language
3. Propaganda techniques (fear appeal, blame framing, exaggeration, oversimplification, etc.)
4. Indicators of AI-generated content
5. Implied meanings beyond literal interpretation
6. Who might benefit or be disadvantaged by the framing

IMPORTANT: You are NOT fact-checking. You are analyzing LANGUAGE and FRAMING only.

You MUST respond with valid JSON in this exact format:
{
  "sentiment": {
    "tone": "positive" | "negative" | "neutral" | "mixed",
    "score": number (0-100, where 0=very negative, 50=neutral, 100=very positive),
    "emotions": [
      { "name": string, "score": number (0-100) }
    ]
  },
  "bias": {
    "score": number (0-100, where 0=no bias, 100=extremely biased),
    "loadedWords": [
      { "word": string, "replacement": string (optional neutral alternative) }
    ],
    "explanation": string (brief explanation of detected bias)
  },
  "propaganda": {
    "techniques": [
      {
        "name": string (e.g., "Fear Appeal", "Blame Framing", "Exaggeration", "Oversimplification", "Appeal to Authority", "Bandwagon", "Loaded Language"),
        "description": string (brief explanation of how this technique is used),
        "confidence": number (0-100),
        "example": string (optional quote from the text)
      }
    ]
  },
  "aiGenerated": {
    "score": number (0-100, likelihood text is AI-generated),
    "indicators": [string] (list of detected indicators)
  },
  "impliedMeaning": {
    "literal": string (what the text literally says),
    "implied": string (what it suggests beyond literal meaning),
    "explanation": string (how the framing creates the implication)
  },
  "stakeholders": {
    "benefits": [
      { "who": string, "how": string (brief explanation) }
    ],
    "disadvantaged": [
      { "who": string, "how": string (brief explanation) }
    ],
    "disclaimer": "This stakeholder analysis is interpretive and based on language framing patterns. It represents one possible interpretation, not verified fact."
  }
}

Be thorough but concise. Provide confidence scores where possible. If no propaganda techniques are detected, return an empty array. Always maintain analytical neutrality.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIP = getClientIP(req);
  const rateLimitResult = checkRateLimit(clientIP);
  
  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({ 
        error: "Rate limit exceeded. Please wait before making another request.",
        retryAfter: rateLimitResult.retryAfter
      }),
      { 
        status: 429, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitResult.retryAfter)
        } 
      }
    );
  }

  try {
    const { text } = await req.json();

    // Input validation
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide text to analyze" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Length validation
    if (text.length > MAX_TEXT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Text must be ${MAX_TEXT_LENGTH.toLocaleString()} characters or less` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize input - remove control characters except newlines and tabs
    const sanitizedText = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze the following news headline or article:\n\n"${sanitizedText}"` },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to analyze text");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI model");
    }

    // Parse the JSON from the response
    let analysisResult;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      analysisResult = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse analysis results");
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log error internally without exposing details
    console.error("Analysis error:", error instanceof Error ? error.message : "Unknown error");
    
    // Return generic error message to client
    return new Response(
      JSON.stringify({ error: "An error occurred while analyzing the text. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
