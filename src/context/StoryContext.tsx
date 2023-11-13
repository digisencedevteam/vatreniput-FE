import { createContext, useContext, useEffect, useState } from 'react';

interface StoryContextType {
  currentStoryIndex: number;
  setCurrentStoryIndex: (index: number) => void;
  currentTab: number;
  setCurrentTab: (index: number) => void;
  childrenCount: number;
}
const StoryContext = createContext<StoryContextType>({
  currentStoryIndex: 0,
  setCurrentStoryIndex: (index: number) => {},
  currentTab: 0,
  setCurrentTab: (tabIndex: number) => {},
  childrenCount: 0,
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
  const [callback, setCallback] = useState(false);

  return (
    <StoryContext.Provider
      value={{
        currentStoryIndex,
        setCurrentStoryIndex,
        currentTab,
        setCurrentTab,
        childrenCount,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStoryContext = () => useContext(StoryContext);
