const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!', env: process.env.OPENAI_API_KEY ? 'API key set' : 'No API key' });
});

// OpenAI Assistant API endpoint
app.post('/api/sam-advice', async (req, res) => {
  try {
    const { question } = req.body;
    
    console.log('Received question:', question);
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Create a thread
    const threadResponse = await axios.post('https://api.openai.com/v1/threads', {}, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    const threadId = threadResponse.data.id;

    // Add the user's question to the thread
    await axios.post(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      role: 'user',
      content: question
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    // Run the assistant
    const runResponse = await axios.post(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      assistant_id: 'asst_jIBr1TaN43vIYXNL87w8QEoS'
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    const runId = runResponse.data.id;

    // Poll for completion
    let runStatus = 'queued';
    while (runStatus === 'queued' || runStatus === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const statusResponse = await axios.get(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      
      runStatus = statusResponse.data.status;
    }

    if (runStatus === 'completed') {
      // Get the assistant's response
      const messagesResponse = await axios.get(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        }
      });

      const assistantMessage = messagesResponse.data.data.find(msg => msg.role === 'assistant');
      
                        if (assistantMessage && assistantMessage.content.length > 0) {
                    let advice = assistantMessage.content[0].text.value;
                    
                    console.log('Original advice:', advice); // Debug log
                    
                    // Remove all citation patterns with Japanese brackets and dagger
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
                    
                    console.log('Cleaned advice:', advice); // Debug log
                    
                    res.json({ advice });
                  } else {
                    res.json({ advice: "Sam is thinking... Try asking again." });
                  }
    } else {
      res.json({ advice: "Sam is busy right now. Try again in a moment." });
    }

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    console.error('Error details:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get advice from Sam' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 