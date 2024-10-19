"use client";

import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from "sonner";
import { toast as rtoast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import useKeyboardBindings from "../components/useKyeBindings";
import SoundInteraction from "../components/soundInteraction";
import { HelpIcon, SaveIcon, SelectAllIcon, DevModeIcon, CloseIcon } from "../components/icons";
import KeyPressDisplay from "../components/KeyPressDisplay";

// Import sound files
import clickDownSound from "../sounds/pop-down.mp3";
import clickOnSound from "../sounds/pop-up-on.mp3";
import clickOffSound from "../sounds/pop-up-off.mp3";

export const Route = createFileRoute('/')({
  component: App,
})

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [sonnerEnabled, setSonnerEnabled] = useState(true);
  const [hotToastEnabled, setHotToastEnabled] = useState(true);

  const handleSonnerToast = (message: string, icon: React.ReactNode) => {
    if (sonnerEnabled) {
      toast.custom((t) => (
        <motion.div
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-md w-full mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-blue-500">
                {icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {message}
                </p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => toast.dismiss(t)}
                className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close</span>
                <CloseIcon />
              </button>
            </div>
          </div>
        </motion.div>
      ));
    }
  };

  const handleHotToast = (message: string) => {
    if (hotToastEnabled) {
      rtoast(message);
    }
  };

  const initialBindings = {
    "ctrl+s": (e: KeyboardEvent) =>
      handleSonnerToast("You pressed Ctrl+S! Saving...", <SaveIcon />),
    "ctrl+a": (e: KeyboardEvent) =>
      handleSonnerToast("You pressed Cmd+A! Selecting all...", <SelectAllIcon />),
    "shift+?": () => handleSonnerToast("You pressed Shift+?! Showing help...", <HelpIcon />),
    "ctrl+shift+i": () => handleSonnerToast("Disabled dev mode", <DevModeIcon />),
  };

  // Use the hook
  useKeyboardBindings(initialBindings);

  return (
    <div className="font-sans text-center">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Custom Toast Notification</h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sonner Toast</span>
          <button
            onClick={() => setSonnerEnabled(!sonnerEnabled)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${sonnerEnabled ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${sonnerEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">React Hot Toast</span>
          <button
            onClick={() => setHotToastEnabled(!hotToastEnabled)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${hotToastEnabled ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${hotToastEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-2 mx-auto w-fit">
        <SoundInteraction
          sounds={{
            clickDown: clickDownSound,
            clickOn: clickOnSound,
            clickOff: clickOffSound,
          }}
          volume={1}
        >
          <button
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
            onClick={() => handleSonnerToast("Hello there", <HelpIcon />)}
          >
            Trigger Sonner Toast
          </button>
        </SoundInteraction>
        <button
          className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => handleHotToast("Hey from React Hot Toast!")}
        >
          Trigger React Hot Toast
        </button>
      </div>

      {/* Add the KeyPressDisplay component */}
      <KeyPressDisplay />
    </div>
  );
}