"use client";
import React from "react";
import { motion } from "framer-motion";
import { IoSettings } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";

const ProjectNavbar = () => {
  return (
    <motion.nav
      className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm "
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/navlogo.png"
            alt="Logo"
            className="h-9 md:h-11 object-contain"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <IoSettings size={24} className="text-gray-700" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <FaBell size={22} className="text-gray-700" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default ProjectNavbar;
