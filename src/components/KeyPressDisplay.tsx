import React, { useState, useEffect } from 'react';

const KeyPressDisplay: React.FC = () => {
	const [pressedKeys, setPressedKeys] = useState<string[]>([]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			setPressedKeys((prev) => [...new Set([...prev, e.key])]);
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			setPressedKeys((prev) => prev.filter((key) => key !== e.key));
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	return (
		<div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
			<h3 className="text-sm font-semibold mb-2 dark:text-white">Pressed Keys:</h3>
			<div className="flex flex-wrap gap-2">
				{pressedKeys.map((key) => (
					<span key={key} className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-sm">
						{key}
					</span>
				))}
			</div>
		</div>
	);
};

export default KeyPressDisplay;
