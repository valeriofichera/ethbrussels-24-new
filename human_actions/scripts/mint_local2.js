require('dotenv').config();
const { createWalletClient, createPublicClient, getContract, http } = require('viem');
const { localhost } = require('viem/chains');
const { privateKeyToAccount, privateKeyToAddress } = require('viem/accounts');
const { NFT_ADDRESS_LOCAL, NFT_ABI } = require('./config');

//const chainID = process.env.chain_id;
const privateKey = process.env.ganache_private_key;
const publicKey = privateKeyToAddress(privateKey);
const account = privateKeyToAccount(privateKey);
const contractAddress = NFT_ADDRESS_LOCAL

const publicClient = createPublicClient({
    chain: localhost,
    transport: http('HTTP://127.0.0.1:7545')
});

const mintLocal2 = async () => {
    const tokenId = 2;

    const walletClient = createWalletClient({
        account: account,
        chain: localhost,
        transport: http('HTTP://127.0.0.1:7545')
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
        console.log('MINT on Local 2 executed @ Block', currentBlockNumber);
    } catch (error) {
        console.error('error simulating', error);
    }
};

module.exports = { mintLocal2 };