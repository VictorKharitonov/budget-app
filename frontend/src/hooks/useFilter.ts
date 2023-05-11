import {useMemo} from 'react';

const useFilter = <T = Record<string, unknown>>(search: string, list: T[], keys: (keyof T)[]): T[] => {
  return useMemo(() => {
    search = search.toLowerCase();

    if (search) {
      return [...list].filter((item: T) => {
        for (const key of keys) {
          return String(item[key]).toLowerCase().includes(search);
        }
      });
    }
    return list;
  }, [search, list]);
};

export default useFilter;