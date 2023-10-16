import React, { createContext, useContext, useEffect, useState } from 'react';
import { Answer } from 'src/sections/quiz/types';

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
    const [timer, setTimer] = useState<number>(30);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);

    const startQuiz = () => {
        setTimer(30);
        setStartTime(Date.now());
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
        setTimer(30);
    };


    useEffect(() => {
        if (currentQuestionIndex !== null) {
            const timerInterval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 0) {
                        // Handle submission or actions when time's up
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);

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
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};