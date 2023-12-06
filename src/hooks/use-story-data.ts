import { useState, useEffect } from 'react';
import axiosInstance from 'src/utils/axios';

interface CardProgressData {
  overFiftyPercent: boolean;
}

export const useStoryData = (eventId: string | undefined) => {
  const [cardProgressData, setCardProgressData] =
    useState<CardProgressData | null>(null);
  const [overFiftyPercent, setOverFiftyPercent] = useState<boolean>(false);

  useEffect(() => {
    const fetchCardProgress = async () => {
      if (eventId) {
        try {
          const response = await axiosInstance.get<CardProgressData>(
            `/event/user-cards/${eventId}`
          );
          setCardProgressData(response.data);
          setOverFiftyPercent(response.data.overFiftyPercent);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchCardProgress();
  }, [eventId]);

  return { cardProgressData, overFiftyPercent };
};
