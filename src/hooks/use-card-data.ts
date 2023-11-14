import { useState } from 'react';
import axios from 'src/utils/axios';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { CollectedStatistic, CollectionCard } from 'src/types';

export interface CardData {
  collectedStatistic: CollectedStatistic | null;
  collectedCards: CollectionCard[];
  isCardLoading: boolean;
  fetchCollectedCards: () => void;
  fetchCollectedStatistics: () => void;
}

const useCardData = (): CardData => {
  const [isCardLoading, setIsCardLoading] = useState(true);
  const [collectedStatistic, setCollectedStatistic] =
    useState<CollectedStatistic | null>(null);
  const [collectedCards, setCollectedCards] = useState<CollectionCard[]>([]);

  const fetchCollectedStatistics = async () => {
    try {
      const response = await axiosInstance.get(endpoints.card.statsDashboard);
      setCollectedStatistic(response.data);
    } catch (error) {
      console.error('Error fetching collected statistic: ' + error);
      setCollectedStatistic(null);
    }
  };

  const fetchCollectedCards = async () => {
    try {
      const response = await axiosInstance.get(
        `${endpoints.card.collected}?page=1&limit=6`
      );
      setCollectedCards(response.data.cards);
      setIsCardLoading(false);
    } catch (error) {
      console.error('Error fetching collected cards: ' + error);
      setCollectedCards([]);
    }
  };
  return {
    fetchCollectedCards,
    fetchCollectedStatistics,
    collectedStatistic,
    isCardLoading,
    collectedCards,
  };
};

export default useCardData;
