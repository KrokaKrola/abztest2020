import { useEffect, useState } from 'react';
import { instance } from '../service/settings';

export default function() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    let cleanup = false;
    if (!cleanup) {
      instance.get('/positions').then(result => {
        setPositions(result.data.positions);
      });
    }
    return () => {
      cleanup = true;
    };
  }, []);

  return positions;
}
