import { useEffect, useState } from "react";

// to store the state to local storage
export default function usePersistedState<T>(key: T, defaultValue: T) {
    const [state, setState] = useState(defaultValue);

    useEffect(() => {
        setState(localStorage.getItem(key));
    }, [key]);

    const setWithLocalStorage = (nextState) => {
        setState(nextState);
    };

    return [state, setWithLocalStorage];
}
