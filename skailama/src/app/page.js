"use client";
import AuthPage from "@/componants/auttPage";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="">
      <ToastContainer />
      <AuthPage />
    </div>
  );
}
