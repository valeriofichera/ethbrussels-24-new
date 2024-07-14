import { FunctionComponent as FC } from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-slate-500/30 shadow-md">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className=" w-80 mr-2" />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
       priviy wallet
      </button>
    </header>
  );
};

export default Header;

