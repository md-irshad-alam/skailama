import { motion } from "framer-motion";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setisLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputChange, setInputChange] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputChange({ ...inputChange, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            email: inputChange.email,
            password: inputChange.password,
          },
          {
            withCredentials: true,
          }
        );

        toast.success(res.data.message);
        setTimeout(() => {
          router.push("/project");
        }, 500);
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            name: inputChange.name,
            email: inputChange.email,
            password: inputChange.password,
          }
        );
        toast.success(res.data.message);
        setisLogin(true);
      }
    } catch (error) {
      toast.warn(error.response?.data.message);
    }
  };
  return (
    <>
      <Head>
        <title>Ques.AI Login</title>
      </Head>
      <main className="flex min-h-screen font-sans">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <h1 className="text-4xl font-bold mb-4">
              🎙️ Ques.<span className="text-white">AI</span>
            </h1>
            <h2 className="text-3xl font-semibold mb-6">
              Your podcast
              <br />
              will no longer be just a hobby.
            </h2>
            <p className="text-lg opacity-80">
              Supercharge Your Distribution
              <br />
              using our AI assistant!
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-white flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-sm p-8"
          >
            <div className="text-center mb-8">
              <div className="text-5xl text-purple-700 font-bold">🔁</div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome to <span className="text-purple-700">Ques.AI</span>
              </h2>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {isLogin == false && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <label>
                  <input type="checkbox" className="mr-1" /> Remember me
                </label>
                <a href="#" className="text-purple-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
              >
                Login
              </button>
              <div className="flex items-center gap-2">
                <div className="border-b w-full" />
                <span className="text-gray-400">or</span>
                <div className="border-b w-full" />
              </div>
              <button
                type="button"
                className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <p
                  onClick={() => setisLogin(!isLogin)}
                  className="text-purple-700 hover:underline"
                >
                  Create Account
                </p>
              </p>
            </form>
          </motion.div>
        </div>
      </main>
    </>
  );
}
