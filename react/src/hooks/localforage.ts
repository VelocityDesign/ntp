// thanks to https://gist.github.com/blacksmoke26/af6c1b4c13cc99740285ab198d37fda4

import React from 'react';
import localforage from 'localforage';

type HookMethods = [
	any,
	( value: any ) => void,
	() => void,
];

export default function useLocalForage(key: string, initialValue?: any): HookMethods {
	const [storedValue, setStoredValue] = React.useState(initialValue);
	
	React.useEffect(() => {
		(async function () {
			try {
				const value = await localforage.getItem(key);
				setStoredValue(value);
			} catch (err) {
				return initialValue;
			}
		})();
	}, [initialValue, storedValue, key]);
	
	const set = (value: any) => {
		(async function () {
			try {
				await localforage.setItem(key, value);
				setStoredValue(value);
			} catch (err) {
				return initialValue;
			}
		})();
	};
	
	const remove = () => {
		(async function () {
			try {
				await localforage.removeItem(key);
				setStoredValue(null);
			} catch (e) {}
		})();
	};
	
	return [storedValue, set, remove];
}
