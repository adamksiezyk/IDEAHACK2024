"use client";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Login with ORCID</h1>
        <p className="mb-6 text-gray-600">
          Use your ORCID account to securely log in.
        </p>
        <button
          onClick={() => signIn("orcid")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Login with ORCID
        </button>
      </div>
    </div>
  );
};

export default Login;
