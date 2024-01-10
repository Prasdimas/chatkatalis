import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

export const openaiKey = (req, res) => {
  res.json({ openaiApiKey });
};

export const openairequest = async (req, res) => {
  const { option, input } = req.body;

  const openai = new OpenAIApi(new Configuration({
    apiKey: openaiApiKey
  }))
  
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: input }
      ]
    });
    const result = response.data.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    console.error('Error making OpenAI request:', error);
    res.status(500).json({ error: 'An error occurred while making the OpenAI request.' });
  }
};
