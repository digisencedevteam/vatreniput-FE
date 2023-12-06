import { createContext, useContext, useState } from 'react';

interface StoryContextType {
  currentStoryIndex: number;
  setCurrentStoryIndex: (index: number) => void;
  currentTab: number;
  setCurrentTab: (index: number) => void;
  childrenCount: number;
  overFiftyPercent: boolean;
  setOverFiftyPercent: (value: boolean) => void;
}
const StoryContext = createContext<StoryContextType>({
  currentStoryIndex: 0,
  setCurrentStoryIndex: (index: number) => {},
  currentTab: 0,
  setCurrentTab: (tabIndex: number) => {},
  childrenCount: 0,
  overFiftyPercent: false,
  setOverFiftyPercent: () => {},
});

interface StoryProviderProps {
  children: React.ReactNode;
  childrenCount: number;
}

export const StoryProvider = ({
  children,
  childrenCount,
}: StoryProviderProps) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [overFiftyPercent, setOverFiftyPercent] = useState(false);

  return (
    <StoryContext.Provider
      value={{
        currentStoryIndex,
        setCurrentStoryIndex,
        currentTab,
        setCurrentTab,
        childrenCount,
        overFiftyPercent,
        setOverFiftyPercent,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStoryContext = () => useContext(StoryContext);
