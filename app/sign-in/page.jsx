"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function page() {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setisLoading(true);

    const response = await fetch("/api/users/signin", {
      method: "POST",
      body: JSON.stringify(formInput),
    });

    if (!response.ok) {
      setisLoading(false);
      return;
    }
    toast("Login Successfull");
    setisLoading(false);
    router.replace("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-lg font-semibold text-black">SIGN UP</h3>
          <form onSubmit={handleLogin}>
            <div>
              <label className="block py-1 text-black">Your email</label>
              <input
                type="email"
                onChange={(e) =>
                  setFormInput({ ...formInput, email: e.target.value })
                }
                value={formInput.email}
                className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono text-black"
              />
              <p className="text-sm mt-2 px-2 hidden text-gray-600">
                Text helper
              </p>
            </div>
            <div>
              <label className="block py-1 text-black">Password</label>
              <input
                type="password"
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    password: e.target.value,
                  })
                }
                value={formInput.password}
                className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono text-black"
              />
            </div>
            <div className="flex gap-3 pt-3 items-center">
              <button className="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300 text-black">
                {isLoading ? (
                  <span className="animated-pulse">Please wait</span>
                ) : (
                  "Sign in"
                )}
              </button>
              <Link href="/sign-up" className="text-black">
                Don't have a account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
