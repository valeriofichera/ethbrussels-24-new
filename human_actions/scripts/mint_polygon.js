require('dotenv').config();
const { createWalletClient, createPublicClient, getContract, http } = require('viem');
const { polygonZkEvmCardona } = require('viem/chains');
const { privateKeyToAccount, privateKeyToAddress } = require('viem/accounts');
const { NFT_ADDRESS_POLYGON, NFT_ABI } = require('./config');

//const chainID = process.env.chain_id;
const privateKey = process.env.private_key;
const publicKey = privateKeyToAddress(privateKey);
const account = privateKeyToAccount(privateKey);
const contractAddress = NFT_ADDRESS

const publicClient = createPublicClient({
    chain: polygonZkEvmCardona,
    transport: http('https://polygonzkevm-cardona.g.alchemy.com/v2/qPPGTookiig8SAV7BEqjwjnBf3kIlId3')
});

const mintPolygon = async () => {
    const tokenId = 2;

    const walletClient = createWalletClient({
        account: account,
        chain: polygonZkEvmCardona,
        transport: http('https://polygonzkevm-cardona.g.alchemy.com/v2/qPPGTookiig8SAV7BEqjwjnBf3kIlId3')
    });

    try {
        const currentBlockNumber = await publicClient.getBlockNumber();
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: NFT_ABI,
            functionName: 'safeMint',
            args: [publicKey, tokenId],
            account: account
        });
        console.log('simulated contract, success, will mint NFT now');
        await walletClient.writeContract(request);
        console.log('MINT executed @ Block', currentBlockNumber);
    } catch (error) {
        console.error('error simulating', error);
    }
};

module.exports = { mintPolygon };