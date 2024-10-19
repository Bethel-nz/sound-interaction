"use client";
import { motion, AnimatePresence } from "framer-motion";

import { BellIcon } from "./icons";
import { useState, useEffect, useRef } from "react";
import { cn } from "./cn";

const WIDTH = 500;

export default function DynamicIslandNotification({
  title,
  children,
  showNotification,
  closeNotification,
}: Readonly<{
  title: string;
  children: string;
  showNotification: boolean;
  closeNotification: () => void;
}>) {
  const [stage, setStage] = useState(0); // 0: initial, 1: expanded notification, 2: full message
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showNotification) {
      setStage(0);
      const timer1 = setTimeout(() => setStage(1), 2000);
      return () => clearTimeout(timer1);
    } else {
      setStage(0);
    }
  }, [showNotification]);

  const handleClick = () => {
    if (stage === 1) setStage(2);
    else if (stage === 2) {
      setStage(0);
      closeNotification();
    }
  };

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden fixed top-6 right-6 z-50"
        >
          <motion.div
            layout
            onClick={handleClick}
            className={cn(
              "rounded-2xl dark:bg-neutral-900 bg-neutral-50 border border-neutral-400/15 text-neutral-800 dark:text-neutral-200 shadow-lg transition cursor-pointer",
              stage === 0 && "after:size-2 after:absolute after:top-3 after:right-4 after:bg-amber-500 after:rounded-full after:pointer-events-none",
              stage === 0 && "before:size-3 before:absolute before:top-2.5 before:right-3.5 before:border before:border-amber-500 before:rounded-xl before:animate-ping before:pointer-events-none"
            )}
            transition={{ duration: 0.2 }}
          >
            <motion.div layout className={cn("p-3", stage > 0 && "p-4")} ref={contentRef}>
              {stage === 0 && (
                <div className="flex justify-center items-center w-8 h-8">
                  <BellIcon className="w-6 h-6" />
                </div>
              )}
              {stage === 1 && (
                <div className="flex items-center space-x-3">
                  <BellIcon className="flex-shrink-0 w-6 h-6" />
                  <div className="flex-grow">
                    <h6 className="text-sm font-medium">{title}</h6>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Click to read more</p>
                  </div>
                </div>
              )}
              {stage === 2 && (
                <div className="w-[468px]">
                  <h6 className="text-sm font-medium">{title}</h6>
                  <p className="mt-2 text-sm">{children}</p>
                  <button
                    className="px-3 py-1.5 mt-4 text-sm font-medium bg-amber-500 rounded-lg dark:bg-amber-200 dark:text-neutral-800 text-neutral-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStage(0);
                      closeNotification();
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
