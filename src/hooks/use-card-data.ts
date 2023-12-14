import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';
import { CollectedStatistic, CollectionCard, CollectionEvent } from 'src/types';

export interface CardData {
  collectedStatistic: CollectedStatistic | null;
  collectedCards: CollectionCard[];
  categories: CollectionEvent[];
  isLoading: boolean;
  totalPages: number;
  fetchCollectedCards: (categoryIndex: number, currentPage: number) => void;
  fetchCategories: () => void;
}

const useCardData = (): CardData => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectedStatistic, setCollectedStatistic] =
    useState<CollectedStatistic | null>(null);
  const [collectedCards, setCollectedCards] = useState<CollectionCard[]>([]);
  const [categories, setCategories] = useState<CollectionEvent[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCollectedCards = async (
    categoryIndex: number,
    currentPage: number
  ) => {
    setIsLoading(true);
    try {
      let response;
      if (categoryIndex === 0) {
        response = await axios.get(
          `${endpoints.card.collected}?page=${currentPage}&limit=12`
        );
      } else {
        const categoryId = categories[categoryIndex]?._id;
        response = await axios.get(
          `${endpoints.card.event}/${categoryId}?page=${currentPage}&limit=12`
        );
      }

      if (response) {
        const totalPages = Math.ceil(response.data.totalCount / 12);
        setCollectedCards(response.data.cards);
        setTotalPages(totalPages);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching collected cards: ' + error);
      setCollectedCards([]);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(endpoints.event.all);
      const myCards = { _id: 9, name: 'Moje Skupljene sličice' };
      setCategories([myCards, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories' + error);
      setCategories([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories().catch((error) => {
      console.error(error);
    });
  }, []);

  return {
    fetchCollectedCards,

    fetchCategories,
    collectedStatistic,
    isLoading,
    collectedCards,
    categories,
    totalPages,
  };
};

export default useCardData;
