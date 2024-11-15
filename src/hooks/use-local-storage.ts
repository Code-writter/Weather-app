import { useEffect, useState } from "react";

export function useLocalStorage <T>(key : string, initalValue:T){
    const [storedValue, setStoredValue] = useState <T> (() => {
        try {
            const iteam = window.localStorage.getItem(key)
            return iteam ? JSON.parse(iteam) : initalValue

        } catch (error) {
            console.log(error)
            return initalValue
        }
    })

    useEffect(() => {
        try {
            const iteam = window.localStorage.setItem(key, JSON.stringify(setStoredValue))
        } catch (error) {
            console.log(error)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue] as const
}