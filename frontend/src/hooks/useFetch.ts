import { useState } from 'react';

export const useFetch = (callBack: Function) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async () => {
    try {
      await callBack();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { fetch, error, isLoading };
}
