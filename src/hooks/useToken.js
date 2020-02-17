import { useEffect } from 'react';
import { instance } from '../service/settings';

export default function (dispatch) {
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
