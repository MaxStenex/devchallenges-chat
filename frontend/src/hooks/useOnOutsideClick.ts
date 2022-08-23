import { RefObject, useEffect, useRef } from "react";

type ConfigType = {
  excludeRefs: RefObject<HTMLElement>[];
};

export const useOnOutsideClick = <T>(handler: () => any, config?: ConfigType) => {
  const { excludeRefs } = config || {};

  const elementRef = useRef<HTMLElement & T>(null);

  useEffect(() => {
    const clickListener = (e: any) => {
      if (
        !elementRef.current ||
        elementRef.current.contains(e.target) ||
        excludeRefs?.some((ref) => ref.current?.contains(e.target))
      ) {
        return;
      }

      handler();
    };

    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, [elementRef, excludeRefs, handler]);

  return elementRef;
};
