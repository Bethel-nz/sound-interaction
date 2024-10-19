"use client";

import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from "sonner";
import { toast as rtoast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import useKeyboardBindings from "../components/useKeyboardBindings";
import SoundInteraction from "../components/soundInteraction";
import { SoundProvider } from "../context/sound-provider"
import { SaveIcon, SelectAllIcon, DevModeIcon, CloseIcon, BellIcon } from "../components/icons";
import KeyPressDisplay from "../components/KeyPressDisplay";
import SimpleModernSlider from "../components/SimpleModernSlider";
import ToastButtons from "../components/ToastButtons";
import DynamicIslandNotification from "../components/island-notification";

// Import sound files
import clickDownSound from "../sounds/pop-down.mp3";
import clickOnSound from "../sounds/pop-up-on.mp3";
import clickOffSound from "../sounds/pop-up-off.mp3";
import hoverSound from "../sounds/hover.mp3";
import swipeSound from "../sounds/swipe.mp3";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [expanded, setExpanded] = useState(false);
  const [sonnerEnabled, setSonnerEnabled] = useState(true);
  const [hotToastEnabled, setHotToastEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [showNotification, setShowNotification] = useState(false);
  const [showIslandNotification, setShowIslandNotification] = useState(false);

  const handleSonnerToast = (message: string, icon: React.ReactNode) => {
    if (sonnerEnabled) {
      toast.custom((t) => (
        <motion.div
          className="overflow-hidden mx-auto w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-center p-4">
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
            <div className="flex flex-shrink-0 ml-4">
              <button
                onClick={() => toast.dismiss(t)}
                className="inline-flex text-gray-400 bg-white rounded-md dark:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

  const triggerDynamicNotification = () => {
    setShowIslandNotification(true);
    // Reset the notification after 10 seconds
    setTimeout(() => setShowIslandNotification(false), 10000);
  };

  const initialBindings = {
    "ctrl+s": (e: KeyboardEvent) =>
      handleSonnerToast("You pressed Ctrl+S! Saving...", <SaveIcon />),
    "ctrl+a": (e: KeyboardEvent) =>
      handleSonnerToast("You pressed Cmd+A! Selecting all...", <SelectAllIcon />),
    "shift+?": () => handleSonnerToast("You pressed Shift+?! Showing help...", <DevModeIcon />),
    "ctrl+shift+i": () => handleSonnerToast("Disabled dev mode", <DevModeIcon />),
    "ctrl+shift+k": () => triggerDynamicNotification(),
  };

  useKeyboardBindings(initialBindings);

  return (
    <SoundProvider>
      <div className="font-sans text-center">
        <div className="px-4 mx-auto max-w-3xl sm:px-6 lg:px-8">
          <h1 className="mb-4 text-2xl font-bold dark:text-white">Interactive Sound Demo</h1>

          <div className="flex flex-col gap-4 items-center mb-8">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sonner Toast</span>
              <SoundInteraction
                sounds={{
                  clickOn: clickOnSound,
                  clickOff: clickOffSound,
                }}
                volume={volume}
                as="button"
              >
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
              </SoundInteraction>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">React Hot Toast</span>
              <SoundInteraction
                sounds={{
                  clickOn: clickOnSound,
                  clickOff: clickOffSound,
                }}
                volume={volume}
                as="button"
              >
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
              </SoundInteraction>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center mb-8">
            <label htmlFor="volume" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sound Volume
            </label>
            <SimpleModernSlider value={volume} onChange={setVolume} label="Sound Volume" />
          </div>

          <ToastButtons
            handleSonnerToast={handleSonnerToast}
            handleHotToast={handleHotToast}
            volume={volume}
            clickDownSound={clickDownSound}
            hoverSound={hoverSound}
          />

          <SoundInteraction
            sounds={{
              swipe: swipeSound,
            }}
            volume={volume}
            className="p-4 mt-8 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700"
          >
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Swipe here to hear a sound!</p>
            </div>
          </SoundInteraction>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold dark:text-white">Dynamic Island Notification Demo</h2>
            <SoundInteraction
              sounds={{
                click: clickDownSound,
                hover: hoverSound,
              }}
              volume={volume}
              as="button"
            >
              <button
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                onClick={triggerDynamicNotification}
              >
                Trigger Dynamic Notification (or press Ctrl+M)
              </button>
            </SoundInteraction>
          </div>
        </div>

        <KeyPressDisplay />

        <DynamicIslandNotification
          title="New Notification"
          showNotification={showIslandNotification}
          closeNotification={() => setShowIslandNotification(false)}
        >
          You've received a new message. This is the full content of the notification. Click again to close.
        </DynamicIslandNotification>
      </div>
    </SoundProvider>
  );
}

export default App;

