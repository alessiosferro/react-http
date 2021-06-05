import { useCallback, useContext } from 'react';
import { AppContext } from '../store/app-context';

export const useHttp = () => {
  const [, dispatch] = useContext(AppContext);

  return useCallback(async (requestConfig, dataMapFn) => {
    dispatch({ type: 'START_REQUEST' });

    try {
      const response = await fetch(requestConfig.url, {
        body: JSON.stringify(requestConfig.body) || null,
        method: requestConfig.method || 'GET',
        headers: requestConfig.headers || {}
      });

      if (!response.ok) {
        switch (response.status) {
          case 404: throw new Error('The requested resource was not found!');
          default: throw new Error('Something went wrong!');
        }
      }

      const data = await response.json();
      dataMapFn(data);
    } catch (err) {
      dispatch({ type: 'SET_ERROR', error: err.message });
    } finally {
      dispatch({ type: 'STOP_LOADING' });
    }
  }, [dispatch]);
}