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

export type ItemProps = {
  label: LabelInfo;
  totalAmount: number;
  value: number;
};

export type QuizInfo = {
  _id: string | Object;
  title: string;
  thumbnail: string;
};

export type LabelInfo = {
  score: number;
  duration: number;
  dateTaken: string;
  quiz: QuizInfo;
};

// Story Types START
export interface TeamStat {
  TeamName: string;
  MatchesPlayed: number;
  Wins: number;
  Draws: number;
  Losses: number;
  Points: number;
}

export interface PenaltyShootout {
  Player: string;
  Result: string;
}

export interface FinalMatchDetail {
  Match: string;
  Score: string;
  GoalScorers?: string[];
  Penalties?: string;
  PenaltyShootout?: PenaltyShootout[];
}

export interface MatchData {
  Matches: {
    GroupStage: {
      Kolo1: FinalMatchDetail;
      Kolo2: FinalMatchDetail;
      Kolo3: FinalMatchDetail;
    };
    Finals?: {
      RoundOf16?: FinalMatchDetail;
      QuarterFinal?: FinalMatchDetail;
      SemiFinal?: FinalMatchDetail;
      Final?: FinalMatchDetail;
    };
  };
  Skupina: TeamStat[];
  Champ: {
    Winner: string;
    TopScorer: {
      Player: string;
      Team: string;
      Goals: number;
    };
  };
  Summary: string;
}

export interface HighlightData {
  Title: string;
  imgUrl: string;
  Description: string;
}

export interface IzbornikData {
  Name: string;
  DOB: string;
  CoachingCareer: string;
  MajorAchievements: string[];
  imgUrl: string;
  StoryText: string;
}

interface Player {
  name: string;
  imgurl: string;
}

export interface Reprezentacija {
  Vratari: Player[];
  Branici: Player[];
  Vezni: Player[];
  Napadaci: Player[];
  [key: string]: Player[];
}

export interface QualificationMatch {
  Teams: string;
  Score: string;
  Scorers?: string[];
}

export interface Story {
  storyTitle?: string;
  storyLogo?: string;
  Reprezentacija?: Reprezentacija;
  Prvenstvo?: MatchData;
  Qualifications?: {
    Description: string;
    Teams: TeamStat[];
  };
  Highlights?: HighlightData[];
  Izbornik?: IzbornikData;
  Zanimljivosti?: (string | number | boolean)[];
  AdditionalQualifications?: QualificationMatch[];
}

export interface StoryContentProps {
  story: Story;
}
export interface QualificationMatchDetailsProps {
  matches: QualificationMatch[];
}

export interface DataProp {
  Winner: string;
  TopScorer: {
    Player: string;
    Team: string;
    Goals: number;
  };
}

export interface ChampionCardProps {
  data?: DataProp;
}

export interface MatchTableProps {
  data: TeamStat[];
}

export interface MatchDetailsProps {
  matchData: FinalMatchDetail;
}
export interface HighlightProps {
  data: {
    Title: string;
    imgUrl: string;
    Description: string;
  };
}

// STORY TYPES END

interface TimelineStory {
  storyId: number;
  storyTitle: string;
}

export interface TimelineProps {
  stories: TimelineStory[];
}
