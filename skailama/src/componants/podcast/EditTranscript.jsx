"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
const EditTranscript = ({
  setShowTrasnscript,
  initialTranscript,
  productId,
}) => {
  const [editClicked, setEditClicked] = useState(false);
  const [transcript, setTranscript] = useState(initialTranscript);
  const [tempTranscript, setTempTranscript] = useState(transcript);

  const handleEdit = () => {
    setEditClicked(true);
  };

  const handleCancel = () => {
    setTempTranscript(transcript);
    setEditClicked(false);
  };
  const handleSave = () => {
    axios
      .put(
        `http://localhost:8080/api/transcript/update/${productId}`,
        { transcript: tempTranscript },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setData(res.data.data);
        toast.success(res.data.message);
      })
      .catch((err) => toast.warn(err.responce.data.message));
    setTranscript(tempTranscript);
    setEditClicked(false);
  };

  return (
    <div className="container">
      <div className="w-full flex items-center justify-between p-4">
        <p
          className="flex items-center gap-x-4"
          onClick={() => setShowTrasnscript(false)}
        >
          <FaArrowLeft size={22} />
          <span>Edit Transcript</span>
        </p>
        {!editClicked ? (
          <button
            className="bg-[#211935] text-white pl-10 pr-10 text-lg"
            onClick={handleEdit}
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-x-2">
            <button
              className="bg-none text-red-600 border-2 border-red-300 pl-6 pr-6 text-lg"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-[#211935] text-white pl-6 pr-6 text-lg"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="w-full shadow-xl p-6 mt-6">
        <div className="flex flex-col gap-y-6">
          <h2 className="font-bold text-purple-600 text-xl">
            Sample Transcript
          </h2>
          {editClicked ? (
            <textarea
              className="w-full border rounded p-2"
              rows={6}
              value={tempTranscript}
              onChange={(e) => setTempTranscript(e.target.value)}
            />
          ) : (
            <p>{transcript}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTranscript;
