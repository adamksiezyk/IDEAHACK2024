import React from "react";
import { Search, MapPin, Moon, Star } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#2c2c2c] text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <a href="/" className="text-xl font-bold">
            Scienceprenourship
          </a>
          <span className="text-sm">
            Merge scientific discovery with business use cases
          </span>
        </div>

        {/* Middle Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="flex items-center bg-[#111111] px-3 py-1 rounded">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-white ml-2"
            />
          </div>

          {/* Location */}
          <div className="flex items-center bg-[#111111] px-3 py-1 rounded">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="ml-2">Location</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Mode Toggle */}
          <button className="flex items-center bg-[#111111] px-3 py-1 rounded">
            <Moon className="w-4 h-4 text-gray-400" />
          </button>

          {/* Icons */}
          <div className="flex space-x-2">
            <button className="bg-[#111111] px-3 py-1 rounded">
              Job offers
            </button>
            <button className="bg-[#111111] px-3 py-1 rounded">
              Top Companies
            </button>
            <button className="bg-[#111111] px-3 py-1 rounded">Geek</button>
          </div>

          {/* Profile and More */}
          <button className="flex items-center bg-[#111111] px-3 py-1 rounded">
            <Star className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
