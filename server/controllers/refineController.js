const { getOpenAIClient } = require('../config/openai');

async function refinePrompt(req, res) {
  const { prompt, category } = req.body;

  console.log('📥 Refine request received:', { prompt: prompt?.substring(0, 50), category });

  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  try {
    console.log('🔧 Getting OpenAI client...');
    const openai = getOpenAIClient();
    console.log('✅ OpenAI client retrieved successfully');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content:
            'You are a prompt refinement assistant. Rewrite the user prompt so it is explicit and actionable. Structure as Role, Task, Requirements, Instructions. Keep concise but complete. Preserve critical details. Add clarifying defaults when missing. Return markdown with headings for each section.',
        },
        {
          role: 'user',
          content: `Category: ${category || 'general'}\nOriginal Prompt: ${prompt}`,
        },
      ],
    });
    console.log('✅ OpenAI API call successful');

    const refined = response.choices?.[0]?.message?.content?.trim();
    if (!refined) {
      return res.status(500).json({ error: 'No refinement produced' });
    }

    console.log('✅ Refinement successful, length:', refined.length);
    res.json({ refined });
  } catch (error) {
    console.error('❌ ERROR in refinePrompt:');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error status:', error.status);
    console.error('Full error:', error);

    // Provide more specific error messages
    if (error.message.includes('not initialized')) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY not configured or API error',
        details: 'OpenAI client is not initialized. Please check your environment variables.'
      });
    }

    // Check for OpenAI API specific errors
    if (error.status === 401) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY not configured or API error',
        details: 'Invalid API key. Please check your OpenAI API key.'
      });
    }

    if (error.status === 429) {
      return res.status(500).json({
        error: 'OpenAI API quota exceeded',
        details: 'You have exceeded your OpenAI API quota or run out of credits. Please check your billing at platform.openai.com/account/billing'
      });
    }

    res.status(500).json({
      error: 'OPENAI_API_KEY not configured or API error',
      details: error.message
    });
  }
}

module.exports = {
  refinePrompt,
};
