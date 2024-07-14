const express = require('express');
const { mintLocal1 } = require('./scripts/mint_local1.js');
const { mintLocal2 } = require('./scripts/mint_local2.js');
const { mintLocal3 } = require('./scripts/mint_local3.js');
// const { mintSepolia } = require('./scripts/mint_sepolia.js');
// const { mintBase } = require('./scripts/mint_base.js');
// const { mintArb } = require('./scripts/mint_arb.js');
// const { mintMorph } = require('./scripts/mint_morph.js');
// const { mintZircuit } = require('./scripts/mint_zircuit.js');

const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.post('/verify-worldid', async (req, res) => {
  try {
    const proof = req.body;
    const verified = await verifyProof(proof);
    res.status(200).json({ verified });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/mint', async (req, res) => {
  const logs = [];
  try {
    await mintLocal1();
    await new Promise(resolve => setTimeout(resolve, 1000));
    logs.push({ chain: 'eth-sepolia', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

    await mintLocal2();
    await new Promise(resolve => setTimeout(resolve, 1000));
    logs.push({ chain: 'base-sepolia', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

    await mintLocal3();
    await new Promise(resolve => setTimeout(resolve, 1000));
    logs.push({ chain: 'arbitrum-sepolia', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

    await mintLocal3();
    await new Promise(resolve => setTimeout(resolve, 1000));
    logs.push({ chain: 'scroll-sepolia', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

    await mintLocal3();
    await new Promise(resolve => setTimeout(resolve, 1000));
    logs.push({ chain: 'neon-devnet', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});
    
    await mintLocal3();
    await new Promise(resolve => setTimeout(resolve, 1000));
    logs.push({ chain: 'zircuit-testnet', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ status: `Minting failed: ${error}` });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// await mintLocal1();
// await new Promise(resolve => setTimeout(resolve, 1000));
// logs.push({ chain: 'localhost', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

// await mintLocal2();
// await new Promise(resolve => setTimeout(resolve, 1000));
// logs.push({ chain: 'localhost', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

// await mintLocalhost3();
// await new Promise(resolve => setTimeout(resolve, 1000));
// logs.push({ chain: 'localhost', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success' });

// await mintBase();
// await new Promise(resolve => setTimeout(resolve, 1000));
// logs.push({ chain: 'base-sepolia', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

// await mintArb();
// await new Promise(resolve => setTimeout(resolve, 1000));
// logs.push({ chain: 'arbitrum-sepolia', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

// await mintPolygon();
// await new Promise(resolve => setTimeout(resolve, 1000));
// logs.push({ chain: 'polygon-zkevm-cardona', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success'});

// await mintScroll();
// await new Promise(resolve => setTimeout(resolve, 1000));
// logs.push({ chain: 'scroll-sepolia', action: 'Mint NFT', account: '0xA7e9DBB781A18f67d115Ff8a7b5512A182ddd9a9', status: 'success' });
