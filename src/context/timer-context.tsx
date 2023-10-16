import React, { createContext, useContext, useEffect, useState } from 'react';
import { TIMER_INITIAL_VALUE, TIMER_INTERVAL } from 'src/sections/quiz/quiz-constants';
import { Answer, Quiz } from 'src/sections/quiz/types';
import { useRouter } from 'src/routes/hooks';

interface TimerContextType {
    timer: number;
    startTime: number | null;
    answers: Answer[];
    currentQuestionIndex: number | null;
    startQuiz: () => void;
    setTimer: (value: number) => void;
    recordAnswer: (answer: Answer, index: number) => void;
    setCurrentQuestionIndex: (index: number | null) => void;
    resetTimer: () => void
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimerContext = (): TimerContextType => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimerContext must be used within a TimerProvider');
    }
    return context;
};

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const [timer, setTimer] = useState<number>(TIMER_INITIAL_VALUE);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);

    const startQuiz = () => {
        const currentStartTime = Date.now();
        setStartTime(currentStartTime);
        setTimer(TIMER_INITIAL_VALUE);
        setCurrentQuestionIndex(0);
        setAnswers([]);
    };

    const recordAnswer = (answer: Answer, index: number) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = answer;
            return newAnswers;
        });
    };

    const resetTimer = () => {
        setTimer(TIMER_INITIAL_VALUE);
    };

    useEffect(() => {
        if (currentQuestionIndex !== null) {
            const timerInterval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 0) {
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, TIMER_INTERVAL);

            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [currentQuestionIndex]);

    return (
        <TimerContext.Provider
            value={{
                timer, startTime, answers, currentQuestionIndex,
                startQuiz, setTimer, recordAnswer, setCurrentQuestionIndex, resetTimer
            }} >
            {children}
        </TimerContext.Provider>
    );
};
