import { useState, useEffect } from 'react';
import axios from 'src/utils/axios';

import { endpoints } from 'src/utils/axios';
import { CollectedStatistic, CollectionCard } from 'src/types';

interface CardData {
  collectedStatistic: CollectedStatistic | null;
  collectedCards: CollectionCard[];
}

const useCardData = (): CardData => {
  const [collectedStatistic, setCollectedStatistic] =
    useState<CollectedStatistic | null>(null);
  const [collectedCards, setCollectedCards] = useState<CollectionCard[]>([]);

  const fetchCollectedStatistic = async () => {
    try {
      const response = await axios.get(endpoints.card.stats);
      setCollectedStatistic(response.data);
    } catch (error) {
      console.error('Error fetching collected statistic: ' + error);
      setCollectedStatistic(null);
    }
  };

  const fetchCollectedCards = async () => {
    try {
      const response = await axios.get(
        `${endpoints.card.collected}?page=1&limit=6`
      );
      setCollectedCards(response.data.cards);
    } catch (error) {
      console.error('Error fetching collected cards: ' + error);
      setCollectedCards([]);
    }
  };

  useEffect(() => {
    fetchCollectedStatistic().then(fetchCollectedCards);
  }, []);

  return {
    collectedStatistic,
    collectedCards,
  };
};

export default useCardData;
