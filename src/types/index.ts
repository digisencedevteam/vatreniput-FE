export type FAQ = {
  question: string;
  answer: string;
};

export type CollectionEvent = {
  percentageCollected: number;
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
  topEvents: Event[];
};

export type CardTemplate = {
  title: string;
  description: string;
  videoLink?: string;
  imageURLS: string[];
  event: CollectionEvent;
  number?: number;
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
  isVoted?: boolean;
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

export type Event = {
  _id: number;
  name: string;
  location: string;
  year: number;
  percentageCollected: number;
  numberOfCollected: number;
};

export type DashboardData = {
  topEvents: Event[];
};

export type ChartData = {
  categories: string[];
  series: number[];
};

export type ScrollableContainerProps = {
  children: React.ReactNode;
};
