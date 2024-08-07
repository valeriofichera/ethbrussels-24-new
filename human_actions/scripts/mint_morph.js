require('dotenv').config();
const { createWalletClient, createPublicClient, getContract, http } = require('viem');
const { morphHolesky } = require('viem/chains');
const { privateKeyToAccount, privateKeyToAddress } = require('viem/accounts');
const { NFT_ADDRESS_MORPH, NFT_ABI } = require('./config');

//const chainID = process.env.chain_id;
const privateKey = process.env.private_key;
const publicKey = privateKeyToAddress(privateKey);
const account = privateKeyToAccount(privateKey);
const contractAddress = NFT_ADDRESS_MORPH

const publicClient = createPublicClient({
    chain: morphHolesky,
    transport: http('https://eth-sepolia.g.alchemy.com/v2/eRlftrygquZ6H1vgE1QHoGiyJytGXlN8')
});

const mintMorph = async () => {
    const tokenId = 2;

    const walletClient = createWalletClient({
        account: account,
        chain: morphSepolia,
        transport: http('https://eth-sepolia.g.alchemy.com/v2/eRlftrygquZ6H1vgE1QHoGiyJytGXlN8')
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

module.exports = { mintMorph };