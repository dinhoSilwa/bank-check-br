/**
 * Exemplo de uso com Express.js
 * 
 * Para rodar:
 * npm install express
 * npx tsx examples/express-server.ts
 */

import express from 'express';
import {
  validarBanco,
  buscarBanco,
  buscarBancosPorNome,
  listarBancos,
  gerarSVG,
} from '../src/index';

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota para validar banco
app.get('/api/bank/validate/:code', async (req, res) => {
  const { code } = req.params;
  const banco = await validarBanco(code);

  if (!banco) {
    return res.status(404).json({ error: 'Banco não encontrado' });
  }

  res.json(banco);
});

// Rota para buscar banco com SVG
app.get('/api/bank/:code', async (req, res) => {
  const { code } = req.params;
  const includeSvg = req.query.svg === 'true';

  const banco = await buscarBanco(code, { includeSvg });

  if (!banco) {
    return res.status(404).json({ error: 'Banco não encontrado' });
  }

  res.json(banco);
});

// Rota para buscar por nome
app.get('/api/banks/search', async (req, res) => {
  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Parâmetro q é obrigatório' });
  }

  const bancos = await buscarBancosPorNome(q);
  res.json(bancos);
});

// Rota para listar todos os bancos
app.get('/api/banks', async (req, res) => {
  const bancos = await listarBancos();
  res.json(bancos);
});

// Rota para obter SVG
app.get('/api/bank/:code/svg', async (req, res) => {
  const { code } = req.params;
  const banco = await buscarBanco(code);

  if (!banco) {
    return res.status(404).json({ error: 'Banco não encontrado' });
  }

  const svg = gerarSVG(banco.nomeExtenso);

  if (!svg) {
    return res.status(404).json({ error: 'SVG não disponível' });
  }

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('\nRotas disponíveis:');
  console.log('  GET /api/bank/validate/:code - Validar banco');
  console.log('  GET /api/bank/:code - Buscar banco');
  console.log('  GET /api/bank/:code?svg=true - Buscar banco com SVG');
  console.log('  GET /api/banks/search?q=:query - Buscar por nome');
  console.log('  GET /api/banks - Listar todos');
  console.log('  GET /api/bank/:code/svg - Obter SVG');
});
