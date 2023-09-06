import { useMemo } from 'react';

const useFilter = <T = Record<string, unknown>>(search: string, list: T[], keys: (keyof T)[]): T[] => {
  search = search.toLowerCase();

  return useMemo(() => {
    if (search) {
      return [...list].filter((item: T) => {
        for (const key of keys) {
          if (String(item[key]).toLowerCase().includes(search)) {
            return true;
          }
        }
        return false;
      });
    }
    return list;
  }, [search, list, keys]);
};

export default useFilter;
