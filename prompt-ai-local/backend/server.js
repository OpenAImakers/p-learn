export async function sendToDeepseek(message, onChunk) {
  try {
    const response = await fetch('https://deepseek-backend-v3q4.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: message }],
      }),
    });

    // If backend sends a stream
    if (!response.body) {
      throw new Error('ReadableStream not supported by browser or server');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';

    // Read streamed chunks
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // SSE messages come in "data: {...}" lines
      const lines = chunk.split('\n').filter(line => line.trim().startsWith('data:'));
      for (const line of lines) {
        const data = line.replace(/^data:\s*/, '');
        if (data === '[DONE]') continue;

        try {
          const json = JSON.parse(data);
          const token = json.choices?.[0]?.delta?.content || '';
          fullText += token;
          if (onChunk) onChunk(token); // 🔥 Callback for live updates
        } catch (e) {
          console.error('Stream parse error:', e, line);
        }
      }
    }

    return fullText || 'No response from AI.';
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return '⚠️ Sorry, I could not connect to the AI server.';
  }
}
