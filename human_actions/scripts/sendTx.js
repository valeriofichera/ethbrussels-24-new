require('dotenv').config();
const { createWalletClient, createPublicClient, getContract, http } = require('viem');
const { sepolia } = require('viem/chains');
const { privateKeyToAccount } = require('viem/accounts');
const { NFT_ADDRESS, NFT_ABI } = require('./config');

const chainID = process.env.chain_id;
const privateKey = process.env.private_key;

// Derive the account address from the private key
const account = privateKeyToAccount(privateKey);
const RECIPIENT_ADDRESS = account.address;

// const chainConfig = {

//     sepolia: {
//         chainName: sepolia,
//         chainID: 11155111,
//         rpcUrl: 'https://ethereum-sepolia.rpc.subquery.network/public',
//         contractAddress: NFT_ADDRESS
//     }

// };

const publicClient = createPublicClient({ 
    chain: sepolia,
    transport: http('https://ethereum-sepolia.rpc.subquery.network/public')
  })

const sendTx = async () => {
    try {
        const walletClient = createWalletClient({
            account,
            chain: sepolia,
            transport: http('https://ethereum-sepolia.rpc.subquery.network/public')
        });

        const tx = await walletClient.sendTransaction({
            to: RECIPIENT_ADDRESS,
            value: BigInt(1e15), // Sending 0.001 ETH (0.001 * 10^18)
            gasLimit: BigInt(21000), // Standard gas limit for ETH transfer
            gasPrice: await publicClient.getGasPrice()
        });

        console.log('Transaction sent. Hash:', tx.hash);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
};

sendTx();

