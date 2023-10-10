import { useState, useEffect } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { Quiz } from 'src/sections/quiz/types';

type FetchQuizzesReturn = {
  isLoadingResolved: boolean;
  isLoadingUnresolved: boolean;
  resolvedQuizzes: Quiz[] | undefined;
  unresolvedQuizzes: Quiz[] | undefined;
  fetchQuizzes: () => void; // You can use this to trigger a fetch manually if needed
};

const useFetchQuizzes = (
  currentPage: number,
  itemsPerPage: number = 5
): FetchQuizzesReturn => {
  const [isLoadingResolved, setIsLoadingResolved] = useState(false);
  const [isLoadingUnresolved, setIsLoadingUnresolved] = useState(false);
  const [resolvedQuizzes, setResolvedQuizzes] = useState<Quiz[]>();
  const [unresolvedQuizzes, setUnresolvedQuizzes] = useState<Quiz[]>();

  const fetchQuizzes = async () => {
    const fetchUnresolvedQuizzes = async () => {
      setIsLoadingUnresolved(true);
      try {
        const response = await axios.get(
          `${endpoints.quiz.unresolved}?page=${currentPage}&limit=${itemsPerPage}`
        );
        setUnresolvedQuizzes(response.data.unresolvedQuizzes);
      } catch (error) {
        console.error('Error fetching unresolved quizzes', error);
        setUnresolvedQuizzes([]);
      }
      setIsLoadingUnresolved(false);
    };

    const fetchResolvedQuizzes = async () => {
      setIsLoadingResolved(true);
      try {
        const response = await axios.get(
          `${endpoints.quiz.resolved}?page=${currentPage}&limit=${itemsPerPage}`
        );
        setResolvedQuizzes(response.data.resolvedQuizzes);
      } catch (error) {
        console.error('Error fetching resolved quizzes', error);
        setResolvedQuizzes([]);
      }
      setIsLoadingResolved(false);
    };

    fetchResolvedQuizzes();
    fetchUnresolvedQuizzes();
  };

  useEffect(() => {
    fetchQuizzes();
  }, [currentPage]);

  return {
    isLoadingResolved,
    isLoadingUnresolved,
    resolvedQuizzes,
    unresolvedQuizzes,
    fetchQuizzes,
  };
};

export default useFetchQuizzes;
