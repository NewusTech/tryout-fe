"use client";

import { useState, useEffect } from "react";
// import { debounceTypes } from "@/types/debounceTypes";

/**
 * Custom hook to debounce a value.
 *
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced value.
 */

// export const useDebounce = ({ value, delay }: debounceTypes) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     // Set a timeout to update the debounced value
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     // Clean up the timeout if the component unmounts or delay/value changes
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };
