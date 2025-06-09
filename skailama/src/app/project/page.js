"use client";
import CreatePorjectPage from "@/componants/projects/CreateProject";
import React from "react";
import { ToastContainer } from "react-toastify";
const CreateProjectHome = () => {
  return (
    <div>
      <ToastContainer />
      <CreatePorjectPage />;
    </div>
  );
};

export default CreateProjectHome;
