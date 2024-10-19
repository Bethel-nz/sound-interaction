import React from 'react';
import SoundInteraction from "./soundInteraction";
import { HelpIcon } from "./icons";
import KeybindingButton from "./KeybindingButton";

interface ToastButtonsProps {
	handleSonnerToast: (message: string, icon: React.ReactNode) => void;
	handleHotToast: (message: string) => void;
	volume: number;
	clickDownSound: string;
	hoverSound: string;
}

const ToastButtons: React.FC<ToastButtonsProps> = ({
	handleSonnerToast,
	handleHotToast,
	volume,
	clickDownSound,
	hoverSound
}) => {
	return (
		<div className="flex flex-col gap-2 mx-auto mb-8 md:flex-row w-fit">
			<SoundInteraction
				sounds={{
					click: clickDownSound,
					hover: hoverSound,
				}}
				volume={volume}
				as="button"
			>
				<button
					className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
					onClick={() => handleSonnerToast("Hello there", <HelpIcon />)}
				>
					Trigger Sonner Toast
				</button>
			</SoundInteraction>
			<SoundInteraction
				sounds={{
					click: clickDownSound,
					hover: hoverSound,
				}}
				volume={volume}
				as="button"
			>
				<button
					className="px-4 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
					onClick={() => handleHotToast("Hey from React Hot Toast!")}
				>
					Trigger React Hot Toast
				</button>
			</SoundInteraction>
			<KeybindingButton soundFile={clickDownSound} volume={volume} />
		</div>
	);
};

export default ToastButtons;
