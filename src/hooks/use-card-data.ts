import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';
import { CollectedStatistic, CollectionCard, CollectionEvent } from 'src/types';

export interface CardData {
  collectedCards: CollectionCard[];
  categories: CollectionEvent[];
  isLoading: boolean;
  totalPages: number;
  fetchCollectedCards: (categoryIndex: number, currentPage: number) => void;
  fetchCategories: () => void;
  error: string;
}

const useCardData = (): CardData => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectedCards, setCollectedCards] = useState<CollectionCard[]>([]);
  const [categories, setCategories] = useState<CollectionEvent[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

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
      if (error.response) {
        setError(error.response.data.message || 'Interna greška servera');
      } else {
        setError('Interna greška servera');
      }
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
    isLoading,
    collectedCards,
    categories,
    totalPages,
    error,
  };
};

export default useCardData;
