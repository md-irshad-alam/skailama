"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaRegCopy } from "react-icons/fa6";
import { MdHelpOutline, MdOutlineDownload, MdSettings } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { FaRegCircleUser } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
const listItem = [
  {
    title: "Add your podcast",
    link: "/",
    icon: <FaPlus />,
  },
  {
    title: "Create response",
    link: "/",
    icon: <TiPencil />,
  },
  {
    title: "Podcast Widget",
    link: "/",
    icon: <FaRegCopy />,
  },
  {
    title: "Upgrade",
    link: "/",
    icon: <MdOutlineDownload />,
  },
];

const PodcastSidebar = () => {
  const itemRefs = useRef([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const handleSelect = (idx) => {
    setSelectedIdx(idx);
    if (itemRefs.current[idx]) {
      itemRefs.current[idx].focus();
    }
  };
  const [user, setusers] = useState([]);
  const getLoggeduser = () => {
    axios
      .get("https://skailama-3kpj.onrender.com/api/auth/profile", {
        withCredentials: true,
      })
      .then((res) => setusers(res.data.user))
      .catch((err) => toast.warn(err.responce.data.message));
  };

  useEffect(() => {
    getLoggeduser();
  }, []);

  return (
    <aside className="w-full h-screen bg-white shadow-md flex flex-col justify-between">
      {/* Top: Logo and Navigation */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b">
          <img
            src="/navlogo.png"
            alt="sidebar logo"
            width={160}
            height={140}
            className="object-contain"
          />
        </div>

        {/* Navigation Items */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {listItem.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.link}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  tabIndex={0}
                  onClick={() => handleSelect(idx)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                    selectedIdx === idx
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom: Help & User Info */}
      <div className="px-6 py-6 border-t space-y-4">
        <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
          <MdHelpOutline size={20} />
          <span className="text-sm font-medium">Help</span>
        </button>

        <div className="flex items-center gap-2 mt-4">
          <FaRegCircleUser size={28} className="text-purple-600" />
          <div>
            <p className="text-sm font-semibold text-gray-700">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PodcastSidebar;
