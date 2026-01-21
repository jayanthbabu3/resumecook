/**
 * AI Provider Utilities
 *
 * Shared AI provider functions for all routes.
 * Supports: Gemini 2.5 Flash, Groq, Claude, OpenAI
 */

// Environment variables
export const getApiKeys = () => ({
  geminiKey: process.env.GEMINI_API_KEY,
  groqKey: process.env.GROQ_API_KEY,
  anthropicKey: process.env.ANTHROPIC_API_KEY,
  openaiKey: process.env.OPENAI_API_KEY,
});

/**
 * Call Gemini 2.5 Flash API
 */
export async function callGemini(apiKey, prompt, options = {}) {
  const {
    temperature = 0.5,
    maxOutputTokens = 8000,
    timeout = 60000, // 60 seconds
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            topK: 40,
            topP: 0.95,
            maxOutputTokens,
          },
        }),
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${errorText.substring(0, 200)}`);
    }

    const result = await response.json();
    const content = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No content in Gemini response');
    }

    return extractJson(content);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Gemini API timed out');
    }
    throw error;
  }
}

/**
 * Call Groq API (Llama 3.3 70B)
 */
export async function callGroq(apiKey, prompt, options = {}) {
  const {
    temperature = 0.5,
    maxTokens = 8000,
    timeout = 45000, // 45 seconds - Groq is fast
    systemPrompt = 'You are a helpful assistant.',
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        max_tokens: maxTokens,
        temperature,
        response_format: { type: 'json_object' },
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error ${response.status}: ${errorText.substring(0, 200)}`);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in Groq response');
    }

    return extractJson(content);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Groq API timed out');
    }
    throw error;
  }
}

/**
 * Call Claude API (Haiku)
 */
export async function callClaude(apiKey, prompt, options = {}) {
  const {
    temperature = 0.5,
    maxTokens = 8000,
    timeout = 60000,
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: maxTokens,
        temperature,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Claude API error ${response.status}: ${errorText.substring(0, 200)}`);
    }

    const result = await response.json();
    const content = result.content?.[0]?.text;

    if (!content) {
      throw new Error('No content in Claude response');
    }

    return extractJson(content);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Claude API timed out');
    }
    throw error;
  }
}

/**
 * Call OpenAI API (GPT-4o-mini)
 */
export async function callOpenAI(apiKey, prompt, options = {}) {
  const {
    temperature = 0.5,
    maxTokens = 8000,
    timeout = 60000, // 60 seconds
    systemPrompt = 'You are a helpful assistant.',
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        max_tokens: maxTokens,
        temperature,
        response_format: { type: 'json_object' },
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${errorText.substring(0, 200)}`);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    return extractJson(content);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('OpenAI API timed out');
    }
    throw error;
  }
}

/**
 * Try all AI providers in priority order
 * Default: OpenAI first (best quality), then Groq as fallback
 */
export async function callAIWithFallback(prompt, options = {}) {
  const {
    priority = ['openai', 'groq', 'claude', 'gemini'],
    ...aiOptions
  } = options;

  const keys = getApiKeys();
  let lastError;

  for (const provider of priority) {
    const key = keys[`${provider}Key`] || keys[`${provider === 'claude' ? 'anthropic' : provider}Key`];
    if (!key) continue;

    try {
      console.log(`Trying ${provider}...`);
      switch (provider) {
        case 'gemini':
          return { data: await callGemini(key, prompt, aiOptions), provider };
        case 'groq':
          return { data: await callGroq(key, prompt, aiOptions), provider };
        case 'claude':
          return { data: await callClaude(keys.anthropicKey, prompt, aiOptions), provider };
        case 'openai':
          return { data: await callOpenAI(key, prompt, aiOptions), provider };
      }
    } catch (error) {
      console.error(`${provider} failed:`, error.message);
      lastError = error;
    }
  }

  throw lastError || new Error('All AI providers failed');
}

/**
 * Extract and repair JSON from AI response
 * Handles: markdown code blocks, truncated responses, common formatting issues
 */
export function extractJson(content) {
  let jsonStr = content.trim();

  // Remove markdown code blocks
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  // Find JSON object
  const objectMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (objectMatch) {
    jsonStr = objectMatch[0];
  }

  // Try parsing as-is first
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.log('Initial JSON parse failed, attempting repair...');
  }

  // Attempt to repair common JSON issues
  jsonStr = repairJson(jsonStr);

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('JSON repair failed:', e.message);
    console.error('JSON preview:', jsonStr.substring(0, 500) + '...');
    throw new Error(`Failed to parse AI response as JSON: ${e.message}`);
  }
}

/**
 * Attempt to repair malformed JSON
 */
function repairJson(jsonStr) {
  let str = jsonStr;

  // Remove trailing commas before ] or }
  str = str.replace(/,\s*([}\]])/g, '$1');

  // Fix truncated arrays - close any unclosed brackets
  let openBrackets = 0;
  let openBraces = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      continue;
    }

    if (char === '"' && !escapeNext) {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === '[') openBrackets++;
      if (char === ']') openBrackets--;
      if (char === '{') openBraces++;
      if (char === '}') openBraces--;
    }
  }

  // If we're inside a string, try to close it
  if (inString) {
    str += '"';
  }

  // Remove any trailing incomplete key-value pairs
  // Pattern: "key": (without value) or "key": " (unclosed string)
  str = str.replace(/,?\s*"[^"]*":\s*"?[^",}\]]*$/g, '');

  // Close any unclosed brackets/braces
  while (openBrackets > 0) {
    str += ']';
    openBrackets--;
  }
  while (openBraces > 0) {
    str += '}';
    openBraces--;
  }

  // Final cleanup - remove trailing commas again after repairs
  str = str.replace(/,\s*([}\]])/g, '$1');

  return str;
}
