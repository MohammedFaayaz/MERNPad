import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-400 font-mono tracking-tight">
            MERNPad
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
