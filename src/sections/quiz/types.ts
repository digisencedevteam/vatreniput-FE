// Define types
export type Question = {
  questionText: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  title: string;
  imageURL: string;
  description: string;
  questions: Question[];
};
export type Answer = {
  option: string;
  correct: boolean;
};
