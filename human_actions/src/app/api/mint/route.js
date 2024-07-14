import { NextResponse } from 'next/server';
import { mintNFT } from '../app/api/mint/mint.js';

export async function POST() {
  try {
    await mintNFT();
    return NextResponse.json({ message: 'Minting successful' });
  } catch (error) {
    return NextResponse.json({ error: 'Minting failed', details: error.message }, { status: 500 });
  }
}