"use client";
import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ProjectList = ({ SetshowCreatePage, showCreateProject }) => {
  const router = useRouter();
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("https://skailama-3kpj.onrender.com/api/project/getAll", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.data);
        toast.success(res.data.message);
      })
      .catch((err) =>
        toast.warn(err?.response?.data?.message || "Failed to fetch projects")
      );
  };

  useEffect(() => {
    fetchData();
  }, [showCreateProject]);

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-white">
      <div className="w-[85%] m-auto flex justify-between items-center p-4">
        <h3 className="font-bold text-[30px] md:text-[38px] text-purple-600">
          Projects
        </h3>
        <button
          className="flex items-center gap-2 px-4 py-2 border border-yellow-400 bg-black text-white font-semibold rounded-md text-sm sm:text-base hover:shadow-xl transition-all duration-300"
          onClick={() => SetshowCreatePage(true)}
        >
          <TiPlus className="text-lg" />
          Create New Project
        </button>
      </div>

      <div className="w-[85%] m-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((project, idx) => {
            const avatar =
              project.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase() || "";

            return (
              <motion.div
                key={project._id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-50 rounded-xl shadow-md p-4 cursor-pointer hover:bg-purple-50 transition"
                onClick={() =>
                  router.push(
                    `/podcast/${slugify(project.name)}?id=${project._id}`
                  )
                }
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center text-white text-2xl font-bold uppercase">
                    {avatar}
                  </div>

                  {/* Info Section */}
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg text-gray-800">
                      {project.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Files: <strong>{project.transcriptCout || 0}</strong>
                    </span>
                    <span className="text-sm text-gray-500">
                      Last edited:{" "}
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-gray-400 text-center py-12">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
