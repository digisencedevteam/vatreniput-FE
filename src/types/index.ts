export type FAQ = {
  question: string;
  answer: string;
};

export type CollectionEvent = {
  _id: string;
  name: string;
  location?: string;
  year?: number;
  description?: string;
};

export type CollectionCard = {
  _id: string;
  code: string;
  title: string;
  description: string;
  event: CollectionEvent;
  imageURLs: string[];
  isScanned: boolean;
  isCollected: boolean;
};

export type CardApiResponse = {
  cards: CollectionCard[];
  totalCount: number;
};

export type CollectedStatistic = {
  numberOfCollectedCards: number;
  percentageOfCollectedCards: number;
  countOfAllCards: number;
};

export type CardTemplate = {
  title: string;
  description: string;
  videoLink?: string;
  imageURLS: string[];
  event: CollectionEvent;
};

export type PrintedCard = {
  qrCode: string;
  isScanned: boolean;
  owner: number;
};

export type UserCard = {
  user: string;
  printedCard: string;
};

export type TopEvent = {
  name?: string;
  location?: string;
  year?: number;
  percentageCollected?: number;
  imageSrc?: string;
};

export type DashboardStats = {
  numberOfCollectedCards: number;
  percentageOfCollectedCards: number;
  countOfAllCards: number;
  topEvents: TopEvent[];
};

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  [key: string]: string;
};

export interface StorySection {
  storyTitle?: string;
  imageUrl: string;
  title: string;
  content: string;
}

export interface Story {
  sections: StorySection[];
}

export interface QuizResult {
  _id: string;
  userId: {
    _id: string;
    username: string;
    photoURL?: string;
  };
  quizId: string;
  score: number;
  duration: number;
  dateTaken: string;
  __v: number;
}

export type Team = {
  TeamName: string;
  Wins: number;
  Losses: number;
  Draws: number;
  Points: number;
};

export type MatchTableProps = {
  data: {
    [x: string]: any;
    TeamName: string;
    Wins: number;
    Losses: number;
    Draws: number;
    Points: number;
  };
};

export type PenaltyShootout = {
  Player: string;
  Result: string;
};

export type Match = {
  Match: string;
  Score: string;
  GoalScorers: string[];
  Penalties?: string;
  PenaltyShootout?: PenaltyShootout[];
};

export type Finals = {
  RoundOf16: Match;
  QuarterFinal: Match;
  SemiFinal: Match;
  Final: Match;
};
