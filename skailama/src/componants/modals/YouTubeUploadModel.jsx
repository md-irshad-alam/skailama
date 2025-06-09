import React, { useState } from "react";
import CustomButton from "./CustomButton";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

// Simple input validation: not empty, min 3 chars, only letters/numbers/spaces
const inputValidation = (input) => {
  if (!input.name || !input.name.trim()) return " Name is required.";
  if (input.name.length < 3) return " Name must be at least 3 characters.";
  if (!/^[\w\s-]+$/.test(input.name))
    return "Only letters, numbers, spaces, and hyphens allowed in name.";
  if (!input.transcript || !input.transcript.trim())
    return "Transcript is required.";
  if (input.transcript.length < 3)
    return "Transcript must be at least 3 characters.";
  return "";
};

const YoutubeUploadModel = ({ setPodcastDetails, setopen, setIsShowTable }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  // Get the id from the query string (?id=...)
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const projectId = searchParams ? searchParams.get("id") : null;
  console.log(projectId);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validationError = inputValidation(input);
    if (validationError) {
      setError(validationError);
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
    setPodcastDetails(input);
    const payload = {
      name: input?.name,
      transcript: input?.transcript,
      projectId: projectId,
    };
    axios
      .post("http://localhost:8080/api/transcript/create", payload, {
        withCredentials: true,
      })
      .then((res) => {
        setIsShowTable(true);
        toast.success(res.data.message);
      })
      .catch((err) => toast.warn(err.responce.data.message));

    setTimeout(() => {
      setopen(false);
    }, 400);
  };
  const handleCancel = () => {
    setopen(false);
  };
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "32px 24px",
          minWidth: "600px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex justify-start items-center gap-x-6 mb-6 font-bold">
          <img
            src="/images/youtube.png"
            width={40}
            height={30}
            className=" object-cover rounded-full"
            alt="youtube image"
          />
          <h4
            style={{
              fontWeight: 700,
              fontSize: "1.3rem",
            }}
          >
            Upload From Youtube
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={input.name || ""}
              name="name"
              onChange={(e) => {
                setInput({ ...input, name: e.target.value });
                setError("");
                setSuccess(false);
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                border:
                  error && error.toLowerCase().includes("name")
                    ? "1.5px solid #e74c3c"
                    : "1.5px solid #ccc",
                borderRadius: "6px",
                fontSize: "1rem",
                outline: "none",
                transition: "border 0.2s",
              }}
            />
            {error && error.toLowerCase().includes("name") && (
              <div
                style={{
                  color: "#e74c3c",
                  marginTop: "6px",
                  fontSize: "0.95em",
                }}
              >
                {error}
              </div>
            )}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
            >
              Transcript
            </label>
            <input
              type="text"
              name="transcript"
              placeholder="Enter transcript"
              value={input.transcript || ""}
              onChange={(e) => {
                setInput({ ...input, transcript: e.target.value });
                setError("");
                setSuccess(false);
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                border:
                  error && error.toLowerCase().includes("transcript")
                    ? "1.5px solid #e74c3c"
                    : "1.5px solid #ccc",
                borderRadius: "6px",
                fontSize: "1rem",
                outline: "none",
                transition: "border 0.2s",
              }}
            />
            {error && error.toLowerCase().includes("transcript") && (
              <div
                style={{
                  color: "#e74c3c",
                  marginTop: "6px",
                  fontSize: "0.95em",
                }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                style={{
                  color: "#27ae60",
                  marginTop: "6px",
                  fontSize: "0.95em",
                }}
              >
                Podcast created successfully!
              </div>
            )}
          </div>

          <div className="flex w-full items-center justify-end gap-x-4 bg-red-w">
            <CustomButton
              buttonName="Cancel"
              bgColor="bg-white"
              onClick={handleCancel}
              textColor="text-red-500"
              hoverBgColor="hover:bg-red-500"
              hoverTextColor="hover:text-white"
            />
            <CustomButton
              buttonName="Upload"
              bgColor="bg-white"
              textColor="text-black"
              hoverBgColor="hover:bg-purple-700"
              hoverTextColor="hover:text-white"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default YoutubeUploadModel;
