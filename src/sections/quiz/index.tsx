import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Answer, Question, Quiz } from './types';
import QuestionScreen from './QuestionScreen';
import StartQuizScreen from './StartQuizScreen';
import EndQuizScreen from './EndQuizScreen';
import { useSettingsContext } from 'src/components/settings';
import axios, { endpoints } from 'src/utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/auth/hooks';
import { TIMER_INITIAL_VALUE } from './quiz-constants';

const QuizApp = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const settings = useSettingsContext();
  const { quizId } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const currentUser = useAuthContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timers, setTimers] = useState<{ [quizId: string]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();
  const [lastQuestionAnswered, setLastQuestionAnswered] = useState(false);
  const [autoSubmit, setAutoSubmit] = useState(true);

  const setTimer = (value: number, quizId: string) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [quizId]: value,
    }));
  };

  useEffect(() => {
    if (selectedQuiz?.questions && lastQuestionAnswered && autoSubmit) {
      handleSubmitQuiz();
      setLastQuestionAnswered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, lastQuestionAnswered, autoSubmit]);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(endpoints.quiz.details + quizId);
        setSelectedQuiz(response.data);

        const savedState = localStorage.getItem(`quizState_${quizId}`);

        if (savedState) {
          const { timer: savedTimer } = JSON.parse(savedState);
          if (savedTimer !== 0) {
            setCurrentQuestionIndex(0);
            setTimer(savedTimer, quizId as string);
            setQuizFinished(false);
          }
        }

        const currentTime = new Date().getTime();
        const savedStartTime = localStorage.getItem(`quizStartTime_${quizId}`);

        if (savedStartTime && parseInt(savedStartTime, 10) !== currentTime) {
          setCurrentQuestionIndex(0);
          setQuizFinished(false);
        }

      } catch (error) {
        console.error(error);
        setSelectedQuiz(null);
      }
    };

    fetchQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  if (!quizId) {
    return null;
  }

  const getCorrectAnswer = (question: Question): string => {
    return question.options[question.correctOption];
  };

  const handleAnswerSelection = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex !== null && selectedQuiz && selectedQuiz.questions) {
      const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
      if (!currentQuestion) return null;

      const isCorrect = selectedOption === getCorrectAnswer(currentQuestion);
      const newAnswer: Answer = {
        option: selectedOption,
        correct: isCorrect,
      };

      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestionIndex] = newAnswer;
        return newAnswers;
      });

      if (currentQuestionIndex === selectedQuiz.questions.length - 1) {
        setLastQuestionAnswered(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1]?.option || null);
    }
  };

  const calculateScore = (): number => {
    if (selectedQuiz) {
      const totalQuestions = selectedQuiz.questions?.length;
      const correctCount = selectedQuiz.questions?.reduce((count, question, index) => {
        if (answers[index] && answers[index].correct) {
          return count + 1;
        }
        return count;
      }, 0);
      if (typeof correctCount !== 'undefined' && typeof totalQuestions !== 'undefined') {
        const score = (correctCount / totalQuestions) * 100;
        return score;
      }
    }
    return 0;
  };

  const handleSubmitQuiz = async () => {
    const isQuizAlreadySubmitted = sessionStorage.getItem(`quizSubmitted_${quizId}`);

    if (isQuizAlreadySubmitted) {
      navigate(-1);
      return;
    }

    let newAnswers = answers;
    if (currentQuestionIndex !== null && selectedQuiz && selectedQuiz.questions) {
      const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
      const isCorrect = selectedOption === getCorrectAnswer(currentQuestion);
      const newAnswer: Answer = {
        option: selectedOption,
        correct: isCorrect,
      };
      newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = newAnswer;
    }

    setCurrentQuestionIndex(null);

    const userId = currentUser.user && currentUser.user._id;
    const score = calculateScore();
    const savedStartTimeStr = localStorage.getItem(`quizStartTime_${quizId}`);
    const savedStartTime = savedStartTimeStr ? Number(savedStartTimeStr) : null;
    const currentTimestamp = Date.now();
    const durationInMilliseconds = savedStartTime ? currentTimestamp - savedStartTime : 0;
    const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
    setDuration(durationInSeconds);

    try {
      await axios.post(endpoints.quiz.details, {
        userId,
        quizId,
        score,
        duration: durationInSeconds,
        answers: newAnswers,
      });

      localStorage.setItem(`quizSubmitted_${quizId}`, 'true');
      sessionStorage.setItem(`quizSubmitted_${quizId}`, 'true');
      localStorage.removeItem(`quizStartTime_${quizId}`);
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }

    setAnswers(newAnswers);
    setQuizFinished(true);
  };

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
      {timers[quizId] !== 0 && currentQuestionIndex !== null && quizId !== undefined && selectedQuiz?.questions && (
        <QuestionScreen
          currentQuestion={selectedQuiz.questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={selectedQuiz.questions.length}
          title={selectedQuiz.title || ''}
          selectedOption={selectedOption}
          handleAnswerSelection={handleAnswerSelection}
          handlePreviousQuestion={handlePreviousQuestion}
          handleNextQuestion={handleNextQuestion}
          handleSubmitAnswers={handleSubmitQuiz}
          elapsedTime={TIMER_INITIAL_VALUE}
          quizId={quizId}
        />
      )}
      {currentQuestionIndex === null && quizFinished && selectedQuiz !== null && (
        <EndQuizScreen
          quiz={selectedQuiz}
          answers={answers}
          elapsedTime={duration}
          onQuizFinish={() => {
            setAutoSubmit(true);
            handleSubmitQuiz();
          }}
        />
      )}
      {currentQuestionIndex === null && !quizFinished && selectedQuiz !== null && (
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
