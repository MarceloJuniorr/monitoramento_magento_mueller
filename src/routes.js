import multer, { memoryStorage } from 'multer';
import { Router } from 'express';
import config from './config.js';
import { fileURLToPath } from 'url'; // Importe a função fileURLToPath
import { dirname, join } from 'path'; // Importe as funções dirname e join
import { processarPlanilhaMagento } from './controllers/uploadController.js'; // Importe como função

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = memoryStorage();
const upload = multer({ storage });
const router = Router();

router.post('/upload-csv-magento', upload.single('xlsFile'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const pedidos = await processarPlanilhaMagento(buffer);

    res.json('Pedidos processados!');
  } catch (error) {
    console.error('Erro durante o upload da planilha:', error);
    res.status(500).json({ error: 'Erro no servidor durante o upload da planilha.' });
  }
});

  router.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public/magento', 'index.html'));
  });

export default router;