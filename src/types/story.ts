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
  Group: TeamStat[];
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

export interface CoachData {
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

export interface NationalTeam {
  Vratari: Player[];
  Braniči: Player[];
  Vezni: Player[];
  Napadači: Player[];
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
  NationalTeam?: NationalTeam;
  Championship?: MatchData;
  Qualifications?: {
    Description: string;
    Teams: TeamStat[];
  };
  Highlights?: HighlightData[];
  Coach?: CoachData;
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
  Championship?: JSX.Element;
  Highlights?: JSX.Element;
  Coach?: JSX.Element;
  NationalTeam?: JSX.Element;
  Zanimljivosti?: JSX.Element;
  [key: string]: JSX.Element | undefined;
};
export type FactType =
  | string
  | number
  | boolean
  | React.ReactElement
  | Iterable<React.ReactNode>
  | React.ReactPortal
  | null;
