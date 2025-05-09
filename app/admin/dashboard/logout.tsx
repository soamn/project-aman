"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      <LogOut className="inline text-red-500 cursor-pointer" /> Logout
    </button>
  );
};

export default Logout;
