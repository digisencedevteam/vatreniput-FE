export type FAQ = {
  question: string;
  answer: string;
};

export type CollectionEvent = {
  percentageCollected: any;
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
  topEvents: CollectedStatistic | null;
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
      matches: QualificationMatch[];
    };
    Finals?: {
      RoundOf16?: FinalMatchDetail;
      QuarterFinal?: FinalMatchDetail;
      SemiFinal?: FinalMatchDetail;
      Final?: FinalMatchDetail;
    };
  };
  Skupina: TeamStat[];
  Champ?: {
    Winner?: string;
    TopScorer?: {
      Player: string;
      Team: string;
      Goals: number;
    };
  };
  Summary?: string;
}

export interface HighlightData {
  Title: string;
  imgUrl: string;
  Description: string;
  videoLink?: string;
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
  Winner?: string;
  TopScorer?: {
    Player?: string;
    Team?: string;
    Goals?: number;
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
    videoLink?: string;
  };
}

export interface StoryWrapperProps {
  title: string;
  children?: React.ReactNode;
  isCollapsable?: boolean;
}

export interface PenaltyShootoutProps {
  data?: {
    Player: string;
    Result: string;
  }[];
}

interface TimelineStory {
  storyId: number;
  storyTitle: string;
}

export interface TimelineProps {
  stories: TimelineStory[];
}
export type TabComponents = {
  Kvalifikacije?: JSX.Element;
  Prvenstvo?: JSX.Element;
  Highlights?: JSX.Element;
  Izbornik?: JSX.Element;
  Reprezentacija?: JSX.Element;
  Zanimljivosti?: JSX.Element;
  [key: string]: JSX.Element | undefined;
};

// STORY TYPES END
export type VotingOption = {
  _id?: string;
  text: string;
};

export type Voting = {
  _id: string;
  title: string;
  description: string;
  availableUntil: string;
  thumbnail: string;
  votingOptions: VotingOption[];
  linkToEdit?: string;
};

export type UseVotingReturn = {
  isLoading: boolean;
  votings: Voting[] | undefined;
  createVoting: (
    voting: Partial<Voting>
  ) => Promise<{ success: boolean; error?: string }>;
  fetchAllVotings: () => void;
};

export type VotingResult = {
  votingOptionText: string;
  votingOptionThumbnail: string;
  count: number;
  percentage: string;
};

export type VotingResultStat = {
  totalVotes: number;
  results: VotingResult[];
};

export type AdminActionButtonsProps = {
  linkToEdit: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  handleOpenDeleteModal: () => void;
  modalText: string;
  confirmButtonText: string;
};
