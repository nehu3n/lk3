"use client";

import React, { useState } from "react";
import { generateURLHash, validateURL } from "@/lib/url";
import copy from "copy-to-clipboard";
import { API_URL } from "@/lib/db";

export default function Home() {
  const [shortening, setShortening] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [copyClicked, setCopyClicked] = useState(false);

  const [error, setError] = useState<{ message: string; display: boolean }>({
    message: "",
    display: false,
  });
  const [message, setMessage] = useState<{ message: string; display: boolean }>(
    {
      message: "",
      display: false,
    }
  );
  const [shorterCreated, setShorterCreated] = useState(false);
  const [shorterCreated2, setShorterCreated2] = useState(false);
  const [backToMenuMain, setBackToMenuMain] = useState(false);

  const [shortenedUrl, setShortenedUrl] = useState("");

  function sendError(errorMessage: string) {
    setError({
      message: errorMessage,
      display: true,
    });

    setTimeout(() => {
      setError({
        message: "",
        display: false,
      });
    }, 3000);
  }
  function sendMessage(message: string) {
    setMessage({
      message: message,
      display: true,
    });

    setTimeout(() => {
      setMessage({
        message: "",
        display: false,
      });
    }, 3000);
  }

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (error.display) return;

    if (inputValue.length == 0) {
      sendError("Enter a URL.");

      return;
    }

    if (!validateURL(inputValue)) {
      sendError("The URL is not valid.");
    } else {
      setShortening(true);

      const response = await fetch(`${API_URL}/api/set?url=${inputValue}`, {
        method: "POST",
      });
      try {
        const data = await response.json();

        if (data.success) {
          setTimeout(() => {
            setShorterCreated(true);
          }, 1000);
          setTimeout(() => {
            setShorterCreated2(true);

            copy(shortenedUrl);
            sendMessage("Shortened link copied.");
          }, 2500);

          setTimeout(() => {
            setBackToMenuMain(true);
          }, 4000);
        } else {
          setTimeout(() => {
            setShortening(false);
            sendError(String(data.error));
          }, 1000);
        }
      } catch (e) {
        sendError(String(e));
      }

      setShortenedUrl(`lk3.vercel.app/${generateURLHash(inputValue)}`);
    }
  };

  const handleCopy = () => {
    copy(shortenedUrl);
    sendMessage("Shortened link copied.");
    setCopyClicked(true);
    setTimeout(() => {
      setCopyClicked(false);
    }, 2000);
  };

  return (
    <>
      {error.display && (
        <div
          className="relative flex flex-col items-center justify-center hover:cursor-pointer"
          onClick={() => setError({ message: "", display: false })}
        >
          {error.display && (
            <div className="absolute inline-flex m-5 top-5 border-l-8 border-l-red-700 bg-red-500 text-white font-bold px-5 py-2 rounded-md shadow animate-fade-down">
              <svg
                className="w-7 h-7 mt-1 -ml-2 mr-2 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span className="text-lg mt-0.5 font-bold">{error.message}</span>
            </div>
          )}
        </div>
      )}
      {message.display && (
        <div
          className="relative flex flex-col items-center justify-center hover:cursor-pointer"
          onClick={() => setMessage({ message: "", display: false })}
        >
          {message.display && (
            <div className="absolute inline-flex m-5 top-5 border-l-8 border-l-yellow-600 bg-yellow-500 text-white font-bold px-5 py-2 rounded-md shadow animate-fade-down">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 mt-1 -ml-2 mr-2 text-gray-800"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span className="text-lg mt-0.5 font-bold">
                {message.message}
              </span>
            </div>
          )}
        </div>
      )}

      <main className="flex flex-col pb-20 items-center justify-center h-screen">
        <h3 className="text-lg mb-5 px-4 rounded-md font-medium bg-[#27272a] text-white animate-fade-down">
          Fast, simple and free
        </h3>
        <h1 className="text-5xl text-center bg-gradient-to-r font-extrabold from-yellow-50 via-yellow-100 to-yellow-200 bg-clip-text text-transparent animate-fade-down animate-delay-75">
          LK3 - URL Shortener
        </h1>
        {shortening && !shorterCreated && !shorterCreated2 ? (
          <div className="animate-fade-left">
            <button
              disabled
              className="px-6 h-10 mt-5 cursor-wait bg-gradient-to-r from-yellow-100 from-10% via-yellow-200 via-50% to-yellow-300 animate-bg bg-[length:600%] rounded-md text-black font-bold"
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
          !shorterCreated &&
          !shorterCreated2 && (
            <div className="flex flex-col sm:flex-row px-2 sm:px-0 items-center mt-6 rounded-md gap-2 justify-center max-w-[430px] w-full">
              <input
                type="text"
                placeholder="Enter your URL here"
                onChange={handleChange}
                className="w-full h-10 px-4 bg-[#101010] text-white placeholder-gray-500 focus:outline-none rounded-md border-2 border-gray-500 placeholder:text-1xl animate-fade-right animate-delay-100"
              />
              <button
                className="h-10 w-min px-6 text-1xl bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200 text-black font-bold rounded-md animate-fade-right animate-delay-150"
                onClick={handleSubmit}
              >
                Shorten
              </button>
            </div>
          )
        )}
        {shorterCreated && !shorterCreated2 ? (
          <button
            disabled
            className="px-6 h-10 mt-5 bg-gradient-to-r from-green-100 via-green-200 to-green-300 rounded-md text-black font-bold"
          >
            <div className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 mt-0.5 mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <b>Link shortened successfully</b>
            </div>
          </button>
        ) : (
          shorterCreated2 && (
            <div className="px-2 py-0.5 mt-5 border-2 border-yellow-200 rounded-md animate-fade-down">
              <div className="inline-flex">
                <span className="text-white">{shortenedUrl.toString()}</span>
                <button onClick={handleCopy}>
                  {!copyClicked ? (
                    <svg
                      className="w-5 h-5 ml-2 mt-0.5 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 ml-2 mt-0.5 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )
        )}

        {backToMenuMain && (
          <button
            onClick={() => {
              setShorterCreated(false);
              setShorterCreated2(false);
              setShortening(false);
              setBackToMenuMain(false);
            }}
            className="h-10 px-6 ml-2 mt-8 text-1xl bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200 text-black font-bold rounded-md animate-fade-down"
          >
            Create another link
          </button>
        )}
      </main>
    </>
  );
}
