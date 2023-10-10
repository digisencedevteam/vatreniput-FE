import { useState, useEffect } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { Quiz } from 'src/sections/quiz/types';

type FetchQuizzesReturn = {
  isLoadingResolved: boolean;
  isLoadingUnresolved: boolean;
  resolvedQuizzes: Quiz[] | undefined;
  unresolvedQuizzes: Quiz[] | undefined;
  unresolvedQuiz: any;
  fetchQuizzes: () => void; // You can use this to trigger a fetch manually if needed
  fetchUnresolvedQuizById: (quizId: string) => Promise<void>;
};

const useFetchQuizzes = (
  currentPage?: number,
  itemsPerPage?: number
): FetchQuizzesReturn => {
  const [isLoadingResolved, setIsLoadingResolved] = useState(false);
  const [isLoadingUnresolved, setIsLoadingUnresolved] = useState(false);
  const [resolvedQuizzes, setResolvedQuizzes] = useState<Quiz[]>();
  const [unresolvedQuizzes, setUnresolvedQuizzes] = useState<Quiz[]>();
  const [unresolvedQuiz, setUnresolvedQuiz] = useState<Quiz | null>();

  const fetchUnresolvedQuizById = async (quizId: string) => {
    setIsLoadingUnresolved(true);
    try {
      const response = await axios.get(`${endpoints.quiz.details}${quizId}`);
      console.log(unresolvedQuiz);

      setUnresolvedQuiz(response.data || null);
    } catch (error) {
      console.error('Error fetching unresolved quiz by ID', error);
      setUnresolvedQuiz(null);
    }
    setIsLoadingUnresolved(false);
  };

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
    // fetchQuizzes();
  }, [currentPage]);

  return {
    isLoadingResolved,
    isLoadingUnresolved,
    resolvedQuizzes,
    unresolvedQuizzes,
    fetchQuizzes,
    fetchUnresolvedQuizById,
    unresolvedQuiz,
  };
};

export default useFetchQuizzes;
