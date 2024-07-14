"use client"; // Add this line to mark the component as a client component

import Actions from "./Actions";
import WorldId from "./WorldId";

import { useState } from 'react';

export default function Hero() {
  const [isWorldIdClicked, setIsWorldIdClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleWorldIdClick = () => {
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 2) {
        setIsWorldIdClicked(true);
      }
      return newCount;
    });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-white p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">✨ do all the on-chain things you never had time for ✨</h1>
        <h2 className="text-2xl font-medium mb-8">you are human and not a machine, stop clicking around all day</h2>
      </div>

      {!isWorldIdClicked && <WorldId onClick={handleWorldIdClick} />}
      {isWorldIdClicked && <Actions />}
    </section>
  );
}