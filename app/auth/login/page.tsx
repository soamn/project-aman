"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState<boolean>(false);
  const router = useRouter();

  const Login = async () => {
    setSending(true);
    if (!email || !password) {
      setError("*required fields empty");
      setSending(false);
      return;
    }
    const res = (await signIn("credentials", {
      email,
      password,
    })) as unknown as { ok: boolean; error?: string; url?: string };
    if (res?.error) {
      setError(res.error);
    } else {
      setSending(false);
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-3xl m-auto p-5">
      <div className="bg-white ring-2 rounded-lg shadow w-full p-10 h-full flex flex-col  justify-center">
        <label htmlFor="email" className="mb-2">
          Enter email
        </label>
        <input
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
          name="email"
          type="email"
          className="outline p-2 rounded-lg"
          placeholder="Enter email"
        />
        <label htmlFor="password" className="mb-2">
          Enter password
        </label>
        <input
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
          type="password"
          name="password"
          className="outline p-2 rounded-lg"
          placeholder="Enter password"
        />
        <button
          onClick={Login}
          disabled={sending}
          className={`bg-zinc-800 px-3 py-2
         text-white rounded-lg mt-3
          cursor-pointer  ${sending && "opacity-20"}`}
        >
          Login
        </button>
        {error && <span className="mt-2 text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default page;
