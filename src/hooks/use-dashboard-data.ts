import { useState, useEffect } from 'react';
import { ChartData, DashboardData, Event } from 'src/types';
import axiosInstance, { endpoints } from 'src/utils/axios';

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [cardCount, setCardCount] = useState(0);

  const fetchDashboardData = async () => {
    setIsDashboardLoading(true);
    try {
      const response = await axiosInstance.get(endpoints.card.statsDashboard);
      setDashboardData(response.data);
      setCardCount(response.data.numberOfCollectedCards);
      const categories: string[] = [];
      const series: number[] = [];
      response.data.topEvents.forEach((event: Event) => {
        categories.push(event.name);
        series.push(event.percentageCollected);
      });
      setChartData({ categories, series });
    } catch (error) {
      setDashboardData(null);
    } finally {
      setIsDashboardLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    dashboardData,
    chartData,
    isDashboardLoading,
    fetchDashboardData,
    cardCount,
  };
};

export default useDashboardData;
