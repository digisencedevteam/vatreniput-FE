import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Answer, Question, Quiz } from './types';
import QuestionScreen from './QuestionScreen';
import StartQuizScreen from './StartQuizScreen';
import EndQuizScreen from './EndQuizScreen';
import { useSettingsContext } from 'src/components/settings';
import { endpoints } from 'src/utils/axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from 'src/auth/hooks';
import { LoadingScreen } from 'src/components/loading-screen';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import axiosInstance from 'src/utils/axios';

const QuizApp = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const settings = useSettingsContext();
  const { quizId } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const currentUser = useAuthContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startedTime, setStartedTime] = useState(0);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [finalDuration, setFinalDuration] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const navigate = useNavigate();

  const startQuiz = async () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    try {
      await axiosInstance.post(`${endpoints.quiz.details}${quizId}/start`);
      setFinalScore(0);
      setFinalDuration(0);
      setIsQuizCompleted(false);
      fetchQuizData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuizData = async () => {
    try {
      const response = await axiosInstance.get(endpoints.quiz.details + quizId);
      setSelectedQuiz(response.data);
      if (response.data?.status?.status === 'inProgress') {
        const answeredQuestions = response.data.quizzAnswers || [];
        const lastAnsweredQuestionIndex = answeredQuestions.length - 1;
        if (lastAnsweredQuestionIndex >= 0) {
          setCurrentQuestionIndex(lastAnsweredQuestionIndex + 1);
          setAnswers(
            answeredQuestions.map((answer: any) => ({
              option: answer.selectedOption,
              correct: answer.isCorrect,
            }))
          );
        } else {
          setCurrentQuestionIndex(0);
        }
        const startedTime = new Date(response.data.status?.startTime).getTime();
        setStartedTime(startedTime);
      }
    } catch (error) {
      console.error(error);
      setSelectedQuiz(null);
    }
  };

  useEffect(() => {
    fetchQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  if (!quizId) {
    return null;
  }

  const getCorrectAnswerIndex = (question: Question): string => {
    return question.correctOption.toString();
  };

  const handleAnswerSelection = (option: string) => {
    setSelectedOption(option);
  };

  const updateQuizProgress = async (
    quizId: string,
    questionId: string,
    selectedOption: number,
    isCorrect: boolean
  ) => {
    try {
      await axiosInstance.post(endpoints.quiz.inProgressQuizUpdate, {
        quizId,
        questionId,
        selectedOption,
        isCorrect,
      });
    } catch (error) {
      console.error('Error updating quiz progress:', error);
    }
  };

  const handleNextQuestion = async () => {
    if (
      currentQuestionIndex !== null &&
      selectedQuiz &&
      selectedQuiz.questions
    ) {
      const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
      const isCorrect =
        selectedOption ===
        getCorrectAnswerIndex(currentQuestion && currentQuestion);
      const newAnswer: Answer = {
        option: selectedOption,
        correct: isCorrect,
      };
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = newAnswer;
      setAnswers(newAnswers);

      if (
        selectedOption === null ||
        isNaN(Number(selectedOption)) ||
        !currentQuestion ||
        !currentQuestion._id
      ) {
        return null;
      }

      await updateQuizProgress(
        quizId,
        currentQuestion && currentQuestion._id,
        parseInt(selectedOption, 10),
        isCorrect
      );

      if (currentQuestionIndex === selectedQuiz.questions.length - 1) {
        handleSubmitQuiz(newAnswers);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handleAutoSubmitQuiz = () => {
    handleSubmitQuiz(answers);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1]?.option || null);
    }
  };

  const handleSubmitQuiz = async (localAnswers: Answer[]) => {
    setIsSubmitting(true);
    setCurrentQuestionIndex(null);
    setAnswers(localAnswers);

    const userId = currentUser.user && currentUser.user._id;

    const score =
      (localAnswers.reduce((count, answer) => {
        return answer.correct ? count + 1 : count;
      }, 0) /
        (selectedQuiz ? selectedQuiz!.questions!.length : 1)) *
      100;

    const currentTimestamp = Date.now();
    const durationInMilliseconds = currentTimestamp - startedTime;
    const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
    setFinalScore(score);
    setFinalDuration(durationInSeconds);

    try {
      await axiosInstance.post(endpoints.quiz.details, {
        userId,
        quizId,
        score,
        duration: durationInSeconds,
        answers: localAnswers,
      });
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }
    setIsSubmitting(false);
    setIsQuizCompleted(true);
  };
  if (selectedQuiz?.isResolved) navigate(paths.dashboard.quizzes);

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      {isSubmitting && <LoadingScreen />}
      {selectedQuiz?.status?.status === 'inProgress' &&
        currentQuestionIndex !== null &&
        quizId !== undefined &&
        selectedQuiz?.questions && (
          <QuestionScreen
            currentQuestion={selectedQuiz.questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={selectedQuiz.questions.length}
            title={selectedQuiz.title || ''}
            selectedOption={selectedOption}
            handleAnswerSelection={handleAnswerSelection}
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
            handleAutoSubmitQuiz={handleAutoSubmitQuiz}
            quizId={quizId}
            startedTime={startedTime}
          />
        )}
      {isQuizCompleted && (
        <EndQuizScreen
          quiz={selectedQuiz}
          score={finalScore}
          elapsedTime={finalDuration}
        />
      )}
      {!selectedQuiz?.isResolved && selectedQuiz?.status === null && (
        <StartQuizScreen
          quiz={selectedQuiz}
          startQuiz={() => {
            startQuiz();
          }}
        />
      )}
    </Container>
  );
};

export default QuizApp;
