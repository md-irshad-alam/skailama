"use client";
import React, { useEffect, useState } from "react";
import PodcastSidebar from "./Sidebar";
import { IoMdHome } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import FeedCard from "./FeedCard";
import CustomModal from "../modals/CustomModals";
import YoutubeUploadModel from "../modals/YouTubeUploadModel";
import PodcastTable from "./PodcastTable";
import EditTranscript from "./EditTranscript";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
const PodcastCreate = () => {
  const url = "Sample Project";
  const [isOpen, setopen] = useState(false);
  const [podcastDetails, setPodcastDetails] = useState([]);
  const [isShowTable, setIsShowTable] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [productId, setProductId] = useState(null);
  const [transcript, setTranscript] = useState(null);

  const handleClose = () => {
    setopen(false);
  };

  const handleCloseTable = () => {
    setIsShowTable(false);
  };
  const handleOpen = () => {
    setopen(true);
  };

  const navigate = useRouter();
  const handleLogout = async () => {
    const res = await axios
      .get(
        "https://skailama-3kpj.onrender.com/api/auth/logout",

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate.push("/");
        toast.success(res.data.message);
      })
      .catch((err) => toast.warn(err.responce.message));
  };
  return (
    <div className="w-full m-auto h-screen  bg-gradient-to-br from-indigo-50 via-white to-purple-100 ">
      <div className="w-90% m-auto flex justify-center items-start">
        <div className="w-[30%] h-[100%">
          <PodcastSidebar />
        </div>
        <div className="w-full flex flex-col gap-8 p-6 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10">
            <p className="flex items-center gap-x-2 text-md md:text-lg font-semibold text-gray-400">
              <IoMdHome className="text-2xl md:text-2xl" />
              <span className="text-gray-500">
                <Breadcrumb />
              </span>
              /<span className="text-purple-700 ">Add your podcast</span>
            </p>
            <div className="flex justify-center items-center gap-x-4 mt-4 md:mt-0">
              <button className="p-2 rounded-full hover:bg-indigo-100 transition">
                <CiBellOn className="text-2xl text-indigo-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-red-100 transition">
                <IoLogOutOutline
                  className="text-2xl text-red-500"
                  onClick={handleLogout}
                />
              </button>
            </div>
          </div>

          {showTranscript ? (
            <div className="w-full">
              <div className="w-[90%] m-auto p-6">
                <EditTranscript
                  setShowTrasnscript={setShowTranscript}
                  initialTranscript={transcript}
                  productId={productId}
                />
              </div>
            </div>
          ) : (
            <>
              {/* FeedCards and Upload UI */}
              <div className="w-[90%]">
                <h2 className="text-2xl font-bold">Add Podcast</h2>
                <div className="w-full flex justify-around items-center gap-x-10 mt-6 cursor-pointer ">
                  <FeedCard
                    title="RSS Feed"
                    content="best feed card for the url"
                    image="/images/RssFeed.png"
                  />
                  <FeedCard
                    title="Youtube Feed"
                    content="best feed card for the url"
                    image="/images/youtube.png"
                    onClick={handleOpen}
                  />
                  <FeedCard
                    title="Uopload Files"
                    content="best feed card for the url"
                    onClick={handleCloseTable}
                  />
                </div>
              </div>

              {/* Show either table or upload box */}
              {isShowTable ? (
                <div className="w-full m-auto">
                  <div className="max-w-[90%] shadow-xl p-4 border-2 border-gray-200">
                    <PodcastTable
                      setShowTrasnscript={setShowTranscript}
                      transcript={setTranscript}
                      productId={setProductId}
                      isOpen={isOpen}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col justify-center items-center gap-y-7 shadow-xl p-6">
                    <div>
                      <IoCloudUploadOutline
                        size={70}
                        color="purple"
                        className="pointer-coarse:"
                      />
                    </div>
                    <p className="flex flex-col text-2xl text-[#49454F]">
                      Select a file or drag and drop here (Podcast Media or
                      Transcription Text)
                      <span className="block text-center text-[16px] text-[#00000066] mt-4">
                        MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
                      </span>
                    </p>
                    <button className="bg-none border-2 border-purple-400 p-1 pl-3 pr-3 rounded-full">
                      Select File
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <CustomModal isOpen={isOpen} onClose={handleClose}>
        <YoutubeUploadModel
          setPodcastDetails={setPodcastDetails}
          setopen={setopen}
          setIsShowTable={setIsShowTable}
        />
      </CustomModal>
    </div>
  );
};

export default PodcastCreate;
