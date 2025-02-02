"use client";

import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0f0f0f] text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 md:px-12">
        {/* Logo */}
        <div className="logo h-[3rem] w-[6rem]">
          <Image src="/logo.png" alt="Logo" width={96} height={48} />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex justify-center gap-8 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-400 cursor-pointer">Enlight Your Idea</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Button and Icon */}
        <div className="hidden md:flex items-center gap-6">
          <button className="bg-yellow-400 px-4 py-2 text-sm font-semibold rounded-3xl hover:bg-yellow-500 transition">
            Curve Imaginations
          </button>
          <lord-icon
            className="rounded-3xl cursor-pointer"
            src="https://cdn.lordicon.com/whtfgdfm.json"
            trigger="hover"
            style={{ width: "40px", height: "40px", backgroundColor: "orange" }}
          ></lord-icon>
        </div>

        {/* Hamburger Menu */}
        <div
          className="md:hidden flex items-center cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Image
            src={isMenuOpen ? "/hb2.png" : "/hb1.png"}
            alt="Menu Icon"
            width={32}
            height={32}
            className={`transition-transform duration-500 ease-in-out ${
              isMenuOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#0f0f0f] text-white overflow-hidden transition-all duration-700 ease-in-out ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-6 text-center text-sm py-6">
          <li className="hover:text-yellow-400 cursor-pointer">Home</li>
          <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
          <li className="hover:text-yellow-400 cursor-pointer">Enlight Your Idea</li>
          <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
        </ul>
        <div className="mt-4 flex justify-center">
          <button className="bg-yellow-400 px-6 py-2 text-sm font-semibold rounded-3xl hover:bg-yellow-500 transition">
            Curve Imaginations
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;