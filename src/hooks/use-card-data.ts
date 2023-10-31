import { useState, useEffect } from 'react';
import axios from 'src/utils/axios';

import axiosInstance, { endpoints } from 'src/utils/axios';
import { CollectedStatistic, CollectionCard } from 'src/types';

export type Event = {
  _id: any;
  name: string;
  location: string;
  year: number;
  percentageCollected: number;
};

type DashboardData = {
  numberOfCollectedCards: number;
  percentageOfCollectedCards: number;
  countOfAllCards: number;
  topEvents: Event[];
};

interface CardData {
  collectedStatistic: CollectedStatistic | null;
  dashboardData?: DashboardData | null;
  collectedCards: CollectionCard[];
  isCardLoading: boolean;
  chartData: {
    categories: string[];
    series: number[];
  };
  fetchCollectedCards: () => void;
  fetchCollectedStatistics: () => void;
  fetchDashboardData: () => void;
}

const useCardData = (): CardData => {
  const [isCardLoading, setIsCardLoading] = useState(true);
  const [collectedStatistic, setCollectedStatistic] =
    useState<CollectedStatistic | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const [collectedCards, setCollectedCards] = useState<CollectionCard[]>([]);
  const [chartData, setChartData] = useState<{
    categories: string[];
    series: number[];
  }>({ categories: [], series: [] });

  const fetchCollectedStatistics = async () => {
    try {
      const response = await axios.get(endpoints.card.statsDashboard);
      setCollectedStatistic(response.data);
    } catch (error) {
      console.error('Error fetching collected statistic: ' + error);
      setCollectedStatistic(null);
    }
  };
  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(endpoints.card.statsDashboard);
      setDashboardData(response.data);

      const categories: string[] = [];
      const series: number[] = [];
      response.data.topEvents.forEach((event: Event) => {
        categories.push(event.name);
        series.push(event.percentageCollected);
      });
      setChartData({ categories, series });
    } catch (error) {
      console.error('Error fetching collected statistic: ' + error);
      setDashboardData(null);
    }
  };

  const fetchCollectedCards = async () => {
    try {
      const response = await axios.get(
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
    fetchDashboardData,
    collectedStatistic,
    isCardLoading,
    collectedCards,
    dashboardData,
    chartData,
  };
};

export default useCardData;
