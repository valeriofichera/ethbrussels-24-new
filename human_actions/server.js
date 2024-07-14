const express = require('express');
const { mintSepolia } = require('./scripts/mint_sepolia.js');
const { mintBase } = require('./scripts/mint_base.js');
const { mintArb } = require('./scripts/mint_arb.js');
// const { mintMorph } = require('./scripts/mint_morph.js');
// const { mintZircuit } = require('./scripts/mint_zircuit.js');

const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/mint', async (req, res) => {
  const logs = [];
  try {
    await mintSepolia();
    await new Promise(resolve => setTimeout(resolve, 3000));
    logs.push({ action: 'sepolia', message: 'mint NFT' });

    await mintBase();
    await new Promise(resolve => setTimeout(resolve, 3000));
    logs.push({ action: 'base', message: 'mint NFT' });

    await mintArb();
    await new Promise(resolve => setTimeout(resolve, 3000));
    logs.push({ action: 'arb', message: 'mint NFT' });

    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ message: `failed: ${error}` });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});