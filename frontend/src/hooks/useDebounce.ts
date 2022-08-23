import { useEffect } from "react";

export const useDebounce = (fn: Function, ms: number) => {
  useEffect(() => {
    const tId = setTimeout(fn, ms);

    return () => clearTimeout(tId);
  }, [fn, ms]);
};
