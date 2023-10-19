import { useState, useEffect } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { Quiz } from 'src/sections/quiz/types';
import axiosInstance from 'src/utils/axios';

type FetchQuizzesReturn = {
  isLoadingResolved: boolean;
  isLoadingUnresolved: boolean;
  resolvedQuizzes: Quiz[] | undefined;
  isDeleting: boolean;
  unresolvedQuizzes: Quiz[] | undefined;
  unresolvedQuiz: Quiz | null | undefined;
  fetchQuizzes: () => void;
  fetchUnresolvedQuizById: (quizId: string) => Promise<void>;
  deleteQuiz: (quizId: string) => Promise<void>;
  createOrUpdateQuiz: (
    quiz: Partial<Quiz>,
    quizId?: string
  ) => Promise<{ success: boolean; error?: string }>;
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
  const [isDeleting, setIsDeleting] = useState(false);

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

  const deleteQuiz = async (quizId: string) => {
    setIsDeleting(true);
    try {
      await axios.delete(`${endpoints.quiz.delete}${quizId}`);
      alert('Quiz deleted successfully!');
    } catch (error) {
      alert('Failed to delete quiz. Please try again.');
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
      console.log(quizToSend);

      if (quizId) {
        response = await axiosInstance.put(
          endpoints.quiz.update + '/' + quizId,
          quizToSend
        );
      } else {
        response = await axiosInstance.post(endpoints.quiz.new, quizToSend);
      }

      if ([200, 201].includes(response.status)) {
        // You can also update any local state here, if required.
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

  useEffect(() => {}, [currentPage]);

  return {
    isLoadingResolved,
    isLoadingUnresolved,
    resolvedQuizzes,
    unresolvedQuizzes,
    fetchQuizzes,
    fetchUnresolvedQuizById,
    unresolvedQuiz,
    isDeleting,
    deleteQuiz,
    createOrUpdateQuiz,
  };
};

export default useFetchQuizzes;
