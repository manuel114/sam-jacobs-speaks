const axios = require('axios');

module.exports = async (req, res) => {
  console.log('API function called');
  console.log('Environment check:', process.env.OPENAI_API_KEY ? 'API key present' : 'API key missing');
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userQuestion } = req.body;
    console.log('User question:', userQuestion);

    if (!userQuestion) {
      return res.status(400).json({ error: 'User question is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    console.log('Creating OpenAI client...');
    // Create OpenAI client
    const openai = axios.create({
      baseURL: 'https://api.openai.com/v1',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    console.log('Creating assistant...');
    // Create assistant
    const assistantResponse = await openai.post('/assistants', {
      name: 'Sam Jacobs GTM Oracle',
      instructions: `You are Sam Jacobs, a mystical GTM (Go-to-Market) oracle with deep experience in business strategy, sales, and market positioning. You provide advice in a mystical, fortune-teller style but with practical business wisdom. 

Your responses should be:
- Mystical and engaging, like a fortune teller
- Practical and actionable business advice
- Focused on GTM strategy, sales, marketing, and business growth
- Encouraging and positive
- Around 2-3 sentences, concise but impactful

Always sign off with "~ Sam Jacobs, GTM Oracle"`,
      model: 'gpt-4o-mini'
    });

    const assistantId = assistantResponse.data.id;
    console.log('Assistant created:', assistantId);

    console.log('Creating thread...');
    // Create thread
    const threadResponse = await openai.post('/threads', {
      messages: [
        {
          role: 'user',
          content: userQuestion
        }
      ]
    });

    const threadId = threadResponse.data.id;
    console.log('Thread created:', threadId);

    console.log('Creating run...');
    // Create run
    const runResponse = await openai.post(`/threads/${threadId}/runs`, {
      assistant_id: assistantId
    });

    const runId = runResponse.data.id;
    console.log('Run created:', runId);

    console.log('Polling for completion...');
    // Poll for completion
    let runStatus = 'queued';
    while (runStatus === 'queued' || runStatus === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const runCheckResponse = await openai.get(`/threads/${threadId}/runs/${runId}`);
      runStatus = runCheckResponse.data.status;
      console.log('Run status:', runStatus);
    }

    if (runStatus === 'failed') {
      throw new Error('OpenAI run failed');
    }

    console.log('Getting messages...');
    // Get messages
    const messagesResponse = await openai.get(`/threads/${threadId}/messages`);
    const messages = messagesResponse.data.data;
    const assistantMessage = messages.find(msg => msg.role === 'assistant');

    if (assistantMessage && assistantMessage.content.length > 0) {
      let advice = assistantMessage.content[0].text.value;

      console.log('Original advice:', advice);

      // Remove source citations like 【4:17†Kind People Finish First - with Text.pdf】
      advice = advice.replace(/【[^】]*†[^】]*】/g, '');

      // Remove bracket-style citations with dagger symbol
      advice = advice.replace(/\[\d+:\d+†[^\]]*\]/g, '');

      // Remove any remaining citations with numbers and colons in Japanese brackets
      advice = advice.replace(/【\d+:\d+[^】]*】/g, '');

      // Remove any remaining citations with numbers and colons in regular brackets
      advice = advice.replace(/\[\d+:\d+[^\]]*\]/g, '');

      // Remove any citation with dagger symbol regardless of brackets
      advice = advice.replace(/[【\[][^】\]]*†[^】\]]*[】\]]/g, '');

      // Remove any citation with numbers and colons regardless of brackets
      advice = advice.replace(/[【\[]\d+:\d+[^】\]]*[】\]]/g, '');

      // Clean up extra whitespace that might be left after removing citations
      advice = advice.replace(/\s+/g, ' ').trim();

      console.log('Cleaned advice:', advice);

      res.json({ advice });
    } else {
      console.error('No assistant message found');
      res.status(500).json({ error: 'No advice received from assistant' });
    }

  } catch (error) {
    console.error('Detailed error:', error);
    console.error('Error message:', error.message);
    console.error('Error response:', error.response?.data);
    res.status(500).json({ error: 'Failed to get advice' });
  }
}; 