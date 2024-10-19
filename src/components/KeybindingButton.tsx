import React from 'react';
import { toast } from "sonner";
import { motion } from "framer-motion";
import SoundInteraction from "./soundInteraction";

interface KeybindingButtonProps {
	keyBinding?: string;
	message?: string;
	emoji?: string;
	soundFile: string;
	volume: number;
}

const KeybindingButton: React.FC<KeybindingButtonProps> = ({
	keyBinding = "ctrl+x",
	message = "Hello there! Have a great day!",
	emoji = '👋',
	soundFile,
	volume
}) => {
	const handleToast = () => {
		toast.custom((t) => (
			<motion.div
				className="overflow-hidden mx-auto w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800"
				initial={{ opacity: 0, y: 50, scale: 0.3 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
			>
				<div className="flex justify-between items-center p-4">
					<div className="flex items-center">
						<div className="flex-shrink-0 text-2xl">{emoji}</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-900 dark:text-white">
								{message}
							</p>
						</div>
					</div>
					<button
						onClick={() => toast.dismiss(t)}
						className="inline-flex text-gray-400 bg-white rounded-md dark:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						<span className="sr-only">Close</span>
						<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</button>
				</div>
			</motion.div>
		));
	};

	return (
		<SoundInteraction
			keyBindings={{
				[keyBinding]: () => handleToast()
			}}
			sounds={{
				click: soundFile,
			}}
			volume={volume}
			as="button"
		>
			<button
				onClick={handleToast}
				className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
			>
				Trigger Keybinding Toast ({keyBinding})
			</button>
		</SoundInteraction>
	);
};

export default KeybindingButton;
