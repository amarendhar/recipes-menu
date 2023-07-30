import { useRef, useEffect } from "react";

export const useOnscroll = (onScroll: () => void) => {
  const isMounted = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight &&
        isMounted.current
      ) {
        onScroll();
      }

      isMounted.current = true;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      isMounted.current = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onScroll]);
};
