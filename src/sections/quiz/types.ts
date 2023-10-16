export type Question = {
  text: string;
  options: string[];
  image: string
  correctOption: number;
};

export type ResolvedQuiz = {
  count: number
  resolvedQuizzes: QuizResult[]
}

export type UnresolvedQuiz = {
  count: number
  unresolvedQuizzes: Quiz[]
}

export type Quiz = {
  _id: string
  title: string;
  description?: string;
  questions?: Question[];
  thumbnail: string
  isExpired?: boolean,
  availableUntil?: string
};
export type Answer = {
  option: string | null;
  correct: boolean;
};

export type QuizResult = {
  userId: string
  quiz: Quiz
  score: number
  duration: number
  dateTaken: string
}

export type CustomCardProps = {
  width?: string;
  height?: string;
  imgUrl: string;
  cardText: string;
  linkTo?: string;
  quizResults?: QuizResult;
}

