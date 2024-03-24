"use client";

import React, { useState } from "react";
import { GeistSans } from "geist/font/sans";

export default function Home() {
  const [shortening, setShortening] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setShortening(true);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#09090b]">
      <h3
        className={`text-lg mb-5 px-3 rounded-md font-semibold bg-[#27272a] text-white ${GeistSans.className}`}
      >
        Fast, simple and free
      </h3>
      <h1
        className={`text-5xl bg-gradient-to-r font-extrabold from-yellow-50 via-yellow-100 to-yellow-200 bg-clip-text text-transparent ${GeistSans.className}`}
      >
        Linkh3 - URL Shortener
      </h1>
      {shortening ? (
        <div className="animate-fade-left">
          <button
            disabled
            className="px-6 h-10 mt-4 cursor-wait bg-gradient-to-r from-yellow-100 from-10% via-yellow-200 via-50% to-yellow-300 animate-bg bg-[length:600%] rounded-md text-black font-bold"
          >
            <div className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mt-0.5 mr-1 animate-spin"
              >
                <path
                  fillRule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                  clipRule="evenodd"
                />
              </svg>
              <b>Shortening...</b>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex items-center mt-6 bg-black rounded-md">
          <input
            type="text"
            placeholder="Enter your URL here"
            onChange={handleChange}
            className="w-[430px] h-10 px-4 bg-[#101010] text-white placeholder-gray-500 focus:outline-none rounded-md border-2 border-gray-500 placeholder:text-1xl"
          />
          <button
            className="h-10 px-6 ml-2 text-1xl bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200 text-black font-bold rounded-md"
            onClick={handleSubmit}
          >
            Shorten
          </button>
        </div>
      )}
    </main>
  );
}
