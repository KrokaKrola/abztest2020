import { useEffect } from 'react';
import { useAppState } from '../store/app-state';
import { instance } from '../service/settings';

export default function() {
  const [, dispatch] = useAppState();
  useEffect(() => {
    let cleanup = false;
    if (!cleanup) {
      instance.get('/token').then(response => {
        const token = response.data.token;

        dispatch({ type: 'SET_TOKEN', token: token });
      });
    }
    return () => {
      cleanup = true;
    };
  }, [dispatch]);
}
