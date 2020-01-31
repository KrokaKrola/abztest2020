import { useEffect, useState } from 'react';
import { instance } from '../service/settings';
import { useAppState } from '../store/app-state';

export default function(pageNumber, reset) {
  const [, dispatch] = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  const [buttonState, setButtonState] = useState(true);
  useEffect(() => {
    let cleanup = false;
    if (!cleanup) {
      setIsLoading(true);
      instance
        .get(`/users?page=${reset ? 1 : pageNumber}&count=6`)
        .then(result => {
          dispatch({ type: 'SET_USERS', users: result.data.users });
          setButtonState(result.data.total_pages === pageNumber ? false : true);
        })
        .catch(error => {
          console.log(error);
          console.log(error.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return () => {
      cleanup = true;
    };
  }, [dispatch, pageNumber, reset]);

  return [buttonState, isLoading];
}
