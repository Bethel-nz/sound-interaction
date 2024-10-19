import React, { useState, useEffect, useCallback } from 'react';

const KeyPressDisplay: React.FC = () => {
	const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		setPressedKeys((prev) => new Set(prev).add(e.key));
	}, []);

	const handleKeyUp = useCallback((e: KeyboardEvent) => {
		setPressedKeys((prev) => {
			const newSet = new Set(prev);
			newSet.delete(e.key);
			return newSet;
		});
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleKeyDown, handleKeyUp]);

	return (
		<div className="fixed bottom-4 md:block hidden left-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg min-w-[200px]">
			<h3 className="mb-2 text-sm font-semibold dark:text-white">Pressed Keys:</h3>
			<div className="flex flex-wrap gap-2 min-h-[28px]">
				{Array.from(pressedKeys).map((key) => (
					<span key={key} className="px-2 py-1 text-sm text-blue-800 bg-blue-100 rounded dark:bg-blue-700 dark:text-blue-100">
						{key}
					</span>
				))}
				{pressedKeys.size === 0 && (
					<span className="text-sm text-gray-400 dark:text-gray-500">No keys pressed</span>
				)}
			</div>
		</div>
	);
};

export default KeyPressDisplay;
