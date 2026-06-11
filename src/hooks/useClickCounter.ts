import { useEffect, useState } from 'react';
import axios from 'axios';

export function useClickCounter() {
  const [clickCount, setClickCount] = useState<number>(0);

  useEffect(() => {
    axios.get('/api/total')
      .then((res) => {
        setClickCount(Number(res.data?.total_clicks ?? 0));
      })
      .catch((err) => {
        console.error(err);
        setClickCount(0);
      });
  }, []);

  const recordClick = () => {
    axios.post('/api/click', {})
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    clickCount,
    recordClick,
  };
}
