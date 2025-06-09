import React from "react";
import { motion } from "framer-motion";
import { MdFileUpload } from "react-icons/md";
const FeedCard = ({ title, content, image, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 flex items-start max-w-2xl gap-x-6 transition-transform hover:translate-0.5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <div className="flex flex-col items-start">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
      {image ? (
        <img
          src={image}
          alt={title}
          width={50}
          height={30}
          className="object-cover rounded-md mb-4"
        />
      ) : (
        <MdFileUpload
          size={40}
          color="purple"
          className="object-cover rounded-md mb-4 bg-purple-200 p-2"
        />
      )}
    </motion.div>
  );
};

export default FeedCard;
