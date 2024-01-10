const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/Database.js");
const router = require("./routes/index.js");
const { Configuration, OpenAIApi } = require('openai');
dotenv.config();
const app = express();

// Mendefinisikan fungsi async yang akan menampung kode asinkron Anda
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('Database Connected...');
  } catch (error) {
    console.error(error);
  }

  app.use(cors({ 
    credentials: true, 
    origin: ['https://chat.katalismedia.com', 'http://chat.katalismedia.com'] 
  }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(router);

  // Simpan API key sebagai variabel lingkungan
  const openaiApiKey = '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';

  app.get('/api/openai-key', (req, res) => {
    res.json({ openaiApiKey });
  });

  app.post('/api/openai-request', async (req, res) => {
    const { option, input } = req.body;

    // Setel konfigurasi OpenAI
    const configuration = new Configuration({
      apiKey: openaiApiKey,
    });

    const openai = new OpenAIApi(configuration);

    try {
      // Lakukan permintaan OpenAI
      const response = await openai.createCompletion({ ...option, prompt: input });
      const result = response.data.choices[0].text;

      res.json({ result });
    } catch (error) {
      console.error('Kesalahan saat melakukan permintaan OpenAI:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat melakukan permintaan OpenAI.' });
    }
  });

  app.listen(5000, () => console.log('Server running at port 5000'));
};

// Memanggil fungsi async untuk memulai server
startServer();
