import { useState, useEffect } from 'react';
import { endpoints } from 'src/utils/axios';
import { Answer, Quiz } from 'src/sections/quiz/types';
import axiosInstance from 'src/utils/axios';
import { QuizResult } from 'src/types';
import { useAuthContext } from 'src/auth/hooks';

export type FetchQuizzesReturn = {
  isLoadingResolved: boolean;
  isLoadingUnresolved: boolean;
  isResultsLoading: boolean;
  resolvedQuizzes: Quiz[] | undefined;
  isDeleting: boolean;
  unresolvedQuizzes: Quiz[] | undefined;
  allQuizzes: Quiz[] | undefined;
  unresolvedQuiz: Quiz | null | undefined;
  error: string | null;
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
  const currentUser = useAuthContext();
  const [isLoadingResolved, setIsLoadingResolved] = useState(false);
  const [isLoadingUnresolved, setIsLoadingUnresolved] = useState(false);
  const [resolvedQuizzes, setResolvedQuizzes] = useState<Quiz[]>();
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>();
  const [unresolvedQuizzes, setUnresolvedQuizzes] = useState<Quiz[]>();
  const [unresolvedQuiz, setUnresolvedQuiz] = useState<Quiz | null>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [resultsById, setResultsById] = useState<QuizResult[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const fetchUnresolvedQuizById = async (quizId: string) => {
    setIsLoadingUnresolved(true);
    try {
      const response = await axiosInstance.get(`${endpoints.quiz.details}${quizId}`);
      setUnresolvedQuiz(response.data || null);
    } catch (error) {
      setUnresolvedQuiz(null);
    }
    setIsLoadingUnresolved(false);
  };

  const fetchAllQuizzes = async () => {
    setIsLoadingResolved(true);
    try {
      const response = await axiosInstance.get(`${endpoints.quiz.all}`);
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
      setResultsById(null);
      setIsResultsLoading(true);
      const response = await axiosInstance.get(
        `${endpoints.quiz.results}?quizId=${quizId}&page=${page}&limit=${limit}`
      );
      const { quizResults, count } = response.data;
      const computedTotalPages = Math.ceil(count / limit);
      setTotalPages(computedTotalPages);
      setResultsById(quizResults || null);
    } catch (error) {
      setError('Failed to fetch quiz results. Please try again.');
      setResultsById(null);
    } finally {
      setIsResultsLoading(false);
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
    const quizToSend = { ...quiz };
    try {
      let response;
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
          error: `Error ${quizId ? 'updating' : 'creating'} quiz: ${response.data.message || JSON.stringify(response.data)}`,
        };
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      return {
        success: false,
        error: `Error ${quizId ? 'updating' : 'creating'} quiz: ${errorMessage}`,
      };
    }
  };
  

  const fetchQuizzes = async () => {
    const userId = currentUser.user && currentUser.user._id;
    const fetchUnresolvedQuizzes = async () => {
      setIsLoadingUnresolved(true);
      try {
        const response = await axiosInstance.get(
          `${endpoints.quiz.unresolved}?page=${currentPage}&limit=${itemsPerPage}`
        );
        const timeLimit = 10 * 60 * 1000; 
        const quizzesToFetch = [];
        for (const quiz of response.data.unresolvedQuizzes) {
          if (quiz && quiz.status && quiz.status.length > 0 && quiz.status[0].status === 'inProgress') {
            const startTime = new Date(quiz.status[0].startTime).getTime();
            const currentTime = new Date().getTime();
            var elapsedTime = currentTime - startTime;
            if (elapsedTime > timeLimit) {
              quizzesToFetch.push(quiz._id);
            }
          }
        }
        const quizDetailsPromises = quizzesToFetch.map(quizId => axiosInstance.get(endpoints.quiz.details + quizId));
        const quizDetailsResponses = await Promise.all(quizDetailsPromises);
        quizDetailsResponses.forEach(response => {
          const quizData = response.data;
          setAnswers(quizData.quizzAnswers)
          const score =
            (answers.reduce((count, answer) => {
            return answer.correct ? count + 1 : count;
          }, 0) / (quizData ? quizData!.questions!.length : 1)) * 100;
          try {
             axiosInstance.post(endpoints.quiz.details, {
              userId: userId,
              quizId: quizData._id,
              score,
              duration: elapsedTime ,
              answers: answers,
            });
          } catch (error) {
            console.error('Error submitting quiz results:', error);
          }
        });
        setUnresolvedQuizzes(response.data.unresolvedQuizzes);
      } catch (error) {
        console.error(error);
        setUnresolvedQuizzes([]);
      }
      setIsLoadingUnresolved(false);
    };

    const fetchResolvedQuizzes = async () => {
      setIsLoadingResolved(true);
      try {
        const response = await axiosInstance.get(
          `${endpoints.quiz.resolved}?page=${currentPage}&limit=${itemsPerPage}`
        );
        setIsLoadingResolved(false);
        setResolvedQuizzes(response.data.resolvedQuizzes);
      } catch (error) {
        setResolvedQuizzes([]);
        setIsLoadingResolved(false);
      }
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
    isResultsLoading,
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
    error,
  };
};

export default useFetchQuizzes;
