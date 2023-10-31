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
