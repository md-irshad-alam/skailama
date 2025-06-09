import React, { useState } from "react";
import CustomButton from "./CustomButton";
import axios from "axios";
import { toast } from "react-toastify";

// Simple input validation: not empty, min 3 chars, only letters/numbers/spaces
const inputValidation = (value) => {
  if (!value.trim()) return "Project name is required.";
  if (value.length < 3) return "Project name must be at least 3 characters.";
  if (!/^[\w\s-]+$/.test(value))
    return "Only letters, numbers, spaces, and hyphens allowed.";
  return "";
};

const ProjectCreatingModal = ({
  setProjecctDetails,
  setopen,
  SetshowCreatePage,
}) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (ev) => {
    setInput(ev.target.value);
    setError("");
    setSuccess(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validationError = inputValidation(input);
    if (validationError) {
      setError(validationError);
      setSuccess(false);
    } else {
      setError("");
      setSuccess(true);
      setProjecctDetails(input);
      axios
        .post(
          "https://skailama-3kpj.onrender.com/api/project/create",
          {
            name: input,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => toast.success(res.data.message))
        .catch((err) => toast.warn(err.response.data.message));

      setTimeout(() => {
        SetshowCreatePage(false);
        setopen(false);
      }, 400);
    }
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
        <h4
          style={{ marginBottom: "18px", fontWeight: 600, fontSize: "1.3rem" }}
        >
          Create Project
        </h4>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
            >
              Enter Project Name
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              value={input}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: error ? "1.5px solid #e74c3c" : "1.5px solid #ccc",
                borderRadius: "6px",
                fontSize: "1rem",
                outline: "none",
                transition: "border 0.2s",
              }}
            />
            {error && (
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
                Project created successfully!
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
              buttonName="Create Project"
              bgColor="bg-white"
              textColor="text-black"
              hoverBgColor="hover:bg-purple-700"
              hoverTextColor="hover:text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreatingModal;
