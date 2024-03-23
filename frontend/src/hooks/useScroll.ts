import { RefObject, useCallback } from 'react';
import { isMobile } from 'mobile-device-detect';

const useScroll = <T extends HTMLElement>(ref: RefObject<T>) => {
  return useCallback(() => {
    if (!isMobile) {
      return;
    }

    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ref]);
};

export default useScroll;
