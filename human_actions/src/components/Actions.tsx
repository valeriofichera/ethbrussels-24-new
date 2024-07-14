'use client'

import React, { useState, useEffect } from 'react';
import 'animate.css';

interface Log {
  chain: string;
  status: string;
  account: string;
  action: string;
  hash?: string; // Add hash to the Log interface
}

const blockscout_logo = 'https://docs.blockscout.com/~gitbook/image?url=https%3A%2F%2F1077666658-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-Lq1XoWGmy8zggj_u2fM%252Flogo%252FYI1vHQ8jE6a5hXRY0EAm%252Fv_Color_BS_logo.png%3Falt%3Dmedia%26token%3D9fc53e41-ce07-4ec1-9147-1857178d3849&width=320&dpr=1&quality=100&sign=c96ff0d6&sv=1';


export default function Actions() {
  const [logs, setLogs] = useState<Log[]>([]);

  const handleMintClick = async () => {
    try {
      const response = await fetch('http://localhost:3002/mint');
      const result = await response.json();
      if (response.ok) {
        for (const log of result.logs) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          const hash = await getLatestSafeMintTransactionHash(log); // Fetch the hash
          setLogs((prevLogs) => [...prevLogs, { ...log, hash }]); // Add the hash to the log
        }
      } else {
        setLogs((prevLogs) => [...prevLogs, { chain: 'error', status: `Error: ${result}`, account: '', action: '' }]);
      }
    } catch (error) {
      setLogs((prevLogs) => [...prevLogs, { chain: 'error', status: `Error: ${error}`, account: '', action: '' }]);
    }
  };

  const getContent = (log: Log) => {
    switch (log.chain) {
      case 'eth-sepolia':
        return {
          name: 'Sepolia',
          image: 'https://d38z7tior69ak3.cloudfront.net/db26931594a768bd-d8ca1ff0.svg',
          blockscout_tx: 'https://eth-sepolia.blockscout.com/tx/',
        };
      case 'base-sepolia':
        return {
          name: 'Base',
          image: 'https://d38z7tior69ak3.cloudfront.net/175ee522deb86c21-77a41fb7.svg',
          blockscout_tx: 'https://base-sepolia.blockscout.com/tx/',
        };
      case 'arbitrum-sepolia':
        return {
          name: 'Arbitrum',
          image: 'https://d38z7tior69ak3.cloudfront.net/d06a8d429d2766b3-84571b49.svg',
          blockscout_tx: 'https://arbitrum-sepolia.blockscout.com/tx/',
        };
        case 'zkevm-cardona':
        return {
          name: 'Polygon zkEVM',
          image: 'https://d38z7tior69ak3.cloudfront.net/455b7b3d6f2e6f6a-3bc67886.svg',
          blockscout_tx: 'https://explorer-ui.zkevm-testnet.com/tx/',
        };
        case 'neon-devnet':
            return {
              name: 'Neon EVM',
              image: '../../public/neon.png',
              blockscout_tx: 'https://neon-devnet.blockscout.com/tx/',
            };
        case 'scroll-sepolia':
            return {
                name: 'Scroll',
                image: 'https://sepolia.scrollscan.com/assets/scroll/images/svg/logos/chain-light.svg?v=24.7.1.1',
                blockscout_tx: 'https://api-sepolia.scrollscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=',
            };
            case 'zircuit-testnet':
            return {
                name: 'Zircuit',
                image: 'https://explorer.zircuit.com/assets/zircuit_logo_footer_light.svg',
                blockscout_tx: 'https://explorer.zircuit.com/',
            };

      default:
        return {
          name: 'Unknown',
          image: 'https://d38z7tior69ak3.cloudfront.net/410e3bd4d4476f24-219714cc.svg',
          blockscout_tx: '',
        };
    }
  };

  const getLatestSafeMintTransactionHash = async (log: Log) => {
    try {
      const response = await fetch(`https://${log.chain}.blockscout.com/api/v2/addresses/${log.account}/transactions`);
      const data = await response.json();
      const transactions = data.items;

      const latestTransaction = transactions
        .filter((tx: any) => tx.method === 'safeMint')
        .sort((a: any, b: any) => b.block - a.block)[0];

      return latestTransaction ? latestTransaction.hash : 'No transactions found';
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return 'Error fetching transactions';
    }
  };

  useEffect(() => {
    const fetchHash = async () => {
      for (const log of logs) {
        if (!log.hash) { // Only fetch hash if it doesn't already exist
          const hash = await getLatestSafeMintTransactionHash(log);
          setLogs((prevLogs) =>
            prevLogs.map((prevLog) =>
              prevLog.chain === log.chain && prevLog.account === log.account ? { ...prevLog, hash } : prevLog
            )
          );
        }
      }
    };
    fetchHash();
  }, [logs]);

  return (
    <div className="p-4 w-full">
      <div className="flex flex-col items-center pb-3">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 mt-2"
          onClick={handleMintClick}
        >
          GET STARTED
        </button>
      </div>

      <div className="w-full p-4 rounded-lg shadow-inner overflow-y-auto grid grid-cols-1 gap-8">
        {logs.map((log, index) => {
          const content = getContent(log);
          return (
            <div
              key={index}
              className={`animate__animated animate__fadeInRightBig bg-white/70 p-6 rounded-lg shadow-md w-full ${log.chain !== 'error' ? 'opacity-100' : 'opacity-50'}`}
            >
            <div className='flex flex-row justify-between items-center'>

              <div className="flex items-center">
                <img src={content.image} alt="Logo" className="w-20 h-20 mr-4" />
                <span className="text-lg font-bold text-gray-800">{content.name}</span>
              </div>

              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-800 mr-2">Action: </span>
                <p className="text-lg text-gray-600 mr-4">{log.action}</p>
                <span className="text-lg font-semibold text-gray-800 mr-2">Status: </span>
                <p className="text-lg text-gray-600"> ✅ success</p>
              </div>

              <div className="flex items-center justify-end">
                <img src={blockscout_logo} alt="BlockScout Logo" className="w-16 h-16 mr-2" />
                <div className="flex flex-col items-end">
                  <span className="text-lg font-semibold text-gray-800">Powered by BlockScout</span>
                  <a href={content.blockscout_tx + (log.hash || '')} className="text-lg font-semibold text-blue-600 hover:underline">
                    View on Explorer ↳
                  </a>
                </div>
              </div>

            </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}