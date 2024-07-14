const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

const verifyProof = async (proof, signal) => {
  console.log('proof', proof);
  console.log('signal', signal);

  const data = JSON.stringify({ ...proof, action: "human_verify", signal });




  const options = {
    hostname: 'developer.worldcoin.org',
    path: '/api/v2/verify/app_staging_05b42acd6f2c4cf0ad8856657e796e17',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'User-Agent': 'human_actions_server/1.0',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        console.log('Response body:', body); // Log the response body for debugging
        if (res.statusCode === 200) {
          try {
            const { success } = JSON.parse(body);
            resolve(success);
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        } else {
          try {
            const { code, detail } = JSON.parse(body);
            reject(new Error(`Error Code ${code}: ${detail}`));
          } catch (error) {
            reject(new Error(`Failed to parse error JSON: ${error.message}`));
          }
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
};

app.post('/verify-worldid', async (req, res) => {
  try {
    const { proof, signal } = req.body;
    const verified = await verifyProof(proof, signal);
    res.status(200).json({ verified });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});