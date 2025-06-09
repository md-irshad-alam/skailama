import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { TiPlus } from "react-icons/ti";
import CustomModal from "../modals/CustomModals";
import ProjectCreatingModal from "../modals/PorjectCreatingModel";

const ProjectHome = ({ setInputData, SetshowCreatePage }) => {
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-white">
      <div className="w-[95%] md:w-[85%] lg:w-[70%] m-auto p-4 relative">
        <motion.div
          className="w-full flex flex-col justify-center items-center text-center"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-bold text-[#7E22CE] leading-tight mb-6">
            Create a New Project
          </h1>

          <motion.img
            src="/images/createGrp.png"
            alt="Create group logo"
            className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] max-w-[400px] h-auto mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />

          <div className="flex flex-col items-center justify-center gap-4 font-sans text-center px-4 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-gray-700"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
              sunt, molestiae fugit ipsam nulla tempora natus! Aut, provident
              quasi. Magni, quia.
            </motion.p>

            <motion.button
              className="flex items-center gap-2 px-4 py-2 border border-amber-300 bg-black text-white font-semibold rounded-md text-sm sm:text-base hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setOpen(true)}
            >
              <TiPlus className="text-lg" />
              Create New Project
            </motion.button>
          </div>
        </motion.div>
      </div>
      <CustomModal isOpen={isOpen} onClose={handleClose}>
        <ProjectCreatingModal
          setProjecctDetails={setInputData}
          SetshowCreatePage={SetshowCreatePage}
          setopen={setOpen}
        />
      </CustomModal>
    </div>
  );
};

export default ProjectHome;
