import { useEffect, useState } from 'react';
import { instance } from '../service/settings';

export default function() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    instance.get('/positions').then(result => {
      setPositions(result.data.positions);
    });
  }, []);

  return positions;
}
