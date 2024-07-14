"use client"

import React from 'react';

const Mint = () => {
  const handleMintClick = async () => {
    try {
      const response = await fetch('../scripts/mint.js', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Minting successful:', result);
    } catch (error) {
      console.error('Minting failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Mint Your NFT</h1>
      <button
        onClick={handleMintClick}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Mint NFT
      </button>
    </div>
  );
};

export default Mint;
