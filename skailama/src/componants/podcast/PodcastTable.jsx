import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year} | ${hours}:${minutes}`;
};
const PodcastTable = ({
  setShowTrasnscript,
  transcript,
  productId,
  isOpen,
}) => {
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/transcript/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchData();
      })
      .catch((err) => toast.warn(err.responce.data.message));
  };

  const searchParams = useSearchParams();
  const [productid, setProductid] = useState(null);
  useEffect(() => {
    const id = searchParams.get("id");
    setProductid(id);
  }, [searchParams]);
  console.log(productid);

  const fetchData = () => {
    axios
      .get(
        `http://localhost:8080/api/transcript/getAll?q=${productid}`,

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setData(res.data.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.warn(err.response.data.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, [productid, isOpen]);

  const handleViewProduct = (id, title) => {
    transcript(title);
    productId(id);
    setShowTrasnscript(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Files</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="text-[#646464] text-[20px]">
            <th className="px-4 py-2 border-b text-center">No</th>
            <th className="px-4 py-2 border-b text-center">Name</th>
            <th className="px-4 py-2 border-b text-center">
              Updated Date &amp; Time
            </th>
            <th className="px-4 py-2 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((podcast, index) => (
            <tr key={podcast._id} className="hover:bg-gray-50 text-[#646464]">
              <td className="px-4 py-2 border-b text-center">{index + 1}</td>
              <td className="px-4 py-2 border-b text-center">{podcast.name}</td>
              <td className="px-4 py-2 border-b text-center">
                {formatDate(podcast.updatedAt)}
              </td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() =>
                    handleViewProduct(podcast._id, podcast.transcript)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(podcast._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PodcastTable;
