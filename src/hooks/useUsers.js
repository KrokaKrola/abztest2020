import { useEffect, useState } from 'react';
import { instance } from '../service/settings';

export default function(page = 1, count = 6) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    instance.get(`/users?page=${page}&count=${count}`).then(result => {
      setUsers(result.data.users);
    });
  }, [page, count]);

  return users;
}
