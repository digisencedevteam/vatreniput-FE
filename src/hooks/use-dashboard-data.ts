import { useState } from 'react';
import { Quiz } from 'src/sections/quiz/types';
import {
  ChartData,
  CollectedStatistic,
  CollectionCard,
  Event,
  Voting,
} from 'src/types';
import axiosInstance, { endpoints } from 'src/utils/axios';

const useDashboardData = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [cardCount, setCardCount] = useState(0);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [cards, setCards] = useState<CollectionCard[]>([]);
  const [votings, setVotings] = useState<Voting[]>([]);
  const [collectedStatistic, setCollectedStatistic] =
    useState<CollectedStatistic | null>(null);

  const fetchDashboardData = async () => {
    setIsDashboardLoading(true);
    try {
      const response = await axiosInstance.get(endpoints.card.statsDashboard);
      setCardCount(response.data.numberOfCollectedCards);
      setCards(response.data.cards);
      setQuizzes(response.data.quizzes);
      setVotings(response.data.votings);
      const {
        numberOfCollectedCards,
        percentageOfCollectedCards,
        countOfAllCards,
        topEvents,
      } = response.data;
      setCollectedStatistic({
        numberOfCollectedCards,
        percentageOfCollectedCards,
        countOfAllCards,
        topEvents,
      });

      const categories: string[] = [];
      const series: number[] = [];
      response.data.topEvents.forEach((event: Event) => {
        categories.push(event.name);
        series.push(event.numberOfCollected);
      });
      setChartData({ categories, series });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDashboardLoading(false);
    }
  };

  const deleteVoting = async (votingId: string) => {
    try {
      await axiosInstance.delete(`${endpoints.votings.all}${votingId}`);
      setVotings(
        (prevVotings) =>
          prevVotings?.filter((voting) => voting._id !== votingId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    chartData,
    isDashboardLoading,
    collectedStatistic,
    fetchDashboardData,
    deleteVoting,
    votings,
    quizzes,
    cardCount,
    cards,
  };
};

export default useDashboardData;
