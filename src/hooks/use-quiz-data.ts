import { useState, useEffect } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { Quiz } from 'src/sections/quiz/types';
import axiosInstance from 'src/utils/axios';
import { QuizResult } from 'src/types';

type FetchQuizzesReturn = {
  isLoadingResolved: boolean;
  isLoadingUnresolved: boolean;
  resolvedQuizzes: Quiz[] | undefined;
  isDeleting: boolean;
  unresolvedQuizzes: Quiz[] | undefined;
  allQuizzes: Quiz[] | undefined;
  unresolvedQuiz: Quiz | null | undefined;
  fetchAllQuizzes: () => void;
  fetchQuizzes: () => void;
  fetchUnresolvedQuizById: (quizId: string) => Promise<void>;
  deleteQuiz: (quizId: string) => Promise<void>;
  createOrUpdateQuiz: (
    quiz: Partial<Quiz>,
    quizId?: string
  ) => Promise<{ success: boolean; error?: string }>;
  resultsById: QuizResult[] | null;
  getResultsById: (
    quizId: string,
    page: number,
    limit: number
  ) => Promise<void>;
  totalPages: number;
};

const useFetchQuizzes = (
  currentPage?: number,
  itemsPerPage?: number
): FetchQuizzesReturn => {
  const [isLoadingResolved, setIsLoadingResolved] = useState(false);
  const [isLoadingUnresolved, setIsLoadingUnresolved] = useState(false);
  const [resolvedQuizzes, setResolvedQuizzes] = useState<Quiz[]>();
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>();
  const [unresolvedQuizzes, setUnresolvedQuizzes] = useState<Quiz[]>();
  const [unresolvedQuiz, setUnresolvedQuiz] = useState<Quiz | null>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [resultsById, setResultsById] = useState<QuizResult[] | null>(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchUnresolvedQuizById = async (quizId: string) => {
    setIsLoadingUnresolved(true);
    try {
      const response = await axios.get(`${endpoints.quiz.details}${quizId}`);
      setUnresolvedQuiz(response.data || null);
    } catch (error) {
      setUnresolvedQuiz(null);
    }
    setIsLoadingUnresolved(false);
  };

  const fetchAllQuizzes = async () => {
    setIsLoadingResolved(true);
    try {
      const response = await axios.get(`${endpoints.quiz.all}`);
      setAllQuizzes(response.data);
    } catch (error) {
      setAllQuizzes([]);
    }
    setIsLoadingResolved(false);
  };

  const getResultsById = async (
    quizId: string,
    page: number,
    limit: number
  ) => {
    try {
      const response = await axiosInstance.get(
        `${endpoints.quiz.results}?quizId=${quizId}&page=${page}&limit=${limit}`
      );
      const { quizResults, totalCount } = response.data;

      const computedTotalPages = Math.ceil(totalCount / limit);
      setTotalPages(computedTotalPages);

      setResultsById(quizResults || null);
      if (quizResults && quizResults.length < limit) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } catch (error) {
      console.error('Error fetching results by ID:', error);
      setError('Failed to fetch quiz results. Please try again.');
      setResultsById(null);
    }
  };

  const deleteQuiz = async (quizId: string) => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`${endpoints.quiz.deleteAndUpdate}${quizId}`);
    } catch (error) {
    } finally {
      setIsDeleting(false);
      fetchQuizzes();
    }
  };

  const createOrUpdateQuiz = async (quiz: Partial<Quiz>, quizId?: string) => {
    const quizToSend = {
      ...quiz,
    };

    let response;
    try {
      if (quizId) {
        response = await axiosInstance.put(
          endpoints.quiz.deleteAndUpdate + quizId,
          quizToSend
        );
      } else {
        response = await axiosInstance.post(endpoints.quiz.new, quizToSend);
      }

      if ([200, 201].includes(response.status)) {
        return { success: true };
      } else {
        return {
          success: false,
          error: `Error ${
            quizId ? 'updating' : 'creating'
          } quiz: ${JSON.stringify(response.data)}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Error ${
          quizId ? 'updating' : 'creating'
        } quiz: ${JSON.stringify(error.message)}`,
      };
    }
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
        setResolvedQuizzes([]);
      }
      setIsLoadingResolved(false);
    };

    fetchResolvedQuizzes();
    fetchUnresolvedQuizzes();
  };

  useEffect(() => {
    fetchAllQuizzes();
  }, [currentPage]);

  return {
    isLoadingResolved,
    isLoadingUnresolved,
    resolvedQuizzes,
    unresolvedQuizzes,
    allQuizzes,
    fetchQuizzes,
    fetchUnresolvedQuizById,
    unresolvedQuiz,
    isDeleting,
    deleteQuiz,
    createOrUpdateQuiz,
    fetchAllQuizzes,
    resultsById,
    getResultsById,
    totalPages,
  };
};

export default useFetchQuizzes;
