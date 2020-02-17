import { useEffect, useState } from 'react';
import { instance } from '../service/settings';
import { isMobile} from 'react-device-detect';

export default function(nextPage, setUsersAction, fetchUsers) {
  const [localNextPage, setLocalNextPage] = useState(null);
  const [pageStatus, setPageStatus] = useState({
    total_pages: null,
    page: null
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let cleanup = false;
    if (!cleanup) {
      setIsLoading(true);
      instance
        .get(`${nextPage.link ? nextPage.link : `/users?page=1&count=${isMobile ? 3 : 6}`}`)
        .then(result => {
          setPageStatus({
            total_pages: result.data.total_pages,
            page: result.data.page
          });
          setUsersAction(result.data.users);
          if (result.data.links.next_url) {
            setLocalNextPage(result.data.links.next_url.split('v1')[1]);
          }
        })
        .catch(error => {
          console.log(error);
        }).finally(() => {
          setIsLoading(false);
        })
    }
    return () => {
      cleanup = true;
    };
  }, [setUsersAction, nextPage]);

  return [localNextPage, pageStatus, isLoading];
}
